"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _lemmatizer = require("lemmatizer");

var _dictionaryEnUs = _interopRequireDefault(require("dictionary-en-us"));

var _nspell = _interopRequireDefault(require("nspell"));

var _doublearray = _interopRequireDefault(require("doublearray"));

var _mdictBase = _interopRequireDefault(require("./mdict-base"));

var _common = _interopRequireDefault(require("./common"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Mdict = /*#__PURE__*/function (_MdictBase) {
  (0, _inherits2["default"])(Mdict, _MdictBase);

  var _super = _createSuper(Mdict);

  function Mdict(fname) {
    var _searchOptions$passco, _searchOptions$passco2;

    var _this;

    var searchOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, Mdict);
    var passcode = (_searchOptions$passco = searchOptions.passcode) !== null && _searchOptions$passco !== void 0 ? _searchOptions$passco : undefined; // 模式，目前只支持 mixed。
    // 当处于此模式，mdx 文件将构建字典树，lookup 返回值将会是数组。
    // 如果有完全匹配的单词，数组第一个就是，否则都是 stripKey 并且 lowercase 下的匹配。

    var mode = searchOptions.mode;
    _this = _super.call(this, fname, passcode, mode);
    _this.searchOptions = {};
    searchOptions = searchOptions || {};
    _this.searchOptions.passcode = (_searchOptions$passco2 = searchOptions.passcode) !== null && _searchOptions$passco2 !== void 0 ? _searchOptions$passco2 : undefined;
    _this.searchOptions.keyCaseSensitive = searchOptions.keyCaseSensitive;
    _this.searchOptions.stripKey = searchOptions.stripKey;
    return _this;
  }

  (0, _createClass2["default"])(Mdict, [{
    key: "_stripKey",
    value: function _stripKey() {
      var _this$searchOptions$s;

      var stripKey = (_this$searchOptions$s = this.searchOptions.stripKey) !== null && _this$searchOptions$s !== void 0 ? _this$searchOptions$s : _common["default"].isTrue(this.header.StripKey);
      var regexp = _common["default"].REGEXP_STRIPKEY[this.ext];
      return stripKey ? function _s(key) {
        return key.replace(regexp, '$1');
      } : function _s(key) {
        return key;
      };
    }
  }, {
    key: "lookup",
    value: function lookup(word) {
      // mdx 的 mixed 模式返回 stripKey 并且 lowercase 的所有单词列表
      if (this.ext === 'mdx' && this.mode === 'mixed') {
        return this._lookupMixed(word);
      }

      var record = this._lookupKID(word); // if not found the key block, return undefined


      if (record === undefined) {
        return {
          keyText: word,
          definition: null
        };
      }

      var i = record.idx;
      var list = record.list;

      var rid = this._reduceRecordBlock(list[i].recordStartOffset);

      var nextStart = i + 1 >= list.length ? this._recordBlockStartOffset + this.recordBlockInfoList[this.recordBlockInfoList.length - 1].decompAccumulator + this.recordBlockInfoList[this.recordBlockInfoList.length - 1].decompSize : list[i + 1].recordStartOffset;

      var data = this._decodeRecordBlockByRBID(rid, list[i].keyText, list[i].recordStartOffset, nextStart);

      return data;
    } // return stripKey and lowercase list

  }, {
    key: "_lookupMixed",
    value: function _lookupMixed(word) {
      var recordList = [];

      if (this.ext === 'mdx') {
        var _this$trie$lookup;

        var regexp = _common["default"].REGEXP_STRIPKEY[this.ext];
        recordList = (_this$trie$lookup = this.trie.lookup((word !== null && word !== void 0 ? word : '').replace(regexp, '$1').toLowerCase())) !== null && _this$trie$lookup !== void 0 ? _this$trie$lookup : [];
      } else {
        var _this$trie$lookup2;

        recordList = (_this$trie$lookup2 = this.trie.lookup(word !== null && word !== void 0 ? word : '')) !== null && _this$trie$lookup2 !== void 0 ? _this$trie$lookup2 : [];
      } // if not found the key block, return undefined


      if (recordList.length === 0) {
        return [];
      } // justify word order and decode record


      var _recordList = [];

      for (var i = 0; i < recordList.length; i++) {
        var _recordList$i$nextRec;

        var rid = this._reduceRecordBlock(recordList[i].recordStartOffset);

        var nextStart = (_recordList$i$nextRec = recordList[i].nextRecordStartOffset) !== null && _recordList$i$nextRec !== void 0 ? _recordList$i$nextRec : this._recordBlockStartOffset + this.recordBlockInfoList[this.recordBlockInfoList.length - 1].decompAccumulator + this.recordBlockInfoList[this.recordBlockInfoList.length - 1].decompSize;

        var record = this._decodeRecordBlockByRBID(rid, recordList[i].keyText, recordList[i].recordStartOffset, nextStart); // justify order


        if (record.keyText === word) {
          _recordList.unshift(record);
        } else {
          _recordList.push(record);
        }
      }

      return _recordList;
    }
  }, {
    key: "_isKeyCaseSensitive",
    value: function _isKeyCaseSensitive() {
      return this.searchOptions.keyCaseSensitive || _common["default"].isTrue(this.header.KeyCaseSensitive);
    }
  }, {
    key: "_lookupRecordBlockWordList",
    value: function _lookupRecordBlockWordList(word) {
      var _this2 = this;

      var lookupInternal = function lookupInternal(compareFn) {
        var sfunc = _this2._stripKey();

        var kbid = _this2._reduceWordKeyBlock(word, sfunc, compareFn); // not found


        if (kbid < 0) {
          return undefined;
        }

        var list = _this2._decodeKeyBlockByKBID(kbid);

        var i = _this2._binarySearh(list, word, sfunc, compareFn);

        if (i === undefined) {
          return undefined;
        }

        return list;
      };

      var list;

      if (this._isKeyCaseSensitive()) {
        list = lookupInternal(_common["default"].normalUpperCaseWordCompare);
      } else {
        list = lookupInternal(_common["default"].normalUpperCaseWordCompare);

        if (list === undefined) {
          list = lookupInternal(_common["default"].wordCompare);
        }
      }

      return list;
    }
  }, {
    key: "_lookupKID",
    value: function _lookupKID(word) {
      var _this3 = this;

      var lookupInternal = function lookupInternal(compareFn) {
        var sfunc = _this3._stripKey();

        var kbid = _this3._reduceWordKeyBlock(word, sfunc, compareFn); // not found


        if (kbid < 0) {
          return undefined;
        }

        var list = _this3._decodeKeyBlockByKBID(kbid);

        var i = _this3._binarySearh(list, word, sfunc, compareFn);

        if (i === undefined) {
          return undefined;
        }

        return {
          idx: i,
          list: list
        };
      };

      var record;

      if (this._isKeyCaseSensitive()) {
        record = lookupInternal(_common["default"].normalUpperCaseWordCompare);
      } else {
        record = lookupInternal(_common["default"].normalUpperCaseWordCompare);

        if (record === undefined) {
          record = lookupInternal(_common["default"].wordCompare);
        }
      }

      return record;
    }
  }, {
    key: "_binarySearh",
    value: function _binarySearh(list, word, _s, compareFn) {
      if (!_s || _s == undefined) {
        // eslint-disable-next-line
        _s = this._stripKey();
      }

      var left = 0;
      var right = list.length - 1;
      var mid = 0;

      while (left <= right) {
        mid = left + (right - left >> 1); // if case sensitive, the uppercase word is smaller than lowercase word
        // for example: `Holanda` is smaller than `abacaxi`
        // so when comparing with the words, we should use the dictionary order,
        // however, if we change the word to lowercase, the binary search algorithm will be confused
        // so, we use the enhanced compare function `common.wordCompare`

        var compareResult = compareFn(_s(word), _s(list[mid].keyText)); // console.log(`@#@# wordCompare ${_s(word)} ${_s(list[mid].keyText)} ${compareResult} l: ${left} r: ${right} mid: ${mid} ${list[mid].keyText}`)

        if (compareResult > 0) {
          left = mid + 1;
        } else if (compareResult == 0) {
          return mid;
        } else {
          right = mid - 1;
        }
      }

      return undefined;
    }
  }, {
    key: "_findList",
    value: function _findList(word) {
      var _this4 = this;

      var findListInternal = function findListInternal(compareFn) {
        var sfunc = _this4._stripKey();

        var kbid = _this4._reduceWordKeyBlock(word, sfunc, compareFn); // not found


        if (kbid < 0) {
          return undefined;
        }

        return {
          sfunc: sfunc,
          kbid: kbid,
          list: _this4._decodeKeyBlockByKBID(kbid)
        };
      };

      var list;

      if (this._isKeyCaseSensitive()) {
        list = findListInternal(_common["default"].normalUpperCaseWordCompare);
      } else {
        list = findListInternal(_common["default"].normalUpperCaseWordCompare);

        if (list === undefined) {
          list = findListInternal(_common["default"].wordCompare);
        }
      }

      return list;
    }
    /**
     * get word prefix words
     * @param {string} phrase the word which needs to find prefix
     */

  }, {
    key: "prefix",
    value: function prefix(phrase) {
      var _this$_findList;

      var list = (_this$_findList = this._findList(phrase)) === null || _this$_findList === void 0 ? void 0 : _this$_findList.list;

      if (!list) {
        return [];
      }

      var trie = _doublearray["default"].builder().build(list.map(function (keyword) {
        return {
          k: keyword.keyText,
          v: keyword.recordStartOffset
        };
      }));

      return trie.commonPrefixSearch(phrase).map(function (item) {
        return {
          key: item.k,
          rofset: item.v
        };
      });
    }
    /**
     * get words associated
     * @param {string} phrase the word which needs to be associated
     */

  }, {
    key: "associate",
    value: function associate(phrase) {
      var record = this._findList(phrase);

      if (!record) {
        return [];
      }

      var sfunc = record.sfunc;
      var kbid = record.kbid;
      var list = record.list;
      var matched = list.filter(function (item) {
        return sfunc(item.keyText).startsWith(sfunc(phrase));
      });

      if (!matched.length) {
        matched = this.associate0(phrase);
      } // still nothing


      if (!matched.length) {
        return matched;
      } // in case there are matched items in next key block


      while (matched[matched.length - 1].keyText === list[list.length - 1].keyText && kbid < this.keyBlockInfoList.length) {
        kbid++;
        list = this._decodeKeyBlockByKBID(kbid);
        matched.concat(list.filter(function (item) {
          return sfunc(item.keyText).startsWith(sfunc(phrase));
        }));
      } // to meet the typings


      matched.map(function (item) {
        item.rofset = item.recordStartOffset;
      });
      return matched;
    }
  }, {
    key: "associate0",
    value: function associate0(phrase) {
      // if matched nothing, research in the record block
      var recordList = this._lookupRecordBlockWordList(phrase);

      return recordList || [];
    }
    /**
     * fuzzy_search
     * find latest `fuzzy_size` words, and filter by lavenshtein_distance
     * `fuzzy_size` means find the word's `fuzzy_size` number nabors
     * and filter with `ed_gap`
     *
     * for example, fuzzy_size('hello', 3, 1)
     * first find hello's nabor:
     * hell   --> edit distance: 1
     * hallo  --> edit distance: 1
     * hall   --> edit distance: 2
     * the result is:
     * [hell, hallo]
     *
     * return wordlist struct:
     * [
     * {
     * ed: Number  // word edit distance
     * idx: Number // word dict idx
     * key: string // word key string
     * }
     * ]
     */

  }, {
    key: "fuzzy_search",
    value: function fuzzy_search(word, fuzzy_size, ed_gap) {
      var _this5 = this;

      var fwords = [];
      var fuzzy_words = [];
      fwords = fwords.concat(this.prefix(word).map(function (kv) {
        return {
          key: kv.key,
          idx: kv.rofset,
          ed: _common["default"].levenshtein_distance(word, kv.k)
        };
      }));
      fuzzy_size = fuzzy_size - fwords.length < 0 ? 0 : fuzzy_size - fwords.length;
      fwords.map(function (fw) {
        var _this5$_lookupKID = _this5._lookupKID(fw.key),
            idx = _this5$_lookupKID.idx,
            list = _this5$_lookupKID.list;

        return _this5._find_nabor(idx, Math.ceil(fuzzy_size / fwords.length), list).filter(function (item) {
          return _common["default"].levenshtein_distance(item.keyText, word) <= ed_gap;
        }).map(function (kitem) {
          return fuzzy_words.push({
            key: kitem.keyText,
            rofset: kitem.recordStartOffset,
            ed: _common["default"].levenshtein_distance(word, kitem.keyText)
          });
        });
      });
      return fuzzy_words;
    }
    /**
     * return word's lemmatizer
     * @param {string} phrase word phrase
     */

  }, {
    key: "lemmer",
    value: function lemmer(phrase) {
      return (0, _lemmatizer.lemmatizer)(phrase);
    }
  }, {
    key: "_loadSuggDict",
    value: function _loadSuggDict() {
      return new Promise(function (resolve, reject) {
        function onDictLoad(err, dict) {
          if (err) {
            reject(err);
          }

          resolve(dict);
        }

        (0, _dictionaryEnUs["default"])(onDictLoad);
      });
    }
  }, {
    key: "suggest",
    value: function suggest(phrase) {
      return this._loadSuggDict().then(function (dict) {
        var spell = (0, _nspell["default"])(dict);
        return spell.suggest(phrase);
      }, function (err) {
        throw err;
      });
    }
  }, {
    key: "_find_nabor",
    value: function _find_nabor(idx, fuzsize, list) {
      var imax = list.length;
      var istart = idx - fuzsize < 0 ? 0 : idx - fuzsize;
      var iend = idx + fuzsize > imax ? imax : idx + fuzsize;
      return list.slice(istart, iend);
    }
    /**
     * parse the definition by word and ofset
     * @param {string} word the target word
     * @param {number} rstartofset the record start offset (fuzzy_start rofset)
     */

  }, {
    key: "parse_defination",
    value: function parse_defination(word, rstartofset) {
      var rid = this._reduceRecordBlock(rstartofset);

      var _this$_lookupKID = this._lookupKID(word),
          idx = _this$_lookupKID.idx,
          list = _this$_lookupKID.list;

      var nextStart = idx + 1 >= list.length ? this._recordBlockStartOffset + this.recordBlockInfoList[this.recordBlockInfoList.length - 1].decompAccumulator + this.recordBlockInfoList[this.recordBlockInfoList.length - 1].decompSize : list[idx + 1].recordStartOffset;
      var startoffset = list[idx].recordStartOffset;

      if (rstartofset != startoffset) {
        // if args.rstartofset != list[idx].recordStartOffset
        // use args.rstartofset
        startoffset = rstartofset;
      }

      var data = this._decodeRecordBlockByRBID(rid, list[idx].keyText, startoffset, nextStart);

      return data;
    }
  }, {
    key: "rangeKeyWords",
    value: function rangeKeyWords() {
      return this._decodeKeyBlock();
    }
  }]);
  return Mdict;
}(_mdictBase["default"]);

var _default = Mdict;
exports["default"] = _default;