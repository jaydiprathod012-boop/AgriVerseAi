import { Router, Request, Response } from 'express';

const router = Router();

router.get('/summary', (req: Request, res: Response) => {
  res.json({
    revenue: 250000,
    expenses: 120000,
    profit: 130000,
    efficiencyScore: 85,
    lastUpdated: new Date().toISOString()
  });
});

router.get('/yield-history', (req: Request, res: Response) => {
  res.json([
    { season: '2021', yield: 120 },
    { season: '2022', yield: 135 },
    { season: '2023', yield: 150 },
    { season: '2024', yield: 145 },
    { season: '2025', yield: 160 }
  ]);
});

router.get('/revenue-breakdown', (req: Request, res: Response) => {
  res.json([
    { crop: 'Wheat', revenue: 100000, percentage: 40 },
    { crop: 'Soybean', revenue: 80000, percentage: 32 },
    { crop: 'Cotton', revenue: 70000, percentage: 28 }
  ]);
});

router.get('/soil-health', (req: Request, res: Response) => {
  res.json({
    nitrogen: { value: 'Medium', score: 60 },
    phosphorus: { value: 'High', score: 80 },
    potassium: { value: 'Low', score: 30 },
    pH: 6.8,
    organicCarbon: '0.6%'
  });
});

router.get('/ai-summary', (req: Request, res: Response) => {
  res.json({
    summary: "Your farm has shown a 12% increase in efficiency compared to last month. Revenue is on track, but soil potassium levels require attention before the next planting season."
  });
});

export default router;
