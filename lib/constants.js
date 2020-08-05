"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_URLS = exports.TEMPLATE_TYPES = exports.ACTION_TYPES = void 0;
var ACTION_TYPES = {
    CREATE: 'create',
};
exports.ACTION_TYPES = ACTION_TYPES;
var TEMPLATE_TYPES = {
    REACT: 'REACT',
    REACT_TS: 'REACT_TS',
    VANILLAJS_TS: 'VANILLAJS_TS',
};
exports.TEMPLATE_TYPES = TEMPLATE_TYPES;
var TEMPLATE_URLS = (_a = {},
    _a[TEMPLATE_TYPES.REACT] = 'https://github.com/xiaobao66/react-skeleton.git',
    _a[TEMPLATE_TYPES.REACT_TS] = 'https://github.com/xiaobao66/react-skeleton-ts.git',
    _a[TEMPLATE_TYPES.VANILLAJS_TS] = 'https://github.com/xiaobao66/vanillajs-skeleton-ts.git',
    _a);
exports.TEMPLATE_URLS = TEMPLATE_URLS;
