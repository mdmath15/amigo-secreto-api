import { PrismaClient, Prisma } from '@prisma/client';
import * as groups from './groups';

const prisma = new PrismaClient();

type GetPeopleParams = {
  event_id: number;
  group_id?: number;
};

export const getAll = async (params: GetPeopleParams) => {
  try {
    return await prisma.eventPeople.findMany({
      where: params,
    });
  } catch (error) {
    return false;
  }
};

type GetOnePersonParams = {
  event_id: number;
  group_id?: number;
  id?: number;
  cpf?: string;
};

export const getOne = async (params: GetOnePersonParams) => {
  try {
    if (!params.id && !params.cpf) {
      return false;
    }

    return await prisma.eventPeople.findFirst({
      where: params,
    });
  } catch (error) {
    return false;
  }
};

type PeopleCreateData = Prisma.Args<
  typeof prisma.eventPeople,
  'create'
>['data'];

export const create = async (data: PeopleCreateData) => {
  try {
    if (!data.group_id) {
      return false;
    }

    const group = await groups.getOne({
      id: data.group_id,
      event_id: data.event_id,
    });

    if (!group) {
      return false;
    }

    return await prisma.eventPeople.create({
      data: data,
    });
  } catch (error) {
    return false;
  }
};
