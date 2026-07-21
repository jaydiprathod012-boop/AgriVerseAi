import { Router, Request, Response } from 'express';

const router = Router();

router.get('/:lat/:lon', (req: Request, res: Response) => {
  res.json({
    location: { lat: req.params.lat, lon: req.params.lon },
    current: {
      temperature: 28,
      humidity: 65,
      conditions: 'Partly Cloudy',
      windSpeed: 12,
      precipitation: 0
    },
    forecast: Array.from({length: 7}).map((_, i) => ({
      day: i + 1,
      temp: { min: 22, max: 30 },
      conditions: i % 3 === 0 ? 'Rain' : 'Sunny'
    })),
    hourly: Array.from({length: 24}).map((_, i) => ({
      hour: i,
      temp: 25 + Math.random() * 5,
      conditions: 'Clear'
    }))
  });
});

router.get('/advisories/:lat/:lon', (req: Request, res: Response) => {
  res.json([
    { type: 'irrigation', message: 'Rain expected in 2 days. Delay heavy irrigation.' },
    { type: 'spraying', message: 'Low wind speeds today. Ideal for pesticide application.' },
    { type: 'harvesting', message: 'Clear skies next 3 days. Good window for harvesting.' },
    { type: 'temperature', message: 'High heat expected tomorrow. Ensure adequate soil moisture.' }
  ]);
});

export default router;
