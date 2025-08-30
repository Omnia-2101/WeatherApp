# 🌤 Weather Dashboard

A modern, responsive weather dashboard built with **React** and **Tailwind CSS**.  
Get real-time weather data, a 7-day forecast, and a smooth user experience with city suggestions, localization, and more.

---

## 🚀 Features

- **Current Weather:**  
  Instantly view the current temperature, humidity, wind speed, and weather condition icon for any city.

- **City Search with Suggestions:**  
  - Type a city name and get instant, debounced suggestions powered by OpenWeatherMap's geocoding API.
  - Click a suggestion to auto-fill and search.

- **Recent Searches:**  
  - Your last 5 searched cities are saved in your browser and shown as quick-access buttons.

- **Multi-Language Support:**  
  - Choose from 20 popular languages for weather descriptions (e.g., English, العربية, 中文, Français, Español, Русский, etc.).

- **Responsive Design:**  
  - Fully responsive and mobile-friendly, thanks to Tailwind CSS.

- **Real-Time Updates:**  
  - Weather data auto-refreshes every 5 minutes.
  - Manual refresh button for instant updates.

- **User-Friendly Error Handling:**  
  - Clear, friendly messages for invalid city names, network issues, or denied geolocation.

---

## 🛠️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Omnia-2101/WeatherApp.git
   cd weather-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your OpenWeatherMap API key:**
   - Create a `.env` file in the project root:
     ```
     VITE_OPENWEATHER_API_KEY=your_api_key_here
     ```

4. **Run the app:**
   ```bash
   npm run dev
   ```

5. **Open in your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## 📦 Tech Stack

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [OpenWeatherMap API](https://openweathermap.org/api)

---

**Enjoy your weather dashboard!**
