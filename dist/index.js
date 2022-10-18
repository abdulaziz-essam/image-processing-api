"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageRoute_1 = __importDefault(require("./routes/imageRoute"));
const app = (0, express_1.default)();
const port = 3001;
exports.default = app;
app.use('/', imageRoute_1.default);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
