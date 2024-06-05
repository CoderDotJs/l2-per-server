import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validationRequest';
import { userValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { userRole } from '@prisma/client';
import { fileUploader } from '../../../shared/fileUploader';

const router = express.Router();


// get all users 
router.get(
  '/',
  auth(userRole.ADMIN, userRole.SUPPER_ADMIN),
  UserControllers.getAllDataFromDB
);

router.get(
  '/me',
  auth(
    userRole.ADMIN,
    userRole.USER,
    userRole.SUPPER_ADMIN
  ),
  UserControllers.getMe
);


router.post(
  '/create-user',
  validateRequest(userValidation.createUserSchemaValidation),
  UserControllers.createUser
);
router.post(
  '/create-admin',
  validateRequest(userValidation.createUserSchemaValidation),
  UserControllers.createAdmin
);



router.patch(
  '/update-my-profile',
  auth(
    userRole.ADMIN,
    userRole.SUPPER_ADMIN,
    userRole.USER,
  ),
  // fileUploader.upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data);
  //   next();
  // },
  UserControllers.updateProfile
);


router.patch(
  '/:id/status',
  auth(userRole.ADMIN, userRole.SUPPER_ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(userValidation.updateProfileValidation);
    next();
  },
  UserControllers.changeProfileStatus
);





export const userRouter = router;
