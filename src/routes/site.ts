import { Router } from 'express';
import * as events from '../controllers/events';
import * as people from '../controllers/people';

const router = Router();

router.get('/ping', (req, res) => res.json({ pong: true }));

router.get('/events/:id', events.getOne);
router.get('/events/:event_id/search', people.searchPerson);

export const siteRoutes = router;
