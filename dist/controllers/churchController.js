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
exports.getAllChurches = exports.deleteChurch = exports.editChurch = exports.createChurch = exports.getChurchById = void 0;
const churchModel_1 = __importDefault(require("../models/churchModel"));
const getChurchById = (req, res) => {
    const id = Number(req.params.id);
    res.status(200).send('Hello World!');
};
exports.getChurchById = getChurchById;
const createChurch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newChurch = yield churchModel_1.default.create(Object.assign({}, req.body));
        res.status(201).json({
            status: 'success',
            data: { newChurch }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});
exports.createChurch = createChurch;
const editChurch = (req, res) => {
    const id = Number(req.params.id);
    res.status(200).send('Hello World!');
};
exports.editChurch = editChurch;
const deleteChurch = (req, res) => {
    const id = Number(req.params.id);
    res.status(200).send('Hello World!');
};
exports.deleteChurch = deleteChurch;
const getAllChurches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, req.query);
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    if (queryObj.name)
        queryObj.name = { '$regex': queryObj.name, '$options': 'i' };
    try {
        const query = churchModel_1.default.find(queryObj);
        const churches = yield query;
        res.status(200).json({
            status: 'success',
            amount: churches.length,
            data: churches
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});
exports.getAllChurches = getAllChurches;
