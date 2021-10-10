"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _lodash = require("lodash");

var IndexFile = function IndexFile() {
  (0, _classCallCheck2["default"])(this, IndexFile);
  this.partitionID = 0;
  this.startKey = "";
  this.endKey = "";
};

var Sorter = /*#__PURE__*/function () {
  function Sorter(wordItems) {
    (0, _classCallCheck2["default"])(this, Sorter);
    this.words = wordItems;
  }

  (0, _createClass2["default"])(Sorter, [{
    key: "sort",
    value: function sort() {
      var len = this.words.length;
      var preIndex, current;

      for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = this.words[i]; // console.log(`sorting(${i}): ${current.keyText}`);
        // 找到比当前词大的词，都往后挪动一个位置

        while (preIndex > 0 && this.words[preIndex].keyText > current.keyText) {
          this.words[preIndex + 1] = this.words[preIndex];
          preIndex--;
        } // 插入当前词


        this.words[preIndex + 1] = current;
      }
    }
  }, {
    key: "bubbleSort",
    value: function bubbleSort() {
      var len = this.words.length;

      for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
          if (this.words[j].keyText > this.words[j + 1].keyText) {
            var temp = this.words[j + 1];
            this.words[j + 1] = this.words[j];
            this.words[j] = temp;
          }
        }
      }
    } // 希尔排序 0.454s

  }, {
    key: "shellSort",
    value: function shellSort() {
      var len = this.words.length;
      var temp;
      var gap = 1;

      while (gap < len / 3) {
        gap = gap * 3 + 1;
      }

      for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (var i = gap; i < len; i++) {
          temp = this.words[i];
          var j = 0;

          for (j = i - gap; j >= 0 && this.words[j].keyText > temp.keyText; j -= gap) {
            this.words[j + gap] = this.words[j];
          }

          this.words[j + gap] = temp;
        }
      }
    } // 快速排序 2.449

  }, {
    key: "quickSort",
    value: function quickSort(left, right) {
      var that = this;

      function swap(i, j) {
        var temp = that.words[i];
        that.words[i] = that.words[j];
        that.words[j] = temp;
      }

      function partition(left, right) {
        var pivot = left;
        var index = pivot + 1;

        for (var i = index; i <= right; i++) {
          if (that.words[i].keyText < that.words[pivot].keyText) {
            swap(i, index);
            index++;
          }
        }

        swap(pivot, index);
        return index - 1;
      }

      var len = this.words.length;
      left = typeof left != 'number' ? 0 : left;
      right = typeof right != 'number' ? len - 1 : right;

      if (left < right) {
        var partitionIdx = partition(left, right);
        this.quickSort(left, partitionIdx - 1);
        this.quickSort(partitionIdx + 1, right);
      }
    }
  }, {
    key: "mergeSort",
    value: function mergeSort(arr) {
      function merge(left, right) {
        var result = [];

        while (left && left.length && right && right.length) {
          if (left[0].keyText <= right[0].keyText) {
            result.push(left.shift());
          } else {
            result.push(right.shift());
          }
        }

        while (left && left.length) {
          result.push(left.shift());
        }

        while (right && right.length) {
          result.push(right.shift());
        }

        return result;
      }

      var len = arr.length;

      if (len < 2) {
        return arr;
      }

      var middle = Math.floor(len / 2);
      var left = arr.slice(0, middle);
      var right = arr.slice(middle);
      return merge(this.mergeSort(left), this.mergeSort(right));
    }
  }, {
    key: "top10",
    value: function top10() {
      for (var i = 0; i < 10; i++) {
        console.log(this.words[i]);
      }
    }
  }]);
  return Sorter;
}();

exports["default"] = Sorter;