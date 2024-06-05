"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyRouter = void 0;
const express_1 = __importDefault(require("express"));
const property_controller_1 = require("./property.controller");
const property_validation_1 = require("./property.validation");
const fileUploader_1 = require("../../../shared/fileUploader");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/create-lostproperty', (0, auth_1.default)(client_1.userRole.USER, client_1.userRole.ADMIN), fileUploader_1.fileUploader.upload.single('file'), (req, res, next) => {
    req.body = property_validation_1.PropertyValidation.lostItemValidationSchema.parse(JSON.parse(req.body.data));
    next();
}, property_controller_1.PropertyControllers.createLostProperty);
router.post('/create-foundproperty', (0, auth_1.default)(client_1.userRole.USER, client_1.userRole.ADMIN), fileUploader_1.fileUploader.upload.single('file'), (req, res, next) => {
    req.body = property_validation_1.PropertyValidation.foundItemValidationSchema.parse(JSON.parse(req.body.data));
    next();
}, property_controller_1.PropertyControllers.createFoundProperty);
router.post('/claim', (0, auth_1.default)(client_1.userRole.USER, client_1.userRole.ADMIN), fileUploader_1.fileUploader.upload.single('file'), (req, res, next) => {
    req.body = property_validation_1.PropertyValidation.claimValidationSchema.parse(JSON.parse(req.body.data));
    next();
}, property_controller_1.PropertyControllers.claimProperty);
router.get('/my-claim-items', (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.USER, client_1.userRole.SUPPER_ADMIN), property_controller_1.PropertyControllers.myClaimItem);
router.get('/my-lost-items', (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.USER, client_1.userRole.SUPPER_ADMIN), property_controller_1.PropertyControllers.myLostItem);
router.get('/my-found-items', (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.USER, client_1.userRole.SUPPER_ADMIN), property_controller_1.PropertyControllers.myFoundItem);
router.get('/getall-lost-items', property_controller_1.PropertyControllers.getAllLostItems);
router.get('/getall-found-items', property_controller_1.PropertyControllers.getAllFoundItems);
exports.propertyRouter = router;
