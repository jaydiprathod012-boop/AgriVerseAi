import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

interface StoredUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  village: string;
  district: string;
  state: string;
  landArea: number;
  cropType: string;
  createdAt: string;
}

// In-memory store
const usersById = new Map<string, StoredUser>();
const usersByEmail = new Map<string, StoredUser>();
const usersByMobile = new Map<string, StoredUser>();

const JWT_SECRET = process.env.JWT_SECRET || 'agriverse_secret_2026';

const seedDemo = async () => {
  const hashed = await bcrypt.hash('demo1234', 10);
  const demo: StoredUser = {
    id: 'demo-001', name: 'Rajesh Kumar', email: 'rajesh@example.com',
    mobile: '9876543210', password: hashed, village: 'Baramati',
    district: 'Pune', state: 'Maharashtra', landArea: 12.5,
    cropType: 'Wheat', createdAt: new Date().toISOString()
  };
  usersById.set(demo.id, demo);
  usersByEmail.set(demo.email, demo);
  usersByMobile.set(demo.mobile, demo);
};
seedDemo();

const sanitize = ({ password, ...rest }: StoredUser) => rest;
const genToken = (id: string) => jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '7d' });

const authenticate = (req: Request, res: Response, next: any) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET) as { userId: string };
    (req as any).userId = decoded.userId;
    next();
  } catch { return res.status(401).json({ error: 'Invalid token' }); }
};

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  const { name, email, mobile, password, village, district, state, landArea, cropType } = req.body;
  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ error: 'Name, email, mobile and password are required' });
  }
  if (usersByEmail.has(email.toLowerCase())) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  if (usersByMobile.has(mobile)) {
    return res.status(400).json({ error: 'Mobile number already registered' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user: StoredUser = {
    id: uuidv4(), name, email: email.toLowerCase(), mobile, password: hashed,
    village: village || '', district: district || '', state: state || '',
    landArea: Number(landArea) || 0, cropType: cropType || 'Wheat',
    createdAt: new Date().toISOString()
  };
  usersById.set(user.id, user);
  usersByEmail.set(user.email, user);
  usersByMobile.set(user.mobile, user);
  return res.status(201).json({ success: true, token: genToken(user.id), user: sanitize(user) });
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) return res.status(400).json({ error: 'Identifier and password required' });
  const user = usersByEmail.get(identifier.toLowerCase()) || usersByMobile.get(identifier);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid password' });
  return res.json({ success: true, token: genToken(user.id), user: sanitize(user) });
});

// GET /api/auth/profile
router.get('/profile', authenticate, (req: Request, res: Response) => {
  const user = usersById.get((req as any).userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json(sanitize(user));
});

// GET /api/auth/verify
router.get('/verify', authenticate, (req: Request, res: Response) => {
  const user = usersById.get((req as any).userId);
  return res.json({ valid: true, user: user ? sanitize(user) : null });
});

export default router;
