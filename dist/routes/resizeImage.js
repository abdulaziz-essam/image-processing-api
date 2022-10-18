"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const express_1 = __importDefault(require("express"));
const node_cache_1 = __importDefault(require("node-cache"));
const file_1 = __importDefault(require("../file"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
const myCache = new node_cache_1.default({ stdTTL: 0, checkperiod: 0 });
let cache = [];
exports.cache = cache;
myCache.set('myKey', cache, 10000);
const router = express_1.default.Router();
exports.default = router.get('/:height/:width/:filename', function (req, res) {
    let outPath = '';
    let image_id = (0, uuid_1.v4)();
    console.log('data was send to server');
    let height = Number(req.params.height);
    let width = Number(req.params.width);
    let filename = req.params.filename;
    let value = myCache.get('myKey');
    let found = false;
    let path = (0, file_1.default)(filename);
    if (fs_1.default.existsSync(path)) {
        console.log("file exist");
        //file exists
        // here i check if width and height in new request is not the same with previous one to generate new image
        for (let i = 0; i < cache.length; i++) {
            try {
                if (height == value[i].height && width == value[i].width && filename == value[i].filename) {
                    res.sendFile(value[i].outputName, { root: '.' });
                    found = true;
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        if (found == false) {
            // here we use sharp to generate image with new height and width
            (0, sharp_1.default)(path)
                .resize(height, width)
                .toBuffer()
                .then(data => {
                outPath = './images/' + filename + image_id + '.jpg';
                fs_1.default.appendFile(outPath, data, function (err) {
                    if (err)
                        throw err;
                    console.log('Saved!');
                });
                cache.push({ filename: filename, height: height, width: width, outputName: outPath });
                myCache.set('myKey', cache, 10000);
                console.log(cache);
                res.end(data);
            })
                .catch(err => console.log(+err));
        }
    }
    else {
        res.send("<h1> dont found this image in files </h1>");
    }
    // if image width and height is in the cache we will return available image without generate new one
});
