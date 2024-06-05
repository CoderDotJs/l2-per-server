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
exports.PropertyServices = void 0;
const fileUploader_1 = require("../../../shared/fileUploader");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginateHelpars_1 = require("../../../helpars/paginateHelpars");
const createLostProperty = (req, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const userId = userData.id;
    const file = req.file;
    if (file) {
        const cloudinaryUploadData = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
        req.body.uploadImage = cloudinaryUploadData === null || cloudinaryUploadData === void 0 ? void 0 : cloudinaryUploadData.secure_url;
    }
    const payloadData = Object.assign(Object.assign({}, req.body), { userId });
    const result = yield prisma_1.default.lostItem.create({
        data: payloadData,
    });
    return result;
});
const createFoundProperty = (req, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const userId = userData.id;
    const file = req.file;
    if (file) {
        const cloudinaryUploadData = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
        req.body.uploadImage = cloudinaryUploadData === null || cloudinaryUploadData === void 0 ? void 0 : cloudinaryUploadData.secure_url;
    }
    const payloadData = Object.assign(Object.assign({}, req.body), { userId });
    const result = yield prisma_1.default.foundItem.create({
        data: payloadData,
    });
    return result;
});
const claimProperty = (req, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const userId = userData.id;
    const file = req.file;
    if (file) {
        const cloudinaryUploadData = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
        req.body.uploadImage = cloudinaryUploadData === null || cloudinaryUploadData === void 0 ? void 0 : cloudinaryUploadData.secure_url;
    }
    const payloadData = Object.assign(Object.assign({}, req.body), { userId });
    const result = yield prisma_1.default.claim.create({
        data: payloadData,
    });
    return result;
});
const myClaimItem = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const getMyClaim = yield prisma_1.default.claim.findMany({
        where: {
            userId: userData.id,
        },
    });
    return getMyClaim;
});
const myLostItem = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const getMyLostItem = yield prisma_1.default.lostItem.findMany({
        where: {
            userId: userData.id,
        },
    });
    return getMyLostItem;
});
const myFoundItem = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const getMyFoundItem = yield prisma_1.default.foundItem.findMany({
        where: {
            userId: userData.id,
        },
    });
    return getMyFoundItem;
});
const getAllLostItems = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
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
            OR: ['description', 'title', 'location', 'email', 'contactNumber'].map((value) => ({
                [value]: {
                    contains: params.searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditon.length > 0
        ? {
            AND: andConditon,
        }
        : {};
    console.dir(whereConditions, { depth: 'infinity' });
    const result = yield prisma_1.default.lostItem.findMany({
        where: whereConditions,
        skip: skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.lostItem.count({
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
const getAllFoundItems = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
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
            OR: ['description', 'title', 'location', 'email', 'contactNumber'].map((value) => ({
                [value]: {
                    contains: params.searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditon.length > 0
        ? {
            AND: andConditon,
        }
        : {};
    console.dir(whereConditions, { depth: 'infinity' });
    const result = yield prisma_1.default.foundItem.findMany({
        where: whereConditions,
        skip: skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.foundItem.count({
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
exports.PropertyServices = {
    createLostProperty,
    createFoundProperty,
    claimProperty,
    myClaimItem,
    myLostItem,
    myFoundItem,
    getAllLostItems,
    getAllFoundItems,
};
