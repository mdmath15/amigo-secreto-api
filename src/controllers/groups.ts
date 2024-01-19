import { RequestHandler } from 'express';
import { z } from 'zod';
import * as groups from '../services/groups';

export const getAll: RequestHandler = async (req, res) => {
  const { event_id } = req.params;

  const data = await groups.getAll(event_id);

  if (data) {
    return res.json({ groups: data });
  }

  res.json({
    error: 'Ocorreu um erro.',
  });
};

export const getOne: RequestHandler = async (req, res) => {
  const { event_id, id } = req.params;

  const data = await groups.getOne({
    id: parseInt(id),
    event_id: parseInt(event_id),
  });

  if (data) {
    return res.json({ group: data });
  }

  res.json({
    error: 'Ocorreu um erro.',
  });
};

export const create: RequestHandler = async (req, res) => {
  const { event_id } = req.params;

  const createGroupSchema = z.object({
    name: z.string(),
  });

  const body = createGroupSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ error: 'Dados inválidos.' });
  }

  const newEventGroup = await groups.create({
    name: body.data.name,
    event_id: parseInt(event_id),
  });

  if (newEventGroup) {
    return res.status(201).json({ group: newEventGroup });
  }

  res.json({ error: 'Ocorreu um erro.' });
};
