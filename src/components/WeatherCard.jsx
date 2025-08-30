import React from "react";

<<<<<<< HEAD
// Map weather description to icon type
function getIconType(description) {
  if (!description) return "sunny";
  const d = description.toLowerCase();
  if (d.includes("cloud")) return "cloudy";
  if (d.includes("rain") || d.includes("drizzle")) return "rainy";
  if (d.includes("snow")) return "snowy";
  if (d.includes("storm") || d.includes("thunder")) return "stormy";
  if (d.includes("fog") || d.includes("mist") || d.includes("haze")) return "foggy";
  if (d.includes("clear")) return "sunny";
  return "sunny";
}

// SVG icons for weather types
function WeatherSVG({ type }) {
  switch (type) {
    case "cloudy":
      return (
        <svg width="80" height="80" viewBox="0 0 48 48" className="mx-auto mb-2">
          <ellipse cx="24" cy="30" rx="16" ry="10" fill="#B0BEC5" />
          <ellipse cx="32" cy="28" rx="10" ry="8" fill="#90A4AE" />
        </svg>
      );
    case "rainy":
      return (
        <svg width="80" height="80" viewBox="0 0 48 48" className="mx-auto mb-2">
          <ellipse cx="24" cy="28" rx="14" ry="8" fill="#90A4AE" />
          <ellipse cx="32" cy="26" rx="8" ry="6" fill="#B0BEC5" />
          <g stroke="#2196F3" strokeWidth="2">
            <line x1="18" y1="36" x2="18" y2="42" />
            <line x1="24" y1="36" x2="24" y2="44" />
            <line x1="30" y1="36" x2="30" y2="42" />
          </g>
        </svg>
      );
    case "snowy":
      return (
        <svg width="80" height="80" viewBox="0 0 48 48" className="mx-auto mb-2">
          <ellipse cx="24" cy="28" rx="14" ry="8" fill="#B0BEC5" />
          <g stroke="#90CAF9" strokeWidth="2">
            <line x1="18" y1="36" x2="18" y2="42" />
            <line x1="24" y1="36" x2="24" y2="44" />
            <line x1="30" y1="36" x2="30" y2="42" />
            {/* snowflakes */}
            <line x1="21" y1="39" x2="27" y2="41" />
            <line x1="21" y1="41" x2="27" y2="39" />
          </g>
        </svg>
      );
    case "stormy":
      return (
        <svg width="80" height="80" viewBox="0 0 48 48" className="mx-auto mb-2">
          <ellipse cx="24" cy="28" rx="14" ry="8" fill="#90A4AE" />
          <polygon points="22,36 26,36 24,42" fill="#FFD600" />
          <polyline points="20,38 24,44 28,38" fill="none" stroke="#FFD600" strokeWidth="2"/>
        </svg>
      );
    case "foggy":
      return (
        <svg width="80" height="80" viewBox="0 0 48 48" className="mx-auto mb-2">
          <ellipse cx="24" cy="30" rx="16" ry="10" fill="#CFD8DC" />
          <rect x="10" y="38" width="28" height="2" fill="#B0BEC5" />
          <rect x="14" y="42" width="20" height="2" fill="#B0BEC5" />
        </svg>
      );
    case "sunny":
    default:
      return (
        <svg width="80" height="80" viewBox="0 0 48 48" className="mx-auto mb-2">
          <circle cx="24" cy="24" r="12" fill="#FFD600" />
          <g stroke="#FFD600" strokeWidth="2">
            <line x1="24" y1="4" x2="24" y2="14" />
            <line x1="24" y1="34" x2="24" y2="44" />
            <line x1="4" y1="24" x2="14" y2="24" />
            <line x1="34" y1="24" x2="44" y2="24" />
            <line x1="10" y1="10" x2="17" y2="17" />
            <line x1="38" y1="38" x2="31" y2="31" />
            <line x1="10" y1="38" x2="17" y2="31" />
            <line x1="38" y1="10" x2="31" y2="17" />
          </g>
        </svg>
      );
  }
}

function WeatherCard({ weather }) {
  if (!weather) return null;
  const iconType = getIconType(weather.description || weather.condition);
=======
function WeatherCard({ weather }) {
  if (!weather) return null;
>>>>>>> 8ce066d75cee17a993ae655c00d7d201a07c5488

  return (
    <div className="bg-white/90 p-6 rounded-2xl shadow-xl text-center w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto transition-all">
      <h2 className="text-2xl font-semibold mb-2 text-blue-800">
        {weather.city}, {weather.country}
      </h2>
<<<<<<< HEAD
      <WeatherSVG type={iconType} />
      <p className="capitalize mb-2 text-lg text-gray-700">
        {weather.description || weather.condition}
      </p>
=======
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.condition}
        className="mx-auto mb-2 w-24 h-24"
      />
      <p className="capitalize mb-2 text-lg text-gray-700">{weather.condition}</p>
>>>>>>> 8ce066d75cee17a993ae655c00d7d201a07c5488
      <div className="flex justify-center gap-4 text-lg font-medium mt-4">
        <span>🌡 {weather.temperature}°C</span>
        <span>💧 {weather.humidity}%</span>
        <span>🌬 {weather.wind} km/h</span>
      </div>
    </div>
  );
}

export default WeatherCard;
