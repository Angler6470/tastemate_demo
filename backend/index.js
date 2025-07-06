import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import statsRoutes from './routes/stats.js';
import chatRoutes from './routes/chat.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/chat', chatRoutes);

// Use process.env.PORT for server port
const PORT = process.env.PORT || 5000; // Port for backend server
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tastemate'; // MongoDB connection string

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
