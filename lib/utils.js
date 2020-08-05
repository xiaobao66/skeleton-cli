"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.readFile = void 0;
var fs_1 = __importDefault(require("fs"));
function readFile(path) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(path, 'utf-8', function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.readFile = readFile;
function writeFile(path, data) {
    return new Promise(function (resolve, reject) {
        fs_1.default.writeFile(path, data, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
exports.writeFile = writeFile;
