import { PrismaClient, Prisma } from '@prisma/client';
import * as events from './events';

const prisma = new PrismaClient();
export const getAll = async (event_id: string) => {
  try {
    return await prisma.eventGroup.findMany({
      where: {
        event_id: parseInt(event_id),
      },
    });
  } catch (error) {
    return false;
  }
};

type GetOneGroupParams = {
  id: number;
  event_id?: number;
};
export const getOne = async (params: GetOneGroupParams) => {
  try {
    return await prisma.eventGroup.findFirst({
      where: params,
    });
  } catch (error) {
    return false;
  }
};

type GroupCreateData = Prisma.Args<typeof prisma.eventGroup, 'create'>['data'];

export const create = async (data: GroupCreateData) => {
  try {
    if (!data.event_id) return false;

    const eventItem = await events.getOne(data.event_id);

    if (!eventItem) return false;

    return await prisma.eventGroup.create({
      data,
    });
  } catch (error) {
    return false;
  }
};
