import express from "express";
import Resume from "../models/resume.js";

const router = express.Router();

// Save or update resume
router.post("/submit", async (req, res) => {
  try {
    const { email, ...resumeData } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Update if exists, else create
    const updatedResume = await Resume.findOneAndUpdate(
      { email },
      { ...resumeData, email },
      { new: true, upsert: true } // upsert = create if not exists
    );

    res.json(updatedResume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
