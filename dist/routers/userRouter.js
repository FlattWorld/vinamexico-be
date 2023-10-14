"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.route('/').get(userController_1.getAllUsers);
router.route('/:churchId/members').get(userController_1.getUsersByChurch).post(userController_1.createUser);
router.route('/:userId').get(userController_1.getUserById).patch(userController_1.editUser).delete(userController_1.deleteUser);
exports.default = router;
