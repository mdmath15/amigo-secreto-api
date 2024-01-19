import { RequestHandler } from 'express';
import * as events from '../services/events';

export const getAll: RequestHandler = async (req, res) => {
  const data = await events.getAll();

  if (data) {
    return res.json({ events: data });
  }

  res.json({
    error: 'Ocorreu um erro.',
  });
};
