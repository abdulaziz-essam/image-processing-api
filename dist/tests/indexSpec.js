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
// import myFunc from '../index';
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const imageRoute_1 = require("../routes/imageRoute");
const resizeImage_1 = __importDefault(require("../resizeImage"));
const file_1 = __importDefault(require("../file"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const image_id = (0, uuid_1.v4)();
const outputPath = './images/' + 'image' + image_id + '.jpg';
const request = (0, supertest_1.default)(index_1.default);
it('expect cache  to be defind', () => {
    expect(imageRoute_1.cache).toBeDefined;
});
describe('200 ', () => {
    it('gets the api endpoint', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/88/99/image');
        expect(response.status).toBe(200);
        done();
    }));
});
describe('sharp', () => {
    it('for testing sharp', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/100/100/image');
        expect(function () { (0, resizeImage_1.default)((0, file_1.default)('image'), "image", 100, 100, outputPath, response); }).not.toThrow();
        done();
    }));
});
// describe( 'sharpppppppp', (): void => {
//   it('for testing sharp', async (done): Promise<void> => {
//       expect(resize_image(image('image'),image,100,100 , outputPath)).not.toThrow();
//       done()
//     });
//   });
describe('make sure input file is exist', () => {
    it('file exist', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(fs_1.default.existsSync((0, file_1.default)("image"))).toBe(true);
    }));
});
// describe('POST /user', function() {
//   it('user.name should be an case-insensitive match for "john"', function(done) {
//     request
//       .get('/55/66')
//       .send('height=70') // x-www-form-urlencoded upload
//       .set('Accept', 'application/json')
//       .expect(function(res) {
//         res.body.id = 'some fixed id';
//         res.body.name = res.body.name.toLowerCase();
//       })
//       .expect(200, {
//         id: 'some fixed id',
//         name: 'john'
//       }, done);
//   });
// });
