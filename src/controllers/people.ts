import { RequestHandler } from 'express';
import { z } from 'zod';
import { validateCPF } from '../utils/validate-cpf';
import * as people from '../services/people';

export const getAll: RequestHandler = async (req, res) => {
  const { event_id, group_id } = req.params;

  const data = await people.getAll({
    event_id: parseInt(event_id),
    group_id: parseInt(group_id),
  });

  if (data) {
    return res.json({ people: data });
  }

  res.json({
    error: 'Ocorreu um erro.',
  });
};

export const getOne: RequestHandler = async (req, res) => {
  const { event_id, group_id, id } = req.params;

  const data = await people.getOne({
    event_id: parseInt(event_id),
    group_id: parseInt(group_id),
    id: parseInt(id),
  });

  if (data) {
    return res.json({ person: data });
  }

  res.json({
    error: 'Ocorreu um erro.',
  });
};

export const create: RequestHandler = async (req, res) => {
  const { event_id, group_id } = req.params;

  const createPersonSchema = z.object({
    name: z.string(),
    cpf: z
      .string()
      .refine(validateCPF)
      .transform((cpf) => cpf.replace(/\D/g, '')),
  });

  const body = createPersonSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ error: 'Dados inválidos.' });
  }

  const data = await people.create({
    event_id: parseInt(event_id),
    group_id: parseInt(group_id),
    name: body.data.name,
    cpf: body.data.cpf,
  });

  if (data) {
    return res.status(201).json({ person: data });
  }

  res.json({
    error: 'Ocorreu um erro.',
  });
};
