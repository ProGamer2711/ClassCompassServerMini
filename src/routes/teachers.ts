import { Router } from "express";
import {
	createTeacher,
	deleteTeacher,
	getTeachers,
	updateTeacher,
} from "../utils/teachers";

export const router = Router();

router.get("", async (_, res) => {
	try {
		const teachers = await getTeachers();

		if ("error" in teachers) {
			return res.status(400).json(teachers);
		}

		return res.json({ teachers });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

router.post("", async (req, res) => {
	try {
		const { name } = req.body;

		if (!name) {
			return res
				.status(400)
				.json({ error: "Липсват задължителни полета" });
		}

		const newTeacher = await createTeacher({ name });

		if ("error" in newTeacher) {
			return res.status(400).json(newTeacher);
		}

		return res.json({ teacher: newTeacher });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;

		if (!name) {
			return res
				.status(400)
				.json({ error: "Липсват задължителни полета" });
		}

		const updatedTeacher = await updateTeacher(id, {
			name,
		});

		if ("error" in updatedTeacher) {
			return res.status(400).json(updatedTeacher);
		}

		return res.json(updatedTeacher);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

router.delete("", async (req, res) => {
	try {
		const { _id } = req.body;

		if (!_id) {
			return res
				.status(400)
				.json({ error: "Липсват задължителни полета" });
		}

		const deletedTeacher = await deleteTeacher({ _id });

		if ("error" in deletedTeacher) {
			return res.status(400).json(deletedTeacher);
		}

		return res.json(deletedTeacher);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

export const path = "/teachers";
