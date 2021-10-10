"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _fs = _interopRequireDefault(require("fs"));

// import {Uint64BE} from "int64-buffer";
var SkipListNode = function SkipListNode(level) {
  (0, _classCallCheck2["default"])(this, SkipListNode);
  this.level = level;
  this.index = [];
  this.next;
  this.below;
};

var IndexBuilder = /*#__PURE__*/function () {
  function IndexBuilder(sorted_words, file_path) {
    (0, _classCallCheck2["default"])(this, IndexBuilder);
    this.words = sorted_words;
    this.file_path = file_path;
  }

  (0, _createClass2["default"])(IndexBuilder, [{
    key: "build",
    value: function build() {
      var fd = _fs["default"].openSync('/tmp/medict.idx.dat', 'a+', 438);

      var buf = Buffer.alloc(6, '999999');

      _fs["default"].writeSync(fd
      /* file discriptor */
      , buf
      /* buffer */
      , 3
      /* offset */
      , 3
      /* legth */
      , 1
      /* position */
      );

      _fs["default"].closeSync(fd);
    }
  }]);
  return IndexBuilder;
}();

exports["default"] = IndexBuilder;