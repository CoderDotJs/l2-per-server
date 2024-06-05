"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyValidation = void 0;
const zod_1 = require("zod");
const lostItemStatus = zod_1.z.enum(['LOST', 'FOUND']);
const lostItemCategory = zod_1.z.enum([
    'Walet',
    'Key',
    'Mobail',
    'Laptop',
    'Bike',
    'Car',
    'Others',
]);
const lostItemValidationSchema = zod_1.z.object({
    title: zod_1.z.string(),
    date: zod_1.z.string(),
    status: lostItemStatus,
    category: lostItemCategory,
    contactNumber: zod_1.z.string(),
    email: zod_1.z.string().email(),
    color: zod_1.z.string(),
    brand: zod_1.z.string(),
    location: zod_1.z.string(),
    description: zod_1.z.string(),
    uploadImage: zod_1.z.string().url().optional().default(''),
});
const foundItemValidationSchema = zod_1.z.object({
    title: zod_1.z.string(),
    date: zod_1.z.string(),
    status: lostItemStatus,
    category: lostItemCategory,
    contactNumber: zod_1.z.string(),
    email: zod_1.z.string().email(),
    color: zod_1.z.string(),
    brand: zod_1.z.string(),
    location: zod_1.z.string(),
    description: zod_1.z.string(),
    uploadImage: zod_1.z.string().url().optional().default(''),
});
const claimValidationSchema = zod_1.z.object({
    description: zod_1.z.string(),
    location: zod_1.z.string(),
    details: zod_1.z.string(),
    uploadImage: zod_1.z.string().url().optional().default(''),
    lostDate: zod_1.z.string(),
});
exports.PropertyValidation = {
    lostItemValidationSchema,
    foundItemValidationSchema,
    claimValidationSchema
};
