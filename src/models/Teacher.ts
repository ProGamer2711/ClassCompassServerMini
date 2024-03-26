import { Document, Schema, model } from "mongoose";

export interface ITeacher {
	name: string;
}

export interface ITeacherDocument extends ITeacher, Document {}

const TeacherSchema = new Schema<ITeacherDocument>(
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

export const Teacher = model<ITeacherDocument>("Teacher", TeacherSchema);
