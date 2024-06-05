import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import config from '../app/config';
import { ICloudinaryResponse, IFile } from '../app/interfaces/file';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() - Math.round(Math.random() * 1e9);
    const endPath = file.mimetype.replace('image/', '');
    cb(null, `${uniqueSuffix}.${endPath}`);
  },
});

const upload = multer({ storage: storage });

//Cloudinary setup
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_api_key,
  api_secret: config.cloud_api_secret,
});

const uploadToCloudinary = async (
  file: IFile
): Promise<ICloudinaryResponse> => {
  return new Promise((resolve, rejects) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        //uploads photo delete
        fs.unlinkSync(file.path);
        if (error) {
          rejects(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
