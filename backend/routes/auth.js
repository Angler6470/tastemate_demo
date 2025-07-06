import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// For demo: hardcoded admin credentials (replace with DB in production)
const ADMIN_USER = process.env.ADMIN_USER || 'admin'; // Admin login username
const ADMIN_PASS = process.env.ADMIN_PASS || 'password'; // Admin login password
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'; // Secret for signing/verifying JWT tokens

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Unauthorized' });
});

export default router;
