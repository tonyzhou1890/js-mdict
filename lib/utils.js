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
/**
 * 字符串转 uint8
 * @param {string} str 
 * @param {Uint8Array} buffer 
 * @param {number} offset 
 * @returns {number} offset
 */


function textEncode(str, buffer) {
  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var arr = (0, _toConsumableArray2["default"])(str);
  var index = offset;

  for (var i = 0; i < arr.length; i++) {
    var codePoint = arr[i].codePointAt(0); // 四字节字符

    if (codePoint >= 0x10000) {
      buffer[index++] = codePoint >> 18 & 0x7 | 0xf0;
      buffer[index++] = codePoint >> 12 & 0x3f | 0x80;
      buffer[index++] = codePoint >> 6 & 0x3f | 0x80;
      buffer[index++] = codePoint & 0x3f | 0x80;
    } else if (codePoint >= 0x800) {
      // 三字节字符
      buffer[index++] = codePoint >> 12 & 0xf | 0xe0;
      buffer[index++] = codePoint >> 6 & 0x3f | 0x80;
      buffer[index++] = codePoint & 0x3f | 0x80;
    } else if (codePoint >= 0x80) {
      // 两字节字符
      buffer[index++] = codePoint >> 6 & 0x1f | 0xc0;
      buffer[index++] = codePoint & 0x3f | 0x80;
    } else {
      // 单字节字符
      buffer[index++] = codePoint;
    }
  }

  return index;
}
/**
 * uint8 转字符串
 * @param {Uint8Array} buffer 
 * @param {number} offset 
 * @param {number} length 
 * @returns 
 */


function textDecode(buffer, offset, length) {
  var str = '';

  for (var i = offset; i < offset + length; i++) {
    switch (buffer[i] >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        str += String.fromCodePoint(buffer[i]);
        break;

      case 12:
      case 13:
        str += String.fromCodePoint(((buffer[i] & 0x1f) << 6) + (buffer[i + 1] & 0x3f));
        i++;
        break;

      case 14:
        str += String.fromCodePoint(((buffer[i] & 0xf) << 12) + ((buffer[i + 1] & 0x3f) << 6) + (buffer[i + 2] & 0x3f));
        i += 2;
        break;

      case 15:
        str += String.fromCodePoint(((buffer[i] & 0x7) << 18) + ((buffer[i + 1] & 0x3f) << 12) + ((buffer[i + 2] & 0x3f) << 6) + (buffer[i + 3] & 0x3f));
        i += 3;
        break;
    }
  }

  return str;
}
/**
 * 数字转 uint8
 * @param {*} num 
 * @param {*} buffer 
 * @param {*} offset 
 * @returns 
 */


function numToUint8(num) {
  var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Uint8Array(4);
  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  buffer[offset] = num >> 28 & 0xff | 0x80;
  buffer[offset + 1] = num >> 21 & 0xff | 0x80;
  buffer[offset + 2] = num >> 14 & 0xff | 0x80;
  buffer[offset + 3] = num >> 7 & 0xff | 0x80;
  buffer[offset + 4] = num & 0xff | 0x80;
  return buffer;
}
/**
 * uint8 转数字
 * @param {*} buffer 
 * @param {*} offset 
 * @returns 
 */


function uint8ToNum(buffer) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return ((buffer[offset] & 0x7f) << 28) + ((buffer[offset + 1] & 0x7f) << 21) + ((buffer[offset + 2] & 0x7f) << 14) + ((buffer[offset + 3] & 0x7f) << 7) + (buffer[offset + 4] & 0x7f);
}

var _default = {
  measureTime: measureTime,
  consoleMem: consoleMem,
  strToUint32: strToUint32,
  uint32ToStr: uint32ToStr,
  textEncode: textEncode,
  textDecode: textDecode,
  uint8ToNum: uint8ToNum,
  numToUint8: numToUint8
};
exports["default"] = _default;