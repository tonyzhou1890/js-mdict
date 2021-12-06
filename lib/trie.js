"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Trie = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * Trie
 * save wordList
 * ```
 * TrieNode: {
 *   a: {
 *     data: [keyInfo],
 *     children: TrieNode
 *   }
 * }
 * ```
 */
var Trie = /*#__PURE__*/function () {
  function Trie() {
    (0, _classCallCheck2["default"])(this, Trie);
    this.trie = {};
  }

  (0, _createClass2["default"])(Trie, [{
    key: "insert",
    value: function insert(str, data) {
      var arr = (0, _toConsumableArray2["default"])(str);
      var node = this.trie;

      for (var i = 0; i < arr.length; i++) {
        if (!node[arr[i]]) {
          node[arr[i]] = {
            data: [],
            children: {}
          };
        }

        if (i === arr.length - 1) {
          node[arr[i]].data.push(data);
        } else {
          node = node[arr[i]].children;
        }
      }
    }
  }, {
    key: "lookup",
    value: function lookup(str) {
      var arr = (0, _toConsumableArray2["default"])(str);
      var node = this.trie;

      for (var i = 0; i < arr.length; i++) {
        if (!node[arr[i]]) {
          return null;
        }

        if (i === arr.length - 1) {
          return (0, _toConsumableArray2["default"])(node[arr[i]].data);
        } else {
          node = node[arr[i]].children;
        }
      }
    }
  }]);
  return Trie;
}();

exports.Trie = Trie;