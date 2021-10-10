"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Seacher = /*#__PURE__*/function () {
  function Seacher(wordItems) {
    (0, _classCallCheck2["default"])(this, Seacher);
    this.words = wordItems;
  }

  (0, _createClass2["default"])(Seacher, [{
    key: "binarySearch",
    value: function binarySearch(word) {
      if (!word || word.length <= 0) {
        return null;
      }

      var left = 0;
      var right = this.words.length - 1;

      while (left < right) {
        var middle = Math.floor(right + left / 2);
        var midWord = this.words[middle];

        if (midWord.keyText < word) {
          left = middle + 1;
        } else if (midWord.keyText > word) {
          right = middle - 1;
        } else {
          return midWord;
        }
      }

      return null;
    }
  }]);
  return Seacher;
}();

exports["default"] = Seacher;