import { Request, Response } from 'express';
import PetService from './pet.service';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { AdoptionStatus } from '@prisma/client';
import { IAuthUser } from '../../interfaces/common';
import pick from '../../../shared/pick';

const validateAdoptionStatus = (status: any): AdoptionStatus | undefined => {
  if (Object.values(AdoptionStatus).includes(status)) {
    return status as AdoptionStatus;
  }
  return undefined;
};

const addPet = async (req: Request & { user?: IAuthUser }, res: Response) => {
  const user = req.user;
  const result = await PetService.addPet(user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Pet added successfully',
    data: result,
  });
};

const updatePet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const updatedPet = await PetService.updatePet(id, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pet updated successfully',
    data: updatedPet,
  });
};

const deletePet = async (req: Request, res: Response) => {
  const { petId } = req.params;
  await PetService.deletePet(petId);
  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Pet deleted successfully',
    data: undefined,
  });
};

const getPetDetails = async (req: Request, res: Response) => {
  const petId = req.params.petId;
  const pet = await PetService.getPetDetails(petId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pet details found!',
    data: pet,
  });
};

const getPetsFromDB = async (
  req: Request & { user?: IAuthUser },
  res: Response
) => {
  const filters = pick(req.query, ['petType', 'gender', 'size', 'searchTerm']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await PetService.getPetsFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pets data retrived Successfully!',
    data: result,
  });
};

const createAdoptionRequest = async (
  req: Request & { user?: IAuthUser },
  res: Response
) => {
  const user = req.user;

  const result = await PetService.createAdoptionRequest(user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Adoption created!',
    data: result,
  });
};

const getAdoptedPets = async (
  req: Request & { user?: IAuthUser },
  res: Response
) => {
  const user = req.user;
  // console.log(user);
  // const status = validateAdoptionStatus(req.query.status);
  const result = await PetService.getAdoptedPets(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Adoptions Retrived !',
    data: result,
  });
};

const PetController = {
  addPet,
  updatePet,
  deletePet,
  getPetDetails,
  createAdoptionRequest,
  getAdoptedPets,
  getPetsFromDB,
};

export default PetController;
