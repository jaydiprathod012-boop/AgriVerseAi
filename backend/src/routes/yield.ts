import { Router, Request, Response } from 'express';

const router = Router();

router.post('/predict', (req: Request, res: Response) => {
  res.json({
    predictedYield: 4.5,
    unit: 'tons/acre',
    confidence: 88.5,
    range: { min: 4.0, max: 5.2 },
    estimatedRevenue: 125000,
    comparisonToAverage: '+12%',
    factors: ['Favorable rainfall', 'Good soil nitrogen levels', 'Historical trend']
  });
});

router.get('/history', (req: Request, res: Response) => {
  res.json([
    { season: '2023 Kharif', yield: 4.2, crop: 'Soybean' },
    { season: '2022 Rabi', yield: 3.8, crop: 'Wheat' },
    { season: '2022 Kharif', yield: 4.0, crop: 'Soybean' },
    { season: '2021 Rabi', yield: 3.5, crop: 'Wheat' },
    { season: '2021 Kharif', yield: 3.9, crop: 'Soybean' }
  ]);
});

router.get('/crops', (req: Request, res: Response) => {
  res.json([
    { name: 'Wheat', typicalYieldRange: { min: 2, max: 4, unit: 'tons/acre' } },
    { name: 'Rice', typicalYieldRange: { min: 3, max: 5, unit: 'tons/acre' } },
    { name: 'Cotton', typicalYieldRange: { min: 0.5, max: 1.5, unit: 'tons/acre' } },
    { name: 'Sugarcane', typicalYieldRange: { min: 30, max: 45, unit: 'tons/acre' } }
  ]);
});

export default router;
