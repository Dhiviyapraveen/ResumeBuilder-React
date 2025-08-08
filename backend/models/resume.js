import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  education: [{ degree: String, institution: String, year: String }],
  skills: [String],
  projects: [{ title: String, description: String }],
  internships: [{ company: String, role: String }],
  achievements: [String],
  certifications: [String],
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
