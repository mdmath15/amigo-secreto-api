import { RequestHandler } from 'express';
import { z } from 'zod';
import * as events from '../services/events';
import * as people from '../services/people';

export const getAll: RequestHandler = async (req, res) => {
  const data = await events.getAll();

  if (data) {
    return res.json({ events: data });
  }

  res.json({
    error: 'Ocorreu um erro.',
  });
};

export const getOne: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const data = await events.getOne(parseInt(id));

  if (data) {
    return res.json({ event: data });
  }

  res.json({
    error: 'Ocorreu um erro.',
  });
};

export const create: RequestHandler = async (req, res) => {
  const createEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    grouped: z.boolean(),
  });

  const body = createEventSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ error: 'Dados inválidos.' });
  }

  const newEvent = await events.create(body.data);

  if (newEvent) {
    return res.status(201).json({ event: newEvent });
  }

  res.json({ error: 'Ocorreu um erro.' });
};

export const update: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const updateEventSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    grouped: z.boolean().optional(),
    status: z.boolean().optional(),
  });

  const body = updateEventSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ error: 'Dados inválidos.' });
  }

  const updatedEvent = await events.update(parseInt(id), body.data);

  if (updatedEvent) {
    if (updatedEvent.status) {
      const result = await events.setMatches(parseInt(id));

      if (!result) {
        return res.json({ error: 'Grupos impossíveis de sortear.' });
      }
    } else {
      await people.update({ event_id: parseInt(id) }, { matched: '' });
    }

    return res.json({ event: updatedEvent });
  }

  res.json({ error: 'Ocorreu um erro.' });
};

export const remove: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const removedEvent = await events.remove(parseInt(id));

  if (removedEvent) {
    return res.json({ event: removedEvent });
  }

  res.json({ error: 'Ocorreu um erro.' });
};
