import { Document, Schema, model } from "mongoose";

export interface ISubject {
	name: string;
}

export interface ISubjectDocument extends ISubject, Document {}

const SubjectSchema = new Schema<ISubjectDocument>(
	{
		name: {
			type: String,
			required: true,
			index: true,
			unique: true,
			minlength: 1,
		},
	},
	{ timestamps: true, versionKey: false }
);

export const Subject = model<ISubjectDocument>("Subject", SubjectSchema);
