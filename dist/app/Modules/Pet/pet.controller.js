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
const pet_service_1 = __importDefault(require("./pet.service"));
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const client_1 = require("@prisma/client");
const pick_1 = __importDefault(require("../../../shared/pick"));
const validateAdoptionStatus = (status) => {
    if (Object.values(client_1.AdoptionStatus).includes(status)) {
        return status;
    }
    return undefined;
};
const addPet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield pet_service_1.default.addPet(user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Pet added successfully',
        data: result,
    });
});
const updatePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const updatedPet = yield pet_service_1.default.updatePet(id, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Pet updated successfully',
        data: updatedPet,
    });
});
const deletePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId } = req.params;
    yield pet_service_1.default.deletePet(petId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.NO_CONTENT,
        success: true,
        message: 'Pet deleted successfully',
        data: undefined,
    });
});
const getPetDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const petId = req.params.petId;
    const pet = yield pet_service_1.default.getPetDetails(petId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Pet details found!',
        data: pet,
    });
});
const getPetsFromDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['petType', 'gender', 'size', 'searchTerm']);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield pet_service_1.default.getPetsFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Pets data retrived Successfully!',
        data: result,
    });
});
const createAdoptionRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield pet_service_1.default.createAdoptionRequest(user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Adoption created!',
        data: result,
    });
});
const getAdoptedPets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // console.log(user);
    // const status = validateAdoptionStatus(req.query.status);
    const result = yield pet_service_1.default.getAdoptedPets(user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Adoptions Retrived !',
        data: result,
    });
});
const PetController = {
    addPet,
    updatePet,
    deletePet,
    getPetDetails,
    createAdoptionRequest,
    getAdoptedPets,
    getPetsFromDB,
};
exports.default = PetController;
