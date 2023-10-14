"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config.env' });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = process.env.PORT || 8001;
const DBLINK = process.env.DATABASE || '';
const DBPASS = process.env.DB_PASSWORD || '';
const DB = DBLINK.replace('<PASSWORD>', DBPASS);
mongoose_1.default.connect(DB).then((connection) => {
    console.log('DB connection successful!');
});
app_1.default.listen(PORT, () => {
    console.log(`🛸 Server running on port ${PORT}`);
});
