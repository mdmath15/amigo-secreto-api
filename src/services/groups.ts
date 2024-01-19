import { PrismaClient } from '@prisma/client';

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
