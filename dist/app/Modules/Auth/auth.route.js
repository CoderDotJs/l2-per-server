"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/login', auth_controller_1.AuthControllers.loginUser);
router.post('/refresh-token', auth_controller_1.AuthControllers.refreshTokenn);
router.post('/change-password', (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.SUPPER_ADMIN, client_1.userRole.USER), auth_controller_1.AuthControllers.changePassword);
router.post('/forgot-password', auth_controller_1.AuthControllers.forgotPassword);
router.post('/reset-password', auth_controller_1.AuthControllers.resetPassword);
exports.AuthRoutes = router;
