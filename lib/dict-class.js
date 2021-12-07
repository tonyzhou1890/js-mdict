"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyClass = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

/**
 * key class
 */
var KeyClass = function KeyClass(keyText, recordStartOffset, nextRecordStartOffset) {
  (0, _classCallCheck2["default"])(this, KeyClass);
  this.keyText = keyText;
  this.recordStartOffset = recordStartOffset;
  this.nextRecordStartOffset = nextRecordStartOffset;
};

exports.KeyClass = KeyClass;