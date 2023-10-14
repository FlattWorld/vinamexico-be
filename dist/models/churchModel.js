"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const churchSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'La iglesia debe tener un nombre'],
    },
    address: {
        type: String,
        required: [true, 'La iglesia debe tener una dirección'],
    },
    city: String,
    state: String,
    zip: String,
    street: String,
    phone: [String],
    email: [String],
    pastor: [String],
    pastorPhone: [String],
    pastorEmail: [String],
    url: String,
});
const model = mongoose_1.default.model('Church', churchSchema);
exports.default = model;
