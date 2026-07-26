import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();
const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE = 'https://api.openweathermap.org/data/2.5';
const GEO_BASE = 'https://api.openweathermap.org/geo/1.0';

// GET /api/weather/:lat/:lon -> live current + hourly + daily forecast
router.get('/:lat/:lon', async (req: Request, res: Response) => {
  const { lat, lon } = req.params;

  if (!API_KEY || API_KEY === 'your_openweather_api_key_here') {
    return res.status(500).json({ error: 'OPENWEATHER_API_KEY not configured on server' });
  }

  try {
    const [currentRes, forecastRes, aqiRes, geoRes] = await Promise.all([
      axios.get(`${BASE}/weather`, { params: { lat, lon, units: 'metric', appid: API_KEY } }),
      axios.get(`${BASE}/forecast`, { params: { lat, lon, units: 'metric', appid: API_KEY } }),
      axios.get(`${BASE}/air_pollution`, { params: { lat, lon, appid: API_KEY } }),
      axios.get(`${GEO_BASE}/reverse`, { params: { lat, lon, limit: 1, appid: API_KEY } }),
    ]);

    const current = currentRes.data;
    const forecastList: any[] = forecastRes.data.list;
    const aqi = aqiRes.data?.list?.[0]?.main?.aqi; // 1(good) - 5(very poor)
    const place = geoRes.data?.[0];

    // Dew point via Magnus formula (real calculation from temp + humidity)
    const temp = current.main.temp;
    const humidity = current.main.humidity;
    const a = 17.27, b = 237.7;
    const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);

    // Next 24h in 3-hour steps (8 slots)
    const hourly = forecastList.slice(0, 8).map((slot) => ({
      time: new Date(slot.dt * 1000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
      temp: Math.round(slot.main.temp),
      conditions: slot.weather[0].main,
      icon: slot.weather[0].icon,
      pop: Math.round((slot.pop || 0) * 100),
    }));

    // Group 3-hour slots into days for a daily outlook
    const dayMap: Record<string, any[]> = {};
    forecastList.forEach((slot) => {
      const date = new Date(slot.dt * 1000).toISOString().split('T')[0];
      if (!dayMap[date]) dayMap[date] = [];
      dayMap[date].push(slot);
    });

    const daily = Object.entries(dayMap)
      .slice(0, 6)
      .map(([date, slots]) => {
        const temps = slots.map((s) => s.main.temp);
        const pops = slots.map((s) => s.pop || 0);
        const conditionCounts: Record<string, number> = {};
        slots.forEach((s) => {
          const c = s.weather[0].main;
          conditionCounts[c] = (conditionCounts[c] || 0) + 1;
        });
        const dominant = Object.entries(conditionCounts).sort((x, y) => y[1] - x[1])[0][0];
        return {
          date,
          day: new Date(date).toLocaleDateString('en-IN', { weekday: 'short' }),
          tempMax: Math.round(Math.max(...temps)),
          tempMin: Math.round(Math.min(...temps)),
          conditions: dominant,
          pop: Math.round(Math.max(...pops) * 100),
        };
      });

    res.json({
      location: {
        lat: Number(lat),
        lon: Number(lon),
        name: place ? `${place.name}${place.state ? ', ' + place.state : ''}` : `${lat}, ${lon}`,
      },
      current: {
        temperature: Math.round(temp),
        feelsLike: Math.round(current.main.feels_like),
        humidity,
        conditions: current.weather[0].main,
        description: current.weather[0].description,
        icon: current.weather[0].icon,
        windSpeed: Math.round(current.wind.speed * 3.6), // m/s -> km/h
        pressure: current.main.pressure,
        visibility: current.visibility != null ? Math.round(current.visibility / 100) / 10 : null, // km
        dewPoint: Math.round(dewPoint),
        aqi: aqi || null,
      },
      hourly,
      daily,
      updatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Weather API error:', err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch live weather data' });
  }
});

export default router;
