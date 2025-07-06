import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'prompt', 'hotkey', etc.
  value: { type: String }, // e.g., which hotkey, prompt text, etc.
  user: { type: String }, // optional: user/session id
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Stat', statSchema);
