import { FilterQuery, HydratedDocument } from "mongoose";
import { Lesson, ILessonDocument, ILesson } from "../models/Lesson";
import moment from "moment-timezone";

async function getLessons(
	query: FilterQuery<ILessonDocument>
): Promise<HydratedDocument<ILessonDocument>[] | { error: Error }> {
	try {
		const lessons: HydratedDocument<ILesson>[] = await Lesson.find(query);

		return lessons;
	} catch (error) {
		return { error };
	}
}

async function createLesson(
	lesson: ILesson & {
		startTime: string;
		endTime: string;
	}
): Promise<HydratedDocument<ILessonDocument> | { error: Error }> {
	try {
		let startDate = moment
			.tz("2000-01-01", "Europe/Sofia")
			.add(lesson.startTime)
			.toDate();

		let endDate = moment
			.tz("2000-01-01", "Europe/Sofia")
			.add(lesson.endTime)
			.toDate();

		const newLesson: HydratedDocument<ILessonDocument> = await new Lesson({
			...lesson,
			startTime: startDate,
			endTime: endDate,
		}).save();

		return newLesson;
	} catch (error) {
		return { error };
	}
}

async function updateLesson(
	lessonId: string,
	lesson: Partial<ILesson>
): Promise<HydratedDocument<ILessonDocument> | { error: Error }> {
	try {
		const updatedLesson: HydratedDocument<ILessonDocument> =
			await Lesson.findByIdAndUpdate(lessonId, lesson, { new: true });

		return updatedLesson;
	} catch (error) {
		return { error };
	}
}

async function deleteLesson(
	lessonId: string
): Promise<{ message: string } | { error: Error }> {
	try {
		await Lesson.findByIdAndDelete(lessonId);

		return { message: "Часът беше изтрит успешно" };
	} catch (error) {
		return { error };
	}
}

export { getLessons, createLesson, updateLesson, deleteLesson };
