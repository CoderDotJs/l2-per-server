"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
// get all users 
router.get('/', (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.SUPPER_ADMIN), user_controller_1.UserControllers.getAllDataFromDB);
router.get('/me', (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.USER, client_1.userRole.SUPPER_ADMIN), user_controller_1.UserControllers.getMe);
router.post('/create-user', (0, validationRequest_1.default)(user_validation_1.userValidation.createUserSchemaValidation), user_controller_1.UserControllers.createUser);
router.post('/create-admin', (0, validationRequest_1.default)(user_validation_1.userValidation.createUserSchemaValidation), user_controller_1.UserControllers.createAdmin);
router.patch('/update-my-profile', (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.SUPPER_ADMIN, client_1.userRole.USER), 
// fileUploader.upload.single('file'),
// (req: Request, res: Response, next: NextFunction) => {
//   req.body = JSON.parse(req.body.data);
//   next();
// },
user_controller_1.UserControllers.updateProfile);
router.patch('/:id/status', (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.SUPPER_ADMIN), (req, res, next) => {
    (0, validationRequest_1.default)(user_validation_1.userValidation.updateProfileValidation);
    next();
}, user_controller_1.UserControllers.changeProfileStatus);
exports.userRouter = router;
