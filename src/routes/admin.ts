import { Router } from 'express';
import * as auth from '../controllers/auth';

const router = Router();

router.get('/ping', auth.validate, (req, res) =>
  res.json({ pong: true, admin: true })
);
router.post('/login', auth.login);

export const adminRoutes = router;
