# TechHub - Professional E-Commerce Platform

A sleek, cinematic, fully frontend-based website designed for high-end editorial branding, digital music distribution, live tour promotion, and exclusive merchandise sales. 

This project is highly optimized for static hosting platforms like **GitHub Pages** and features a modular architecture, a dark modern aesthetic with neon typography, and a dynamic WhatsApp checkout system.

## 🚀 Features

- **Dynamic Data Rendering:** Products, music releases, and tour dates are fetched dynamically from a localized `data.json` file. No need to touch HTML to update the site!
- **Cinematic UI/UX:** Dark theme featuring frosted glass navigation (glassmorphism), neon brush script accents, and 3D hover states on merchandise cards.
- **Smart Cart System:** Fully functional shopping cart that utilizes browser `localStorage` to save user selections even after a page refresh.
- **WhatsApp Checkout:** Bypasses complex backend payment gateways by compiling the user's cart into a formatted message and redirecting them directly to a WhatsApp business number.
- **Category Filtering:** Instantly filter merchandise by Apparel, Physical Music, or Accessories without page reloads.
- **Responsive Design:** Mobile-first layout ensuring perfect rendering on all devices.

## 📂 File Structure

The project is kept ultra-lightweight with only 4 core files:

```text
/
├── index.html     # The main structural layout and UI
├── style.css      # Cinematic styling, CSS variables, and animations
├── app.js         # Core logic, cart state, filtering, and WhatsApp checkout
├── data.json      # The "database" holding all tour dates and merch items
└── README.md      # Project documentation
