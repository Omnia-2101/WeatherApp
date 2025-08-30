import React, { useState, useCallback, useEffect, useRef } from "react";

import { getWeatherByCity } from "./utils/api";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";

const RECENT_SEARCHES_KEY = "recent_weather_searches";
const MAX_RECENT = 5;

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "zh_cn", label: "中文 (Chinese Simplified)" },
  { code: "zh_tw", label: "中文 (Chinese Traditional)" },
  { code: "es", label: "Español" },
  { code: "ar", label: "العربية" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
  { code: "pt", label: "Português" },
  { code: "ru", label: "Русский" },
  { code: "ja", label: "日本語" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "tr", label: "Türkçe" },
  { code: "ko", label: "한국어" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "pl", label: "Polski" },
  { code: "nl", label: "Nederlands" },
  { code: "th", label: "ไทย" },
  { code: "fa", label: "فارسی" }
];

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [recent, setRecent] = useState([]);
  const [language, setLanguage] = useState("en");
  const [suggestions, setSuggestions] = useState([]);
  const debounceRef = useRef();

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem(RECENT_SEARCHES_KEY) || "[]"
    );
    setRecent(stored);
  }, []);

  // Save recent searches to localStorage when updated
  useEffect(() => {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent));
  }, [recent]);

  const handleSearch = useCallback(async () => {
    if (!city.trim()) return;
    try {
      setError("");
      const data = await getWeatherByCity(city, language);
      setWeather(data);

      // Update recent searches
      setRecent((prev) => {
        const filtered = prev.filter(
          (c) => c.toLowerCase() !== city.trim().toLowerCase()
        );
        return [city.trim(), ...filtered].slice(0, MAX_RECENT);
      });
    } catch (err) {
      setWeather(null);
      setError(err.message || "Something went wrong");
    }
  }, [city, language]);

  // Real-time updates every 5 minutes if weather is loaded
  useEffect(() => {
    if (!weather) return;
    const interval = setInterval(() => {
      handleSearch();
    }, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, [weather, handleSearch]);

  // Optimized debounced city suggestions
  useEffect(() => {
    if (!city.trim()) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            city
          )}&limit=5&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
        );
        if (!res.ok) {
          setSuggestions([]);
          return;
        }
        const data = await res.json();
        setSuggestions(
          data.map(
            (item) =>
              `${item.name}${item.state ? ", " + item.state : ""}, ${item.country}`
          )
        );
      } catch {
        setSuggestions([]);
      }
    }, 300); // 300ms debounce
    return () => clearTimeout(debounceRef.current);
  }, [city]);

  // Handle suggestion click
  const handleSuggestion = (suggestion) => {
    setCity(suggestion);
    setSuggestions([]); // Clear suggestions when a suggestion is clicked
    setTimeout(handleSearch, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 flex flex-col items-center justify-start px-2 py-6">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-8 drop-shadow-lg text-center">
          🌤 Weather Dashboard
        </h1>

        <div className="mb-4 w-full flex justify-end">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-1 rounded border border-blue-300 bg-white text-blue-900"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <SearchBar
          value={city}
          onChange={setCity}
          onSearch={handleSearch}
          suggestions={suggestions}
          onSuggestionClick={(suggestion) => {
            setCity(suggestion);
            setSuggestions([]); // Clear suggestions when a suggestion is clicked
            setTimeout(handleSearch, 0);
          }}
        />

        {recent.length > 0 && (
          <div className="mb-4 w-full flex flex-wrap gap-2 justify-center">
            {recent.map((item) => (
              <button
                key={item}
                onClick={() => handleSuggestion(item)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition text-sm"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {weather && (
          <button
            onClick={handleSearch}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
          >
            Refresh Weather
          </button>
        )}

        {error && <ErrorMessage message={error} />}
        {weather && (
          <div className="flex justify-center w-full">
            <WeatherCard weather={weather} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
