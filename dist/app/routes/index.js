"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../Modules/User/user.route");
const auth_route_1 = require("../Modules/Auth/auth.route");
const pet_route_1 = require("../Modules/Pet/pet.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/user",
        route: user_route_1.userRouter,
    },
    {
        path: "/pets",
        route: pet_route_1.PetRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
