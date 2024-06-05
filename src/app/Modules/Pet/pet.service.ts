import { AdoptionStatus, Pet, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelper } from '../../../helpars/paginateHelpars';
import { TPaginationOptions } from '../../interfaces/pagination';
import { petSearchAbleFields } from './pet.constant';
import { IAuthUser } from '../../interfaces/common';
const prisma = new PrismaClient();

const addPet = async (userData: IAuthUser, payload: any) => {
  // console.log(payload , userData)
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.id,
    },
  });

  const payloadData = { userId: userInfo.id, ...payload };

  // console.log(payloadData);

  return await prisma.pet.create({
    data: payloadData,
  });
};

const updatePet = async (petId: string, data: any) => {
  return await prisma.pet.update({
    where: { id: petId },
    data,
  });
};

const deletePet = async (petId: string) => {
  return await prisma.pet.delete({
    where: { id: petId },
  });
};

const getPetDetails = async (petId: string) => {
  return await prisma.pet.findUnique({
    where: { id: petId },
  });
};

//complect
const createAdoptionRequest = async (userData: IAuthUser, payload: any) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.id,
    },
  });
  const userId = userInfo?.id;

  const modifiedPayload = { userId, ...payload };
  // console.log(modifiedPayload);

  return await prisma.adoption.create({
    data: modifiedPayload,
  });
};

const getAdoptedPets = async (user: IAuthUser) => {
  // console.log(user);
  return await prisma.adoption.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      pet: true, // Include user information in the response
    },
  });
};

const getPetsFromDB = async (params: any, options: TPaginationOptions) => {
  const { searchTerm, ...filterData } = params;
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const andConditon: Prisma.PetWhereInput[] = [];

  if (Object.keys(filterData).length > 0) {
    andConditon.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  if (params.searchTerm) {
    andConditon.push({
      OR: petSearchAbleFields.map((value) => ({
        [value]: {
          contains: params.searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  //   console.dir(andConditon, { depth: 'infinity' });

  const whereConditions: Prisma.PetWhereInput =
    andConditon.length > 0
      ? {
          AND: andConditon,
        }
      : {};

  // console.log(options);

  const result = await prisma.pet.findMany({
    where: whereConditions,
    skip: skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: 'desc' },
    // select: {
    //   id: true,
    //   name: true,
    //   description: true,
    //   age: true,
    //   breed: true,
    //   createdAt: true,
    //   updatedAt: true,
    // },
  });

  const total = await prisma.pet.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const PetService = {
  addPet,
  updatePet,
  deletePet,
  getPetDetails,
  createAdoptionRequest,
  getAdoptedPets,
  getPetsFromDB,
};

export default PetService;
