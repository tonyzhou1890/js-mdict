"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

/**
 * print time of function
 * @param {string} name 
 * @param {function} fn 
 * @param  {...any} rest 
 * @returns any
 */
function measureTime(name, fn) {
  var start = Date.now();

  for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  var res = fn.apply(void 0, rest);
  console.log("".concat(name, ": ").concat(Date.now() - start, "ms"));
  return res;
}
/**
 * 打印内存占用
 */


function consoleMem() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var used = process.memoryUsage();

  if (name) {
    console.log("mem of ".concat(name));
  }

  for (var key in used) {
    console.log("".concat(key, " ").concat(Math.round(used[key] / 1024 / 1024 * 100) / 100, " MB"));
  }
}
/**
 * 字符串转 buffer
 */


function strToUint32(str) {
  var arr = (0, _toConsumableArray2["default"])(str);
  var bf = new Uint32Array(arr.length);

  for (var i = 0; i < arr.length; i++) {
    bf[i] = arr[i].codePointAt(0);
  }

  return bf;
}

function uint32ToStr(bf, start, length) {
  var str = '';

  for (var i = 0; i < length; i++) {
    str += String.fromCodePoint(bf[start + i]);
  }

  return str;
}

var _default = {
  measureTime: measureTime,
  consoleMem: consoleMem,
  strToUint32: strToUint32,
  uint32ToStr: uint32ToStr
};
exports["default"] = _default;