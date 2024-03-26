import { Router } from "express";
import { createSubject, deleteSubject, getSubjects } from "../utils/subjects";

export const router = Router();

router.get("", async (_, res) => {
	try {
		const subjects = await getSubjects();

		if ("error" in subjects) {
			return res.status(400).json(subjects);
		}

		return res.json({ subjects });
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

		const newSubject = await createSubject({ name });

		if ("error" in newSubject) {
			return res.status(400).json({
				error: "Грешка при валидацията",
			});
		}

		return res.json({ subject: newSubject });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

router.delete("", async (req, res) => {
	try {
		const { name } = req.body;

		if (!name) {
			return res
				.status(400)
				.json({ error: "Липсват задължителни полета" });
		}

		const deletedSubject = await deleteSubject({ name });

		if ("error" in deletedSubject) {
			return res.status(400).json(deletedSubject);
		}

		return res.json(deletedSubject);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

export const path = "/subjects";
