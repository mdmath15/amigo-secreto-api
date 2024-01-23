import { Router } from 'express';
import * as events from '../controllers/events';

const router = Router();

router.get('/ping', (req, res) => res.json({ pong: true }));

router.get('/events/:id', events.getOne);

export const siteRoutes = router;
