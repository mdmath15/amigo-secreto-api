import { Router } from 'express';

const router = Router();

router.get('/ping', (req, res) => res.json({ pong: true }));

export const siteRoutes = router;
