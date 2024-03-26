import { Document, PopulatedDoc, Schema, model } from "mongoose";
import { ILesson } from "./Lesson";

interface Schedule {
	monday: PopulatedDoc<ILesson & Document>[];
	tuesday: PopulatedDoc<ILesson & Document>[];
	wednesday: PopulatedDoc<ILesson & Document>[];
	thursday: PopulatedDoc<ILesson & Document>[];
	friday: PopulatedDoc<ILesson & Document>[];
}

export interface IClass {
	name: string;
	students: string[];
	schedule: Schedule;
}

export interface IClassDocument extends IClass, Document {}

const ClassSchema = new Schema<IClassDocument>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			index: true,
			minlength: 1,
		},
		students: {
			type: [
				{
					type: String,
					minlength: 1,
				},
			],
			default: [],
		},
		schedule: {
			type: {
				monday: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
				tuesday: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
				wednesday: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
				thursday: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
				friday: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
			},
			default: {
				monday: [],
				tuesday: [],
				wednesday: [],
				thursday: [],
				friday: [],
			},
		},
	},
	{ timestamps: true, versionKey: false }
);

export const Class = model<IClassDocument>("Class", ClassSchema);
