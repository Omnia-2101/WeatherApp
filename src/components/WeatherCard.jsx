import React from "react";

function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="bg-white/90 p-6 rounded-2xl shadow-xl text-center w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto transition-all">
      <h2 className="text-2xl font-semibold mb-2 text-blue-800">
        {weather.city}, {weather.country}
      </h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.condition}
        className="mx-auto mb-2 w-24 h-24"
      />
      <p className="capitalize mb-2 text-lg text-gray-700">{weather.condition}</p>
      <div className="flex justify-center gap-4 text-lg font-medium mt-4">
        <span>🌡 {weather.temperature}°C</span>
        <span>💧 {weather.humidity}%</span>
        <span>🌬 {weather.wind} km/h</span>
      </div>
    </div>
  );
}

export default WeatherCard;
