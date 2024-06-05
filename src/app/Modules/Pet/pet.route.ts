import { Router } from 'express'; // Middleware to check if user is authenticated
import auth from '../../middlewares/auth';
import PetController from './pet.controller';
import { userRole } from '@prisma/client';

const router = Router();

router.post(
  '/',
  auth(userRole.ADMIN, userRole.SUPPER_ADMIN, userRole.USER),
  PetController.addPet
);
router.get(
  '/',
  // auth(userRole.ADMIN, userRole.SUPPER_ADMIN, userRole.USER),
  PetController.getPetsFromDB
);
router.put(
  '/singlepet/:id',
  // auth(userRole.ADMIN, userRole.SUPPER_ADMIN),
  PetController.updatePet
);
router.delete(
  '/:petId',
  auth(userRole.ADMIN, userRole.SUPPER_ADMIN),
  PetController.deletePet
);

router.get(
  '/:petId',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPPER_ADMIN),
  PetController.getPetDetails
);

router.post(
  '/adoptions',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPPER_ADMIN),
  PetController.createAdoptionRequest
);

router.get(
  '/adoptions/pets',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPPER_ADMIN),
  PetController.getAdoptedPets
);

export const PetRoute = router;
