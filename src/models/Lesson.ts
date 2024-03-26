import { Document, Schema, model } from "mongoose";

export interface ILesson {
	lessonNumber: number;
	startTime: Date | string;
	endTime: Date | string;
	teacher: string;
	room: string;
	subject: string;
	isOdd: boolean | null;
}

export interface ILessonDocument extends ILesson, Document {}

const LessonSchema = new Schema<ILessonDocument>(
	{
		lessonNumber: {
			type: Number,
			required: true,
			min: 1,
			max: 10,
		},
		startTime: {
			type: Date,
			required: true,
			minlength: 1,
		},
		endTime: {
			type: Date,
			required: true,
			minlength: 1,
		},
		teacher: {
			type: String,
			required: true,
			minlength: 1,
		},
		room: {
			type: String,
			required: true,
			minlength: 1,
		},
		subject: {
			type: String,
			required: true,
			minlength: 1,
		},
		isOdd: {
			type: Boolean,
			default: null,
		},
	},
	{ timestamps: true, versionKey: false }
);

export const Lesson = model<ILessonDocument>("Lesson", LessonSchema);
