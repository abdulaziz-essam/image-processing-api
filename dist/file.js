"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
// let image =path.resolve(__dirname,'./image.jpg')
const image = (fileName) => {
    return path_1.default.join(process_1.default.cwd(), `images/${fileName}.jpg`);
};
exports.default = image;
