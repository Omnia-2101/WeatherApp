const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const ONECALL_URL = "https://api.openweathermap.org/data/2.5/onecall";

export async function getWeatherByCity(city, lang = "en") {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}&lang=${lang}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      icon: data.weather[0].icon,
      description: data.weather[0].description,
      lat: data.coord.lat,
      lon: data.coord.lon,
    };
  } catch (error) {
    throw error;
  }
}

export async function getForecastByCoords(lat, lon, lang = "en") {
  try {
    const response = await fetch(
      `${ONECALL_URL}?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}&lang=${lang}`
    );
    if (!response.ok) {
      throw new Error("Forecast not found");
    }
    const data = await response.json();
    // Only return the next 7 days
    return data.daily.slice(0, 7).map((day) => ({
      dt: day.dt,
      temp: {
        min: Math.round(day.temp.min),
        max: Math.round(day.temp.max),
      },
      weather: {
        icon: day.weather[0].icon,
        description: day.weather[0].description,
      },
    }));
  } catch (error) {
    throw error;
  }
}
