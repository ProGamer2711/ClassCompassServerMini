import { FilterQuery, HydratedDocument, ObjectId, Types } from "mongoose";
import { Class, IClass, IClassDocument } from "../models/Class";
import { createLesson } from "./lessons";
import { Lesson } from "../models/Lesson";

async function getClasses(
	query: FilterQuery<IClass> = {}
): Promise<HydratedDocument<IClass>[] | { error: Error }> {
	try {
		const classes: HydratedDocument<IClass>[] = await Class.find(query)
			.populate("schedule.monday")
			.populate("schedule.tuesday")
			.populate("schedule.wednesday")
			.populate("schedule.thursday")
			.populate("schedule.friday");

		return classes;
	} catch (error) {
		return { error };
	}
}

async function createClass(
	classObject: Omit<IClass, "schedule">
): Promise<HydratedDocument<IClassDocument> | { error: Error }> {
	try {
		// check if class already exists
		const existingClass = await Class.findOne({ name: classObject.name });

		if (existingClass) {
			return {
				error: new Error("Класът вече съществува"),
			};
		}

		const newClass: HydratedDocument<IClassDocument> = await new Class({
			...classObject,
			schedule: {
				monday: [],
				tuesday: [],
				wednesday: [],
				thursday: [],
				friday: [],
			},
		}).save();

		return newClass;
	} catch (error) {
		return { error };
	}
}

async function addScheduleDayToClass(
	classId: Types.ObjectId,
	day: string,
	schedule: Partial<IClass["schedule"]["monday"]>
) {
	try {
		let lessonIds: ObjectId[] = [];

		for (const lesson of schedule) {
			const newLesson = await createLesson(lesson);

			if ("error" in newLesson) {
				return { error: newLesson.error };
			}

			lessonIds.push(newLesson._id);
		}

		const classToUpdate = await Class.findById(classId);

		// delete all the old lessons for the day
		for (const lesson of classToUpdate.schedule[day]) {
			await Lesson.findByIdAndDelete(lesson);
		}

		if (!classToUpdate) {
			return { error: new Error("Класът не беше намерен") };
		}

		classToUpdate.schedule[day] = lessonIds;

		await classToUpdate.save();

		return classToUpdate;
	} catch (error) {
		return { error };
	}
}

async function updateClass(classId: string, update: Partial<IClass>) {
	try {
		const updatedClass = await Class.findByIdAndUpdate(classId, update, {
			new: true,
		});

		return updatedClass;
	} catch (error) {
		return { error };
	}
}

async function deleteClass(
	classId: string
): Promise<{ message: string } | { error: Error }> {
	try {
		// delete all the lessons for the class (we get the ids from the class)
		const classToDelete = await Class.findById(classId);

		if (!classToDelete) {
			return { error: new Error("Класът не беше намерен") };
		}

		for (const day in classToDelete.toJSON().schedule) {
			if (day === "_id" || day === "__v" || day === "id") continue;

			for (const lesson of classToDelete.schedule[day]) {
				await Lesson.findByIdAndDelete(lesson);
			}
		}

		await Class.findByIdAndDelete(classId);

		return { message: "Класът беше изтрит успешно" };
	} catch (error) {
		return { error };
	}
}

export {
	getClasses,
	createClass,
	addScheduleDayToClass,
	updateClass,
	deleteClass,
};
