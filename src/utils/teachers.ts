import { FilterQuery, HydratedDocument } from "mongoose";
import { ITeacher, Teacher } from "../models/Teacher";
import { Lesson } from "../models/Lesson";

async function getTeachers(query: FilterQuery<ITeacher> = {}) {
	try {
		const teachers: HydratedDocument<ITeacher>[] = await Teacher.find(
			query
		);

		return teachers;
	} catch (error) {
		return { error };
	}
}

async function createTeacher(teacher: ITeacher) {
	try {
		// check if teacher already exists
		const existingTeacher = await Teacher.findOne({ name: teacher.name });

		if (existingTeacher) {
			return {
				error: "Преподавателят вече съществува",
			};
		}

		const newTeacher = await new Teacher(teacher).save();

		return newTeacher;
	} catch (error) {
		return { error };
	}
}

async function updateTeacher(teacherId: string, updates: Partial<ITeacher>) {
	try {
		const teacher = await Teacher.findById(teacherId);

		// update all lessons that have this teacher
		const lessons = await Lesson.find({ teacher: teacher.name });

		if (lessons.length > 0) {
			for (const lesson of lessons) {
				lesson.teacher = updates.name;
				await lesson.save();
			}
		}

		if (!teacher) {
			return {
				error: "Преподавателят не беше намерен",
			};
		}

		Object.assign(teacher, updates);

		await teacher.save();

		return teacher;
	} catch (error) {
		return { error };
	}
}

async function deleteTeacher(query: FilterQuery<ITeacher>) {
	try {
		const teacher = await Teacher.findOne(query);

		if (!teacher) {
			return {
				error: "Преподавателят не беше намерен",
			};
		}

		// check if teacher has lessons
		const lessons = await Lesson.find({ teacher: teacher.name });

		if (lessons.length > 0) {
			return {
				error: "Преподавателят има часове и не може да бъде изтрит",
			};
		}

		await Teacher.deleteOne(query);

		return {
			message: "Преподавателят беше изтрит успешно",
		};
	} catch (error) {
		return { error };
	}
}

export { getTeachers, createTeacher, updateTeacher, deleteTeacher };
