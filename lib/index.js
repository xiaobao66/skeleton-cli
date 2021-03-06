"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var shelljs_1 = __importDefault(require("shelljs"));
var path_1 = __importDefault(require("path"));
var constants_1 = require("./constants");
var utils_1 = require("./utils");
var Creator = /** @class */ (function () {
    function Creator() {
    }
    Creator.prototype.init = function () {
        var argv = yargs_1.default.alias({
            v: 'version',
        }).argv;
        // 获取动作
        var _a = argv._, action = _a[0], project = _a[1];
        if (action === constants_1.ACTION_TYPES.CREATE) {
            this.create(project);
        }
    };
    Creator.prototype.create = function (project) {
        return __awaiter(this, void 0, void 0, function () {
            var answers, templateType, gitUrl, files, filePath, content, _a, _b, _c, _d, e_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!project) {
                            throw new Error("please input a project's name");
                        }
                        return [4 /*yield*/, inquirer_1.default.prompt([
                                // 模板类型
                                {
                                    type: 'rawlist',
                                    name: 'templateType',
                                    message: '请选择模板类型',
                                    choices: Object.keys(constants_1.TEMPLATE_TYPES).map(function (key) {
                                        var name = constants_1.TEMPLATE_TYPES[key].toLowerCase();
                                        return {
                                            name: name,
                                            value: key,
                                            short: name,
                                        };
                                    }),
                                    default: constants_1.TEMPLATE_TYPES.REACT_TS,
                                },
                            ])];
                    case 1:
                        answers = _e.sent();
                        templateType = answers.templateType;
                        gitUrl = constants_1.TEMPLATE_URLS[templateType];
                        if (!shelljs_1.default.which('git')) {
                            throw new Error('本机未安装git');
                        }
                        files = shelljs_1.default.ls();
                        if (files.some(function (file) { return file === project; })) {
                            throw new Error("\u5F53\u524D\u76EE\u5F55\u5DF2\u5B58\u5728" + project);
                        }
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 7, , 8]);
                        // 下载模板
                        console.info(chalk_1.default.green('模板下载中...'));
                        shelljs_1.default.exec("git clone " + gitUrl + " " + project);
                        // 删除.git等多余文件
                        shelljs_1.default.cd(project);
                        shelljs_1.default.rm('-rf', '.git', 'knowledge.md');
                        shelljs_1.default.cd('..');
                        filePath = path_1.default.join(process.cwd(), project + "/package.json");
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, utils_1.readFile(filePath)];
                    case 3:
                        content = _b.apply(_a, [_e.sent()]);
                        return [4 /*yield*/, utils_1.writeFile(filePath, JSON.stringify(__assign(__assign({}, content), { name: project, version: '1.0.0', author: '' }), null, 2))];
                    case 4:
                        _e.sent();
                        // 修改npm-shrinkwrap.json
                        filePath = path_1.default.join(process.cwd(), project + "/npm-shrinkwrap.json");
                        _d = (_c = JSON).parse;
                        return [4 /*yield*/, utils_1.readFile(filePath)];
                    case 5:
                        content = _d.apply(_c, [_e.sent()]);
                        return [4 /*yield*/, utils_1.writeFile(filePath, JSON.stringify(__assign(__assign({}, content), { name: project, version: '1.0.0' }), null, 2))];
                    case 6:
                        _e.sent();
                        console.info(chalk_1.default.green(project + "\u521B\u5EFA\u6210\u529F!"));
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _e.sent();
                        shelljs_1.default.rm('-rf', project);
                        console.error(chalk_1.default.red(e_1.message));
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return Creator;
}());
exports.default = Creator;
