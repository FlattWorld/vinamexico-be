"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const churchRouter_1 = __importDefault(require("./routers/churchRouter"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json(), (0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use('/api/v1/users', userRouter_1.default);
app.use('/api/v1/churches', churchRouter_1.default);
exports.default = app;
