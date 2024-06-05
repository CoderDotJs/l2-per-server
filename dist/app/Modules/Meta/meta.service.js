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
exports.MetaServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const fetchDatabaseMetadata = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if ((user === null || user === void 0 ? void 0 : user.role) === client_1.userRole.ADMIN || client_1.userRole.SUPPER_ADMIN) {
        const totalLostItems = yield prisma_1.default.lostItem.count();
        const totalFoundItems = yield prisma_1.default.foundItem.count();
        const totalClaimItems = yield prisma_1.default.claim.count();
        return {
            totalLostItems,
            totalFoundItems,
            totalClaimItems,
        };
    }
});
exports.MetaServices = {
    fetchDatabaseMetadata,
};
