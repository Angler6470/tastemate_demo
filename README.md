# TasteMate Demo (Replit Edition)

Welcome to the TasteMate demo! This project is a full-stack AI-powered food chatbot app, designed for a seamless, database-free demo experience on Replit—perfect for Envato reviewers and quick showcases.

---

## 🚀 Quick Start (on Replit)

1. **Add your OpenAI API key**
   - Create a `.env` file in the root directory (or use the Replit Secrets UI).
   - Add:
     ```
     OPENAI_API_KEY=your-openai-key-here
     ```

2. **Run the app**
   - Click the green "Run" button in Replit, or run:
     ```sh
     ./start.sh
     ```
   - The script will:
     - Install all dependencies (backend & frontend)
     - Ensure `concurrently` is available
     - Start both backend (Express, port 3001) and frontend (Vite, port 3000) together
   - Replit will expose the frontend (Vite) port for you to preview the app.

---

## 🧑‍🍳 Features (Demo Mode)
- **AI Chatbot:** Ask for recipes, food ideas, or anything culinary!
- **Flavor Hotkeys:** Instantly suggest flavors with one click (all use a consistent color for clarity).
- **Spiciness Slider:** Adjust the heat level for your food suggestions.
- **"Surprise Me" Button:** Get a random, fun food prompt.
- **Promo Carousel:** Responsive, animated food promos.
- **Admin Dashboard:** View demo stats (chat count, hotkey/"Surprise Me" usage, spiciness levels)—all using test data for reviewers.
- **Fully Responsive:** Looks great on any device, thanks to Tailwind CSS.

---

## 📝 Notes for Reviewers
- **No database required:** All stats and admin data are fake/test data for demo purposes.
- **No login needed:** Only the admin dashboard is protected (demo mode disables real auth for stats).
- **OpenAI API key required** for chatbot features.
- **All features are demo-ready** and work out-of-the-box on Replit.

---

## 📁 Project Structure
- `start.sh` — Installs dependencies and starts both servers for Replit
- `backend/` — Express API (handles chat, stats, test data)
- `src/` — React frontend (chatbot, UI, admin dashboard)
- `.env.example` — Example environment file

---

## 💡 Customization & Local Development
- You can run the app locally with Node.js and npm (see `start.sh` for steps).
- To use real data or authentication, see code comments in `backend/routes/stats.js` and `backend/testdata.js`.

---

Enjoy demoing TasteMate! If you have questions or need further tweaks, just ask.
