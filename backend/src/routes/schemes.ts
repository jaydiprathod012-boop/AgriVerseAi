import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const schemes = Array.from({length: 12}).map((_, i) => ({
    id: `scheme-${i+1}`,
    name: `PM Kisan Samman Nidhi ${i+1}`,
    description: 'Financial support for landholding farmers.',
    category: 'Financial',
    state: i % 2 === 0 ? 'All India' : 'Maharashtra',
    subsidyAmount: '₹6000/year'
  }));
  res.json(schemes);
});

router.get('/:id', (req: Request, res: Response) => {
  res.json({
    id: req.params.id,
    name: 'PM Kisan Samman Nidhi',
    description: 'Central Sector scheme with 100% funding from Government of India.',
    eligibility: ['Must be a farmer', 'Must own cultivable land', 'Valid Bank Account'],
    benefits: ['Income support of Rs.6000/- per year in three equal installments'],
    documentsRequired: ['Aadhaar Card', 'Land holding papers', 'Bank Passbook'],
    applicationLink: 'https://pmkisan.gov.in/'
  });
});

router.post('/eligibility', (req: Request, res: Response) => {
  res.json({
    eligible: true,
    matchingSchemes: ['scheme-1', 'scheme-4', 'scheme-7'],
    reason: 'Based on land size and income, you qualify for marginal farmer schemes.'
  });
});

router.get('/categories', (req: Request, res: Response) => {
  res.json([
    'Financial Assistance', 'Crop Insurance', 'Irrigation', 'Equipment Subsidy',
    'Organic Farming', 'Skill Development'
  ]);
});

export default router;
