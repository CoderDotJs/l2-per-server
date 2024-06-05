import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserServices } from './user.service';
import pick from '../../../shared/pick';
import { userFilterableFields } from './user.constant';
import { Request, Response } from 'express';
import { IAuthUser } from '../../interfaces/common';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully ',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdmin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Created Successfully ',
    data: result,
  });
});

const getAllDataFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await UserServices.getAllDataFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Data Fetched Successfully ',
    data: result,
  });
});

const changeProfileStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const result = await UserServices.changeProfileStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile Changed Successfully ',
    data: result,
  });
});
const getMe = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await UserServices.getMe(user as IAuthUser);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'MyProfile Data Fetch Successfully ',
      data: result,
    });
  }
);

const updateProfile = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await UserServices.updateProfile(
      user as IAuthUser,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile updated Successfully ',
      data: result,
    });
  }
);

export const UserControllers = {
  createUser,
  createAdmin,
  getAllDataFromDB,
  changeProfileStatus,
  getMe,
  updateProfile,
};
