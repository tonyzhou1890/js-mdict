"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

var _default = {
  measureTime: measureTime
};
exports["default"] = _default;