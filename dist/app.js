"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const churchRouter_1 = __importDefault(require("./routers/churchRouter"));
const postRouter_1 = __importDefault(require("./routers/postRouter"));
const cors_1 = __importDefault(require("cors"));
const BASE_ORIGIN = process.env.ORIGIN;
const app = (0, express_1.default)();
app.use(express_1.default.json(), (0, cors_1.default)({
    origin: BASE_ORIGIN,
    credentials: true
}));
app.use('/api/v1/users', userRouter_1.default);
app.use('/api/v1/churches', churchRouter_1.default);
app.use('/api/v1/posts', postRouter_1.default);
app.use('/api/v1/auth', authRouter_1.default);
exports.default = app;
