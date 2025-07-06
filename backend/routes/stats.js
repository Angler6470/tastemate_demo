import express from 'express';
import jwt from 'jsonwebtoken';
import Stat from '../schemas/Stat.js';
import { testStats } from '../testdata.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'; // Secret for signing/verifying JWT tokens

// Middleware to check admin JWT
function requireAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') throw new Error('Not admin');
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Get stats (for demo, no auth required)
router.get('/', async (req, res) => {
  res.json(testStats);
});

// Post a new stat (anyone)
router.post('/', async (req, res) => {
  const stat = new Stat(req.body);
  await stat.save();
  res.json(stat);
});

// Add a test route for fake stats (for Replit/Envato demo)
router.get('/test-stats', (req, res) => {
  res.json({ stats: testStats });
});

export default router;
