import { Router } from 'express';
import * as auth from '../controllers/auth';
import * as events from '../controllers/events';
import * as groups from '../controllers/groups';

const router = Router();

router.get('/ping', auth.validate, (req, res) =>
  res.json({ pong: true, admin: true })
);

router.post('/login', auth.login);

router.get('/events', auth.validate, events.getAll);
router.get('/events/:id', auth.validate, events.getOne);
router.post('/events', auth.validate, events.create);
router.put('/events/:id', auth.validate, events.update);
router.delete('/events/:id', auth.validate, events.remove);

router.get('/events/:event_id/groups', auth.validate, groups.getAll);
router.get('/events/:event_id/groups/:id', auth.validate, groups.getOne);
router.post('/events/:event_id/groups', auth.validate, groups.create);

export const adminRoutes = router;
