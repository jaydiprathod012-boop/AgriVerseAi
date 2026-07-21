import { Router, Request, Response } from 'express';

const router = Router();

const commoditiesList = [
  'Wheat', 'Rice', 'Maize', 'Soybean', 'Cotton', 
  'Sugarcane', 'Onion', 'Potato', 'Tomato', 'Turmeric',
  'Mustard', 'Gram', 'Groundnut', 'Jute', 'Tea'
];

router.get('/prices', (req: Request, res: Response) => {
  const prices = Array.from({length: 10}).map((_, i) => ({
    commodity: commoditiesList[i],
    mandi: `Mandi ${i + 1}`,
    price: 1500 + Math.floor(Math.random() * 1000),
    unit: 'per Quintal',
    date: new Date().toISOString(),
    trend: Math.random() > 0.5 ? 'up' : 'down'
  }));
  res.json(prices);
});

router.get('/predict/:commodity', (req: Request, res: Response) => {
  res.json({
    commodity: req.params.commodity,
    predictions: Array.from({length: 7}).map((_, i) => ({
      day: i + 1,
      expectedPrice: 2000 + Math.floor(Math.random() * 200),
      confidence: 70 + Math.random() * 20
    }))
  });
});

router.get('/commodities', (req: Request, res: Response) => {
  res.json(commoditiesList);
});

router.get('/history/:commodity', (req: Request, res: Response) => {
  res.json({
    commodity: req.params.commodity,
    history: Array.from({length: 30}).map((_, i) => ({
      date: new Date(Date.now() - (30 - i) * 86400000).toISOString().split('T')[0],
      price: 1800 + Math.floor(Math.random() * 400)
    }))
  });
});

export default router;
