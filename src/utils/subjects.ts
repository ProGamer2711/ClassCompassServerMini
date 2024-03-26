import { FilterQuery, HydratedDocument } from "mongoose";
import { ISubject, Subject } from "../models/Subject";

async function getSubjects(query: FilterQuery<ISubject> = {}) {
	try {
		const subjects: HydratedDocument<ISubject>[] = await Subject.find(
			query
		);

		return subjects;
	} catch (error) {
		return { error };
	}
}

async function createSubject(subject: ISubject) {
	try {
		// check if subject already exists
		const existingSubject = await Subject.findOne({ name: subject.name });

		if (existingSubject) {
			return {
				error: "Предметът вече съществува",
			};
		}

		const newSubject = await new Subject(subject).save();

		return newSubject;
	} catch (error) {
		return { error };
	}
}

async function deleteSubject(query: FilterQuery<ISubject>) {
	try {
		await Subject.findOneAndDelete(query);

		return {
			message: "Предметът беше изтрит успешно",
		};
	} catch (error) {
		return { error };
	}
}

export { getSubjects, createSubject, deleteSubject };
