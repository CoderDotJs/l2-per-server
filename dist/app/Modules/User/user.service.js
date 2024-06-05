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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const paginateHelpars_1 = require("../../../helpars/paginateHelpars");
const user_constant_1 = require("./user.constant");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!((payload === null || payload === void 0 ? void 0 : payload.password) === payload.confirmPassword)) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Password Do not Match');
    }
    const hashPassword = bcrypt_1.default.hashSync(payload.password, 12);
    const role = client_1.userRole.USER;
    const userData = {
        userName: payload.userName,
        email: payload.email,
        password: hashPassword,
        role,
    };
    const result = yield prisma_1.default.user.create({
        data: userData,
    });
    const { password } = result, returnData = __rest(result, ["password"]);
    return returnData;
});
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = bcrypt_1.default.hashSync(payload.password, 12);
    const role = client_1.userRole.ADMIN;
    const userData = {
        userName: payload.userName,
        email: payload.email,
        password: hashPassword,
        role,
    };
    const result = yield prisma_1.default.user.create({
        data: userData,
    });
    const { password } = result, returnData = __rest(result, ["password"]);
    return returnData;
});
const getAllDataFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const { page, limit, skip } = paginateHelpars_1.paginationHelper.calculatePagination(options);
    const andConditon = [];
    if (Object.keys(filterData).length > 0) {
        andConditon.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    if (params.searchTerm) {
        andConditon.push({
            OR: user_constant_1.userSearchAbleFields.map((value) => ({
                [value]: {
                    contains: params.searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    //   console.dir(andConditon, { depth: 'infinity' });
    const whereConditions = andConditon.length > 0
        ? {
            AND: andConditon,
        }
        : {};
    // console.log(options);
    const result = yield prisma_1.default.user.findMany({
        where: whereConditions,
        skip: skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : { createdAt: 'desc' },
        select: {
            id: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        }, // sorting dependend on time
    });
    const total = yield prisma_1.default.user.count({
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
});
const changeProfileStatus = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const updateUserStatus = yield prisma_1.default.user.update({
        where: {
            id,
        },
        select: {
            id: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
        data,
    });
    return updateUserStatus;
});
const getMe = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
    });
    const userInfo = yield prisma_1.default.user.findUnique({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
    });
    return Object.assign({}, userInfo);
});
const updateProfile = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
    });
    const profileInfo = yield prisma_1.default.user.update({
        where: {
            id: userInfo.id,
        },
        data: payload,
    });
    return Object.assign({}, profileInfo);
});
const changePassword = (userId, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = bcrypt_1.default.hashSync(newPassword, 12);
    return yield prisma_1.default.user.update({
        where: { id: userId },
        data: { password: hashPassword },
    });
});
exports.UserServices = {
    createUser,
    createAdmin,
    getAllDataFromDB,
    changeProfileStatus,
    getMe,
    updateProfile,
    changePassword,
};
