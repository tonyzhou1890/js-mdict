"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WordMapBuffer = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = _interopRequireDefault(require("./utils"));

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
      if (str.length * 4 > this.blockSize - 1) {
        return -1;
      } // 添加到 buffer


      if (this.bufferList.length === 0 || str.length * 4 > this.blockSize - this.blockIndex - 1) {
        this.bufferList.push(new Uint8Array(this.blockSize));
        this.blockIndex = 0;
      }

      var buffer = this.bufferList[this.bufferList.length - 1];
      var startOffset = this.blockIndex + (this.bufferList.length - 1) * this.blockSize;

      _utils["default"].numToUint8(offset, buffer, this.blockIndex);

      this.blockIndex += 4;
      this.blockIndex = _utils["default"].textEncode(str, buffer, this.blockIndex); // 空一格作为分隔符（0）

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
          recordStartOffset: _utils["default"].uint8ToNum(buffer, blockIndex),
          keyText: ''
        };
        blockIndex += 4;
        var start = blockIndex;

        while (buffer[blockIndex]) {
          blockIndex++;
        }

        keyInfo.keyText = _utils["default"].textDecode(buffer, start, blockIndex - start); // 跳过偏移数字，判断接下来有没有字符转的 uint8

        if (buffer[blockIndex + 5]) {
          keyInfo.nextRecordStartOffset = _utils["default"].uint8ToNum(buffer, blockIndex + 1);
        } else {
          if (this.bufferList[bufferIndex + 1]) {
            keyInfo.nextRecordStartOffset = _utils["default"].uint8ToNum(this.bufferList[bufferIndex + 1]);
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