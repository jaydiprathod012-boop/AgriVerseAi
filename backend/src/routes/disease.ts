import { Router, Request, Response } from 'express';

const router = Router();

router.post('/analyze', (req: Request, res: Response) => {
  // Mock response
  res.json({
    disease: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    confidence: 94.3,
    severity: 'HIGH',
    affectedArea: 35,
    symptoms: ['Dark brown lesions on leaves', 'White mold on undersides', 'Rapid defoliation', 'Stem rot'],
    treatment: ['Apply Mancozeb 75% WP @ 2g/L', 'Spray Metalaxyl + Mancozeb every 7 days', 'Remove infected parts immediately'],
    prevention: ['Use certified disease-free seeds', 'Maintain proper plant spacing', 'Avoid overhead irrigation'],
    estimatedTreatmentCost: { min: 1200, max: 1800, unit: 'per acre' },
    nearbyShops: [{name: 'Kisan Seva Kendra', distance: 1.2}, {name: 'Sahyadri Agro', distance: 2.3}]
  });
});

router.get('/history', (req: Request, res: Response) => {
  res.json([
    { id: 1, disease: 'Late Blight', date: '2023-10-15', confidence: 94.3 },
    { id: 2, disease: 'Powdery Mildew', date: '2023-09-02', confidence: 88.1 },
    { id: 3, disease: 'Leaf Rust', date: '2023-08-20', confidence: 91.5 },
    { id: 4, disease: 'Healthy', date: '2023-08-01', confidence: 99.9 },
    { id: 5, disease: 'Aphids', date: '2023-07-15', confidence: 85.0 }
  ]);
});

router.get('/diseases', (req: Request, res: Response) => {
  const commonDiseases = [
    'Late Blight', 'Early Blight', 'Powdery Mildew', 'Downy Mildew', 'Leaf Rust',
    'Stem Rust', 'Fusarium Wilt', 'Verticillium Wilt', 'Bacterial Blight', 'Mosaic Virus',
    'Root Rot', 'Botrytis Blight', 'Anthracnose', 'Smut', 'Ergot'
  ];
  res.json(commonDiseases);
});

export default router;
