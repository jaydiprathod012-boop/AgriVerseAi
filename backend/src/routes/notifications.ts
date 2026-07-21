import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const notifications = Array.from({length: 20}).map((_, i) => ({
    id: `notif-${i}`,
    title: `Notification ${i+1}`,
    message: i % 3 === 0 ? 'Weather alert: Heavy rain expected.' : 'New market price update.',
    type: i % 3 === 0 ? 'alert' : 'info',
    read: i > 5,
    createdAt: new Date(Date.now() - i * 3600000).toISOString()
  }));
  res.json(notifications);
});

router.put('/:id/read', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Notification marked as read' });
});

router.put('/read-all', (req: Request, res: Response) => {
  res.json({ success: true, message: 'All notifications marked as read' });
});

router.delete('/:id', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Notification deleted' });
});

router.post('/settings', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Notification settings saved' });
});

export default router;
