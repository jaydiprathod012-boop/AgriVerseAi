import { Router, Request, Response } from 'express';

const router = Router();

router.get('/equipment', (req: Request, res: Response) => {
  res.json([
    { id: 'eq-1', name: 'John Deere Tractor', pricePerDay: 1500, location: 'Pune', available: true },
    { id: 'eq-2', name: 'Rotavator', pricePerDay: 500, location: 'Baramati', available: true },
    { id: 'eq-3', name: 'Seed Drill', pricePerDay: 300, location: 'Nashik', available: false }
  ]);
});

router.post('/equipment', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Equipment listed successfully', id: 'eq-new' });
});

router.post('/equipment/:id/book', (req: Request, res: Response) => {
  res.json({
    bookingId: `bk-${Date.now()}`,
    equipmentId: req.params.id,
    status: 'Confirmed',
    message: 'Booking successful. Owner will contact you shortly.'
  });
});

router.get('/produce', (req: Request, res: Response) => {
  res.json([
    { id: 'p-1', name: 'Organic Wheat', quantity: 50, unit: 'Quintal', price: 2100, location: 'Satara' },
    { id: 'p-2', name: 'Fresh Tomatoes', quantity: 200, unit: 'Kg', price: 15, location: 'Pune' }
  ]);
});

router.post('/produce', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Produce listed successfully', id: 'p-new' });
});

router.get('/sellers', (req: Request, res: Response) => {
  res.json([
    { id: 's-1', name: 'Ramesh Patil', rating: 4.8, totalSales: 156 },
    { id: 's-2', name: 'Suresh Kumar', rating: 4.5, totalSales: 89 }
  ]);
});

export default router;
