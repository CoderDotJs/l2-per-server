"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandaller = (err, req, res, next) => {
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || 'Something went wrong';
    let error = err;
    if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        (message = 'Validation Error'), (error = err.message);
    }
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            message = 'Duplicate Key Error ';
            error = error.meta;
        }
    }
    res.status(statusCode).json({
        success,
        message,
        error,
    });
};
exports.default = globalErrorHandaller;
