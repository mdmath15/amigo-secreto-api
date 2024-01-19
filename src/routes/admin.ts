import { Router } from 'express';
import * as auth from '../controllers/auth';
import * as events from '../controllers/events';

const router = Router();

router.get('/ping', auth.validate, (req, res) =>
  res.json({ pong: true, admin: true })
);

router.post('/login', auth.login);

router.get('/events', auth.validate, events.getAll);

export const adminRoutes = router;
