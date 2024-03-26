import { Router } from "express";
import {
	addScheduleDayToClass,
	createClass,
	deleteClass,
	getClasses,
	updateClass,
} from "../utils/classes";
import { ILesson } from "../models/Lesson";

export const router = Router();

const options: Intl.DateTimeFormatOptions = {
	hour: "2-digit",
	minute: "2-digit",
	hour12: false,
	timeZone: "Europe/Sofia", // Set the time zone to Sofia
};

router.get("", async (_, res) => {
	try {
		const classes = await getClasses();

		if ("error" in classes) {
			return res.status(400).json({ error: classes.error });
		}

		return res.status(200).json({ classes });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

router.get("/:name", async (req, res) => {
	try {
		const { name } = req.params;

		const classes = await getClasses({ name });

		if ("error" in classes) {
			return res.status(400).json({ error: classes.error });
		}

		if (!classes.length) {
			return res.status(404).json({ error: "Класът не беше намерен" });
		}

		return res.status(200).json({ class: classes[0] });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

router.get("/schedule/:name", async (req, res) => {
	try {
		const { name } = req.params;

		const classes = await getClasses({ name });

		if ("error" in classes) {
			return res.status(400).json({ error: classes.error });
		}

		if (!classes.length) {
			return res.status(404).json({ error: "Класът не беше намерен" });
		}

		let classSchedule = classes[0].toJSON().schedule;

		// make the lessons in the schedule have time in the format "HH:MM"
		for (let day in classSchedule) {
			if (day === "_id" || day === "__v" || day === "id") continue;

			classSchedule[day] = classSchedule[day].map((lesson: ILesson) => {
				let startTimeDate = new Date(lesson.startTime);
				let endTimeDate = new Date(lesson.endTime);

				lesson.startTime = startTimeDate.toLocaleString(
					"en-US",
					options
				);
				lesson.endTime = endTimeDate.toLocaleString("en-US", options);

				return lesson;
			});
		}

		return res.status(200).json({ schedule: classSchedule });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

router.post("", async (req, res) => {
	try {
		const { name, students } = req.body;

		if (!(name && students)) {
			return res
				.status(400)
				.json({ error: "Липсват задължителни полета" });
		}

		const newClass = await createClass({ name, students });

		if ("error" in newClass)
			return res.status(400).json({ error: newClass.error });

		return res.status(201).json({ class: newClass });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

router.put("/:_id", async (req, res) => {
	try {
		const { _id } = req.params;
		const { class: newClass } = req.body;

		if (!newClass) {
			return res
				.status(400)
				.json({ error: "Липсват задължителни полета" });
		}

		const updatedClass = await updateClass(_id, newClass);

		if ("error" in updatedClass) {
			return res.status(400).json({ error: updatedClass.error });
		}

		return res.status(200).json({ updatedClass });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

router.post("/lessons/:day", async (req, res) => {
	try {
		const day = req.params.day.toLowerCase();
		const { name, schedule } = req.body;

		if (!(name && schedule)) {
			return res
				.status(400)
				.json({ error: "Липсват задължителни полета" });
		}

		if (
			day !== "monday" &&
			day !== "tuesday" &&
			day !== "wednesday" &&
			day !== "thursday" &&
			day !== "friday"
		) {
			return res.status(400).json({ error: "Невалиден ден" });
		}

		const classToUpdate = await getClasses({ name });

		if ("error" in classToUpdate) {
			return res.status(400).json({ error: classToUpdate.error });
		}

		if (!classToUpdate.length) {
			return res.status(404).json({ error: "Класът не беше намерен" });
		}

		const updatedClass = await addScheduleDayToClass(
			classToUpdate[0]._id,
			day,
			schedule
		);

		if ("error" in updatedClass) {
			return res.status(400).json({ error: "Грешка при валидацията" });
		}

		return res.status(200).json({ updatedClass });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

router.delete("/:_id", async (req, res) => {
	try {
		const { _id } = req.params;

		const deletedClass = await deleteClass(_id);

		if ("error" in deletedClass) {
			return res.status(400).json({
				error: deletedClass.error.message,
			});
		}

		return res.status(200).json({ deletedClass });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

export const path = "/classes";
