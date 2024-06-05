"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createUserSchemaValidation = zod_1.z.object({
    userName: zod_1.z.string().min(1, 'Username is required'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
});
const updateProfileValidation = zod_1.z.object({
    status: zod_1.z.enum([client_1.userStatus.ACTIVE, client_1.userStatus.BLOCKED, client_1.userStatus.DELETED]),
});
exports.userValidation = {
    createUserSchemaValidation,
    updateProfileValidation,
};
