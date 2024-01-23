import { PrismaClient, Prisma } from '@prisma/client';
import * as people from './people';
import { encryptMatch } from '../utils/match';

const prisma = new PrismaClient();

export const getAll = async () => {
  try {
    return await prisma.event.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  } catch (error) {
    return false;
  }
};

export const getOne = async (id: number) => {
  try {
    return await prisma.event.findFirst({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return false;
  }
};

type EventCreateData = Prisma.Args<typeof prisma.event, 'create'>['data'];

export const create = async (data: EventCreateData) => {
  try {
    return await prisma.event.create({
      data,
    });
  } catch (error) {
    return false;
  }
};

type EventUpdateData = Prisma.Args<typeof prisma.event, 'update'>['data'];

export const update = async (id: number, data: EventUpdateData) => {
  try {
    return await prisma.event.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    return false;
  }
};

export const remove = async (id: number) => {
  try {
    return await prisma.event.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return false;
  }
};

// Função assíncrona para definir correspondências
export const setMatches = async (id: number) => {
  // Busca o primeiro evento com o id fornecido
  const eventItem = await prisma.event.findFirst({
    where: { id },
    select: {
      grouped: true,
    },
  });

  // Se o evento existir
  if (eventItem) {
    // Busca todas as pessoas associadas a esse evento
    const peopleList = await people.getAll({ event_id: id });

    // Se houver pessoas associadas a esse evento
    if (peopleList) {
      // Inicializa a lista de correspondências
      let sortedList: { id: number; match: number }[] = [];
      let sortable: number[];

      // Inicializa as variáveis de controle para o loop
      let attempts = 0;
      let maxAttempts = peopleList.length;
      let keepTrying = true;

      // Enquanto ainda houver tentativas e a condição de parada não for atingida
      while (keepTrying && attempts < maxAttempts) {
        // Reinicia as variáveis para a próxima tentativa
        keepTrying = false;
        attempts++;
        sortedList = [];
        sortable = peopleList.map((person) => person.id);

        // Para cada pessoa na lista
        for (let i in peopleList) {
          // Inicializa a lista de pessoas que podem ser correspondidas
          let sortableFiltered: number[] = sortable;

          // Se o evento for agrupado, filtra as pessoas que não estão no mesmo grupo
          if (eventItem.grouped) {
            sortableFiltered = sortable.filter((sortableItem) => {
              let sortablePerson = peopleList.find(
                (person) => person.id === sortableItem
              );
              return peopleList[i].group_id !== sortablePerson?.group_id;
            });
          }

          // Se não houver pessoas para corresponder ou a única pessoa for a própria pessoa
          if (
            sortableFiltered.length === 0 ||
            (sortableFiltered.length === 1 &&
              peopleList[i].id === sortableFiltered[0])
          ) {
            // Define a condição de parada para tentar novamente
            keepTrying = true;
          } else {
            // Escolhe uma pessoa aleatória para corresponder
            let sortedIndex = Math.floor(
              Math.random() * sortableFiltered.length
            );

            // Se a pessoa escolhida for a própria pessoa, escolhe novamente
            while (sortableFiltered[sortedIndex] === peopleList[i].id) {
              sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
            }

            // Adiciona a correspondência à lista
            sortedList.push({
              id: peopleList[i].id,
              match: sortableFiltered[sortedIndex],
            });

            // Remove a pessoa escolhida da lista de pessoas que podem ser correspondidas
            sortable = sortable.filter(
              (item) => item !== sortableFiltered[sortedIndex]
            );
          }
        }
      }

      // Se todas as correspondências foram feitas
      if (attempts < maxAttempts) {
        // Para cada correspondência na lista
        for (let i in sortedList) {
          // Atualiza a pessoa com a correspondência
          await people.update(
            {
              id: sortedList[i].id,
              event_id: id,
            },
            { matched: encryptMatch(sortedList[i].match) }
          );
        }

        // Retorna verdadeiro para indicar que as correspondências foram feitas
        return true;
      }
    }
  }

  // Retorna falso para indicar que as correspondências não foram feitas
  return false;
};
