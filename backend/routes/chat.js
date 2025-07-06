import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Load menu from Menu.jsx or a JSON file
let menu = [];
try {
  // Try to load menu from a JSON file for simplicity
  const menuPath = path.resolve(process.cwd(), 'src/data/menu.json');
  if (fs.existsSync(menuPath)) {
    menu = JSON.parse(fs.readFileSync(menuPath, 'utf-8'));
  }
} catch (e) {
  menu = [];
}

router.post('/', async (req, res) => {
  const { prompt, spiceLevel } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  // Build a system prompt for OpenAI
  const menuList = menu.map(item => `- ${item.name} (${item.description})`).join('\n');
  const spiceText = [
    'no spice',
    'mildly spicy',
    'medium spicy',
    'very spicy',
    'extremely spicy'
  ][spiceLevel || 0];

  const systemPrompt = `You are TasteMate, a food recommendation bot. Only suggest dishes from this menu:\n${menuList}\nThe user wants something ${spiceText}. Respond in a friendly, concise way and only use menu items.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      max_tokens: 120
    });
    const answer = completion.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: 'OpenAI error', details: err.message });
  }
});

// Add a route to generate a surprise prompt using OpenAI
router.post('/surprise', async (req, res) => {
  // Prompt for OpenAI to generate a fun, stylish food prompt
  const prompt = `Generate a short, fun, and stylish food craving prompt for a chatbot. It should sound like a real user, be creative, and reference flavors, textures, or menu excitement. Example: 'Give me something cheesy and bold!' or 'Surprise me with a vegetarian delight!'`;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a creative food lover helping users come up with fun prompts for a food chatbot.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 32,
      temperature: 0.9
    });
    const suggestion = completion.choices[0].message.content.trim().replace(/^"|"$/g, '');
    res.json({ prompt: suggestion });
  } catch (err) {
    res.status(500).json({ error: 'OpenAI error', details: err.message });
  }
});

// Add a route to generate a fun prompt for a specific flavor using OpenAI
router.post('/flavor-prompt', async (req, res) => {
  const { flavor } = req.body;
  if (!flavor) return res.status(400).json({ error: 'Missing flavor' });
  // Prompt for OpenAI to generate a fun, Mexican-restaurant-themed craving prompt
  const prompt = `Generate a short, fun, and creative food craving prompt for a chatbot at a Mexican restaurant. The prompt should sound like a real user, be playful, and specifically mention the flavor "${flavor}". Example: 'I'm in the mood for something spicy and bold!' or 'Hit me with a cheesy Mexican treat!'`;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a creative food lover helping users come up with fun prompts for a Mexican restaurant chatbot.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 32,
      temperature: 0.9
    });
    const suggestion = completion.choices[0].message.content.trim().replace(/^"|"$/g, '');
    res.json({ prompt: suggestion });
  } catch (err) {
    res.status(500).json({ error: 'OpenAI error', details: err.message });
  }
});

export default router;
