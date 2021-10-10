"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

// 使用跳表的方式实现多级索引
// 最后一层每个索引文件最多有1万个词
var Skiplistor = function Skiplistor() {
  (0, _classCallCheck2["default"])(this, Skiplistor);
  this.level = 0;
};

exports["default"] = Skiplistor;