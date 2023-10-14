"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const churchController_1 = require("../controllers/churchController");
const router = express_1.default.Router();
router.route('/').get(churchController_1.getAllChurches).post(churchController_1.createChurch);
router.route('/:churchId').get(churchController_1.getChurchById).patch(churchController_1.editChurch).delete(churchController_1.deleteChurch);
exports.default = router;
