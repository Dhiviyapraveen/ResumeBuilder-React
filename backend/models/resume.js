// models/resume.js
import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fullName: String,
  phone: String,
  linkedin: String,
  github: String,
  education: String,
  skills: String,
  certifications: String,
  projects: String,
  internships: String,
  achievements: String,
});

export default mongoose.model('Resume', ResumeSchema);
