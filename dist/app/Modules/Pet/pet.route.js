"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetRoute = void 0;
const express_1 = require("express"); // Middleware to check if user is authenticated
const auth_1 = __importDefault(require("../../middlewares/auth"));
const pet_controller_1 = __importDefault(require("./pet.controller"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.SUPPER_ADMIN, client_1.userRole.USER), pet_controller_1.default.addPet);
router.get('/', 
// auth(userRole.ADMIN, userRole.SUPPER_ADMIN, userRole.USER),
pet_controller_1.default.getPetsFromDB);
router.put('/singlepet/:id', 
// auth(userRole.ADMIN, userRole.SUPPER_ADMIN),
pet_controller_1.default.updatePet);
router.delete('/:petId', (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.SUPPER_ADMIN), pet_controller_1.default.deletePet);
router.get('/:petId', (0, auth_1.default)(client_1.userRole.USER, client_1.userRole.ADMIN, client_1.userRole.SUPPER_ADMIN), pet_controller_1.default.getPetDetails);
router.post('/adoptions', (0, auth_1.default)(client_1.userRole.USER, client_1.userRole.ADMIN, client_1.userRole.SUPPER_ADMIN), pet_controller_1.default.createAdoptionRequest);
router.get('/adoptions/pets', (0, auth_1.default)(client_1.userRole.USER, client_1.userRole.ADMIN, client_1.userRole.SUPPER_ADMIN), pet_controller_1.default.getAdoptedPets);
exports.PetRoute = router;
