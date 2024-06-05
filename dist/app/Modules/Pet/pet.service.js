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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const paginateHelpars_1 = require("../../../helpars/paginateHelpars");
const pet_constant_1 = require("./pet.constant");
const prisma = new client_1.PrismaClient();
const addPet = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload , userData)
    const userInfo = yield prisma.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.id,
        },
    });
    const payloadData = Object.assign({ userId: userInfo.id }, payload);
    // console.log(payloadData);
    return yield prisma.pet.create({
        data: payloadData,
    });
});
const updatePet = (petId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.pet.update({
        where: { id: petId },
        data,
    });
});
const deletePet = (petId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.pet.delete({
        where: { id: petId },
    });
});
const getPetDetails = (petId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.pet.findUnique({
        where: { id: petId },
    });
});
//complect
const createAdoptionRequest = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.id,
        },
    });
    const userId = userInfo === null || userInfo === void 0 ? void 0 : userInfo.id;
    const modifiedPayload = Object.assign({ userId }, payload);
    // console.log(modifiedPayload);
    return yield prisma.adoption.create({
        data: modifiedPayload,
    });
});
const getAdoptedPets = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(user);
    return yield prisma.adoption.findMany({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.id,
        },
        include: {
            pet: true, // Include user information in the response
        },
    });
});
const getPetsFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
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
            OR: pet_constant_1.petSearchAbleFields.map((value) => ({
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
    const result = yield prisma.pet.findMany({
        where: whereConditions,
        skip: skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
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
    const total = yield prisma.pet.count({
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
const PetService = {
    addPet,
    updatePet,
    deletePet,
    getPetDetails,
    createAdoptionRequest,
    getAdoptedPets,
    getPetsFromDB,
};
exports.default = PetService;
