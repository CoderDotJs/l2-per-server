"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpars_1 = require("../../../helpars/jwtHelpars");
const config_1 = __importDefault(require("../../config"));
const emailSender_1 = __importDefault(require("./emailSender"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: client_1.userStatus.ACTIVE,
        },
    });
    const comparieData = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!comparieData) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Password Do not Match ');
    }
    const accessToken = jwtHelpars_1.JwtHelpares.generateToken({ email: userData.email, role: userData.role, id: userData.id }, config_1.default.jwt_secret, config_1.default.jwt_expire_in);
    const refreshToken = jwtHelpars_1.JwtHelpares.generateToken({ email: userData.email, role: userData.role, id: userData.id }, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expire_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpars_1.JwtHelpares.verifyToken(token, config_1.default.jwt_refresh_secret);
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You Are Not Authorized !');
    }
    const isUserExists = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: client_1.userStatus.ACTIVE,
        },
    });
    const accessToken = jwtHelpars_1.JwtHelpares.generateToken({
        email: isUserExists.email,
        role: isUserExists.role,
    }, config_1.default.jwt_secret, config_1.default.jwt_expire_in);
    return {
        accessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: client_1.userStatus.ACTIVE,
        },
    });
    //check old password
    const isCurrectPassword = yield bcrypt_1.default.compare(payload.oldPassword, userData.password);
    if (!isCurrectPassword) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'password Incurrect !');
    }
    //hashed Password
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, 12);
    yield prisma_1.default.user.update({
        where: {
            email: userData.email,
        },
        data: {
            password: hashedPassword,
        },
    });
    return {
        message: 'Password Changed Successfully !',
    };
});
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: client_1.userStatus.ACTIVE,
        },
    });
    const resetPassToken = jwtHelpars_1.JwtHelpares.generateToken({ email: userData.email, role: userData.role }, config_1.default.reset_pass_secret, config_1.default.reset_pass_expire_in);
    //Generate a Reset Link
    // http://localhost:3000/reset-password?email=jaman@gmail.com&token=sdfwesadfv
    const resetPasswordLink = config_1.default.reset_pass_link + `?email=${userData.email}&token=${resetPassToken}`;
    yield (0, emailSender_1.default)(userData.email, ` 
      <div>
          <p>Dear User ,</p> 
          <p> Your Password Reset Link 
           <a href=${resetPasswordLink} >
               <button>
                  Reset Password  
               </button>
           </a>
           </p>
      </div>
      `);
});
const resetPassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: client_1.userStatus.ACTIVE,
        },
    });
    const isValidToken = jwtHelpars_1.JwtHelpares.verifyToken(token, config_1.default.reset_pass_secret);
    if (!isValidToken) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Forbiden !');
    }
    //hash Password
    const hashedPassword = bcrypt_1.default.hashSync(payload.password, 12);
    //update password in database
    yield prisma_1.default.user.update({
        where: {
            email: payload.email,
        },
        data: {
            password: hashedPassword,
        },
    });
});
exports.AuthServices = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword,
};
