import { RequestHandler } from 'express';
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

export const create: RequestHandler = async (req, res) => {};
