"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expire_in: process.env.JWT_EXPIRE,
    jwt_refresh_secret: process.env.JWT_REFRESH_SEECRET,
    jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE,
    reset_pass_secret: process.env.RESET_PASS_SECRET,
    reset_pass_expire_in: process.env.RESET_PASS_EXPIRE,
    reset_pass_link: process.env.RESET_PASS_LINK,
    node_mailer_email: process.env.NODE_MAILER_EMAIL,
    node_mailer_pass: process.env.NODE_MAILER_PASS,
    cloud_name: process.env.CLOUD_NAME,
    cloud_api_key: process.env.CLOUD_API_KEY,
    cloud_api_secret: process.env.CLOUD_API_SECRET,
};
