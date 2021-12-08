"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WordMapBuffer = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

// wordMapBuffer
var WordMapBuffer = /*#__PURE__*/function () {
  function WordMapBuffer() {
    var blockSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000000;
    (0, _classCallCheck2["default"])(this, WordMapBuffer);
    this.blockSize = blockSize;
    this.map = {};
    this.bufferList = [];
    this.blockIndex = 0;
  }

  (0, _createClass2["default"])(WordMapBuffer, [{
    key: "insert",
    value: function insert(key, str, offset) {
      var arr = (0, _toConsumableArray2["default"])(str);

      if (arr.length > this.blockSize - 1) {
        return -1;
      } // 添加到 buffer


      if (this.bufferList.length === 0 || arr.length > this.blockSize - this.blockIndex - 1) {
        this.bufferList.push(new Uint32Array(this.blockSize));
        this.blockIndex = 0;
      }

      var buffer = this.bufferList[this.bufferList.length - 1];
      var startOffset = this.blockIndex + (this.bufferList.length - 1) * this.blockSize;
      buffer[this.blockIndex++] = offset;

      for (var i = 0; i < arr.length; i++) {
        buffer[this.blockIndex++] = arr[i].codePointAt(0);
      } // 空一格作为分隔符（0）


      this.blockIndex++; // 将 key 添加到 map

      if (this.map[key]) {
        if (Array.isArray(this.map[key])) {
          this.map[key].push(startOffset);
        } else {
          this.map[key] = [this.map[key], startOffset];
        }
      } else {
        this.map[key] = startOffset;
      }

      return startOffset;
    }
  }, {
    key: "lookup",
    value: function lookup(key) {
      var res = [];
      var offsetList = this.map[key];

      if (!Array.isArray(offsetList)) {
        offsetList = [offsetList];
      }

      for (var i = 0; i < offsetList.length; i++) {
        var offset = offsetList[i];
        var bufferIndex = Math.floor(offset / this.blockSize);
        var buffer = this.bufferList[bufferIndex];
        if (!buffer) continue;
        var blockIndex = offset % this.blockSize;
        var keyInfo = {
          recordStartOffset: buffer[blockIndex++],
          keyText: ''
        };

        while (buffer[blockIndex]) {
          keyInfo.keyText += String.fromCodePoint(buffer[blockIndex++]);
        }

        if (buffer[blockIndex + 1]) {
          keyInfo.nextRecordStartOffset = buffer[blockIndex + 1];
        } else {
          if (this.bufferList[bufferIndex + 1]) {
            keyInfo.nextRecordStartOffset = this.bufferList[bufferIndex + 1][0];
          }
        }

        res.push(keyInfo);
      }

      return res;
    }
  }]);
  return WordMapBuffer;
}();

exports.WordMapBuffer = WordMapBuffer;