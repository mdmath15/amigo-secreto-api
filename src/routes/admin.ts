import { Router } from 'express';
import * as auth from '../controllers/auth';
import * as events from '../controllers/events';
import * as groups from '../controllers/groups';
import * as people from '../controllers/people';

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
router.put('/events/:event_id/groups/:id', auth.validate, groups.update);
router.delete('/events/:event_id/groups/:id', auth.validate, groups.remove);

router.get(
  '/events/:event_id/groups/:group_id/people',
  auth.validate,
  people.getAll
);
router.get(
  '/events/:event_id/groups/:group_id/people/:id',
  auth.validate,
  people.getOne
);
router.post(
  '/events/:event_id/groups/:group_id/people',
  auth.validate,
  people.create
);

router.put(
  '/events/:event_id/groups/:group_id/people/:id',
  auth.validate,
  people.update
);

router.delete(
  '/events/:event_id/groups/:group_id/people/:id',
  auth.validate,
  people.remove
);

export const adminRoutes = router;
