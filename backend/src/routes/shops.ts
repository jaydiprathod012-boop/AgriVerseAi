import { Router, Request, Response } from 'express';

const router = Router();

router.get('/nearby', (req: Request, res: Response) => {
  const { lat, lon, radius, category } = req.query;
  
  // Mock 8 shops near Pune
  const shops = Array.from({length: 8}).map((_, i) => ({
    id: `shop-${i+1}`,
    name: `Agri Shop ${i+1}`,
    distance: (Math.random() * 10).toFixed(1) + ' km',
    category: i % 2 === 0 ? 'Fertilizers' : 'Equipment',
    rating: (3 + Math.random() * 2).toFixed(1),
    isOpen: true,
    address: `Street ${i+1}, Pune Agri Market`
  }));
  
  res.json(shops);
});

router.get('/:id', (req: Request, res: Response) => {
  res.json({
    id: req.params.id,
    name: 'Sample Agri Shop',
    address: '123 Market Road, Pune',
    contact: '+91-9876543210',
    categories: ['Seeds', 'Fertilizers', 'Pesticides'],
    rating: 4.5,
    reviews: 128,
    timings: '09:00 AM - 07:00 PM',
    inventory: ['Urea 50kg', 'Tractor Rental', 'Hybrid Seeds']
  });
});

export default router;
