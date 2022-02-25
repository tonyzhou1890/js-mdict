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
    var bufferSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000000;
    (0, _classCallCheck2["default"])(this, WordMapBuffer);
    this.bufferSize = bufferSize; // 处理后的 key map

    this.map = {}; // 存放 key 对应的字符和释义偏移的 buffer 数组。结构：[四个元素用来存放释义偏移][n 个元素用来存放字符][空一格作为分隔符]

    this.bufferList = [];
    this.blockIndex = 0;
  }
  /**
   * 插入 key
   * @param {string} key 
   * @param {string} str key 对应的原始字符
   * @param {number} offset 字符对应的释义偏移量
   * @returns 
   */


  (0, _createClass2["default"])(WordMapBuffer, [{
    key: "insert",
    value: function insert(key, str, offset) {
      if (str.length * 4 > this.bufferSize - 1) {
        return -1;
      } // 添加到 buffer
      // 没有 buffer 或者空间不够就创建新的 buffer


      if (this.bufferList.length === 0 || str.length * 4 > this.bufferSize - this.blockIndex - 1) {
        this.bufferList.push(new Uint8Array(this.bufferSize));
        this.blockIndex = 0;
      }

      var buffer = this.bufferList[this.bufferList.length - 1];
      var startOffset = this.blockIndex + (this.bufferList.length - 1) * this.bufferSize; // 先存放释义偏移量，因为这个固定用四个字节存放

      _utils["default"].numToUint8(offset, buffer, this.blockIndex);

      this.blockIndex += 4; // 存放不定长度的字符

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
    /**
     * 查找
     * @param {string} key 
     * @returns []
     */

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
        var bufferIndex = Math.floor(offset / this.bufferSize);
        var buffer = this.bufferList[bufferIndex];
        if (!buffer) continue;
        var blockIndex = offset % this.bufferSize;
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
    /**
     * 词表
     */

  }, {
    key: "keys",
    value: function keys() {
      var keys = [];

      for (var i = 0; i < this.bufferList.length; i++) {
        var buffer = this.bufferList[i]; // 跳过开头的数字，从第一个字符开始

        var blockIndex = 4;

        while (blockIndex < this.bufferSize) {
          var start = blockIndex;

          while (buffer[blockIndex]) {
            blockIndex++;
          }

          keys.push(_utils["default"].textDecode(buffer, start, blockIndex - start)); // 跳过偏移数字，判断接下来有没有字符转的 uint8
          // 有则继续

          if (buffer[blockIndex + 5]) {
            blockIndex += 5;
          } else {
            // 没有则将指针移到超出当前 buffer 的范围，以便跳出内层循环
            blockIndex = this.bufferSize;
          }
        }
      }

      return keys;
    }
  }]);
  return WordMapBuffer;
}();

exports.WordMapBuffer = WordMapBuffer;