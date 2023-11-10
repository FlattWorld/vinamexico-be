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
exports.getAllUsers = exports.deleteUser = exports.editUser = exports.createUser = exports.getUsersByChurch = exports.getUserById = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt = require('bcrypt');
const saltRounds = 10;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = (yield userModel_1.default.find({ _id: userId }).select('-password').exec()).at(0);
        res.status(200).json({
            status: 'success',
            data: { user }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});
exports.getUserById = getUserById;
const getUsersByChurch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const churchId = req.params.churchId;
    try {
        const users = yield userModel_1.default.find({ churchId }).select('-password').exec();
        res.status(200).json({
            status: 'success',
            amount: users.length,
            data: { users }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});
exports.getUsersByChurch = getUsersByChurch;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const churchId = req.params.churchId;
        const password = req.body.password;
        let encryptedPassword = '';
        if (churchId === '0') {
            const salt = yield bcrypt.genSalt(saltRounds);
            if (!salt)
                throw new Error('Error al encriptar password');
            const hash = yield bcrypt.hash(password, salt);
            if (!hash)
                throw new Error('Error al encriptar password');
            encryptedPassword = hash;
        }
        console.log({ encryptedPassword });
        const userInfo = Object.assign(Object.assign(Object.assign({}, req.body), { churchId }), (churchId === '0' && { role: 'admin', password: encryptedPassword }));
        const newUser = yield userModel_1.default.create(userInfo);
        delete userInfo.password;
        res.status(201).json({
            status: 'success',
            data: { userInfo }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});
exports.createUser = createUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        yield userModel_1.default.updateOne({ _id: userId }, req.body);
        const user = (yield userModel_1.default.find({ _id: userId }).exec()).at(0);
        res.status(200).json({
            status: 'success',
            data: { user }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});
exports.editUser = editUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        yield userModel_1.default.deleteOne({ _id: userId });
        res.status(204).end();
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});
exports.deleteUser = deleteUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, req.query);
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    if (queryObj.name)
        queryObj.name = { '$regex': queryObj.name, '$options': 'i' };
    try {
        const query = userModel_1.default.find(queryObj).select('-password').exec();
        const users = yield query;
        res.status(200).json({
            status: 'success',
            amount: users.length,
            data: { users }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});
exports.getAllUsers = getAllUsers;
