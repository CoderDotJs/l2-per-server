"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtHelpares = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, secrect, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(payload, secrect, {
        algorithm: 'HS256',
        expiresIn: expiresIn,
    });
    return token;
};
const verifyToken = (token, secrect) => {
    const decoded = jsonwebtoken_1.default.verify(token, secrect);
    return decoded;
};
exports.JwtHelpares = {
    generateToken,
    verifyToken
};
