import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import User from './models/user.js';
import Resume from './models/resume.js'; // ✅ Import Resume model

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// ======= ROUTES =======

// REGISTER
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashed });
    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid password' });

    res.json({ msg: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// SAVE RESUME
app.post('/api/resume', async (req, res) => {
  const { email, ...data } = req.body;
  try {
    const updated = await Resume.findOneAndUpdate(
      { email },
      { email, ...data },
      { upsert: true, new: true }
    );
    res.json({ success: true, resume: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save resume' });
  }
});

// GET RESUME
app.get('/api/resume/:email', async (req, res) => {
  try {
    const resume = await Resume.findOne({ email: req.params.email });
    if (resume) return res.json(resume);
    res.status(404).json({ msg: 'Resume not found' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
