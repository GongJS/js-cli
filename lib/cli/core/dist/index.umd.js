(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('path'), require('child_process'), require('util'), require('events'), require('stream'), require('buffer'), require('os'), require('assert'), require('http'), require('https'), require('url'), require('zlib'), require('fs'), require('constants')) :
    typeof define === 'function' && define.amd ? define(['path', 'child_process', 'util', 'events', 'stream', 'buffer', 'os', 'assert', 'http', 'https', 'url', 'zlib', 'fs', 'constants'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["@js/core"] = factory(global.require$$1$1, global.cp, global.require$$0$1, global.require$$0, global.require$$0$2, global.require$$0$3, global.require$$0$4, global.require$$0$5, global.require$$1, global.require$$2, global.require$$0$6, global.require$$8, global.require$$0$7, global.require$$0$8));
})(this, (function (require$$1$1, cp, require$$0$1, require$$0, require$$0$2, require$$0$3, require$$0$4, require$$0$5, require$$1, require$$2, require$$0$6, require$$8, require$$0$7, require$$0$8) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$1);
    var cp__default = /*#__PURE__*/_interopDefaultLegacy(cp);
    var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
    var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
    var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
    var require$$0__default$3 = /*#__PURE__*/_interopDefaultLegacy(require$$0$3);
    var require$$0__default$4 = /*#__PURE__*/_interopDefaultLegacy(require$$0$4);
    var require$$0__default$5 = /*#__PURE__*/_interopDefaultLegacy(require$$0$5);
    var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
    var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
    var require$$0__default$6 = /*#__PURE__*/_interopDefaultLegacy(require$$0$6);
    var require$$8__default = /*#__PURE__*/_interopDefaultLegacy(require$$8);
    var require$$0__default$7 = /*#__PURE__*/_interopDefaultLegacy(require$$0$7);
    var require$$0__default$8 = /*#__PURE__*/_interopDefaultLegacy(require$$0$8);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter$3(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var log$2 = {exports: {}};

    var lib$2 = {};

    var trackerGroup = {exports: {}};

    var trackerBase = {exports: {}};

    var EventEmitter$1 = require$$0__default["default"].EventEmitter;
    var util$7 = require$$0__default$1["default"];

    var trackerId = 0;
    var TrackerBase$2 = trackerBase.exports = function (name) {
      EventEmitter$1.call(this);
      this.id = ++trackerId;
      this.name = name;
    };
    util$7.inherits(TrackerBase$2, EventEmitter$1);

    var tracker = {exports: {}};

    var util$6 = require$$0__default$1["default"];
    var TrackerBase$1 = trackerBase.exports;

    var Tracker$2 = tracker.exports = function (name, todo) {
      TrackerBase$1.call(this, name);
      this.workDone = 0;
      this.workTodo = todo || 0;
    };
    util$6.inherits(Tracker$2, TrackerBase$1);

    Tracker$2.prototype.completed = function () {
      return this.workTodo === 0 ? 0 : this.workDone / this.workTodo
    };

    Tracker$2.prototype.addWork = function (work) {
      this.workTodo += work;
      this.emit('change', this.name, this.completed(), this);
    };

    Tracker$2.prototype.completeWork = function (work) {
      this.workDone += work;
      if (this.workDone > this.workTodo) {
        this.workDone = this.workTodo;
      }
      this.emit('change', this.name, this.completed(), this);
    };

    Tracker$2.prototype.finish = function () {
      this.workTodo = this.workDone = 1;
      this.emit('change', this.name, 1, this);
    };

    var trackerStream = {exports: {}};

    var readable = {exports: {}};

    var stream$1 = require$$0__default$2["default"];

    function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

    var _require$2 = require$$0__default$3["default"],
        Buffer$4 = _require$2.Buffer;

    var _require2 = require$$0__default$1["default"],
        inspect = _require2.inspect;

    var custom = inspect && inspect.custom || 'inspect';

    function copyBuffer(src, target, offset) {
      Buffer$4.prototype.copy.call(src, target, offset);
    }

    var buffer_list =
    /*#__PURE__*/
    function () {
      function BufferList() {
        _classCallCheck(this, BufferList);

        this.head = null;
        this.tail = null;
        this.length = 0;
      }

      _createClass(BufferList, [{
        key: "push",
        value: function push(v) {
          var entry = {
            data: v,
            next: null
          };
          if (this.length > 0) this.tail.next = entry;else this.head = entry;
          this.tail = entry;
          ++this.length;
        }
      }, {
        key: "unshift",
        value: function unshift(v) {
          var entry = {
            data: v,
            next: this.head
          };
          if (this.length === 0) this.tail = entry;
          this.head = entry;
          ++this.length;
        }
      }, {
        key: "shift",
        value: function shift() {
          if (this.length === 0) return;
          var ret = this.head.data;
          if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
          --this.length;
          return ret;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
      }, {
        key: "join",
        value: function join(s) {
          if (this.length === 0) return '';
          var p = this.head;
          var ret = '' + p.data;

          while (p = p.next) {
            ret += s + p.data;
          }

          return ret;
        }
      }, {
        key: "concat",
        value: function concat(n) {
          if (this.length === 0) return Buffer$4.alloc(0);
          var ret = Buffer$4.allocUnsafe(n >>> 0);
          var p = this.head;
          var i = 0;

          while (p) {
            copyBuffer(p.data, ret, i);
            i += p.data.length;
            p = p.next;
          }

          return ret;
        } // Consumes a specified amount of bytes or characters from the buffered data.

      }, {
        key: "consume",
        value: function consume(n, hasStrings) {
          var ret;

          if (n < this.head.data.length) {
            // `slice` is the same for buffers and strings.
            ret = this.head.data.slice(0, n);
            this.head.data = this.head.data.slice(n);
          } else if (n === this.head.data.length) {
            // First chunk is a perfect match.
            ret = this.shift();
          } else {
            // Result spans more than one buffer.
            ret = hasStrings ? this._getString(n) : this._getBuffer(n);
          }

          return ret;
        }
      }, {
        key: "first",
        value: function first() {
          return this.head.data;
        } // Consumes a specified amount of characters from the buffered data.

      }, {
        key: "_getString",
        value: function _getString(n) {
          var p = this.head;
          var c = 1;
          var ret = p.data;
          n -= ret.length;

          while (p = p.next) {
            var str = p.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length) ret += str;else ret += str.slice(0, n);
            n -= nb;

            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p.next) this.head = p.next;else this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = str.slice(nb);
              }

              break;
            }

            ++c;
          }

          this.length -= c;
          return ret;
        } // Consumes a specified amount of bytes from the buffered data.

      }, {
        key: "_getBuffer",
        value: function _getBuffer(n) {
          var ret = Buffer$4.allocUnsafe(n);
          var p = this.head;
          var c = 1;
          p.data.copy(ret);
          n -= p.data.length;

          while (p = p.next) {
            var buf = p.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;

            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p.next) this.head = p.next;else this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = buf.slice(nb);
              }

              break;
            }

            ++c;
          }

          this.length -= c;
          return ret;
        } // Make sure the linked list only shows the minimal necessary information.

      }, {
        key: custom,
        value: function value(_, options) {
          return inspect(this, _objectSpread$1({}, options, {
            // Only inspect one level.
            depth: 0,
            // It should not recurse.
            customInspect: false
          }));
        }
      }]);

      return BufferList;
    }();

    function destroy(err, cb) {
      var _this = this;

      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;

      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err) {
          if (!this._writableState) {
            process.nextTick(emitErrorNT, this, err);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            process.nextTick(emitErrorNT, this, err);
          }
        }

        return this;
      } // we set destroyed to true before firing error callbacks in order
      // to make it re-entrance safe in case destroy() is called within callbacks


      if (this._readableState) {
        this._readableState.destroyed = true;
      } // if this is a duplex stream mark the writable part as destroyed as well


      if (this._writableState) {
        this._writableState.destroyed = true;
      }

      this._destroy(err || null, function (err) {
        if (!cb && err) {
          if (!_this._writableState) {
            process.nextTick(emitErrorAndCloseNT, _this, err);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            process.nextTick(emitErrorAndCloseNT, _this, err);
          } else {
            process.nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          process.nextTick(emitCloseNT, _this);
          cb(err);
        } else {
          process.nextTick(emitCloseNT, _this);
        }
      });

      return this;
    }

    function emitErrorAndCloseNT(self, err) {
      emitErrorNT(self, err);
      emitCloseNT(self);
    }

    function emitCloseNT(self) {
      if (self._writableState && !self._writableState.emitClose) return;
      if (self._readableState && !self._readableState.emitClose) return;
      self.emit('close');
    }

    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }

      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }

    function emitErrorNT(self, err) {
      self.emit('error', err);
    }

    function errorOrDestroy$2(stream, err) {
      // We have tests that rely on errors being emitted
      // in the same tick, so changing this is semver major.
      // For now when you opt-in to autoDestroy we allow
      // the error to be emitted nextTick. In a future
      // semver major update we should change the default to this.
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
    }

    var destroy_1 = {
      destroy: destroy,
      undestroy: undestroy,
      errorOrDestroy: errorOrDestroy$2
    };

    var errors = {};

    const codes = {};

    function createErrorType$1(code, message, Base) {
      if (!Base) {
        Base = Error;
      }

      function getMessage (arg1, arg2, arg3) {
        if (typeof message === 'string') {
          return message
        } else {
          return message(arg1, arg2, arg3)
        }
      }

      class NodeError extends Base {
        constructor (arg1, arg2, arg3) {
          super(getMessage(arg1, arg2, arg3));
        }
      }

      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;

      codes[code] = NodeError;
    }

    // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        const len = expected.length;
        expected = expected.map((i) => String(i));
        if (len > 2) {
          return `one of ${thing} ${expected.slice(0, len - 1).join(', ')}, or ` +
                 expected[len - 1];
        } else if (len === 2) {
          return `one of ${thing} ${expected[0]} or ${expected[1]}`;
        } else {
          return `of ${thing} ${expected[0]}`;
        }
      } else {
        return `of ${thing} ${String(expected)}`;
      }
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
    function startsWith(str, search, pos) {
    	return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
    function endsWith(str, search, this_len) {
    	if (this_len === undefined || this_len > str.length) {
    		this_len = str.length;
    	}
    	return str.substring(this_len - search.length, this_len) === search;
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
    function includes(str, search, start) {
      if (typeof start !== 'number') {
        start = 0;
      }

      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }

    createErrorType$1('ERR_INVALID_OPT_VALUE', function (name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"'
    }, TypeError);
    createErrorType$1('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
      // determiner: 'must be' or 'must not be'
      let determiner;
      if (typeof expected === 'string' && startsWith(expected, 'not ')) {
        determiner = 'must not be';
        expected = expected.replace(/^not /, '');
      } else {
        determiner = 'must be';
      }

      let msg;
      if (endsWith(name, ' argument')) {
        // For cases like 'first argument'
        msg = `The ${name} ${determiner} ${oneOf(expected, 'type')}`;
      } else {
        const type = includes(name, '.') ? 'property' : 'argument';
        msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, 'type')}`;
      }

      msg += `. Received type ${typeof actual}`;
      return msg;
    }, TypeError);
    createErrorType$1('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
    createErrorType$1('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
      return 'The ' + name + ' method is not implemented'
    });
    createErrorType$1('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
    createErrorType$1('ERR_STREAM_DESTROYED', function (name) {
      return 'Cannot call ' + name + ' after a stream was destroyed';
    });
    createErrorType$1('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
    createErrorType$1('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
    createErrorType$1('ERR_STREAM_WRITE_AFTER_END', 'write after end');
    createErrorType$1('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
    createErrorType$1('ERR_UNKNOWN_ENCODING', function (arg) {
      return 'Unknown encoding: ' + arg
    }, TypeError);
    createErrorType$1('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');

    errors.codes = codes;

    var ERR_INVALID_OPT_VALUE = errors.codes.ERR_INVALID_OPT_VALUE;

    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }

    function getHighWaterMark$2(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : 'highWaterMark';
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }

        return Math.floor(hwm);
      } // Default value


      return state.objectMode ? 16 : 16 * 1024;
    }

    var state = {
      getHighWaterMark: getHighWaterMark$2
    };

    var inherits = {exports: {}};

    var inherits_browser = {exports: {}};

    if (typeof Object.create === 'function') {
      // implementation from standard node.js 'util' module
      inherits_browser.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      // old school shim for old browsers
      inherits_browser.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function () {};
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }

    try {
      var util$5 = require('util');
      /* istanbul ignore next */
      if (typeof util$5.inherits !== 'function') throw '';
      inherits.exports = util$5.inherits;
    } catch (e) {
      /* istanbul ignore next */
      inherits.exports = inherits_browser.exports;
    }

    /**
     * For Node.js, simply re-export the core `util.deprecate` function.
     */

    var node = require$$0__default$1["default"].deprecate;

    var _stream_writable = Writable$2;
    // there will be only 2 of these for each stream


    function CorkedRequest(state) {
      var _this = this;

      this.next = null;
      this.entry = null;

      this.finish = function () {
        onCorkedFinish(_this, state);
      };
    }
    /* </replacement> */

    /*<replacement>*/


    var Duplex$3;
    /*</replacement>*/

    Writable$2.WritableState = WritableState;
    /*<replacement>*/

    var internalUtil = {
      deprecate: node
    };
    /*</replacement>*/

    /*<replacement>*/

    var Stream$2 = stream$1;
    /*</replacement>*/


    var Buffer$3 = require$$0__default$3["default"].Buffer;

    var OurUint8Array$1 = commonjsGlobal.Uint8Array || function () {};

    function _uint8ArrayToBuffer$1(chunk) {
      return Buffer$3.from(chunk);
    }

    function _isUint8Array$1(obj) {
      return Buffer$3.isBuffer(obj) || obj instanceof OurUint8Array$1;
    }

    var destroyImpl$1 = destroy_1;

    var _require$1 = state,
        getHighWaterMark$1 = _require$1.getHighWaterMark;

    var _require$codes$3 = errors.codes,
        ERR_INVALID_ARG_TYPE$2 = _require$codes$3.ERR_INVALID_ARG_TYPE,
        ERR_METHOD_NOT_IMPLEMENTED$2 = _require$codes$3.ERR_METHOD_NOT_IMPLEMENTED,
        ERR_MULTIPLE_CALLBACK$1 = _require$codes$3.ERR_MULTIPLE_CALLBACK,
        ERR_STREAM_CANNOT_PIPE = _require$codes$3.ERR_STREAM_CANNOT_PIPE,
        ERR_STREAM_DESTROYED$1 = _require$codes$3.ERR_STREAM_DESTROYED,
        ERR_STREAM_NULL_VALUES = _require$codes$3.ERR_STREAM_NULL_VALUES,
        ERR_STREAM_WRITE_AFTER_END = _require$codes$3.ERR_STREAM_WRITE_AFTER_END,
        ERR_UNKNOWN_ENCODING = _require$codes$3.ERR_UNKNOWN_ENCODING;

    var errorOrDestroy$1 = destroyImpl$1.errorOrDestroy;

    inherits.exports(Writable$2, Stream$2);

    function nop() {}

    function WritableState(options, stream, isDuplex) {
      Duplex$3 = Duplex$3 || _stream_duplex;
      options = options || {}; // Duplex streams are both readable and writable, but share
      // the same options object.
      // However, some cases require setting options to different
      // values for the readable and the writable sides of the duplex stream,
      // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

      if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex$3; // object stream flag to indicate whether or not this stream
      // contains buffers or objects.

      this.objectMode = !!options.objectMode;
      if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
      // Note: 0 is a valid value, means that we always return false if
      // the entire buffer is not flushed immediately on write()

      this.highWaterMark = getHighWaterMark$1(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

      this.finalCalled = false; // drain event flag.

      this.needDrain = false; // at the start of calling end()

      this.ending = false; // when end() has been called, and returned

      this.ended = false; // when 'finish' is emitted

      this.finished = false; // has it been destroyed

      this.destroyed = false; // should we decode strings into buffers before passing to _write?
      // this is here so that some node-core streams can optimize string
      // handling at a lower level.

      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
      // encoding is 'binary' so we have to make this configurable.
      // Everything else in the universe uses 'utf8', though.

      this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
      // of how much we're waiting to get pushed to some underlying
      // socket or file.

      this.length = 0; // a flag to see when we're in the middle of a write.

      this.writing = false; // when true all writes will be buffered until .uncork() call

      this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
      // or on a later tick.  We set this to true at first, because any
      // actions that shouldn't happen until "later" should generally also
      // not happen before the first write call.

      this.sync = true; // a flag to know if we're processing previously buffered items, which
      // may call the _write() callback in the same tick, so that we don't
      // end up in an overlapped onwrite situation.

      this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

      this.onwrite = function (er) {
        onwrite(stream, er);
      }; // the callback that the user supplies to write(chunk,encoding,cb)


      this.writecb = null; // the amount that is being written when _write is called.

      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
      // this must be 0 before 'finish' can be emitted

      this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
      // This is relevant for synchronous Transform streams

      this.prefinished = false; // True if the error was already emitted and should not be thrown again

      this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

      this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

      this.autoDestroy = !!options.autoDestroy; // count buffered requests

      this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
      // one allocated and free to use, and we maintain at most two

      this.corkedRequestsFree = new CorkedRequest(this);
    }

    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];

      while (current) {
        out.push(current);
        current = current.next;
      }

      return out;
    };

    (function () {
      try {
        Object.defineProperty(WritableState.prototype, 'buffer', {
          get: internalUtil.deprecate(function writableStateBufferGetter() {
            return this.getBuffer();
          }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
        });
      } catch (_) {}
    })(); // Test _writableState for inheritance to account for Duplex streams,
    // whose prototype chain only points to Readable.


    var realHasInstance;

    if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable$2, Symbol.hasInstance, {
        value: function value(object) {
          if (realHasInstance.call(this, object)) return true;
          if (this !== Writable$2) return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function realHasInstance(object) {
        return object instanceof this;
      };
    }

    function Writable$2(options) {
      Duplex$3 = Duplex$3 || _stream_duplex; // Writable ctor is applied to Duplexes, too.
      // `realHasInstance` is necessary because using plain `instanceof`
      // would return false, as no `_writableState` property is attached.
      // Trying to use the custom `instanceof` for Writable here will also break the
      // Node.js LazyTransform implementation, which has a non-trivial getter for
      // `_writableState` that would lead to infinite recursion.
      // Checking for a Stream.Duplex instance is faster here instead of inside
      // the WritableState constructor, at least with V8 6.5

      var isDuplex = this instanceof Duplex$3;
      if (!isDuplex && !realHasInstance.call(Writable$2, this)) return new Writable$2(options);
      this._writableState = new WritableState(options, this, isDuplex); // legacy.

      this.writable = true;

      if (options) {
        if (typeof options.write === 'function') this._write = options.write;
        if (typeof options.writev === 'function') this._writev = options.writev;
        if (typeof options.destroy === 'function') this._destroy = options.destroy;
        if (typeof options.final === 'function') this._final = options.final;
      }

      Stream$2.call(this);
    } // Otherwise people can pipe Writable streams, which is just wrong.


    Writable$2.prototype.pipe = function () {
      errorOrDestroy$1(this, new ERR_STREAM_CANNOT_PIPE());
    };

    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

      errorOrDestroy$1(stream, er);
      process.nextTick(cb, er);
    } // Checks that a user-supplied chunk is valid, especially for the particular
    // mode the stream is in. Currently this means that `null` is never accepted
    // and undefined/non-string values are only allowed in object mode.


    function validChunk(stream, state, chunk, cb) {
      var er;

      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== 'string' && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE$2('chunk', ['string', 'Buffer'], chunk);
      }

      if (er) {
        errorOrDestroy$1(stream, er);
        process.nextTick(cb, er);
        return false;
      }

      return true;
    }

    Writable$2.prototype.write = function (chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;

      var isBuf = !state.objectMode && _isUint8Array$1(chunk);

      if (isBuf && !Buffer$3.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer$1(chunk);
      }

      if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
      }

      if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
      if (typeof cb !== 'function') cb = nop;
      if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };

    Writable$2.prototype.cork = function () {
      this._writableState.corked++;
    };

    Writable$2.prototype.uncork = function () {
      var state = this._writableState;

      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
      }
    };

    Writable$2.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      // node::ParseEncoding() requires lower case.
      if (typeof encoding === 'string') encoding = encoding.toLowerCase();
      if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };

    Object.defineProperty(Writable$2.prototype, 'writableBuffer', {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });

    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
        chunk = Buffer$3.from(chunk, encoding);
      }

      return chunk;
    }

    Object.defineProperty(Writable$2.prototype, 'writableHighWaterMark', {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    }); // if we're already writing something, then just put this
    // in the queue, and wait our turn.  Otherwise, call _write
    // If we return false, then we need a drain event, so set that flag.

    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);

        if (chunk !== newChunk) {
          isBuf = true;
          encoding = 'buffer';
          chunk = newChunk;
        }
      }

      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

      if (!ret) state.needDrain = true;

      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk: chunk,
          encoding: encoding,
          isBuf: isBuf,
          callback: cb,
          next: null
        };

        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }

        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }

      return ret;
    }

    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED$1('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }

    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;

      if (sync) {
        // defer the callback if we are being called synchronously
        // to avoid piling up things on the stack
        process.nextTick(cb, er); // this can emit finish, and it will always happen
        // after error

        process.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy$1(stream, er);
      } else {
        // the caller expect this to happen before if
        // it is async
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy$1(stream, er); // this can emit finish, but finish must
        // always follow error

        finishMaybe(stream, state);
      }
    }

    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }

    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK$1();
      onwriteStateUpdate(state);
      if (er) onwriteError(stream, state, sync, er, cb);else {
        // Check if we're actually ready to finish, but don't emit yet
        var finished = needFinish(state) || stream.destroyed;

        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }

        if (sync) {
          process.nextTick(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }

    function afterWrite(stream, state, finished, cb) {
      if (!finished) onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    } // Must force callback to be called on nextTick, so that we don't
    // emit 'drain' before the write() consumer gets the 'false' return
    // value, and has a chance to attach a 'drain' listener.


    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit('drain');
      }
    } // if there's something in the buffer waiting, then process it


    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;

      if (stream._writev && entry && entry.next) {
        // Fast case, write everything using _writev()
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;

        while (entry) {
          buffer[count] = entry;
          if (!entry.isBuf) allBuffers = false;
          entry = entry.next;
          count += 1;
        }

        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
        // as the hot path ends with doWrite

        state.pendingcb++;
        state.lastBufferedRequest = null;

        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }

        state.bufferedRequestCount = 0;
      } else {
        // Slow case, write chunks one-by-one
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
          // it means that we need to wait until it does.
          // also, that means that the chunk and cb are currently
          // being processed, so move the buffer counter past them.

          if (state.writing) {
            break;
          }
        }

        if (entry === null) state.lastBufferedRequest = null;
      }

      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }

    Writable$2.prototype._write = function (chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED$2('_write()'));
    };

    Writable$2.prototype._writev = null;

    Writable$2.prototype.end = function (chunk, encoding, cb) {
      var state = this._writableState;

      if (typeof chunk === 'function') {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
      }

      if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

      if (state.corked) {
        state.corked = 1;
        this.uncork();
      } // ignore unnecessary end() calls.


      if (!state.ending) endWritable(this, state, cb);
      return this;
    };

    Object.defineProperty(Writable$2.prototype, 'writableLength', {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });

    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }

    function callFinal(stream, state) {
      stream._final(function (err) {
        state.pendingcb--;

        if (err) {
          errorOrDestroy$1(stream, err);
        }

        state.prefinished = true;
        stream.emit('prefinish');
        finishMaybe(stream, state);
      });
    }

    function prefinish$1(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === 'function' && !state.destroyed) {
          state.pendingcb++;
          state.finalCalled = true;
          process.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit('prefinish');
        }
      }
    }

    function finishMaybe(stream, state) {
      var need = needFinish(state);

      if (need) {
        prefinish$1(stream, state);

        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit('finish');

          if (state.autoDestroy) {
            // In case of duplex streams we need a way to detect
            // if the readable side is ready for autoDestroy as well
            var rState = stream._readableState;

            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }

      return need;
    }

    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);

      if (cb) {
        if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
      }

      state.ended = true;
      stream.writable = false;
    }

    function onCorkedFinish(corkReq, state, err) {
      var entry = corkReq.entry;
      corkReq.entry = null;

      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      } // reuse the free corkReq.


      state.corkedRequestsFree.next = corkReq;
    }

    Object.defineProperty(Writable$2.prototype, 'destroyed', {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._writableState === undefined) {
          return false;
        }

        return this._writableState.destroyed;
      },
      set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (!this._writableState) {
          return;
        } // backward compatibility, the user is explicitly
        // managing destroyed


        this._writableState.destroyed = value;
      }
    });
    Writable$2.prototype.destroy = destroyImpl$1.destroy;
    Writable$2.prototype._undestroy = destroyImpl$1.undestroy;

    Writable$2.prototype._destroy = function (err, cb) {
      cb(err);
    };

    /*<replacement>*/

    var objectKeys = Object.keys || function (obj) {
      var keys = [];

      for (var key in obj) {
        keys.push(key);
      }

      return keys;
    };
    /*</replacement>*/


    var _stream_duplex = Duplex$2;

    var Readable$1 = _stream_readable;

    var Writable$1 = _stream_writable;

    inherits.exports(Duplex$2, Readable$1);

    {
      // Allow the keys array to be GC'ed.
      var keys = objectKeys(Writable$1.prototype);

      for (var v = 0; v < keys.length; v++) {
        var method = keys[v];
        if (!Duplex$2.prototype[method]) Duplex$2.prototype[method] = Writable$1.prototype[method];
      }
    }

    function Duplex$2(options) {
      if (!(this instanceof Duplex$2)) return new Duplex$2(options);
      Readable$1.call(this, options);
      Writable$1.call(this, options);
      this.allowHalfOpen = true;

      if (options) {
        if (options.readable === false) this.readable = false;
        if (options.writable === false) this.writable = false;

        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once('end', onend);
        }
      }
    }

    Object.defineProperty(Duplex$2.prototype, 'writableHighWaterMark', {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    Object.defineProperty(Duplex$2.prototype, 'writableBuffer', {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    Object.defineProperty(Duplex$2.prototype, 'writableLength', {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    }); // the no-half-open enforcer

    function onend() {
      // If the writable side ended, then we're ok.
      if (this._writableState.ended) return; // no more data can be written.
      // But allow more writes to happen in this tick.

      process.nextTick(onEndNT, this);
    }

    function onEndNT(self) {
      self.end();
    }

    Object.defineProperty(Duplex$2.prototype, 'destroyed', {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === undefined || this._writableState === undefined) {
          return false;
        }

        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (this._readableState === undefined || this._writableState === undefined) {
          return;
        } // backward compatibility, the user is explicitly
        // managing destroyed


        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });

    var string_decoder = {};

    var safeBuffer = {exports: {}};

    /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

    (function (module, exports) {
    /* eslint-disable node/no-deprecated-api */
    var buffer = require$$0__default$3["default"];
    var Buffer = buffer.Buffer;

    // alternative to using Object.keys for old browsers
    function copyProps (src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      // Copy properties from require('buffer')
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }

    function SafeBuffer (arg, encodingOrOffset, length) {
      return Buffer(arg, encodingOrOffset, length)
    }

    SafeBuffer.prototype = Object.create(Buffer.prototype);

    // Copy static methods from Buffer
    copyProps(Buffer, SafeBuffer);

    SafeBuffer.from = function (arg, encodingOrOffset, length) {
      if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number')
      }
      return Buffer(arg, encodingOrOffset, length)
    };

    SafeBuffer.alloc = function (size, fill, encoding) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number')
      }
      var buf = Buffer(size);
      if (fill !== undefined) {
        if (typeof encoding === 'string') {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf
    };

    SafeBuffer.allocUnsafe = function (size) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number')
      }
      return Buffer(size)
    };

    SafeBuffer.allocUnsafeSlow = function (size) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number')
      }
      return buffer.SlowBuffer(size)
    };
    }(safeBuffer, safeBuffer.exports));

    /*<replacement>*/

    var Buffer$2 = safeBuffer.exports.Buffer;
    /*</replacement>*/

    var isEncoding = Buffer$2.isEncoding || function (encoding) {
      encoding = '' + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
          return true;
        default:
          return false;
      }
    };

    function _normalizeEncoding(enc) {
      if (!enc) return 'utf8';
      var retried;
      while (true) {
        switch (enc) {
          case 'utf8':
          case 'utf-8':
            return 'utf8';
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return 'utf16le';
          case 'latin1':
          case 'binary':
            return 'latin1';
          case 'base64':
          case 'ascii':
          case 'hex':
            return enc;
          default:
            if (retried) return; // undefined
            enc = ('' + enc).toLowerCase();
            retried = true;
        }
      }
    }
    // Do not cache `Buffer.isEncoding` when checking encoding names as some
    // modules monkey-patch it to support additional encodings
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== 'string' && (Buffer$2.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
      return nenc || enc;
    }

    // StringDecoder provides an interface for efficiently splitting a series of
    // buffers into a series of JS strings without breaking apart multi-byte
    // characters.
    string_decoder.StringDecoder = StringDecoder$1;
    function StringDecoder$1(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case 'utf16le':
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case 'utf8':
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case 'base64':
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer$2.allocUnsafe(nb);
    }

    StringDecoder$1.prototype.write = function (buf) {
      if (buf.length === 0) return '';
      var r;
      var i;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined) return '';
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }
      if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || '';
    };

    StringDecoder$1.prototype.end = utf8End;

    // Returns only complete characters in a Buffer
    StringDecoder$1.prototype.text = utf8Text;

    // Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
    StringDecoder$1.prototype.fillLast = function (buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };

    // Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
    // continuation byte. If an invalid byte is detected, -2 is returned.
    function utf8CheckByte(byte) {
      if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
      return byte >> 6 === 0x02 ? -1 : -2;
    }

    // Checks at most 3 bytes at the end of a Buffer in order to detect an
    // incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
    // needed to complete the UTF-8 character (if applicable) are returned.
    function utf8CheckIncomplete(self, buf, i) {
      var j = buf.length - 1;
      if (j < i) return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }

    // Validates as many continuation bytes for a multi-byte UTF-8 character as
    // needed or are available. If we see a non-continuation byte where we expect
    // one, we "replace" the validated continuation bytes we've seen so far with
    // a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
    // behavior. The continuation byte check is included three times in the case
    // where all of the continuation bytes for a character exist in the same buffer.
    // It is also done this way as a slight performance increase instead of using a
    // loop.
    function utf8CheckExtraBytes(self, buf, p) {
      if ((buf[0] & 0xC0) !== 0x80) {
        self.lastNeed = 0;
        return '\ufffd';
      }
      if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xC0) !== 0x80) {
          self.lastNeed = 1;
          return '\ufffd';
        }
        if (self.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 0xC0) !== 0x80) {
            self.lastNeed = 2;
            return '\ufffd';
          }
        }
      }
    }

    // Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf);
      if (r !== undefined) return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }

    // Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
    // partial character, the character's bytes are buffered until the required
    // number of bytes are available.
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed) return buf.toString('utf8', i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString('utf8', i, end);
    }

    // For UTF-8, a replacement character is added when ending on a partial
    // character.
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : '';
      if (this.lastNeed) return r + '\ufffd';
      return r;
    }

    // UTF-16LE typically needs two bytes per character, but even if we have an even
    // number of bytes available, we need to check if we end on a leading/high
    // surrogate. In that case, we need to wait for the next two bytes in order to
    // decode the last character properly.
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString('utf16le', i);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 0xD800 && c <= 0xDBFF) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }
        return r;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString('utf16le', i, buf.length - 1);
    }

    // For UTF-16LE we do not explicitly append special replacement characters if we
    // end on a partial character, we simply let v8 handle that.
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : '';
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString('utf16le', 0, end);
      }
      return r;
    }

    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0) return buf.toString('base64', i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString('base64', i, buf.length - n);
    }

    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : '';
      if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
      return r;
    }

    // Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }

    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : '';
    }

    var ERR_STREAM_PREMATURE_CLOSE = errors.codes.ERR_STREAM_PREMATURE_CLOSE;

    function once$1(callback) {
      var called = false;
      return function () {
        if (called) return;
        called = true;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        callback.apply(this, args);
      };
    }

    function noop$3() {}

    function isRequest$1(stream) {
      return stream.setHeader && typeof stream.abort === 'function';
    }

    function eos$1(stream, opts, callback) {
      if (typeof opts === 'function') return eos$1(stream, null, opts);
      if (!opts) opts = {};
      callback = once$1(callback || noop$3);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;

      var onlegacyfinish = function onlegacyfinish() {
        if (!stream.writable) onfinish();
      };

      var writableEnded = stream._writableState && stream._writableState.finished;

      var onfinish = function onfinish() {
        writable = false;
        writableEnded = true;
        if (!readable) callback.call(stream);
      };

      var readableEnded = stream._readableState && stream._readableState.endEmitted;

      var onend = function onend() {
        readable = false;
        readableEnded = true;
        if (!writable) callback.call(stream);
      };

      var onerror = function onerror(err) {
        callback.call(stream, err);
      };

      var onclose = function onclose() {
        var err;

        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }

        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      };

      var onrequest = function onrequest() {
        stream.req.on('finish', onfinish);
      };

      if (isRequest$1(stream)) {
        stream.on('complete', onfinish);
        stream.on('abort', onclose);
        if (stream.req) onrequest();else stream.on('request', onrequest);
      } else if (writable && !stream._writableState) {
        // legacy streams
        stream.on('end', onlegacyfinish);
        stream.on('close', onlegacyfinish);
      }

      stream.on('end', onend);
      stream.on('finish', onfinish);
      if (opts.error !== false) stream.on('error', onerror);
      stream.on('close', onclose);
      return function () {
        stream.removeListener('complete', onfinish);
        stream.removeListener('abort', onclose);
        stream.removeListener('request', onrequest);
        if (stream.req) stream.req.removeListener('finish', onfinish);
        stream.removeListener('end', onlegacyfinish);
        stream.removeListener('close', onlegacyfinish);
        stream.removeListener('finish', onfinish);
        stream.removeListener('end', onend);
        stream.removeListener('error', onerror);
        stream.removeListener('close', onclose);
      };
    }

    var endOfStream = eos$1;

    var _Object$setPrototypeO;

    function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var finished = endOfStream;

    var kLastResolve = Symbol('lastResolve');
    var kLastReject = Symbol('lastReject');
    var kError = Symbol('error');
    var kEnded = Symbol('ended');
    var kLastPromise = Symbol('lastPromise');
    var kHandlePromise = Symbol('handlePromise');
    var kStream = Symbol('stream');

    function createIterResult(value, done) {
      return {
        value: value,
        done: done
      };
    }

    function readAndResolve(iter) {
      var resolve = iter[kLastResolve];

      if (resolve !== null) {
        var data = iter[kStream].read(); // we defer if data is null
        // we can be expecting either 'end' or
        // 'error'

        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve(createIterResult(data, false));
        }
      }
    }

    function onReadable(iter) {
      // we wait for the next tick, because it might
      // emit an error with process.nextTick
      process.nextTick(readAndResolve, iter);
    }

    function wrapForNext(lastPromise, iter) {
      return function (resolve, reject) {
        lastPromise.then(function () {
          if (iter[kEnded]) {
            resolve(createIterResult(undefined, true));
            return;
          }

          iter[kHandlePromise](resolve, reject);
        }, reject);
      };
    }

    var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },

      next: function next() {
        var _this = this;

        // if we have detected an error in the meanwhile
        // reject straight away
        var error = this[kError];

        if (error !== null) {
          return Promise.reject(error);
        }

        if (this[kEnded]) {
          return Promise.resolve(createIterResult(undefined, true));
        }

        if (this[kStream].destroyed) {
          // We need to defer via nextTick because if .destroy(err) is
          // called, the error will be emitted via nextTick, and
          // we cannot guarantee that there is no error lingering around
          // waiting to be emitted.
          return new Promise(function (resolve, reject) {
            process.nextTick(function () {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve(createIterResult(undefined, true));
              }
            });
          });
        } // if we have multiple next() calls
        // we will wait for the previous Promise to finish
        // this logic is optimized to support for await loops,
        // where next() is only called once at a time


        var lastPromise = this[kLastPromise];
        var promise;

        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          // fast path needed to support multiple this.push()
          // without triggering the next() queue
          var data = this[kStream].read();

          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }

          promise = new Promise(this[kHandlePromise]);
        }

        this[kLastPromise] = promise;
        return promise;
      }
    }, _defineProperty$1(_Object$setPrototypeO, Symbol.asyncIterator, function () {
      return this;
    }), _defineProperty$1(_Object$setPrototypeO, "return", function _return() {
      var _this2 = this;

      // destroy(err, cb) is a private API
      // we can guarantee we have that here, because we control the
      // Readable class this is attached to
      return new Promise(function (resolve, reject) {
        _this2[kStream].destroy(null, function (err) {
          if (err) {
            reject(err);
            return;
          }

          resolve(createIterResult(undefined, true));
        });
      });
    }), _Object$setPrototypeO), AsyncIteratorPrototype);

    var createReadableStreamAsyncIterator$1 = function createReadableStreamAsyncIterator(stream) {
      var _Object$create;

      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty$1(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty$1(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty$1(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty$1(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty$1(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty$1(_Object$create, kHandlePromise, {
        value: function value(resolve, reject) {
          var data = iterator[kStream].read();

          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve;
            iterator[kLastReject] = reject;
          }
        },
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished(stream, function (err) {
        if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
          var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
          // returned by next() and store the error

          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err);
          }

          iterator[kError] = err;
          return;
        }

        var resolve = iterator[kLastResolve];

        if (resolve !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve(createIterResult(undefined, true));
        }

        iterator[kEnded] = true;
      });
      stream.on('readable', onReadable.bind(null, iterator));
      return iterator;
    };

    var async_iterator = createReadableStreamAsyncIterator$1;

    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

    function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var ERR_INVALID_ARG_TYPE$1 = errors.codes.ERR_INVALID_ARG_TYPE;

    function from$1(Readable, iterable, opts) {
      var iterator;

      if (iterable && typeof iterable.next === 'function') {
        iterator = iterable;
      } else if (iterable && iterable[Symbol.asyncIterator]) iterator = iterable[Symbol.asyncIterator]();else if (iterable && iterable[Symbol.iterator]) iterator = iterable[Symbol.iterator]();else throw new ERR_INVALID_ARG_TYPE$1('iterable', ['Iterable'], iterable);

      var readable = new Readable(_objectSpread({
        objectMode: true
      }, opts)); // Reading boolean to protect against _read
      // being called before last iteration completion.

      var reading = false;

      readable._read = function () {
        if (!reading) {
          reading = true;
          next();
        }
      };

      function next() {
        return _next2.apply(this, arguments);
      }

      function _next2() {
        _next2 = _asyncToGenerator(function* () {
          try {
            var _ref = yield iterator.next(),
                value = _ref.value,
                done = _ref.done;

            if (done) {
              readable.push(null);
            } else if (readable.push((yield value))) {
              next();
            } else {
              reading = false;
            }
          } catch (err) {
            readable.destroy(err);
          }
        });
        return _next2.apply(this, arguments);
      }

      return readable;
    }

    var from_1 = from$1;

    var _stream_readable = Readable;
    /*<replacement>*/

    var Duplex$1;
    /*</replacement>*/

    Readable.ReadableState = ReadableState;
    /*<replacement>*/

    require$$0__default["default"].EventEmitter;

    var EElistenerCount = function EElistenerCount(emitter, type) {
      return emitter.listeners(type).length;
    };
    /*</replacement>*/

    /*<replacement>*/


    var Stream$1 = stream$1;
    /*</replacement>*/


    var Buffer$1 = require$$0__default$3["default"].Buffer;

    var OurUint8Array = commonjsGlobal.Uint8Array || function () {};

    function _uint8ArrayToBuffer(chunk) {
      return Buffer$1.from(chunk);
    }

    function _isUint8Array(obj) {
      return Buffer$1.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    /*<replacement>*/


    var debugUtil = require$$0__default$1["default"];

    var debug$7;

    if (debugUtil && debugUtil.debuglog) {
      debug$7 = debugUtil.debuglog('stream');
    } else {
      debug$7 = function debug() {};
    }
    /*</replacement>*/


    var BufferList = buffer_list;

    var destroyImpl = destroy_1;

    var _require = state,
        getHighWaterMark = _require.getHighWaterMark;

    var _require$codes$2 = errors.codes,
        ERR_INVALID_ARG_TYPE = _require$codes$2.ERR_INVALID_ARG_TYPE,
        ERR_STREAM_PUSH_AFTER_EOF = _require$codes$2.ERR_STREAM_PUSH_AFTER_EOF,
        ERR_METHOD_NOT_IMPLEMENTED$1 = _require$codes$2.ERR_METHOD_NOT_IMPLEMENTED,
        ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes$2.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


    var StringDecoder;
    var createReadableStreamAsyncIterator;
    var from;

    inherits.exports(Readable, Stream$1);

    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

    function prependListener(emitter, event, fn) {
      // Sadly this is not cacheable as some libraries bundle their own
      // event emitter implementation with them.
      if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
      // userland ones.  NEVER DO THIS. This is here only because this code needs
      // to continue to work with older versions of Node.js that do not include
      // the prependListener() method. The goal is to eventually remove this hack.

      if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
    }

    function ReadableState(options, stream, isDuplex) {
      Duplex$1 = Duplex$1 || _stream_duplex;
      options = options || {}; // Duplex streams are both readable and writable, but share
      // the same options object.
      // However, some cases require setting options to different
      // values for the readable and the writable sides of the duplex stream.
      // These options can be provided separately as readableXXX and writableXXX.

      if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex$1; // object stream flag. Used to make read(n) ignore n and to
      // make all the buffer merging and length checks go away

      this.objectMode = !!options.objectMode;
      if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
      // Note: 0 is a valid value, means "don't call _read preemptively ever"

      this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
      // linked list can remove elements from the beginning faster than
      // array.shift()

      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
      // immediately, or on a later tick.  We set this to true at first, because
      // any actions that shouldn't happen until "later" should generally also
      // not happen before the first read call.

      this.sync = true; // whenever we return null, then we set a flag to say
      // that we're awaiting a 'readable' event emission.

      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true; // Should close be emitted on destroy. Defaults to true.

      this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

      this.autoDestroy = !!options.autoDestroy; // has it been destroyed

      this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
      // encoding is 'binary' so we have to make this configurable.
      // Everything else in the universe uses 'utf8', though.

      this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

      this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;

      if (options.encoding) {
        if (!StringDecoder) StringDecoder = string_decoder.StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }

    function Readable(options) {
      Duplex$1 = Duplex$1 || _stream_duplex;
      if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
      // the ReadableState constructor, at least with V8 6.5

      var isDuplex = this instanceof Duplex$1;
      this._readableState = new ReadableState(options, this, isDuplex); // legacy

      this.readable = true;

      if (options) {
        if (typeof options.read === 'function') this._read = options.read;
        if (typeof options.destroy === 'function') this._destroy = options.destroy;
      }

      Stream$1.call(this);
    }

    Object.defineProperty(Readable.prototype, 'destroyed', {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === undefined) {
          return false;
        }

        return this._readableState.destroyed;
      },
      set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (!this._readableState) {
          return;
        } // backward compatibility, the user is explicitly
        // managing destroyed


        this._readableState.destroyed = value;
      }
    });
    Readable.prototype.destroy = destroyImpl.destroy;
    Readable.prototype._undestroy = destroyImpl.undestroy;

    Readable.prototype._destroy = function (err, cb) {
      cb(err);
    }; // Manually shove something into the read() buffer.
    // This returns true if the highWaterMark has not been hit yet,
    // similar to how Writable.write() returns true if you should
    // write() some more.


    Readable.prototype.push = function (chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;

      if (!state.objectMode) {
        if (typeof chunk === 'string') {
          encoding = encoding || state.defaultEncoding;

          if (encoding !== state.encoding) {
            chunk = Buffer$1.from(chunk, encoding);
            encoding = '';
          }

          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }

      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    }; // Unshift should *always* be something directly out of read()


    Readable.prototype.unshift = function (chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };

    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug$7('readableAddChunk', chunk);
      var state = stream._readableState;

      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck) er = chunkInvalid(state, chunk);

        if (er) {
          errorOrDestroy(stream, er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer$1.prototype) {
            chunk = _uint8ArrayToBuffer(chunk);
          }

          if (addToFront) {
            if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed) {
            return false;
          } else {
            state.reading = false;

            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
          maybeReadMore(stream, state);
        }
      } // We can push more data if we are below the highWaterMark.
      // Also, if we have no data yet, we can stand some more bytes.
      // This is to work around cases where hwm=0, such as the repl.


      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }

    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit('data', chunk);
      } else {
        // update the buffer info.
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
        if (state.needReadable) emitReadable(stream);
      }

      maybeReadMore(stream, state);
    }

    function chunkInvalid(state, chunk) {
      var er;

      if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
      }

      return er;
    }

    Readable.prototype.isPaused = function () {
      return this._readableState.flowing === false;
    }; // backwards compatibility.


    Readable.prototype.setEncoding = function (enc) {
      if (!StringDecoder) StringDecoder = string_decoder.StringDecoder;
      var decoder = new StringDecoder(enc);
      this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

      this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

      var p = this._readableState.buffer.head;
      var content = '';

      while (p !== null) {
        content += decoder.write(p.data);
        p = p.next;
      }

      this._readableState.buffer.clear();

      if (content !== '') this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    }; // Don't raise the hwm > 1GB


    var MAX_HWM = 0x40000000;

    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
        n = MAX_HWM;
      } else {
        // Get the next highest power of 2 to prevent increasing hwm excessively in
        // tiny amounts
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }

      return n;
    } // This function is designed to be inlinable, so please take care when making
    // changes to the function body.


    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended) return 0;
      if (state.objectMode) return 1;

      if (n !== n) {
        // Only flow one buffer at a time
        if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
      } // If we're asking for more than the current hwm, then raise the hwm.


      if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state.length) return n; // Don't have enough

      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }

      return state.length;
    } // you can override either this method, or the async _read(n) below.


    Readable.prototype.read = function (n) {
      debug$7('read', n);
      n = parseInt(n, 10);
      var state = this._readableState;
      var nOrig = n;
      if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
      // already have a bunch of data in the buffer, then just trigger
      // the 'readable' event and move on.

      if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug$7('read: emitReadable', state.length, state.ended);
        if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
        return null;
      }

      n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

      if (n === 0 && state.ended) {
        if (state.length === 0) endReadable(this);
        return null;
      } // All the actual chunk generation logic needs to be
      // *below* the call to _read.  The reason is that in certain
      // synthetic stream cases, such as passthrough streams, _read
      // may be a completely synchronous operation which may change
      // the state of the read buffer, providing enough data when
      // before there was *not* enough.
      //
      // So, the steps are:
      // 1. Figure out what the state of things will be after we do
      // a read from the buffer.
      //
      // 2. If that resulting state will trigger a _read, then call _read.
      // Note that this may be asynchronous, or synchronous.  Yes, it is
      // deeply ugly to write APIs this way, but that still doesn't mean
      // that the Readable class should behave improperly, as streams are
      // designed to be sync/async agnostic.
      // Take note if the _read call is sync or async (ie, if the read call
      // has returned yet), so that we know whether or not it's safe to emit
      // 'readable' etc.
      //
      // 3. Actually pull the requested chunks out of the buffer and return.
      // if we need a readable event, then we need to do some reading.


      var doRead = state.needReadable;
      debug$7('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug$7('length less than watermark', doRead);
      } // however, if we've ended, then there's no point, and if we're already
      // reading, then it's unnecessary.


      if (state.ended || state.reading) {
        doRead = false;
        debug$7('reading or ended', doRead);
      } else if (doRead) {
        debug$7('do read');
        state.reading = true;
        state.sync = true; // if the length is currently zero, then we *need* a readable event.

        if (state.length === 0) state.needReadable = true; // call internal read method

        this._read(state.highWaterMark);

        state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
        // and we need to re-evaluate how much data we can return to the user.

        if (!state.reading) n = howMuchToRead(nOrig, state);
      }

      var ret;
      if (n > 0) ret = fromList(n, state);else ret = null;

      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
      } else {
        state.length -= n;
        state.awaitDrain = 0;
      }

      if (state.length === 0) {
        // If we have nothing in the buffer, then we want to know
        // as soon as we *do* get something into the buffer.
        if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

        if (nOrig !== n && state.ended) endReadable(this);
      }

      if (ret !== null) this.emit('data', ret);
      return ret;
    };

    function onEofChunk(stream, state) {
      debug$7('onEofChunk');
      if (state.ended) return;

      if (state.decoder) {
        var chunk = state.decoder.end();

        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }

      state.ended = true;

      if (state.sync) {
        // if we are sync, wait until next tick to emit the data.
        // Otherwise we risk emitting data in the flow()
        // the readable code triggers during a read() call
        emitReadable(stream);
      } else {
        // emit 'readable' now to make sure it gets picked up.
        state.needReadable = false;

        if (!state.emittedReadable) {
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    } // Don't emit readable right away in sync mode, because this can trigger
    // another read() call => stack overflow.  This way, it might trigger
    // a nextTick recursion warning, but that's not so bad.


    function emitReadable(stream) {
      var state = stream._readableState;
      debug$7('emitReadable', state.needReadable, state.emittedReadable);
      state.needReadable = false;

      if (!state.emittedReadable) {
        debug$7('emitReadable', state.flowing);
        state.emittedReadable = true;
        process.nextTick(emitReadable_, stream);
      }
    }

    function emitReadable_(stream) {
      var state = stream._readableState;
      debug$7('emitReadable_', state.destroyed, state.length, state.ended);

      if (!state.destroyed && (state.length || state.ended)) {
        stream.emit('readable');
        state.emittedReadable = false;
      } // The stream needs another readable event if
      // 1. It is not flowing, as the flow mechanism will take
      //    care of it.
      // 2. It is not ended.
      // 3. It is below the highWaterMark, so we can schedule
      //    another readable later.


      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    } // at this point, the user has presumably seen the 'readable' event,
    // and called read() to consume some data.  that may have triggered
    // in turn another _read(n) call, in which case reading = true if
    // it's in progress.
    // However, if we're not ended, or reading, and the length < hwm,
    // then go ahead and try to read some more preemptively.


    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        process.nextTick(maybeReadMore_, stream, state);
      }
    }

    function maybeReadMore_(stream, state) {
      // Attempt to read more data if we should.
      //
      // The conditions for reading more data are (one of):
      // - Not enough data buffered (state.length < state.highWaterMark). The loop
      //   is responsible for filling the buffer with enough data if such data
      //   is available. If highWaterMark is 0 and we are not in the flowing mode
      //   we should _not_ attempt to buffer any extra data. We'll get more data
      //   when the stream consumer calls read() instead.
      // - No data in the buffer, and the stream is in flowing mode. In this mode
      //   the loop below is responsible for ensuring read() is called. Failing to
      //   call read here would abort the flow and there's no other mechanism for
      //   continuing the flow if the stream consumer has just subscribed to the
      //   'data' event.
      //
      // In addition to the above conditions to keep reading data, the following
      // conditions prevent the data from being read:
      // - The stream has ended (state.ended).
      // - There is already a pending 'read' operation (state.reading). This is a
      //   case where the the stream has called the implementation defined _read()
      //   method, but they are processing the call asynchronously and have _not_
      //   called push() with new data. In this case we skip performing more
      //   read()s. The execution ends in this method again after the _read() ends
      //   up calling push() with more data.
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug$7('maybeReadMore read 0');
        stream.read(0);
        if (len === state.length) // didn't get any data, stop spinning.
          break;
      }

      state.readingMore = false;
    } // abstract method.  to be overridden in specific implementation classes.
    // call cb(er, data) where data is <= n in length.
    // for virtual (non-string, non-buffer) streams, "length" is somewhat
    // arbitrary, and perhaps not very meaningful.


    Readable.prototype._read = function (n) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED$1('_read()'));
    };

    Readable.prototype.pipe = function (dest, pipeOpts) {
      var src = this;
      var state = this._readableState;

      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;

        case 1:
          state.pipes = [state.pipes, dest];
          break;

        default:
          state.pipes.push(dest);
          break;
      }

      state.pipesCount += 1;
      debug$7('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
      dest.on('unpipe', onunpipe);

      function onunpipe(readable, unpipeInfo) {
        debug$7('onunpipe');

        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }

      function onend() {
        debug$7('onend');
        dest.end();
      } // when the dest drains, it reduces the awaitDrain counter
      // on the source.  This would be more elegant with a .once()
      // handler in flow(), but adding and removing repeatedly is
      // too slow.


      var ondrain = pipeOnDrain(src);
      dest.on('drain', ondrain);
      var cleanedUp = false;

      function cleanup() {
        debug$7('cleanup'); // cleanup event handlers once the pipe is broken

        dest.removeListener('close', onclose);
        dest.removeListener('finish', onfinish);
        dest.removeListener('drain', ondrain);
        dest.removeListener('error', onerror);
        dest.removeListener('unpipe', onunpipe);
        src.removeListener('end', onend);
        src.removeListener('end', unpipe);
        src.removeListener('data', ondata);
        cleanedUp = true; // if the reader is waiting for a drain event from this
        // specific writer, then it would cause it to never start
        // flowing again.
        // So, if this is awaiting a drain, then we just call it now.
        // If we don't know, then assume that we are waiting for one.

        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
      }

      src.on('data', ondata);

      function ondata(chunk) {
        debug$7('ondata');
        var ret = dest.write(chunk);
        debug$7('dest.write', ret);

        if (ret === false) {
          // If the user unpiped during `dest.write()`, it is possible
          // to get stuck in a permanently paused state if that write
          // also returned false.
          // => Check whether `dest` is still a piping destination.
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug$7('false write response, pause', state.awaitDrain);
            state.awaitDrain++;
          }

          src.pause();
        }
      } // if the dest has an error, then stop piping into it.
      // however, don't suppress the throwing behavior for this.


      function onerror(er) {
        debug$7('onerror', er);
        unpipe();
        dest.removeListener('error', onerror);
        if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
      } // Make sure our error handler is attached before userland ones.


      prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

      function onclose() {
        dest.removeListener('finish', onfinish);
        unpipe();
      }

      dest.once('close', onclose);

      function onfinish() {
        debug$7('onfinish');
        dest.removeListener('close', onclose);
        unpipe();
      }

      dest.once('finish', onfinish);

      function unpipe() {
        debug$7('unpipe');
        src.unpipe(dest);
      } // tell the dest that it's being piped to


      dest.emit('pipe', src); // start the flow if it hasn't been started already.

      if (!state.flowing) {
        debug$7('pipe resume');
        src.resume();
      }

      return dest;
    };

    function pipeOnDrain(src) {
      return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug$7('pipeOnDrain', state.awaitDrain);
        if (state.awaitDrain) state.awaitDrain--;

        if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
          state.flowing = true;
          flow(src);
        }
      };
    }

    Readable.prototype.unpipe = function (dest) {
      var state = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      }; // if we're not piping anywhere, then do nothing.

      if (state.pipesCount === 0) return this; // just one destination.  most common case.

      if (state.pipesCount === 1) {
        // passed in one, but it's not the right one.
        if (dest && dest !== state.pipes) return this;
        if (!dest) dest = state.pipes; // got a match.

        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest) dest.emit('unpipe', this, unpipeInfo);
        return this;
      } // slow case. multiple pipe destinations.


      if (!dest) {
        // remove all.
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;

        for (var i = 0; i < len; i++) {
          dests[i].emit('unpipe', this, {
            hasUnpiped: false
          });
        }

        return this;
      } // try to find the right one.


      var index = indexOf(state.pipes, dest);
      if (index === -1) return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1) state.pipes = state.pipes[0];
      dest.emit('unpipe', this, unpipeInfo);
      return this;
    }; // set up data events if they are asked for
    // Ensure readable listeners eventually get something


    Readable.prototype.on = function (ev, fn) {
      var res = Stream$1.prototype.on.call(this, ev, fn);
      var state = this._readableState;

      if (ev === 'data') {
        // update readableListening so that resume() may be a no-op
        // a few lines down. This is needed to support once('readable').
        state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

        if (state.flowing !== false) this.resume();
      } else if (ev === 'readable') {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug$7('on readable', state.length, state.reading);

          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            process.nextTick(nReadingNextTick, this);
          }
        }
      }

      return res;
    };

    Readable.prototype.addListener = Readable.prototype.on;

    Readable.prototype.removeListener = function (ev, fn) {
      var res = Stream$1.prototype.removeListener.call(this, ev, fn);

      if (ev === 'readable') {
        // We need to check if there is someone still listening to
        // readable and reset the state. However this needs to happen
        // after readable has been emitted but before I/O (nextTick) to
        // support once('readable', fn) cycles. This means that calling
        // resume within the same tick will have no
        // effect.
        process.nextTick(updateReadableListening, this);
      }

      return res;
    };

    Readable.prototype.removeAllListeners = function (ev) {
      var res = Stream$1.prototype.removeAllListeners.apply(this, arguments);

      if (ev === 'readable' || ev === undefined) {
        // We need to check if there is someone still listening to
        // readable and reset the state. However this needs to happen
        // after readable has been emitted but before I/O (nextTick) to
        // support once('readable', fn) cycles. This means that calling
        // resume within the same tick will have no
        // effect.
        process.nextTick(updateReadableListening, this);
      }

      return res;
    };

    function updateReadableListening(self) {
      var state = self._readableState;
      state.readableListening = self.listenerCount('readable') > 0;

      if (state.resumeScheduled && !state.paused) {
        // flowing needs to be set to true now, otherwise
        // the upcoming resume will not flow.
        state.flowing = true; // crude way to check if we should resume
      } else if (self.listenerCount('data') > 0) {
        self.resume();
      }
    }

    function nReadingNextTick(self) {
      debug$7('readable nexttick read 0');
      self.read(0);
    } // pause() and resume() are remnants of the legacy readable stream API
    // If the user uses them, then switch into old mode.


    Readable.prototype.resume = function () {
      var state = this._readableState;

      if (!state.flowing) {
        debug$7('resume'); // we flow only if there is no one listening
        // for readable, but we still have to call
        // resume()

        state.flowing = !state.readableListening;
        resume(this, state);
      }

      state.paused = false;
      return this;
    };

    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick(resume_, stream, state);
      }
    }

    function resume_(stream, state) {
      debug$7('resume', state.reading);

      if (!state.reading) {
        stream.read(0);
      }

      state.resumeScheduled = false;
      stream.emit('resume');
      flow(stream);
      if (state.flowing && !state.reading) stream.read(0);
    }

    Readable.prototype.pause = function () {
      debug$7('call pause flowing=%j', this._readableState.flowing);

      if (this._readableState.flowing !== false) {
        debug$7('pause');
        this._readableState.flowing = false;
        this.emit('pause');
      }

      this._readableState.paused = true;
      return this;
    };

    function flow(stream) {
      var state = stream._readableState;
      debug$7('flow', state.flowing);

      while (state.flowing && stream.read() !== null) {
      }
    } // wrap an old-style stream as the async data source.
    // This is *not* part of the readable stream interface.
    // It is an ugly unfortunate mess of history.


    Readable.prototype.wrap = function (stream) {
      var _this = this;

      var state = this._readableState;
      var paused = false;
      stream.on('end', function () {
        debug$7('wrapped end');

        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) _this.push(chunk);
        }

        _this.push(null);
      });
      stream.on('data', function (chunk) {
        debug$7('wrapped data');
        if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

        if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

        var ret = _this.push(chunk);

        if (!ret) {
          paused = true;
          stream.pause();
        }
      }); // proxy all the other methods.
      // important when wrapping filters and duplexes.

      for (var i in stream) {
        if (this[i] === undefined && typeof stream[i] === 'function') {
          this[i] = function methodWrap(method) {
            return function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            };
          }(i);
        }
      } // proxy certain important events.


      for (var n = 0; n < kProxyEvents.length; n++) {
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
      } // when we try to consume some more bytes, simply unpause the
      // underlying stream.


      this._read = function (n) {
        debug$7('wrapped _read', n);

        if (paused) {
          paused = false;
          stream.resume();
        }
      };

      return this;
    };

    if (typeof Symbol === 'function') {
      Readable.prototype[Symbol.asyncIterator] = function () {
        if (createReadableStreamAsyncIterator === undefined) {
          createReadableStreamAsyncIterator = async_iterator;
        }

        return createReadableStreamAsyncIterator(this);
      };
    }

    Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.highWaterMark;
      }
    });
    Object.defineProperty(Readable.prototype, 'readableBuffer', {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState && this._readableState.buffer;
      }
    });
    Object.defineProperty(Readable.prototype, 'readableFlowing', {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.flowing;
      },
      set: function set(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }
    }); // exposed for testing purposes only.

    Readable._fromList = fromList;
    Object.defineProperty(Readable.prototype, 'readableLength', {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.length;
      }
    }); // Pluck off n bytes from an array of buffers.
    // Length is the combined lengths of all the buffers in the list.
    // This function is designed to be inlinable, so please take care when making
    // changes to the function body.

    function fromList(n, state) {
      // nothing buffered
      if (state.length === 0) return null;
      var ret;
      if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
        // read it all, truncate the list
        if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        // read part of list
        ret = state.buffer.consume(n, state.decoder);
      }
      return ret;
    }

    function endReadable(stream) {
      var state = stream._readableState;
      debug$7('endReadable', state.endEmitted);

      if (!state.endEmitted) {
        state.ended = true;
        process.nextTick(endReadableNT, state, stream);
      }
    }

    function endReadableNT(state, stream) {
      debug$7('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');

        if (state.autoDestroy) {
          // In case of duplex streams we need a way to detect
          // if the writable side is ready for autoDestroy as well
          var wState = stream._writableState;

          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }

    if (typeof Symbol === 'function') {
      Readable.from = function (iterable, opts) {
        if (from === undefined) {
          from = from_1;
        }

        return from(Readable, iterable, opts);
      };
    }

    function indexOf(xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
      }

      return -1;
    }

    var _stream_transform = Transform$1;

    var _require$codes$1 = errors.codes,
        ERR_METHOD_NOT_IMPLEMENTED = _require$codes$1.ERR_METHOD_NOT_IMPLEMENTED,
        ERR_MULTIPLE_CALLBACK = _require$codes$1.ERR_MULTIPLE_CALLBACK,
        ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes$1.ERR_TRANSFORM_ALREADY_TRANSFORMING,
        ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes$1.ERR_TRANSFORM_WITH_LENGTH_0;

    var Duplex = _stream_duplex;

    inherits.exports(Transform$1, Duplex);

    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;

      if (cb === null) {
        return this.emit('error', new ERR_MULTIPLE_CALLBACK());
      }

      ts.writechunk = null;
      ts.writecb = null;
      if (data != null) // single equals check for both `null` and `undefined`
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;

      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }

    function Transform$1(options) {
      if (!(this instanceof Transform$1)) return new Transform$1(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      }; // start out asking for a readable event once data is transformed.

      this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
      // that Readable wants before the first _read call, so unset the
      // sync guard flag.

      this._readableState.sync = false;

      if (options) {
        if (typeof options.transform === 'function') this._transform = options.transform;
        if (typeof options.flush === 'function') this._flush = options.flush;
      } // When the writable side finishes, then flush out anything remaining.


      this.on('prefinish', prefinish);
    }

    function prefinish() {
      var _this = this;

      if (typeof this._flush === 'function' && !this._readableState.destroyed) {
        this._flush(function (er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }

    Transform$1.prototype.push = function (chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    }; // This is the part where you do stuff!
    // override this function in implementation classes.
    // 'chunk' is an input chunk.
    //
    // Call `push(newChunk)` to pass along transformed output
    // to the readable side.  You may call 'push' zero or more times.
    //
    // Call `cb(err)` when you are done with this chunk.  If you pass
    // an error, then that'll put the hurt on the whole operation.  If you
    // never call cb(), then you'll never get another chunk.


    Transform$1.prototype._transform = function (chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
    };

    Transform$1.prototype._write = function (chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;

      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
      }
    }; // Doesn't matter what the args are here.
    // _transform does all the work.
    // That we got here means that the readable side wants more data.


    Transform$1.prototype._read = function (n) {
      var ts = this._transformState;

      if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;

        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        // mark that we need a transform, so that any data that comes in
        // will get processed, now that we've asked for it.
        ts.needTransform = true;
      }
    };

    Transform$1.prototype._destroy = function (err, cb) {
      Duplex.prototype._destroy.call(this, err, function (err2) {
        cb(err2);
      });
    };

    function done(stream, er, data) {
      if (er) return stream.emit('error', er);
      if (data != null) // single equals check for both `null` and `undefined`
        stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
      // if there's nothing in the write buffer, then that means
      // that nothing more will ever be provided

      if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
      if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
      return stream.push(null);
    }

    var _stream_passthrough = PassThrough;

    var Transform = _stream_transform;

    inherits.exports(PassThrough, Transform);

    function PassThrough(options) {
      if (!(this instanceof PassThrough)) return new PassThrough(options);
      Transform.call(this, options);
    }

    PassThrough.prototype._transform = function (chunk, encoding, cb) {
      cb(null, chunk);
    };

    var eos;

    function once(callback) {
      var called = false;
      return function () {
        if (called) return;
        called = true;
        callback.apply(void 0, arguments);
      };
    }

    var _require$codes = errors.codes,
        ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
        ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

    function noop$2(err) {
      // Rethrow the error if it exists to avoid swallowing it
      if (err) throw err;
    }

    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === 'function';
    }

    function destroyer(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on('close', function () {
        closed = true;
      });
      if (eos === undefined) eos = endOfStream;
      eos(stream, {
        readable: reading,
        writable: writing
      }, function (err) {
        if (err) return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function (err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true; // request.destroy just do .end - .abort is what we want

        if (isRequest(stream)) return stream.abort();
        if (typeof stream.destroy === 'function') return stream.destroy();
        callback(err || new ERR_STREAM_DESTROYED('pipe'));
      };
    }

    function call(fn) {
      fn();
    }

    function pipe(from, to) {
      return from.pipe(to);
    }

    function popCallback(streams) {
      if (!streams.length) return noop$2;
      if (typeof streams[streams.length - 1] !== 'function') return noop$2;
      return streams.pop();
    }

    function pipeline() {
      for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
        streams[_key] = arguments[_key];
      }

      var callback = popCallback(streams);
      if (Array.isArray(streams[0])) streams = streams[0];

      if (streams.length < 2) {
        throw new ERR_MISSING_ARGS('streams');
      }

      var error;
      var destroys = streams.map(function (stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function (err) {
          if (!error) error = err;
          if (err) destroys.forEach(call);
          if (reading) return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    }

    var pipeline_1 = pipeline;

    (function (module, exports) {
    var Stream = require$$0__default$2["default"];
    if (process.env.READABLE_STREAM === 'disable' && Stream) {
      module.exports = Stream.Readable;
      Object.assign(module.exports, Stream);
      module.exports.Stream = Stream;
    } else {
      exports = module.exports = _stream_readable;
      exports.Stream = Stream || exports;
      exports.Readable = exports;
      exports.Writable = _stream_writable;
      exports.Duplex = _stream_duplex;
      exports.Transform = _stream_transform;
      exports.PassThrough = _stream_passthrough;
      exports.finished = endOfStream;
      exports.pipeline = pipeline_1;
    }
    }(readable, readable.exports));

    /**
     * Expose `Delegator`.
     */

    var delegates = Delegator;

    /**
     * Initialize a delegator.
     *
     * @param {Object} proto
     * @param {String} target
     * @api public
     */

    function Delegator(proto, target) {
      if (!(this instanceof Delegator)) return new Delegator(proto, target);
      this.proto = proto;
      this.target = target;
      this.methods = [];
      this.getters = [];
      this.setters = [];
      this.fluents = [];
    }

    /**
     * Delegate method `name`.
     *
     * @param {String} name
     * @return {Delegator} self
     * @api public
     */

    Delegator.prototype.method = function(name){
      var proto = this.proto;
      var target = this.target;
      this.methods.push(name);

      proto[name] = function(){
        return this[target][name].apply(this[target], arguments);
      };

      return this;
    };

    /**
     * Delegator accessor `name`.
     *
     * @param {String} name
     * @return {Delegator} self
     * @api public
     */

    Delegator.prototype.access = function(name){
      return this.getter(name).setter(name);
    };

    /**
     * Delegator getter `name`.
     *
     * @param {String} name
     * @return {Delegator} self
     * @api public
     */

    Delegator.prototype.getter = function(name){
      var proto = this.proto;
      var target = this.target;
      this.getters.push(name);

      proto.__defineGetter__(name, function(){
        return this[target][name];
      });

      return this;
    };

    /**
     * Delegator setter `name`.
     *
     * @param {String} name
     * @return {Delegator} self
     * @api public
     */

    Delegator.prototype.setter = function(name){
      var proto = this.proto;
      var target = this.target;
      this.setters.push(name);

      proto.__defineSetter__(name, function(val){
        return this[target][name] = val;
      });

      return this;
    };

    /**
     * Delegator fluent accessor
     *
     * @param {String} name
     * @return {Delegator} self
     * @api public
     */

    Delegator.prototype.fluent = function (name) {
      var proto = this.proto;
      var target = this.target;
      this.fluents.push(name);

      proto[name] = function(val){
        if ('undefined' != typeof val) {
          this[target][name] = val;
          return this;
        } else {
          return this[target][name];
        }
      };

      return this;
    };

    var util$4 = require$$0__default$1["default"];
    var stream = readable.exports;
    var delegate = delegates;
    var Tracker$1 = tracker.exports;

    var TrackerStream$1 = trackerStream.exports = function (name, size, options) {
      stream.Transform.call(this, options);
      this.tracker = new Tracker$1(name, size);
      this.name = name;
      this.id = this.tracker.id;
      this.tracker.on('change', delegateChange(this));
    };
    util$4.inherits(TrackerStream$1, stream.Transform);

    function delegateChange (trackerStream) {
      return function (name, completion, tracker) {
        trackerStream.emit('change', name, completion, trackerStream);
      }
    }

    TrackerStream$1.prototype._transform = function (data, encoding, cb) {
      this.tracker.completeWork(data.length ? data.length : 1);
      this.push(data);
      cb();
    };

    TrackerStream$1.prototype._flush = function (cb) {
      this.tracker.finish();
      cb();
    };

    delegate(TrackerStream$1.prototype, 'tracker')
      .method('completed')
      .method('addWork')
      .method('finish');

    var util$3 = require$$0__default$1["default"];
    var TrackerBase = trackerBase.exports;
    var Tracker = tracker.exports;
    var TrackerStream = trackerStream.exports;

    var TrackerGroup = trackerGroup.exports = function (name) {
      TrackerBase.call(this, name);
      this.parentGroup = null;
      this.trackers = [];
      this.completion = {};
      this.weight = {};
      this.totalWeight = 0;
      this.finished = false;
      this.bubbleChange = bubbleChange(this);
    };
    util$3.inherits(TrackerGroup, TrackerBase);

    function bubbleChange (trackerGroup) {
      return function (name, completed, tracker) {
        trackerGroup.completion[tracker.id] = completed;
        if (trackerGroup.finished) {
          return
        }
        trackerGroup.emit('change', name || trackerGroup.name, trackerGroup.completed(), trackerGroup);
      }
    }

    TrackerGroup.prototype.nameInTree = function () {
      var names = [];
      var from = this;
      while (from) {
        names.unshift(from.name);
        from = from.parentGroup;
      }
      return names.join('/')
    };

    TrackerGroup.prototype.addUnit = function (unit, weight) {
      if (unit.addUnit) {
        var toTest = this;
        while (toTest) {
          if (unit === toTest) {
            throw new Error(
              'Attempted to add tracker group ' +
              unit.name + ' to tree that already includes it ' +
              this.nameInTree(this))
          }
          toTest = toTest.parentGroup;
        }
        unit.parentGroup = this;
      }
      this.weight[unit.id] = weight || 1;
      this.totalWeight += this.weight[unit.id];
      this.trackers.push(unit);
      this.completion[unit.id] = unit.completed();
      unit.on('change', this.bubbleChange);
      if (!this.finished) {
        this.emit('change', unit.name, this.completion[unit.id], unit);
      }
      return unit
    };

    TrackerGroup.prototype.completed = function () {
      if (this.trackers.length === 0) {
        return 0
      }
      var valPerWeight = 1 / this.totalWeight;
      var completed = 0;
      for (var ii = 0; ii < this.trackers.length; ii++) {
        var trackerId = this.trackers[ii].id;
        completed +=
          valPerWeight * this.weight[trackerId] * this.completion[trackerId];
      }
      return completed
    };

    TrackerGroup.prototype.newGroup = function (name, weight) {
      return this.addUnit(new TrackerGroup(name), weight)
    };

    TrackerGroup.prototype.newItem = function (name, todo, weight) {
      return this.addUnit(new Tracker(name, todo), weight)
    };

    TrackerGroup.prototype.newStream = function (name, todo, weight) {
      return this.addUnit(new TrackerStream(name, todo), weight)
    };

    TrackerGroup.prototype.finish = function () {
      this.finished = true;
      if (!this.trackers.length) {
        this.addUnit(new Tracker(), 1, true);
      }
      for (var ii = 0; ii < this.trackers.length; ii++) {
        var tracker = this.trackers[ii];
        tracker.finish();
        tracker.removeListener('change', this.bubbleChange);
      }
      this.emit('change', this.name, 1, this);
    };

    var buffer = '                                  ';
    TrackerGroup.prototype.debug = function (depth) {
      depth = depth || 0;
      var indent = depth ? buffer.substr(0, depth) : '';
      var output = indent + (this.name || 'top') + ': ' + this.completed() + '\n';
      this.trackers.forEach(function (tracker) {
        if (tracker instanceof TrackerGroup) {
          output += tracker.debug(depth + 1);
        } else {
          output += indent + ' ' + tracker.name + ': ' + tracker.completed() + '\n';
        }
      });
      return output
    };

    lib$2.TrackerGroup = trackerGroup.exports;
    lib$2.Tracker = tracker.exports;
    lib$2.TrackerStream = trackerStream.exports;

    var plumbing = {exports: {}};

    var consoleControlStrings = {};

    // These tables borrowed from `ansi`

    var prefix = '\x1b[';

    consoleControlStrings.up = function up (num) {
      return prefix + (num || '') + 'A'
    };

    consoleControlStrings.down = function down (num) {
      return prefix + (num || '') + 'B'
    };

    consoleControlStrings.forward = function forward (num) {
      return prefix + (num || '') + 'C'
    };

    consoleControlStrings.back = function back (num) {
      return prefix + (num || '') + 'D'
    };

    consoleControlStrings.nextLine = function nextLine (num) {
      return prefix + (num || '') + 'E'
    };

    consoleControlStrings.previousLine = function previousLine (num) {
      return prefix + (num || '') + 'F'
    };

    consoleControlStrings.horizontalAbsolute = function horizontalAbsolute (num) {
      if (num == null) throw new Error('horizontalAboslute requires a column to position to')
      return prefix + num + 'G'
    };

    consoleControlStrings.eraseData = function eraseData () {
      return prefix + 'J'
    };

    consoleControlStrings.eraseLine = function eraseLine () {
      return prefix + 'K'
    };

    consoleControlStrings.goto = function (x, y) {
      return prefix + y + ';' + x + 'H'
    };

    consoleControlStrings.gotoSOL = function () {
      return '\r'
    };

    consoleControlStrings.beep = function () {
      return '\x07'
    };

    consoleControlStrings.hideCursor = function hideCursor () {
      return prefix + '?25l'
    };

    consoleControlStrings.showCursor = function showCursor () {
      return prefix + '?25h'
    };

    var colors$2 = {
      reset: 0,
    // styles
      bold: 1,
      italic: 3,
      underline: 4,
      inverse: 7,
    // resets
      stopBold: 22,
      stopItalic: 23,
      stopUnderline: 24,
      stopInverse: 27,
    // colors
      white: 37,
      black: 30,
      blue: 34,
      cyan: 36,
      green: 32,
      magenta: 35,
      red: 31,
      yellow: 33,
      bgWhite: 47,
      bgBlack: 40,
      bgBlue: 44,
      bgCyan: 46,
      bgGreen: 42,
      bgMagenta: 45,
      bgRed: 41,
      bgYellow: 43,

      grey: 90,
      brightBlack: 90,
      brightRed: 91,
      brightGreen: 92,
      brightYellow: 93,
      brightBlue: 94,
      brightMagenta: 95,
      brightCyan: 96,
      brightWhite: 97,

      bgGrey: 100,
      bgBrightBlack: 100,
      bgBrightRed: 101,
      bgBrightGreen: 102,
      bgBrightYellow: 103,
      bgBrightBlue: 104,
      bgBrightMagenta: 105,
      bgBrightCyan: 106,
      bgBrightWhite: 107
    };

    consoleControlStrings.color = function color (colorWith) {
      if (arguments.length !== 1 || !Array.isArray(colorWith)) {
        colorWith = Array.prototype.slice.call(arguments);
      }
      return prefix + colorWith.map(colorNameToCode).join(';') + 'm'
    };

    function colorNameToCode (color) {
      if (colors$2[color] != null) return colors$2[color]
      throw new Error('Unknown color or style name: ' + color)
    }

    var renderTemplate$3 = {exports: {}};

    var align$1 = {};

    var ansiRegex$4 = () => {
    	const pattern = [
    		'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
    		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
    	].join('|');

    	return new RegExp(pattern, 'g');
    };

    const ansiRegex$3 = ansiRegex$4;

    var stripAnsi$4 = input => typeof input === 'string' ? input.replace(ansiRegex$3(), '') : input;

    /* eslint-disable yoda */
    var isFullwidthCodePoint$1 = x => {
    	if (Number.isNaN(x)) {
    		return false;
    	}

    	// code points are derived from:
    	// http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt
    	if (
    		x >= 0x1100 && (
    			x <= 0x115f ||  // Hangul Jamo
    			x === 0x2329 || // LEFT-POINTING ANGLE BRACKET
    			x === 0x232a || // RIGHT-POINTING ANGLE BRACKET
    			// CJK Radicals Supplement .. Enclosed CJK Letters and Months
    			(0x2e80 <= x && x <= 0x3247 && x !== 0x303f) ||
    			// Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
    			(0x3250 <= x && x <= 0x4dbf) ||
    			// CJK Unified Ideographs .. Yi Radicals
    			(0x4e00 <= x && x <= 0xa4c6) ||
    			// Hangul Jamo Extended-A
    			(0xa960 <= x && x <= 0xa97c) ||
    			// Hangul Syllables
    			(0xac00 <= x && x <= 0xd7a3) ||
    			// CJK Compatibility Ideographs
    			(0xf900 <= x && x <= 0xfaff) ||
    			// Vertical Forms
    			(0xfe10 <= x && x <= 0xfe19) ||
    			// CJK Compatibility Forms .. Small Form Variants
    			(0xfe30 <= x && x <= 0xfe6b) ||
    			// Halfwidth and Fullwidth Forms
    			(0xff01 <= x && x <= 0xff60) ||
    			(0xffe0 <= x && x <= 0xffe6) ||
    			// Kana Supplement
    			(0x1b000 <= x && x <= 0x1b001) ||
    			// Enclosed Ideographic Supplement
    			(0x1f200 <= x && x <= 0x1f251) ||
    			// CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
    			(0x20000 <= x && x <= 0x3fffd)
    		)
    	) {
    		return true;
    	}

    	return false;
    };

    const stripAnsi$3 = stripAnsi$4;
    const isFullwidthCodePoint = isFullwidthCodePoint$1;

    var stringWidth$4 = str => {
    	if (typeof str !== 'string' || str.length === 0) {
    		return 0;
    	}

    	str = stripAnsi$3(str);

    	let width = 0;

    	for (let i = 0; i < str.length; i++) {
    		const code = str.codePointAt(i);

    		// Ignore control characters
    		if (code <= 0x1F || (code >= 0x7F && code <= 0x9F)) {
    			continue;
    		}

    		// Ignore combining characters
    		if (code >= 0x300 && code <= 0x36F) {
    			continue;
    		}

    		// Surrogates
    		if (code > 0xFFFF) {
    			i++;
    		}

    		width += isFullwidthCodePoint(code) ? 2 : 1;
    	}

    	return width;
    };

    var stringWidth$3 = stringWidth$4;

    align$1.center = alignCenter;
    align$1.left = alignLeft;
    align$1.right = alignRight;

    // lodash's way of generating pad characters.

    function createPadding (width) {
      var result = '';
      var string = ' ';
      var n = width;
      do {
        if (n % 2) {
          result += string;
        }
        n = Math.floor(n / 2);
        string += string;
      } while (n);

      return result;
    }

    function alignLeft (str, width) {
      var trimmed = str.trimRight();
      if (trimmed.length === 0 && str.length >= width) return str
      var padding = '';
      var strWidth = stringWidth$3(trimmed);

      if (strWidth < width) {
        padding = createPadding(width - strWidth);
      }

      return trimmed + padding
    }

    function alignRight (str, width) {
      var trimmed = str.trimLeft();
      if (trimmed.length === 0 && str.length >= width) return str
      var padding = '';
      var strWidth = stringWidth$3(trimmed);

      if (strWidth < width) {
        padding = createPadding(width - strWidth);
      }

      return padding + trimmed
    }

    function alignCenter (str, width) {
      var trimmed = str.trim();
      if (trimmed.length === 0 && str.length >= width) return str
      var padLeft = '';
      var padRight = '';
      var strWidth = stringWidth$3(trimmed);

      if (strWidth < width) {
        var padLeftBy = parseInt((width - strWidth) / 2, 10); 
        padLeft = createPadding(padLeftBy);
        padRight = createPadding(width - (strWidth + padLeftBy));
      }

      return padLeft + trimmed + padRight
    }

    var aproba = validate$3;

    function isArguments (thingy) {
      return thingy != null && typeof thingy === 'object' && thingy.hasOwnProperty('callee')
    }

    const types = {
      '*': {label: 'any', check: () => true},
      A: {label: 'array', check: _ => Array.isArray(_) || isArguments(_)},
      S: {label: 'string', check: _ => typeof _ === 'string'},
      N: {label: 'number', check: _ => typeof _ === 'number'},
      F: {label: 'function', check: _ => typeof _ === 'function'},
      O: {label: 'object', check: _ => typeof _ === 'object' && _ != null && !types.A.check(_) && !types.E.check(_)},
      B: {label: 'boolean', check: _ => typeof _ === 'boolean'},
      E: {label: 'error', check: _ => _ instanceof Error},
      Z: {label: 'null', check: _ => _ == null}
    };

    function addSchema (schema, arity) {
      const group = arity[schema.length] = arity[schema.length] || [];
      if (group.indexOf(schema) === -1) group.push(schema);
    }

    function validate$3 (rawSchemas, args) {
      if (arguments.length !== 2) throw wrongNumberOfArgs(['SA'], arguments.length)
      if (!rawSchemas) throw missingRequiredArg(0)
      if (!args) throw missingRequiredArg(1)
      if (!types.S.check(rawSchemas)) throw invalidType(0, ['string'], rawSchemas)
      if (!types.A.check(args)) throw invalidType(1, ['array'], args)
      const schemas = rawSchemas.split('|');
      const arity = {};

      schemas.forEach(schema => {
        for (let ii = 0; ii < schema.length; ++ii) {
          const type = schema[ii];
          if (!types[type]) throw unknownType(ii, type)
        }
        if (/E.*E/.test(schema)) throw moreThanOneError(schema)
        addSchema(schema, arity);
        if (/E/.test(schema)) {
          addSchema(schema.replace(/E.*$/, 'E'), arity);
          addSchema(schema.replace(/E/, 'Z'), arity);
          if (schema.length === 1) addSchema('', arity);
        }
      });
      let matching = arity[args.length];
      if (!matching) {
        throw wrongNumberOfArgs(Object.keys(arity), args.length)
      }
      for (let ii = 0; ii < args.length; ++ii) {
        let newMatching = matching.filter(schema => {
          const type = schema[ii];
          const typeCheck = types[type].check;
          return typeCheck(args[ii])
        });
        if (!newMatching.length) {
          const labels = matching.map(_ => types[_[ii]].label).filter(_ => _ != null);
          throw invalidType(ii, labels, args[ii])
        }
        matching = newMatching;
      }
    }

    function missingRequiredArg (num) {
      return newException('EMISSINGARG', 'Missing required argument #' + (num + 1))
    }

    function unknownType (num, type) {
      return newException('EUNKNOWNTYPE', 'Unknown type ' + type + ' in argument #' + (num + 1))
    }

    function invalidType (num, expectedTypes, value) {
      let valueType;
      Object.keys(types).forEach(typeCode => {
        if (types[typeCode].check(value)) valueType = types[typeCode].label;
      });
      return newException('EINVALIDTYPE', 'Argument #' + (num + 1) + ': Expected ' +
        englishList(expectedTypes) + ' but got ' + valueType)
    }

    function englishList (list) {
      return list.join(', ').replace(/, ([^,]+)$/, ' or $1')
    }

    function wrongNumberOfArgs (expected, got) {
      const english = englishList(expected);
      const args = expected.every(ex => ex.length === 1)
        ? 'argument'
        : 'arguments';
      return newException('EWRONGARGCOUNT', 'Expected ' + english + ' ' + args + ' but got ' + got)
    }

    function moreThanOneError (schema) {
      return newException('ETOOMANYERRORTYPES',
        'Only one error type per argument signature is allowed, more than one found in "' + schema + '"')
    }

    function newException (code, msg) {
      const err = new Error(msg);
      err.code = code;
      /* istanbul ignore else */
      if (Error.captureStackTrace) Error.captureStackTrace(err, validate$3);
      return err
    }

    var stringWidth$2 = stringWidth$4;
    var stripAnsi$2 = stripAnsi$4;

    var wideTruncate_1 = wideTruncate$2;

    function wideTruncate$2 (str, target) {
      if (stringWidth$2(str) === 0) return str
      if (target <= 0) return ''
      if (stringWidth$2(str) <= target) return str

      // We compute the number of bytes of ansi sequences here and add
      // that to our initial truncation to ensure that we don't slice one
      // that we want to keep in half.
      var noAnsi = stripAnsi$2(str);
      var ansiSize = str.length + noAnsi.length;
      var truncated = str.slice(0, target + ansiSize);

      // we have to shrink the result to account for our ansi sequence buffer
      // (if an ansi sequence was truncated) and double width characters.
      while (stringWidth$2(truncated) > target) {
        truncated = truncated.slice(0, -1);
      }
      return truncated
    }

    var error$2 = {};

    var util$2 = require$$0__default$1["default"];

    var User = error$2.User = function User (msg) {
      var err = new Error(msg);
      Error.captureStackTrace(err, User);
      err.code = 'EGAUGE';
      return err
    };

    error$2.MissingTemplateValue = function MissingTemplateValue (item, values) {
      var err = new User(util$2.format('Missing template value "%s"', item.type));
      Error.captureStackTrace(err, MissingTemplateValue);
      err.template = item;
      err.values = values;
      return err
    };

    error$2.Internal = function Internal (msg) {
      var err = new Error(msg);
      Error.captureStackTrace(err, Internal);
      err.code = 'EGAUGEINTERNAL';
      return err
    };

    var stringWidth$1 = stringWidth$4;

    var templateItem = TemplateItem$1;

    function isPercent (num) {
      if (typeof num !== 'string') return false
      return num.slice(-1) === '%'
    }

    function percent (num) {
      return Number(num.slice(0, -1)) / 100
    }

    function TemplateItem$1 (values, outputLength) {
      this.overallOutputLength = outputLength;
      this.finished = false;
      this.type = null;
      this.value = null;
      this.length = null;
      this.maxLength = null;
      this.minLength = null;
      this.kerning = null;
      this.align = 'left';
      this.padLeft = 0;
      this.padRight = 0;
      this.index = null;
      this.first = null;
      this.last = null;
      if (typeof values === 'string') {
        this.value = values;
      } else {
        for (var prop in values) this[prop] = values[prop];
      }
      // Realize percents
      if (isPercent(this.length)) {
        this.length = Math.round(this.overallOutputLength * percent(this.length));
      }
      if (isPercent(this.minLength)) {
        this.minLength = Math.round(this.overallOutputLength * percent(this.minLength));
      }
      if (isPercent(this.maxLength)) {
        this.maxLength = Math.round(this.overallOutputLength * percent(this.maxLength));
      }
      return this
    }

    TemplateItem$1.prototype = {};

    TemplateItem$1.prototype.getBaseLength = function () {
      var length = this.length;
      if (length == null && typeof this.value === 'string' && this.maxLength == null && this.minLength == null) {
        length = stringWidth$1(this.value);
      }
      return length
    };

    TemplateItem$1.prototype.getLength = function () {
      var length = this.getBaseLength();
      if (length == null) return null
      return length + this.padLeft + this.padRight
    };

    TemplateItem$1.prototype.getMaxLength = function () {
      if (this.maxLength == null) return null
      return this.maxLength + this.padLeft + this.padRight
    };

    TemplateItem$1.prototype.getMinLength = function () {
      if (this.minLength == null) return null
      return this.minLength + this.padLeft + this.padRight
    };

    var align = align$1;
    var validate$2 = aproba;
    var wideTruncate$1 = wideTruncate_1;
    var error$1 = error$2;
    var TemplateItem = templateItem;

    function renderValueWithValues (values) {
      return function (item) {
        return renderValue(item, values)
      }
    }

    var renderTemplate$2 = renderTemplate$3.exports = function (width, template, values) {
      var items = prepareItems(width, template, values);
      var rendered = items.map(renderValueWithValues(values)).join('');
      return align.left(wideTruncate$1(rendered, width), width)
    };

    function preType (item) {
      var cappedTypeName = item.type[0].toUpperCase() + item.type.slice(1);
      return 'pre' + cappedTypeName
    }

    function postType (item) {
      var cappedTypeName = item.type[0].toUpperCase() + item.type.slice(1);
      return 'post' + cappedTypeName
    }

    function hasPreOrPost (item, values) {
      if (!item.type) return
      return values[preType(item)] || values[postType(item)]
    }

    function generatePreAndPost (baseItem, parentValues) {
      var item = Object.assign({}, baseItem);
      var values = Object.create(parentValues);
      var template = [];
      var pre = preType(item);
      var post = postType(item);
      if (values[pre]) {
        template.push({value: values[pre]});
        values[pre] = null;
      }
      item.minLength = null;
      item.length = null;
      item.maxLength = null;
      template.push(item);
      values[item.type] = values[item.type];
      if (values[post]) {
        template.push({value: values[post]});
        values[post] = null;
      }
      return function ($1, $2, length) {
        return renderTemplate$2(length, template, values)
      }
    }

    function prepareItems (width, template, values) {
      function cloneAndObjectify (item, index, arr) {
        var cloned = new TemplateItem(item, width);
        var type = cloned.type;
        if (cloned.value == null) {
          if (!(type in values)) {
            if (cloned.default == null) {
              throw new error$1.MissingTemplateValue(cloned, values)
            } else {
              cloned.value = cloned.default;
            }
          } else {
            cloned.value = values[type];
          }
        }
        if (cloned.value == null || cloned.value === '') return null
        cloned.index = index;
        cloned.first = index === 0;
        cloned.last = index === arr.length - 1;
        if (hasPreOrPost(cloned, values)) cloned.value = generatePreAndPost(cloned, values);
        return cloned
      }

      var output = template.map(cloneAndObjectify).filter(function (item) { return item != null });

      var remainingSpace = width;
      var variableCount = output.length;

      function consumeSpace (length) {
        if (length > remainingSpace) length = remainingSpace;
        remainingSpace -= length;
      }

      function finishSizing (item, length) {
        if (item.finished) throw new error$1.Internal('Tried to finish template item that was already finished')
        if (length === Infinity) throw new error$1.Internal('Length of template item cannot be infinity')
        if (length != null) item.length = length;
        item.minLength = null;
        item.maxLength = null;
        --variableCount;
        item.finished = true;
        if (item.length == null) item.length = item.getBaseLength();
        if (item.length == null) throw new error$1.Internal('Finished template items must have a length')
        consumeSpace(item.getLength());
      }

      output.forEach(function (item) {
        if (!item.kerning) return
        var prevPadRight = item.first ? 0 : output[item.index - 1].padRight;
        if (!item.first && prevPadRight < item.kerning) item.padLeft = item.kerning - prevPadRight;
        if (!item.last) item.padRight = item.kerning;
      });

      // Finish any that have a fixed (literal or intuited) length
      output.forEach(function (item) {
        if (item.getBaseLength() == null) return
        finishSizing(item);
      });

      var resized = 0;
      var resizing;
      var hunkSize;
      do {
        resizing = false;
        hunkSize = Math.round(remainingSpace / variableCount);
        output.forEach(function (item) {
          if (item.finished) return
          if (!item.maxLength) return
          if (item.getMaxLength() < hunkSize) {
            finishSizing(item, item.maxLength);
            resizing = true;
          }
        });
      } while (resizing && resized++ < output.length)
      if (resizing) throw new error$1.Internal('Resize loop iterated too many times while determining maxLength')

      resized = 0;
      do {
        resizing = false;
        hunkSize = Math.round(remainingSpace / variableCount);
        output.forEach(function (item) {
          if (item.finished) return
          if (!item.minLength) return
          if (item.getMinLength() >= hunkSize) {
            finishSizing(item, item.minLength);
            resizing = true;
          }
        });
      } while (resizing && resized++ < output.length)
      if (resizing) throw new error$1.Internal('Resize loop iterated too many times while determining minLength')

      hunkSize = Math.round(remainingSpace / variableCount);
      output.forEach(function (item) {
        if (item.finished) return
        finishSizing(item, hunkSize);
      });

      return output
    }

    function renderFunction (item, values, length) {
      validate$2('OON', arguments);
      if (item.type) {
        return item.value(values, values[item.type + 'Theme'] || {}, length)
      } else {
        return item.value(values, {}, length)
      }
    }

    function renderValue (item, values) {
      var length = item.getBaseLength();
      var value = typeof item.value === 'function' ? renderFunction(item, values, length) : item.value;
      if (value == null || value === '') return ''
      var alignWith = align[item.align] || align.left;
      var leftPadding = item.padLeft ? align.left('', item.padLeft) : '';
      var rightPadding = item.padRight ? align.right('', item.padRight) : '';
      var truncated = wideTruncate$1(String(value), length);
      var aligned = alignWith(truncated, length);
      return leftPadding + aligned + rightPadding
    }

    var consoleControl = consoleControlStrings;
    var renderTemplate$1 = renderTemplate$3.exports;
    var validate$1 = aproba;

    var Plumbing$1 = plumbing.exports = function (theme, template, width) {
      if (!width) width = 80;
      validate$1('OAN', [theme, template, width]);
      this.showing = false;
      this.theme = theme;
      this.width = width;
      this.template = template;
    };
    Plumbing$1.prototype = {};

    Plumbing$1.prototype.setTheme = function (theme) {
      validate$1('O', [theme]);
      this.theme = theme;
    };

    Plumbing$1.prototype.setTemplate = function (template) {
      validate$1('A', [template]);
      this.template = template;
    };

    Plumbing$1.prototype.setWidth = function (width) {
      validate$1('N', [width]);
      this.width = width;
    };

    Plumbing$1.prototype.hide = function () {
      return consoleControl.gotoSOL() + consoleControl.eraseLine()
    };

    Plumbing$1.prototype.hideCursor = consoleControl.hideCursor;

    Plumbing$1.prototype.showCursor = consoleControl.showCursor;

    Plumbing$1.prototype.show = function (status) {
      var values = Object.create(this.theme);
      for (var key in status) {
        values[key] = status[key];
      }

      return renderTemplate$1(this.width, this.template, values).trim() +
             consoleControl.color('reset') +
             consoleControl.eraseLine() + consoleControl.gotoSOL()
    };

    var hasUnicode$1 = {exports: {}};

    var os$2 = require$$0__default$4["default"];

    hasUnicode$1.exports = function () {
      // Recent Win32 platforms (>XP) CAN support unicode in the console but
      // don't have to, and in non-english locales often use traditional local
      // code pages. There's no way, short of windows system calls or execing
      // the chcp command line program to figure this out. As such, we default
      // this to false and encourage your users to override it via config if
      // appropriate.
      if (os$2.type() == "Windows_NT") { return false }

      var isUTF8 = /UTF-?8$/i;
      var ctype = process.env.LC_ALL || process.env.LC_CTYPE || process.env.LANG;
      return isUTF8.test(ctype)
    };

    // call it on itself so we can test the export val for basic stuff
    var colorSupport_1 = colorSupport$1({ alwaysReturn: true }, colorSupport$1);

    function hasNone (obj, options) {
      obj.level = 0;
      obj.hasBasic = false;
      obj.has256 = false;
      obj.has16m = false;
      if (!options.alwaysReturn) {
        return false
      }
      return obj
    }

    function hasBasic (obj) {
      obj.hasBasic = true;
      obj.has256 = false;
      obj.has16m = false;
      obj.level = 1;
      return obj
    }

    function has256 (obj) {
      obj.hasBasic = true;
      obj.has256 = true;
      obj.has16m = false;
      obj.level = 2;
      return obj
    }

    function has16m (obj) {
      obj.hasBasic = true;
      obj.has256 = true;
      obj.has16m = true;
      obj.level = 3;
      return obj
    }

    function colorSupport$1 (options, obj) {
      options = options || {};

      obj = obj || {};

      // if just requesting a specific level, then return that.
      if (typeof options.level === 'number') {
        switch (options.level) {
          case 0:
            return hasNone(obj, options)
          case 1:
            return hasBasic(obj)
          case 2:
            return has256(obj)
          case 3:
            return has16m(obj)
        }
      }

      obj.level = 0;
      obj.hasBasic = false;
      obj.has256 = false;
      obj.has16m = false;

      if (typeof process === 'undefined' ||
          !process ||
          !process.stdout ||
          !process.env ||
          !process.platform) {
        return hasNone(obj, options)
      }

      var env = options.env || process.env;
      var stream = options.stream || process.stdout;
      var term = options.term || env.TERM || '';
      var platform = options.platform || process.platform;

      if (!options.ignoreTTY && !stream.isTTY) {
        return hasNone(obj, options)
      }

      if (!options.ignoreDumb && term === 'dumb' && !env.COLORTERM) {
        return hasNone(obj, options)
      }

      if (platform === 'win32') {
        return hasBasic(obj)
      }

      if (env.TMUX) {
        return has256(obj)
      }

      if (!options.ignoreCI && (env.CI || env.TEAMCITY_VERSION)) {
        if (env.TRAVIS) {
          return has256(obj)
        } else {
          return hasNone(obj, options)
        }
      }

      // TODO: add more term programs
      switch (env.TERM_PROGRAM) {
        case 'iTerm.app':
          var ver = env.TERM_PROGRAM_VERSION || '0.';
          if (/^[0-2]\./.test(ver)) {
            return has256(obj)
          } else {
            return has16m(obj)
          }

        case 'HyperTerm':
        case 'Hyper':
          return has16m(obj)

        case 'MacTerm':
          return has16m(obj)

        case 'Apple_Terminal':
          return has256(obj)
      }

      if (/^xterm-256/.test(term)) {
        return has256(obj)
      }

      if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(term)) {
        return hasBasic(obj)
      }

      if (env.COLORTERM) {
        return hasBasic(obj)
      }

      return hasNone(obj, options)
    }

    var colorSupport = colorSupport_1;

    var hasColor$1 = colorSupport().hasBasic;

    var signalExit = {exports: {}};

    var signals$1 = {exports: {}};

    (function (module) {
    // This is not the set of all possible signals.
    //
    // It IS, however, the set of all signals that trigger
    // an exit on either Linux or BSD systems.  Linux is a
    // superset of the signal names supported on BSD, and
    // the unknown signals just fail to register, so we can
    // catch that easily enough.
    //
    // Don't bother with SIGKILL.  It's uncatchable, which
    // means that we can't fire any callbacks anyway.
    //
    // If a user does happen to register a handler on a non-
    // fatal signal like SIGWINCH or something, and then
    // exit, it'll end up firing `process.emit('exit')`, so
    // the handler will be fired anyway.
    //
    // SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
    // artificially, inherently leave the process in a
    // state from which it is not safe to try and enter JS
    // listeners.
    module.exports = [
      'SIGABRT',
      'SIGALRM',
      'SIGHUP',
      'SIGINT',
      'SIGTERM'
    ];

    if (process.platform !== 'win32') {
      module.exports.push(
        'SIGVTALRM',
        'SIGXCPU',
        'SIGXFSZ',
        'SIGUSR2',
        'SIGTRAP',
        'SIGSYS',
        'SIGQUIT',
        'SIGIOT'
        // should detect profiler and enable/disable accordingly.
        // see #21
        // 'SIGPROF'
      );
    }

    if (process.platform === 'linux') {
      module.exports.push(
        'SIGIO',
        'SIGPOLL',
        'SIGPWR',
        'SIGSTKFLT',
        'SIGUNUSED'
      );
    }
    }(signals$1));

    // Note: since nyc uses this module to output coverage, any lines
    // that are in the direct sync flow of nyc's outputCoverage are
    // ignored, since we can never get coverage for them.
    // grab a reference to node's real process object right away
    var process$3 = commonjsGlobal.process;

    const processOk = function (process) {
      return process &&
        typeof process === 'object' &&
        typeof process.removeListener === 'function' &&
        typeof process.emit === 'function' &&
        typeof process.reallyExit === 'function' &&
        typeof process.listeners === 'function' &&
        typeof process.kill === 'function' &&
        typeof process.pid === 'number' &&
        typeof process.on === 'function'
    };

    // some kind of non-node environment, just no-op
    /* istanbul ignore if */
    if (!processOk(process$3)) {
      signalExit.exports = function () {};
    } else {
      var assert$2 = require$$0__default$5["default"];
      var signals = signals$1.exports;
      var isWin = /^win/i.test(process$3.platform);

      var EE = require$$0__default["default"];
      /* istanbul ignore if */
      if (typeof EE !== 'function') {
        EE = EE.EventEmitter;
      }

      var emitter;
      if (process$3.__signal_exit_emitter__) {
        emitter = process$3.__signal_exit_emitter__;
      } else {
        emitter = process$3.__signal_exit_emitter__ = new EE();
        emitter.count = 0;
        emitter.emitted = {};
      }

      // Because this emitter is a global, we have to check to see if a
      // previous version of this library failed to enable infinite listeners.
      // I know what you're about to say.  But literally everything about
      // signal-exit is a compromise with evil.  Get used to it.
      if (!emitter.infinite) {
        emitter.setMaxListeners(Infinity);
        emitter.infinite = true;
      }

      signalExit.exports = function (cb, opts) {
        /* istanbul ignore if */
        if (!processOk(commonjsGlobal.process)) {
          return
        }
        assert$2.equal(typeof cb, 'function', 'a callback must be provided for exit handler');

        if (loaded === false) {
          load();
        }

        var ev = 'exit';
        if (opts && opts.alwaysLast) {
          ev = 'afterexit';
        }

        var remove = function () {
          emitter.removeListener(ev, cb);
          if (emitter.listeners('exit').length === 0 &&
              emitter.listeners('afterexit').length === 0) {
            unload();
          }
        };
        emitter.on(ev, cb);

        return remove
      };

      var unload = function unload () {
        if (!loaded || !processOk(commonjsGlobal.process)) {
          return
        }
        loaded = false;

        signals.forEach(function (sig) {
          try {
            process$3.removeListener(sig, sigListeners[sig]);
          } catch (er) {}
        });
        process$3.emit = originalProcessEmit;
        process$3.reallyExit = originalProcessReallyExit;
        emitter.count -= 1;
      };
      signalExit.exports.unload = unload;

      var emit = function emit (event, code, signal) {
        /* istanbul ignore if */
        if (emitter.emitted[event]) {
          return
        }
        emitter.emitted[event] = true;
        emitter.emit(event, code, signal);
      };

      // { <signal>: <listener fn>, ... }
      var sigListeners = {};
      signals.forEach(function (sig) {
        sigListeners[sig] = function listener () {
          /* istanbul ignore if */
          if (!processOk(commonjsGlobal.process)) {
            return
          }
          // If there are no other listeners, an exit is coming!
          // Simplest way: remove us and then re-send the signal.
          // We know that this will kill the process, so we can
          // safely emit now.
          var listeners = process$3.listeners(sig);
          if (listeners.length === emitter.count) {
            unload();
            emit('exit', null, sig);
            /* istanbul ignore next */
            emit('afterexit', null, sig);
            /* istanbul ignore next */
            if (isWin && sig === 'SIGHUP') {
              // "SIGHUP" throws an `ENOSYS` error on Windows,
              // so use a supported signal instead
              sig = 'SIGINT';
            }
            /* istanbul ignore next */
            process$3.kill(process$3.pid, sig);
          }
        };
      });

      signalExit.exports.signals = function () {
        return signals
      };

      var loaded = false;

      var load = function load () {
        if (loaded || !processOk(commonjsGlobal.process)) {
          return
        }
        loaded = true;

        // This is the number of onSignalExit's that are in play.
        // It's important so that we can count the correct number of
        // listeners on signals, and don't wait for the other one to
        // handle it instead of us.
        emitter.count += 1;

        signals = signals.filter(function (sig) {
          try {
            process$3.on(sig, sigListeners[sig]);
            return true
          } catch (er) {
            return false
          }
        });

        process$3.emit = processEmit;
        process$3.reallyExit = processReallyExit;
      };
      signalExit.exports.load = load;

      var originalProcessReallyExit = process$3.reallyExit;
      var processReallyExit = function processReallyExit (code) {
        /* istanbul ignore if */
        if (!processOk(commonjsGlobal.process)) {
          return
        }
        process$3.exitCode = code || /* istanbul ignore next */ 0;
        emit('exit', process$3.exitCode, null);
        /* istanbul ignore next */
        emit('afterexit', process$3.exitCode, null);
        /* istanbul ignore next */
        originalProcessReallyExit.call(process$3, process$3.exitCode);
      };

      var originalProcessEmit = process$3.emit;
      var processEmit = function processEmit (ev, arg) {
        if (ev === 'exit' && processOk(commonjsGlobal.process)) {
          /* istanbul ignore else */
          if (arg !== undefined) {
            process$3.exitCode = arg;
          }
          var ret = originalProcessEmit.apply(this, arguments);
          /* istanbul ignore next */
          emit('exit', process$3.exitCode, null);
          /* istanbul ignore next */
          emit('afterexit', process$3.exitCode, null);
          /* istanbul ignore next */
          return ret
        } else {
          return originalProcessEmit.apply(this, arguments)
        }
      };
    }

    var themes$1 = {exports: {}};

    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    /* eslint-disable no-unused-vars */
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val) {
    	if (val === null || val === undefined) {
    		throw new TypeError('Object.assign cannot be called with null or undefined');
    	}

    	return Object(val);
    }

    function shouldUseNative() {
    	try {
    		if (!Object.assign) {
    			return false;
    		}

    		// Detect buggy property enumeration order in older V8 versions.

    		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
    		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
    		test1[5] = 'de';
    		if (Object.getOwnPropertyNames(test1)[0] === '5') {
    			return false;
    		}

    		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
    		var test2 = {};
    		for (var i = 0; i < 10; i++) {
    			test2['_' + String.fromCharCode(i)] = i;
    		}
    		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
    			return test2[n];
    		});
    		if (order2.join('') !== '0123456789') {
    			return false;
    		}

    		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
    		var test3 = {};
    		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
    			test3[letter] = letter;
    		});
    		if (Object.keys(Object.assign({}, test3)).join('') !==
    				'abcdefghijklmnopqrst') {
    			return false;
    		}

    		return true;
    	} catch (err) {
    		// We don't expect any of the above to throw, but better to be safe.
    		return false;
    	}
    }

    var objectAssign$1 = shouldUseNative() ? Object.assign : function (target, source) {
    	var from;
    	var to = toObject(target);
    	var symbols;

    	for (var s = 1; s < arguments.length; s++) {
    		from = Object(arguments[s]);

    		for (var key in from) {
    			if (hasOwnProperty.call(from, key)) {
    				to[key] = from[key];
    			}
    		}

    		if (getOwnPropertySymbols) {
    			symbols = getOwnPropertySymbols(from);
    			for (var i = 0; i < symbols.length; i++) {
    				if (propIsEnumerable.call(from, symbols[i])) {
    					to[symbols[i]] = from[symbols[i]];
    				}
    			}
    		}
    	}

    	return to;
    };

    var spin$1 = function spin (spinstr, spun) {
      return spinstr[spun % spinstr.length]
    };

    var validate = aproba;
    var renderTemplate = renderTemplate$3.exports;
    var wideTruncate = wideTruncate_1;
    var stringWidth = stringWidth$4;

    var progressBar$1 = function (theme, width, completed) {
      validate('ONN', [theme, width, completed]);
      if (completed < 0) completed = 0;
      if (completed > 1) completed = 1;
      if (width <= 0) return ''
      var sofar = Math.round(width * completed);
      var rest = width - sofar;
      var template = [
        {type: 'complete', value: repeat(theme.complete, sofar), length: sofar},
        {type: 'remaining', value: repeat(theme.remaining, rest), length: rest}
      ];
      return renderTemplate(width, template, theme)
    };

    // lodash's way of repeating
    function repeat (string, width) {
      var result = '';
      var n = width;
      do {
        if (n % 2) {
          result += string;
        }
        n = Math.floor(n / 2);
        /* eslint no-self-assign: 0 */
        string += string;
      } while (n && stringWidth(result) < width)

      return wideTruncate(result, width)
    }

    var spin = spin$1;
    var progressBar = progressBar$1;

    var baseTheme = {
      activityIndicator: function (values, theme, width) {
        if (values.spun == null) return
        return spin(theme, values.spun)
      },
      progressbar: function (values, theme, width) {
        if (values.completed == null) return
        return progressBar(theme, width, values.completed)
      }
    };

    var objectAssign = objectAssign$1;

    var themeSet = function () {
      return ThemeSetProto.newThemeSet()
    };

    var ThemeSetProto = {};

    ThemeSetProto.baseTheme = baseTheme;

    ThemeSetProto.newTheme = function (parent, theme) {
      if (!theme) {
        theme = parent;
        parent = this.baseTheme;
      }
      return objectAssign({}, parent, theme)
    };

    ThemeSetProto.getThemeNames = function () {
      return Object.keys(this.themes)
    };

    ThemeSetProto.addTheme = function (name, parent, theme) {
      this.themes[name] = this.newTheme(parent, theme);
    };

    ThemeSetProto.addToAllThemes = function (theme) {
      var themes = this.themes;
      Object.keys(themes).forEach(function (name) {
        objectAssign(themes[name], theme);
      });
      objectAssign(this.baseTheme, theme);
    };

    ThemeSetProto.getTheme = function (name) {
      if (!this.themes[name]) throw this.newMissingThemeError(name)
      return this.themes[name]
    };

    ThemeSetProto.setDefault = function (opts, name) {
      if (name == null) {
        name = opts;
        opts = {};
      }
      var platform = opts.platform == null ? 'fallback' : opts.platform;
      var hasUnicode = !!opts.hasUnicode;
      var hasColor = !!opts.hasColor;
      if (!this.defaults[platform]) this.defaults[platform] = {true: {}, false: {}};
      this.defaults[platform][hasUnicode][hasColor] = name;
    };

    ThemeSetProto.getDefault = function (opts) {
      if (!opts) opts = {};
      var platformName = opts.platform || process.platform;
      var platform = this.defaults[platformName] || this.defaults.fallback;
      var hasUnicode = !!opts.hasUnicode;
      var hasColor = !!opts.hasColor;
      if (!platform) throw this.newMissingDefaultThemeError(platformName, hasUnicode, hasColor)
      if (!platform[hasUnicode][hasColor]) {
        if (hasUnicode && hasColor && platform[!hasUnicode][hasColor]) {
          hasUnicode = false;
        } else if (hasUnicode && hasColor && platform[hasUnicode][!hasColor]) {
          hasColor = false;
        } else if (hasUnicode && hasColor && platform[!hasUnicode][!hasColor]) {
          hasUnicode = false;
          hasColor = false;
        } else if (hasUnicode && !hasColor && platform[!hasUnicode][hasColor]) {
          hasUnicode = false;
        } else if (!hasUnicode && hasColor && platform[hasUnicode][!hasColor]) {
          hasColor = false;
        } else if (platform === this.defaults.fallback) {
          throw this.newMissingDefaultThemeError(platformName, hasUnicode, hasColor)
        }
      }
      if (platform[hasUnicode][hasColor]) {
        return this.getTheme(platform[hasUnicode][hasColor])
      } else {
        return this.getDefault(objectAssign({}, opts, {platform: 'fallback'}))
      }
    };

    ThemeSetProto.newMissingThemeError = function newMissingThemeError (name) {
      var err = new Error('Could not find a gauge theme named "' + name + '"');
      Error.captureStackTrace.call(err, newMissingThemeError);
      err.theme = name;
      err.code = 'EMISSINGTHEME';
      return err
    };

    ThemeSetProto.newMissingDefaultThemeError = function newMissingDefaultThemeError (platformName, hasUnicode, hasColor) {
      var err = new Error(
        'Could not find a gauge theme for your platform/unicode/color use combo:\n' +
        '    platform = ' + platformName + '\n' +
        '    hasUnicode = ' + hasUnicode + '\n' +
        '    hasColor = ' + hasColor);
      Error.captureStackTrace.call(err, newMissingDefaultThemeError);
      err.platform = platformName;
      err.hasUnicode = hasUnicode;
      err.hasColor = hasColor;
      err.code = 'EMISSINGTHEME';
      return err
    };

    ThemeSetProto.newThemeSet = function () {
      var themeset = function (opts) {
        return themeset.getDefault(opts)
      };
      return objectAssign(themeset, ThemeSetProto, {
        themes: objectAssign({}, this.themes),
        baseTheme: objectAssign({}, this.baseTheme),
        defaults: JSON.parse(JSON.stringify(this.defaults || {}))
      })
    };

    var color = consoleControlStrings.color;
    var ThemeSet = themeSet;

    var themes = themes$1.exports = new ThemeSet();

    themes.addTheme('ASCII', {
      preProgressbar: '[',
      postProgressbar: ']',
      progressbarTheme: {
        complete: '#',
        remaining: '.'
      },
      activityIndicatorTheme: '-\\|/',
      preSubsection: '>'
    });

    themes.addTheme('colorASCII', themes.getTheme('ASCII'), {
      progressbarTheme: {
        preComplete: color('bgBrightWhite', 'brightWhite'),
        complete: '#',
        postComplete: color('reset'),
        preRemaining: color('bgBrightBlack', 'brightBlack'),
        remaining: '.',
        postRemaining: color('reset')
      }
    });

    themes.addTheme('brailleSpinner', {
      preProgressbar: '⸨',
      postProgressbar: '⸩',
      progressbarTheme: {
        complete: '#',
        remaining: '⠂'
      },
      activityIndicatorTheme: '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏',
      preSubsection: '>'
    });

    themes.addTheme('colorBrailleSpinner', themes.getTheme('brailleSpinner'), {
      progressbarTheme: {
        preComplete: color('bgBrightWhite', 'brightWhite'),
        complete: '#',
        postComplete: color('reset'),
        preRemaining: color('bgBrightBlack', 'brightBlack'),
        remaining: '⠂',
        postRemaining: color('reset')
      }
    });

    themes.setDefault({}, 'ASCII');
    themes.setDefault({hasColor: true}, 'colorASCII');
    themes.setDefault({platform: 'darwin', hasUnicode: true}, 'brailleSpinner');
    themes.setDefault({platform: 'darwin', hasUnicode: true, hasColor: true}, 'colorBrailleSpinner');
    themes.setDefault({platform: 'linux', hasUnicode: true}, 'brailleSpinner');
    themes.setDefault({platform: 'linux', hasUnicode: true, hasColor: true}, 'colorBrailleSpinner');

    // this exists so we can replace it during testing
    var setInterval_1 = setInterval;

    // this exists so we can replace it during testing
    var process_1 = process;

    var setImmediate$2 = {exports: {}};

    var process$2 = process_1;
    try {
      setImmediate$2.exports = setImmediate;
    } catch (ex) {
      setImmediate$2.exports = process$2.nextTick;
    }

    var Plumbing = plumbing.exports;
    var hasUnicode = hasUnicode$1.exports;
    var hasColor = hasColor$1;
    var onExit = signalExit.exports;
    var defaultThemes = themes$1.exports;
    var setInterval$1 = setInterval_1;
    var process$1 = process_1;
    var setImmediate$1 = setImmediate$2.exports;

    var gauge = Gauge;

    function callWith (obj, method) {
      return function () {
        return method.call(obj)
      }
    }

    function Gauge (arg1, arg2) {
      var options, writeTo;
      if (arg1 && arg1.write) {
        writeTo = arg1;
        options = arg2 || {};
      } else if (arg2 && arg2.write) {
        writeTo = arg2;
        options = arg1 || {};
      } else {
        writeTo = process$1.stderr;
        options = arg1 || arg2 || {};
      }

      this._status = {
        spun: 0,
        section: '',
        subsection: ''
      };
      this._paused = false; // are we paused for back pressure?
      this._disabled = true; // are all progress bar updates disabled?
      this._showing = false; // do we WANT the progress bar on screen
      this._onScreen = false; // IS the progress bar on screen
      this._needsRedraw = false; // should we print something at next tick?
      this._hideCursor = options.hideCursor == null ? true : options.hideCursor;
      this._fixedFramerate = options.fixedFramerate == null
        ? !(/^v0\.8\./.test(process$1.version))
        : options.fixedFramerate;
      this._lastUpdateAt = null;
      this._updateInterval = options.updateInterval == null ? 50 : options.updateInterval;

      this._themes = options.themes || defaultThemes;
      this._theme = options.theme;
      var theme = this._computeTheme(options.theme);
      var template = options.template || [
        {type: 'progressbar', length: 20},
        {type: 'activityIndicator', kerning: 1, length: 1},
        {type: 'section', kerning: 1, default: ''},
        {type: 'subsection', kerning: 1, default: ''}
      ];
      this.setWriteTo(writeTo, options.tty);
      var PlumbingClass = options.Plumbing || Plumbing;
      this._gauge = new PlumbingClass(theme, template, this.getWidth());

      this._$$doRedraw = callWith(this, this._doRedraw);
      this._$$handleSizeChange = callWith(this, this._handleSizeChange);

      this._cleanupOnExit = options.cleanupOnExit == null || options.cleanupOnExit;
      this._removeOnExit = null;

      if (options.enabled || (options.enabled == null && this._tty && this._tty.isTTY)) {
        this.enable();
      } else {
        this.disable();
      }
    }
    Gauge.prototype = {};

    Gauge.prototype.isEnabled = function () {
      return !this._disabled
    };

    Gauge.prototype.setTemplate = function (template) {
      this._gauge.setTemplate(template);
      if (this._showing) this._requestRedraw();
    };

    Gauge.prototype._computeTheme = function (theme) {
      if (!theme) theme = {};
      if (typeof theme === 'string') {
        theme = this._themes.getTheme(theme);
      } else if (theme && (Object.keys(theme).length === 0 || theme.hasUnicode != null || theme.hasColor != null)) {
        var useUnicode = theme.hasUnicode == null ? hasUnicode() : theme.hasUnicode;
        var useColor = theme.hasColor == null ? hasColor : theme.hasColor;
        theme = this._themes.getDefault({hasUnicode: useUnicode, hasColor: useColor, platform: theme.platform});
      }
      return theme
    };

    Gauge.prototype.setThemeset = function (themes) {
      this._themes = themes;
      this.setTheme(this._theme);
    };

    Gauge.prototype.setTheme = function (theme) {
      this._gauge.setTheme(this._computeTheme(theme));
      if (this._showing) this._requestRedraw();
      this._theme = theme;
    };

    Gauge.prototype._requestRedraw = function () {
      this._needsRedraw = true;
      if (!this._fixedFramerate) this._doRedraw();
    };

    Gauge.prototype.getWidth = function () {
      return ((this._tty && this._tty.columns) || 80) - 1
    };

    Gauge.prototype.setWriteTo = function (writeTo, tty) {
      var enabled = !this._disabled;
      if (enabled) this.disable();
      this._writeTo = writeTo;
      this._tty = tty ||
        (writeTo === process$1.stderr && process$1.stdout.isTTY && process$1.stdout) ||
        (writeTo.isTTY && writeTo) ||
        this._tty;
      if (this._gauge) this._gauge.setWidth(this.getWidth());
      if (enabled) this.enable();
    };

    Gauge.prototype.enable = function () {
      if (!this._disabled) return
      this._disabled = false;
      if (this._tty) this._enableEvents();
      if (this._showing) this.show();
    };

    Gauge.prototype.disable = function () {
      if (this._disabled) return
      if (this._showing) {
        this._lastUpdateAt = null;
        this._showing = false;
        this._doRedraw();
        this._showing = true;
      }
      this._disabled = true;
      if (this._tty) this._disableEvents();
    };

    Gauge.prototype._enableEvents = function () {
      if (this._cleanupOnExit) {
        this._removeOnExit = onExit(callWith(this, this.disable));
      }
      this._tty.on('resize', this._$$handleSizeChange);
      if (this._fixedFramerate) {
        this.redrawTracker = setInterval$1(this._$$doRedraw, this._updateInterval);
        if (this.redrawTracker.unref) this.redrawTracker.unref();
      }
    };

    Gauge.prototype._disableEvents = function () {
      this._tty.removeListener('resize', this._$$handleSizeChange);
      if (this._fixedFramerate) clearInterval(this.redrawTracker);
      if (this._removeOnExit) this._removeOnExit();
    };

    Gauge.prototype.hide = function (cb) {
      if (this._disabled) return cb && process$1.nextTick(cb)
      if (!this._showing) return cb && process$1.nextTick(cb)
      this._showing = false;
      this._doRedraw();
      cb && setImmediate$1(cb);
    };

    Gauge.prototype.show = function (section, completed) {
      this._showing = true;
      if (typeof section === 'string') {
        this._status.section = section;
      } else if (typeof section === 'object') {
        var sectionKeys = Object.keys(section);
        for (var ii = 0; ii < sectionKeys.length; ++ii) {
          var key = sectionKeys[ii];
          this._status[key] = section[key];
        }
      }
      if (completed != null) this._status.completed = completed;
      if (this._disabled) return
      this._requestRedraw();
    };

    Gauge.prototype.pulse = function (subsection) {
      this._status.subsection = subsection || '';
      this._status.spun++;
      if (this._disabled) return
      if (!this._showing) return
      this._requestRedraw();
    };

    Gauge.prototype._handleSizeChange = function () {
      this._gauge.setWidth(this._tty.columns - 1);
      this._requestRedraw();
    };

    Gauge.prototype._doRedraw = function () {
      if (this._disabled || this._paused) return
      if (!this._fixedFramerate) {
        var now = Date.now();
        if (this._lastUpdateAt && now - this._lastUpdateAt < this._updateInterval) return
        this._lastUpdateAt = now;
      }
      if (!this._showing && this._onScreen) {
        this._onScreen = false;
        var result = this._gauge.hide();
        if (this._hideCursor) {
          result += this._gauge.showCursor();
        }
        return this._writeTo.write(result)
      }
      if (!this._showing && !this._onScreen) return
      if (this._showing && !this._onScreen) {
        this._onScreen = true;
        this._needsRedraw = true;
        if (this._hideCursor) {
          this._writeTo.write(this._gauge.hideCursor());
        }
      }
      if (!this._needsRedraw) return
      if (!this._writeTo.write(this._gauge.show(this._status))) {
        this._paused = true;
        this._writeTo.on('drain', callWith(this, function () {
          this._paused = false;
          this._doRedraw();
        }));
      }
    };

    var setBlocking = function (blocking) {
      [process.stdout, process.stderr].forEach(function (stream) {
        if (stream._handle && stream.isTTY && typeof stream._handle.setBlocking === 'function') {
          stream._handle.setBlocking(blocking);
        }
      });
    };

    (function (module, exports) {
    var Progress = lib$2;
    var Gauge = gauge;
    var EE = require$$0__default["default"].EventEmitter;
    var log = module.exports = new EE();
    var util = require$$0__default$1["default"];

    var setBlocking$1 = setBlocking;
    var consoleControl = consoleControlStrings;

    setBlocking$1(true);
    var stream = process.stderr;
    Object.defineProperty(log, 'stream', {
      set: function (newStream) {
        stream = newStream;
        if (this.gauge) {
          this.gauge.setWriteTo(stream, stream);
        }
      },
      get: function () {
        return stream
      },
    });

    // by default, decide based on tty-ness.
    var colorEnabled;
    log.useColor = function () {
      return colorEnabled != null ? colorEnabled : stream.isTTY
    };

    log.enableColor = function () {
      colorEnabled = true;
      this.gauge.setTheme({hasColor: colorEnabled, hasUnicode: unicodeEnabled});
    };
    log.disableColor = function () {
      colorEnabled = false;
      this.gauge.setTheme({hasColor: colorEnabled, hasUnicode: unicodeEnabled});
    };

    // default level
    log.level = 'info';

    log.gauge = new Gauge(stream, {
      enabled: false, // no progress bars unless asked
      theme: {hasColor: log.useColor()},
      template: [
        {type: 'progressbar', length: 20},
        {type: 'activityIndicator', kerning: 1, length: 1},
        {type: 'section', default: ''},
        ':',
        {type: 'logline', kerning: 1, default: ''},
      ],
    });

    log.tracker = new Progress.TrackerGroup();

    // we track this separately as we may need to temporarily disable the
    // display of the status bar for our own loggy purposes.
    log.progressEnabled = log.gauge.isEnabled();

    var unicodeEnabled;

    log.enableUnicode = function () {
      unicodeEnabled = true;
      this.gauge.setTheme({hasColor: this.useColor(), hasUnicode: unicodeEnabled});
    };

    log.disableUnicode = function () {
      unicodeEnabled = false;
      this.gauge.setTheme({hasColor: this.useColor(), hasUnicode: unicodeEnabled});
    };

    log.setGaugeThemeset = function (themes) {
      this.gauge.setThemeset(themes);
    };

    log.setGaugeTemplate = function (template) {
      this.gauge.setTemplate(template);
    };

    log.enableProgress = function () {
      if (this.progressEnabled) {
        return
      }

      this.progressEnabled = true;
      this.tracker.on('change', this.showProgress);
      if (this._paused) {
        return
      }

      this.gauge.enable();
    };

    log.disableProgress = function () {
      if (!this.progressEnabled) {
        return
      }
      this.progressEnabled = false;
      this.tracker.removeListener('change', this.showProgress);
      this.gauge.disable();
    };

    var trackerConstructors = ['newGroup', 'newItem', 'newStream'];

    var mixinLog = function (tracker) {
      // mixin the public methods from log into the tracker
      // (except: conflicts and one's we handle specially)
      Object.keys(log).forEach(function (P) {
        if (P[0] === '_') {
          return
        }

        if (trackerConstructors.filter(function (C) {
          return C === P
        }).length) {
          return
        }

        if (tracker[P]) {
          return
        }

        if (typeof log[P] !== 'function') {
          return
        }

        var func = log[P];
        tracker[P] = function () {
          return func.apply(log, arguments)
        };
      });
      // if the new tracker is a group, make sure any subtrackers get
      // mixed in too
      if (tracker instanceof Progress.TrackerGroup) {
        trackerConstructors.forEach(function (C) {
          var func = tracker[C];
          tracker[C] = function () {
            return mixinLog(func.apply(tracker, arguments))
          };
        });
      }
      return tracker
    };

    // Add tracker constructors to the top level log object
    trackerConstructors.forEach(function (C) {
      log[C] = function () {
        return mixinLog(this.tracker[C].apply(this.tracker, arguments))
      };
    });

    log.clearProgress = function (cb) {
      if (!this.progressEnabled) {
        return cb && process.nextTick(cb)
      }

      this.gauge.hide(cb);
    };

    log.showProgress = function (name, completed) {
      if (!this.progressEnabled) {
        return
      }

      var values = {};
      if (name) {
        values.section = name;
      }

      var last = log.record[log.record.length - 1];
      if (last) {
        values.subsection = last.prefix;
        var disp = log.disp[last.level] || last.level;
        var logline = this._format(disp, log.style[last.level]);
        if (last.prefix) {
          logline += ' ' + this._format(last.prefix, this.prefixStyle);
        }

        logline += ' ' + last.message.split(/\r?\n/)[0];
        values.logline = logline;
      }
      values.completed = completed || this.tracker.completed();
      this.gauge.show(values);
    }.bind(log); // bind for use in tracker's on-change listener

    // temporarily stop emitting, but don't drop
    log.pause = function () {
      this._paused = true;
      if (this.progressEnabled) {
        this.gauge.disable();
      }
    };

    log.resume = function () {
      if (!this._paused) {
        return
      }

      this._paused = false;

      var b = this._buffer;
      this._buffer = [];
      b.forEach(function (m) {
        this.emitLog(m);
      }, this);
      if (this.progressEnabled) {
        this.gauge.enable();
      }
    };

    log._buffer = [];

    var id = 0;
    log.record = [];
    log.maxRecordSize = 10000;
    log.log = function (lvl, prefix, message) {
      var l = this.levels[lvl];
      if (l === undefined) {
        return this.emit('error', new Error(util.format(
          'Undefined log level: %j', lvl)))
      }

      var a = new Array(arguments.length - 2);
      var stack = null;
      for (var i = 2; i < arguments.length; i++) {
        var arg = a[i - 2] = arguments[i];

        // resolve stack traces to a plain string.
        if (typeof arg === 'object' && arg instanceof Error && arg.stack) {
          Object.defineProperty(arg, 'stack', {
            value: stack = arg.stack + '',
            enumerable: true,
            writable: true,
          });
        }
      }
      if (stack) {
        a.unshift(stack + '\n');
      }
      message = util.format.apply(util, a);

      var m = {
        id: id++,
        level: lvl,
        prefix: String(prefix || ''),
        message: message,
        messageRaw: a,
      };

      this.emit('log', m);
      this.emit('log.' + lvl, m);
      if (m.prefix) {
        this.emit(m.prefix, m);
      }

      this.record.push(m);
      var mrs = this.maxRecordSize;
      var n = this.record.length - mrs;
      if (n > mrs / 10) {
        var newSize = Math.floor(mrs * 0.9);
        this.record = this.record.slice(-1 * newSize);
      }

      this.emitLog(m);
    }.bind(log);

    log.emitLog = function (m) {
      if (this._paused) {
        this._buffer.push(m);
        return
      }
      if (this.progressEnabled) {
        this.gauge.pulse(m.prefix);
      }

      var l = this.levels[m.level];
      if (l === undefined) {
        return
      }

      if (l < this.levels[this.level]) {
        return
      }

      if (l > 0 && !isFinite(l)) {
        return
      }

      // If 'disp' is null or undefined, use the lvl as a default
      // Allows: '', 0 as valid disp
      var disp = log.disp[m.level] != null ? log.disp[m.level] : m.level;
      this.clearProgress();
      m.message.split(/\r?\n/).forEach(function (line) {
        if (this.heading) {
          this.write(this.heading, this.headingStyle);
          this.write(' ');
        }
        this.write(disp, log.style[m.level]);
        var p = m.prefix || '';
        if (p) {
          this.write(' ');
        }

        this.write(p, this.prefixStyle);
        this.write(' ' + line + '\n');
      }, this);
      this.showProgress();
    };

    log._format = function (msg, style) {
      if (!stream) {
        return
      }

      var output = '';
      if (this.useColor()) {
        style = style || {};
        var settings = [];
        if (style.fg) {
          settings.push(style.fg);
        }

        if (style.bg) {
          settings.push('bg' + style.bg[0].toUpperCase() + style.bg.slice(1));
        }

        if (style.bold) {
          settings.push('bold');
        }

        if (style.underline) {
          settings.push('underline');
        }

        if (style.inverse) {
          settings.push('inverse');
        }

        if (settings.length) {
          output += consoleControl.color(settings);
        }

        if (style.beep) {
          output += consoleControl.beep();
        }
      }
      output += msg;
      if (this.useColor()) {
        output += consoleControl.color('reset');
      }

      return output
    };

    log.write = function (msg, style) {
      if (!stream) {
        return
      }

      stream.write(this._format(msg, style));
    };

    log.addLevel = function (lvl, n, style, disp) {
      // If 'disp' is null or undefined, use the lvl as a default
      if (disp == null) {
        disp = lvl;
      }

      this.levels[lvl] = n;
      this.style[lvl] = style;
      if (!this[lvl]) {
        this[lvl] = function () {
          var a = new Array(arguments.length + 1);
          a[0] = lvl;
          for (var i = 0; i < arguments.length; i++) {
            a[i + 1] = arguments[i];
          }

          return this.log.apply(this, a)
        }.bind(this);
      }
      this.disp[lvl] = disp;
    };

    log.prefixStyle = { fg: 'magenta' };
    log.headingStyle = { fg: 'white', bg: 'black' };

    log.style = {};
    log.levels = {};
    log.disp = {};
    log.addLevel('silly', -Infinity, { inverse: true }, 'sill');
    log.addLevel('verbose', 1000, { fg: 'blue', bg: 'black' }, 'verb');
    log.addLevel('info', 2000, { fg: 'green' });
    log.addLevel('timing', 2500, { fg: 'green', bg: 'black' });
    log.addLevel('http', 3000, { fg: 'green', bg: 'black' });
    log.addLevel('notice', 3500, { fg: 'blue', bg: 'black' });
    log.addLevel('warn', 4000, { fg: 'black', bg: 'yellow' }, 'WARN');
    log.addLevel('error', 5000, { fg: 'red', bg: 'black' }, 'ERR!');
    log.addLevel('silent', Infinity);

    // allow 'error' prefix
    log.on('error', function () {});
    }(log$2));

    var log$1 = log$2.exports;

    var axios$2 = {exports: {}};

    var bind$2 = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };

    var bind$1 = bind$2;

    // utils is a library of generic helper functions non-specific to axios

    var toString = Object.prototype.toString;

    /**
     * Determine if a value is an Array
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Array, otherwise false
     */
    function isArray(val) {
      return toString.call(val) === '[object Array]';
    }

    /**
     * Determine if a value is undefined
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if the value is undefined, otherwise false
     */
    function isUndefined(val) {
      return typeof val === 'undefined';
    }

    /**
     * Determine if a value is a Buffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Buffer, otherwise false
     */
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
        && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
    }

    /**
     * Determine if a value is an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */
    function isArrayBuffer(val) {
      return toString.call(val) === '[object ArrayBuffer]';
    }

    /**
     * Determine if a value is a FormData
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an FormData, otherwise false
     */
    function isFormData(val) {
      return (typeof FormData !== 'undefined') && (val instanceof FormData);
    }

    /**
     * Determine if a value is a view on an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
     */
    function isArrayBufferView(val) {
      var result;
      if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
        result = ArrayBuffer.isView(val);
      } else {
        result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
      }
      return result;
    }

    /**
     * Determine if a value is a String
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a String, otherwise false
     */
    function isString(val) {
      return typeof val === 'string';
    }

    /**
     * Determine if a value is a Number
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Number, otherwise false
     */
    function isNumber(val) {
      return typeof val === 'number';
    }

    /**
     * Determine if a value is an Object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Object, otherwise false
     */
    function isObject$1(val) {
      return val !== null && typeof val === 'object';
    }

    /**
     * Determine if a value is a plain Object
     *
     * @param {Object} val The value to test
     * @return {boolean} True if value is a plain Object, otherwise false
     */
    function isPlainObject(val) {
      if (toString.call(val) !== '[object Object]') {
        return false;
      }

      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }

    /**
     * Determine if a value is a Date
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Date, otherwise false
     */
    function isDate(val) {
      return toString.call(val) === '[object Date]';
    }

    /**
     * Determine if a value is a File
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a File, otherwise false
     */
    function isFile(val) {
      return toString.call(val) === '[object File]';
    }

    /**
     * Determine if a value is a Blob
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Blob, otherwise false
     */
    function isBlob(val) {
      return toString.call(val) === '[object Blob]';
    }

    /**
     * Determine if a value is a Function
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Function, otherwise false
     */
    function isFunction(val) {
      return toString.call(val) === '[object Function]';
    }

    /**
     * Determine if a value is a Stream
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Stream, otherwise false
     */
    function isStream(val) {
      return isObject$1(val) && isFunction(val.pipe);
    }

    /**
     * Determine if a value is a URLSearchParams object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a URLSearchParams object, otherwise false
     */
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
    }

    /**
     * Trim excess whitespace off the beginning and end of a string
     *
     * @param {String} str The String to trim
     * @returns {String} The String freed of excess whitespace
     */
    function trim$1(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    }

    /**
     * Determine if we're running in a standard browser environment
     *
     * This allows axios to run in a web worker, and react-native.
     * Both environments support XMLHttpRequest, but not fully standard globals.
     *
     * web workers:
     *  typeof window -> undefined
     *  typeof document -> undefined
     *
     * react-native:
     *  navigator.product -> 'ReactNative'
     * nativescript
     *  navigator.product -> 'NativeScript' or 'NS'
     */
    function isStandardBrowserEnv() {
      if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                               navigator.product === 'NativeScript' ||
                                               navigator.product === 'NS')) {
        return false;
      }
      return (
        typeof window !== 'undefined' &&
        typeof document !== 'undefined'
      );
    }

    /**
     * Iterate over an Array or an Object invoking a function for each item.
     *
     * If `obj` is an Array callback will be called passing
     * the value, index, and complete array for each item.
     *
     * If 'obj' is an Object callback will be called passing
     * the value, key, and complete object for each property.
     *
     * @param {Object|Array} obj The object to iterate
     * @param {Function} fn The callback to invoke for each item
     */
    function forEach(obj, fn) {
      // Don't bother if no value provided
      if (obj === null || typeof obj === 'undefined') {
        return;
      }

      // Force an array if not already something iterable
      if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
      }

      if (isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        // Iterate over object keys
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }

    /**
     * Accepts varargs expecting each argument to be an object, then
     * immutably merges the properties of each object and returns result.
     *
     * When multiple objects contain the same key the later object in
     * the arguments list will take precedence.
     *
     * Example:
     *
     * ```js
     * var result = merge({foo: 123}, {foo: 456});
     * console.log(result.foo); // outputs 456
     * ```
     *
     * @param {Object} obj1 Object to merge
     * @returns {Object} Result of all merge properties
     */
    function merge(/* obj1, obj2, obj3, ... */) {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }

      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }

    /**
     * Extends object a by mutably adding to it the properties of object b.
     *
     * @param {Object} a The object to be extended
     * @param {Object} b The object to copy properties from
     * @param {Object} thisArg The object to bind function to
     * @return {Object} The resulting value of object a
     */
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
          a[key] = bind$1(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }

    /**
     * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
     *
     * @param {string} content with BOM
     * @return {string} content value without BOM
     */
    function stripBOM(content) {
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }
      return content;
    }

    var utils$g = {
      isArray: isArray,
      isArrayBuffer: isArrayBuffer,
      isBuffer: isBuffer,
      isFormData: isFormData,
      isArrayBufferView: isArrayBufferView,
      isString: isString,
      isNumber: isNumber,
      isObject: isObject$1,
      isPlainObject: isPlainObject,
      isUndefined: isUndefined,
      isDate: isDate,
      isFile: isFile,
      isBlob: isBlob,
      isFunction: isFunction,
      isStream: isStream,
      isURLSearchParams: isURLSearchParams,
      isStandardBrowserEnv: isStandardBrowserEnv,
      forEach: forEach,
      merge: merge,
      extend: extend,
      trim: trim$1,
      stripBOM: stripBOM
    };

    var utils$f = utils$g;

    function encode(val) {
      return encodeURIComponent(val).
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace(/%20/g, '+').
        replace(/%5B/gi, '[').
        replace(/%5D/gi, ']');
    }

    /**
     * Build a URL by appending params to the end
     *
     * @param {string} url The base of the url (e.g., http://www.google.com)
     * @param {object} [params] The params to be appended
     * @returns {string} The formatted url
     */
    var buildURL$3 = function buildURL(url, params, paramsSerializer) {
      /*eslint no-param-reassign:0*/
      if (!params) {
        return url;
      }

      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils$f.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];

        utils$f.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === 'undefined') {
            return;
          }

          if (utils$f.isArray(val)) {
            key = key + '[]';
          } else {
            val = [val];
          }

          utils$f.forEach(val, function parseValue(v) {
            if (utils$f.isDate(v)) {
              v = v.toISOString();
            } else if (utils$f.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + '=' + encode(v));
          });
        });

        serializedParams = parts.join('&');
      }

      if (serializedParams) {
        var hashmarkIndex = url.indexOf('#');
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }

        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }

      return url;
    };

    var utils$e = utils$g;

    function InterceptorManager$1() {
      this.handlers = [];
    }

    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };

    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     */
    InterceptorManager$1.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };

    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     */
    InterceptorManager$1.prototype.forEach = function forEach(fn) {
      utils$e.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };

    var InterceptorManager_1 = InterceptorManager$1;

    var utils$d = utils$g;

    var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
      utils$d.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };

    /**
     * Update an Error with the specified config, error code, and response.
     *
     * @param {Error} error The error to update.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The error.
     */
    var enhanceError$3 = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }

      error.request = request;
      error.response = response;
      error.isAxiosError = true;

      error.toJSON = function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      };
      return error;
    };

    var enhanceError$2 = enhanceError$3;

    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The created error.
     */
    var createError$3 = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError$2(error, config, code, request, response);
    };

    var createError$2 = createError$3;

    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     */
    var settle$2 = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError$2(
          'Request failed with status code ' + response.status,
          response.config,
          null,
          response.request,
          response
        ));
      }
    };

    var utils$c = utils$g;

    var cookies$1 = (
      utils$c.isStandardBrowserEnv() ?

      // Standard browser envs support document.cookie
        (function standardBrowserEnv() {
          return {
            write: function write(name, value, expires, path, domain, secure) {
              var cookie = [];
              cookie.push(name + '=' + encodeURIComponent(value));

              if (utils$c.isNumber(expires)) {
                cookie.push('expires=' + new Date(expires).toGMTString());
              }

              if (utils$c.isString(path)) {
                cookie.push('path=' + path);
              }

              if (utils$c.isString(domain)) {
                cookie.push('domain=' + domain);
              }

              if (secure === true) {
                cookie.push('secure');
              }

              document.cookie = cookie.join('; ');
            },

            read: function read(name) {
              var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
              return (match ? decodeURIComponent(match[3]) : null);
            },

            remove: function remove(name) {
              this.write(name, '', Date.now() - 86400000);
            }
          };
        })() :

      // Non standard browser env (web workers, react-native) lack needed support.
        (function nonStandardBrowserEnv() {
          return {
            write: function write() {},
            read: function read() { return null; },
            remove: function remove() {}
          };
        })()
    );

    /**
     * Determines whether the specified URL is absolute
     *
     * @param {string} url The URL to test
     * @returns {boolean} True if the specified URL is absolute, otherwise false
     */
    var isAbsoluteURL$1 = function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };

    /**
     * Creates a new URL by combining the specified URLs
     *
     * @param {string} baseURL The base URL
     * @param {string} relativeURL The relative URL
     * @returns {string} The combined URL
     */
    var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
      return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
    };

    var isAbsoluteURL = isAbsoluteURL$1;
    var combineURLs = combineURLs$1;

    /**
     * Creates a new URL by combining the baseURL with the requestedURL,
     * only when the requestedURL is not already an absolute URL.
     * If the requestURL is absolute, this function returns the requestedURL untouched.
     *
     * @param {string} baseURL The base URL
     * @param {string} requestedURL Absolute or relative URL to combine
     * @returns {string} The combined full path
     */
    var buildFullPath$2 = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };

    var utils$b = utils$g;

    // Headers whose duplicates are ignored by node
    // c.f. https://nodejs.org/api/http.html#http_message_headers
    var ignoreDuplicateOf = [
      'age', 'authorization', 'content-length', 'content-type', 'etag',
      'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
      'last-modified', 'location', 'max-forwards', 'proxy-authorization',
      'referer', 'retry-after', 'user-agent'
    ];

    /**
     * Parse headers into an object
     *
     * ```
     * Date: Wed, 27 Aug 2014 08:58:49 GMT
     * Content-Type: application/json
     * Connection: keep-alive
     * Transfer-Encoding: chunked
     * ```
     *
     * @param {String} headers Headers needing to be parsed
     * @returns {Object} Headers parsed into an object
     */
    var parseHeaders$1 = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;

      if (!headers) { return parsed; }

      utils$b.forEach(headers.split('\n'), function parser(line) {
        i = line.indexOf(':');
        key = utils$b.trim(line.substr(0, i)).toLowerCase();
        val = utils$b.trim(line.substr(i + 1));

        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === 'set-cookie') {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
          }
        }
      });

      return parsed;
    };

    var utils$a = utils$g;

    var isURLSameOrigin$1 = (
      utils$a.isStandardBrowserEnv() ?

      // Standard browser envs have full support of the APIs needed to test
      // whether the request URL is of the same origin as current location.
        (function standardBrowserEnv() {
          var msie = /(msie|trident)/i.test(navigator.userAgent);
          var urlParsingNode = document.createElement('a');
          var originURL;

          /**
        * Parse a URL to discover it's components
        *
        * @param {String} url The URL to be parsed
        * @returns {Object}
        */
          function resolveURL(url) {
            var href = url;

            if (msie) {
            // IE needs attribute set twice to normalize properties
              urlParsingNode.setAttribute('href', href);
              href = urlParsingNode.href;
            }

            urlParsingNode.setAttribute('href', href);

            // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
            return {
              href: urlParsingNode.href,
              protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
              host: urlParsingNode.host,
              search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
              hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
              hostname: urlParsingNode.hostname,
              port: urlParsingNode.port,
              pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                urlParsingNode.pathname :
                '/' + urlParsingNode.pathname
            };
          }

          originURL = resolveURL(window.location.href);

          /**
        * Determine if a URL shares the same origin as the current location
        *
        * @param {String} requestURL The URL to test
        * @returns {boolean} True if URL shares the same origin, otherwise false
        */
          return function isURLSameOrigin(requestURL) {
            var parsed = (utils$a.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
            return (parsed.protocol === originURL.protocol &&
                parsed.host === originURL.host);
          };
        })() :

      // Non standard browser envs (web workers, react-native) lack needed support.
        (function nonStandardBrowserEnv() {
          return function isURLSameOrigin() {
            return true;
          };
        })()
    );

    /**
     * A `Cancel` is an object that is thrown when an operation is canceled.
     *
     * @class
     * @param {string=} message The message.
     */
    function Cancel$4(message) {
      this.message = message;
    }

    Cancel$4.prototype.toString = function toString() {
      return 'Cancel' + (this.message ? ': ' + this.message : '');
    };

    Cancel$4.prototype.__CANCEL__ = true;

    var Cancel_1 = Cancel$4;

    var utils$9 = utils$g;
    var settle$1 = settle$2;
    var cookies = cookies$1;
    var buildURL$2 = buildURL$3;
    var buildFullPath$1 = buildFullPath$2;
    var parseHeaders = parseHeaders$1;
    var isURLSameOrigin = isURLSameOrigin$1;
    var createError$1 = createError$3;
    var defaults$6 = defaults_1;
    var Cancel$3 = Cancel_1;

    var xhr = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }

          if (config.signal) {
            config.signal.removeEventListener('abort', onCanceled);
          }
        }

        if (utils$9.isFormData(requestData)) {
          delete requestHeaders['Content-Type']; // Let the browser set it
        }

        var request = new XMLHttpRequest();

        // HTTP basic authentication
        if (config.auth) {
          var username = config.auth.username || '';
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
          requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }

        var fullPath = buildFullPath$1(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL$2(fullPath, config.params, config.paramsSerializer), true);

        // Set the request timeout in MS
        request.timeout = config.timeout;

        function onloadend() {
          if (!request) {
            return;
          }
          // Prepare the response
          var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
            request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config: config,
            request: request
          };

          settle$1(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);

          // Clean up request
          request = null;
        }

        if ('onloadend' in request) {
          // Use onloadend if available
          request.onloadend = onloadend;
        } else {
          // Listen for ready state to emulate onloadend
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }

            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
              return;
            }
            // readystate handler is calling before onerror or ontimeout handlers,
            // so we should call onloadend on the next 'tick'
            setTimeout(onloadend);
          };
        }

        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }

          reject(createError$1('Request aborted', config, 'ECONNABORTED', request));

          // Clean up request
          request = null;
        };

        // Handle low level network errors
        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(createError$1('Network Error', config, null, request));

          // Clean up request
          request = null;
        };

        // Handle timeout
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
          var transitional = config.transitional || defaults$6.transitional;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError$1(
            timeoutErrorMessage,
            config,
            transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
            request));

          // Clean up request
          request = null;
        };

        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (utils$9.isStandardBrowserEnv()) {
          // Add xsrf header
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
            cookies.read(config.xsrfCookieName) :
            undefined;

          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }

        // Add headers to the request
        if ('setRequestHeader' in request) {
          utils$9.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
              // Remove Content-Type if data is undefined
              delete requestHeaders[key];
            } else {
              // Otherwise add header to the request
              request.setRequestHeader(key, val);
            }
          });
        }

        // Add withCredentials to request if needed
        if (!utils$9.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }

        // Add responseType to request if needed
        if (responseType && responseType !== 'json') {
          request.responseType = config.responseType;
        }

        // Handle progress if needed
        if (typeof config.onDownloadProgress === 'function') {
          request.addEventListener('progress', config.onDownloadProgress);
        }

        // Not all browsers support upload events
        if (typeof config.onUploadProgress === 'function' && request.upload) {
          request.upload.addEventListener('progress', config.onUploadProgress);
        }

        if (config.cancelToken || config.signal) {
          // Handle cancellation
          // eslint-disable-next-line func-names
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || (cancel && cancel.type) ? new Cancel$3('canceled') : cancel);
            request.abort();
            request = null;
          };

          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
          }
        }

        if (!requestData) {
          requestData = null;
        }

        // Send the request
        request.send(requestData);
      });
    };

    var followRedirects = {exports: {}};

    var debug$6;

    var debug_1$1 = function () {
      if (!debug$6) {
        try {
          /* eslint global-require: off */
          debug$6 = require("debug")("follow-redirects");
        }
        catch (error) { /* */ }
        if (typeof debug$6 !== "function") {
          debug$6 = function () { /* */ };
        }
      }
      debug$6.apply(null, arguments);
    };

    var url$1 = require$$0__default$6["default"];
    var URL = url$1.URL;
    var http$1 = require$$1__default["default"];
    var https$1 = require$$2__default["default"];
    var Writable = require$$0__default$2["default"].Writable;
    var assert$1 = require$$0__default$5["default"];
    var debug$5 = debug_1$1;

    // Create handlers that pass events from native requests
    var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
    var eventHandlers = Object.create(null);
    events.forEach(function (event) {
      eventHandlers[event] = function (arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });

    // Error types with codes
    var RedirectionError = createErrorType(
      "ERR_FR_REDIRECTION_FAILURE",
      "Redirected request failed"
    );
    var TooManyRedirectsError = createErrorType(
      "ERR_FR_TOO_MANY_REDIRECTS",
      "Maximum number of redirects exceeded"
    );
    var MaxBodyLengthExceededError = createErrorType(
      "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
      "Request body larger than maxBodyLength limit"
    );
    var WriteAfterEndError = createErrorType(
      "ERR_STREAM_WRITE_AFTER_END",
      "write after end"
    );

    // An HTTP(S) request that can be redirected
    function RedirectableRequest(options, responseCallback) {
      // Initialize the request
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];

      // Attach a callback if passed
      if (responseCallback) {
        this.on("response", responseCallback);
      }

      // React to responses of native requests
      var self = this;
      this._onNativeResponse = function (response) {
        self._processResponse(response);
      };

      // Perform the first request
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);

    RedirectableRequest.prototype.abort = function () {
      abortRequest(this._currentRequest);
      this.emit("abort");
    };

    // Writes buffered data to the current native request
    RedirectableRequest.prototype.write = function (data, encoding, callback) {
      // Writing is not allowed if end has been called
      if (this._ending) {
        throw new WriteAfterEndError();
      }

      // Validate input and shift parameters if necessary
      if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }

      // Ignore empty buffers, since writing them doesn't invoke the callback
      // https://github.com/nodejs/node/issues/22066
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      // Only write when we don't exceed the maximum body length
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data: data, encoding: encoding });
        this._currentRequest.write(data, encoding, callback);
      }
      // Error when we exceed the maximum body length
      else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };

    // Ends the current native request
    RedirectableRequest.prototype.end = function (data, encoding, callback) {
      // Shift parameters if necessary
      if (typeof data === "function") {
        callback = data;
        data = encoding = null;
      }
      else if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }

      // Write data if needed and end
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      }
      else {
        var self = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function () {
          self._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };

    // Sets a header value on the current native request
    RedirectableRequest.prototype.setHeader = function (name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };

    // Clears a header value on the current native request
    RedirectableRequest.prototype.removeHeader = function (name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };

    // Global timeout for all underlying requests
    RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
      var self = this;

      // Destroys the socket on timeout
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
      }

      // Sets up a timer to trigger a timeout event
      function startTimer(socket) {
        if (self._timeout) {
          clearTimeout(self._timeout);
        }
        self._timeout = setTimeout(function () {
          self.emit("timeout");
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }

      // Stops a timeout from triggering
      function clearTimer() {
        // Clear the timeout
        if (self._timeout) {
          clearTimeout(self._timeout);
          self._timeout = null;
        }

        // Clean up all attached listeners
        self.removeListener("abort", clearTimer);
        self.removeListener("error", clearTimer);
        self.removeListener("response", clearTimer);
        if (callback) {
          self.removeListener("timeout", callback);
        }
        if (!self.socket) {
          self._currentRequest.removeListener("socket", startTimer);
        }
      }

      // Attach callback if passed
      if (callback) {
        this.on("timeout", callback);
      }

      // Start the timer if or when the socket is opened
      if (this.socket) {
        startTimer(this.socket);
      }
      else {
        this._currentRequest.once("socket", startTimer);
      }

      // Clean up on events
      this.on("socket", destroyOnTimeout);
      this.on("abort", clearTimer);
      this.on("error", clearTimer);
      this.on("response", clearTimer);

      return this;
    };

    // Proxy all other public ClientRequest methods
    [
      "flushHeaders", "getHeader",
      "setNoDelay", "setSocketKeepAlive",
    ].forEach(function (method) {
      RedirectableRequest.prototype[method] = function (a, b) {
        return this._currentRequest[method](a, b);
      };
    });

    // Proxy all public ClientRequest properties
    ["aborted", "connection", "socket"].forEach(function (property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function () { return this._currentRequest[property]; },
      });
    });

    RedirectableRequest.prototype._sanitizeOptions = function (options) {
      // Ensure headers are always present
      if (!options.headers) {
        options.headers = {};
      }

      // Since http.request treats host as an alias of hostname,
      // but the url module interprets host as hostname plus port,
      // eliminate the host property to avoid confusion.
      if (options.host) {
        // Use hostname if set, because it has precedence
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }

      // Complete the URL object when necessary
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
          options.pathname = options.path;
        }
        else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };


    // Executes the next native request (initial or redirect)
    RedirectableRequest.prototype._performRequest = function () {
      // Load the native protocol
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        this.emit("error", new TypeError("Unsupported protocol " + protocol));
        return;
      }

      // If specified, use the agent corresponding to the protocol
      // (HTTP and HTTPS use different types of agents)
      if (this._options.agents) {
        var scheme = protocol.substr(0, protocol.length - 1);
        this._options.agent = this._options.agents[scheme];
      }

      // Create the native request
      var request = this._currentRequest =
            nativeProtocol.request(this._options, this._onNativeResponse);
      this._currentUrl = url$1.format(this._options);

      // Set up event handlers
      request._redirectable = this;
      for (var e = 0; e < events.length; e++) {
        request.on(events[e], eventHandlers[events[e]]);
      }

      // End a redirected request
      // (The first request must be ended explicitly with RedirectableRequest#end)
      if (this._isRedirect) {
        // Write the request entity and end.
        var i = 0;
        var self = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
          // Only write if this request has not been redirected yet
          /* istanbul ignore else */
          if (request === self._currentRequest) {
            // Report any write errors
            /* istanbul ignore if */
            if (error) {
              self.emit("error", error);
            }
            // Write the next buffer if there are still left
            else if (i < buffers.length) {
              var buffer = buffers[i++];
              /* istanbul ignore else */
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            }
            // End the request if `end` has been called on us
            else if (self._ended) {
              request.end();
            }
          }
        }());
      }
    };

    // Processes a response from the current native request
    RedirectableRequest.prototype._processResponse = function (response) {
      // Store the redirected response
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode: statusCode,
        });
      }

      // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
      // that further action needs to be taken by the user agent in order to
      // fulfill the request. If a Location header field is provided,
      // the user agent MAY automatically redirect its request to the URI
      // referenced by the Location field value,
      // even if the specific status code is not understood.
      var location = response.headers.location;
      if (location && this._options.followRedirects !== false &&
          statusCode >= 300 && statusCode < 400) {
        // Abort the current request
        abortRequest(this._currentRequest);
        // Discard the remainder of the response to avoid waiting for data
        response.destroy();

        // RFC7231§6.4: A client SHOULD detect and intervene
        // in cyclical redirections (i.e., "infinite" redirection loops).
        if (++this._redirectCount > this._options.maxRedirects) {
          this.emit("error", new TooManyRedirectsError());
          return;
        }

        // RFC7231§6.4: Automatic redirection needs to done with
        // care for methods not known to be safe, […]
        // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
        // the request method from POST to GET for the subsequent request.
        if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
            // RFC7231§6.4.4: The 303 (See Other) status code indicates that
            // the server is redirecting the user agent to a different resource […]
            // A user agent can perform a retrieval request targeting that URI
            // (a GET or HEAD request if using HTTP) […]
            (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
          this._options.method = "GET";
          // Drop a possible entity and headers related to it
          this._requestBodyBuffers = [];
          removeMatchingHeaders(/^content-/i, this._options.headers);
        }

        // Drop the Host header, as the redirect might lead to a different host
        var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);

        // If the redirect is relative, carry over the host of the last request
        var currentUrlParts = url$1.parse(this._currentUrl);
        var currentHost = currentHostHeader || currentUrlParts.host;
        var currentUrl = /^\w+:/.test(location) ? this._currentUrl :
          url$1.format(Object.assign(currentUrlParts, { host: currentHost }));

        // Determine the URL of the redirection
        var redirectUrl;
        try {
          redirectUrl = url$1.resolve(currentUrl, location);
        }
        catch (cause) {
          this.emit("error", new RedirectionError(cause));
          return;
        }

        // Create the redirected request
        debug$5("redirecting to", redirectUrl);
        this._isRedirect = true;
        var redirectUrlParts = url$1.parse(redirectUrl);
        Object.assign(this._options, redirectUrlParts);

        // Drop the Authorization header if redirecting to another domain
        if (!(redirectUrlParts.host === currentHost || isSubdomainOf(redirectUrlParts.host, currentHost))) {
          removeMatchingHeaders(/^authorization$/i, this._options.headers);
        }

        // Evaluate the beforeRedirect callback
        if (typeof this._options.beforeRedirect === "function") {
          var responseDetails = { headers: response.headers };
          try {
            this._options.beforeRedirect.call(null, this._options, responseDetails);
          }
          catch (err) {
            this.emit("error", err);
            return;
          }
          this._sanitizeOptions(this._options);
        }

        // Perform the redirected request
        try {
          this._performRequest();
        }
        catch (cause) {
          this.emit("error", new RedirectionError(cause));
        }
      }
      else {
        // The response is not a redirect; return it as-is
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);

        // Clean up
        this._requestBodyBuffers = [];
      }
    };

    // Wraps the key/value object of protocols with redirect functionality
    function wrap(protocols) {
      // Default settings
      var exports = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024,
      };

      // Wrap each protocol
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function (scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

        // Executes a request, following redirects
        function request(input, options, callback) {
          // Parse parameters
          if (typeof input === "string") {
            var urlStr = input;
            try {
              input = urlToOptions(new URL(urlStr));
            }
            catch (err) {
              /* istanbul ignore next */
              input = url$1.parse(urlStr);
            }
          }
          else if (URL && (input instanceof URL)) {
            input = urlToOptions(input);
          }
          else {
            callback = options;
            options = input;
            input = { protocol: protocol };
          }
          if (typeof options === "function") {
            callback = options;
            options = null;
          }

          // Set defaults
          options = Object.assign({
            maxRedirects: exports.maxRedirects,
            maxBodyLength: exports.maxBodyLength,
          }, input, options);
          options.nativeProtocols = nativeProtocols;

          assert$1.equal(options.protocol, protocol, "protocol mismatch");
          debug$5("options", options);
          return new RedirectableRequest(options, callback);
        }

        // Executes a GET request, following redirects
        function get(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }

        // Expose the properties on the wrapped protocol
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: true, enumerable: true, writable: true },
          get: { value: get, configurable: true, enumerable: true, writable: true },
        });
      });
      return exports;
    }

    /* istanbul ignore next */
    function noop$1() { /* empty */ }

    // from https://github.com/nodejs/node/blob/master/lib/internal/url.js
    function urlToOptions(urlObject) {
      var options = {
        protocol: urlObject.protocol,
        hostname: urlObject.hostname.startsWith("[") ?
          /* istanbul ignore next */
          urlObject.hostname.slice(1, -1) :
          urlObject.hostname,
        hash: urlObject.hash,
        search: urlObject.search,
        pathname: urlObject.pathname,
        path: urlObject.pathname + urlObject.search,
        href: urlObject.href,
      };
      if (urlObject.port !== "") {
        options.port = Number(urlObject.port);
      }
      return options;
    }

    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header].toString().trim();
          delete headers[header];
        }
      }
      return lastValue;
    }

    function createErrorType(code, defaultMessage) {
      function CustomError(cause) {
        Error.captureStackTrace(this, this.constructor);
        if (!cause) {
          this.message = defaultMessage;
        }
        else {
          this.message = defaultMessage + ": " + cause.message;
          this.cause = cause;
        }
      }
      CustomError.prototype = new Error();
      CustomError.prototype.constructor = CustomError;
      CustomError.prototype.name = "Error [" + code + "]";
      CustomError.prototype.code = code;
      return CustomError;
    }

    function abortRequest(request) {
      for (var e = 0; e < events.length; e++) {
        request.removeListener(events[e], eventHandlers[events[e]]);
      }
      request.on("error", noop$1);
      request.abort();
    }

    function isSubdomainOf(subdomain, domain) {
      const dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
    }

    // Exports
    followRedirects.exports = wrap({ http: http$1, https: https$1 });
    followRedirects.exports.wrap = wrap;

    var data = {
      "version": "0.24.0"
    };

    var utils$8 = utils$g;
    var settle = settle$2;
    var buildFullPath = buildFullPath$2;
    var buildURL$1 = buildURL$3;
    var http = require$$1__default["default"];
    var https = require$$2__default["default"];
    var httpFollow = followRedirects.exports.http;
    var httpsFollow = followRedirects.exports.https;
    var url = require$$0__default$6["default"];
    var zlib = require$$8__default["default"];
    var VERSION$1 = data.version;
    var createError = createError$3;
    var enhanceError$1 = enhanceError$3;
    var defaults$5 = defaults_1;
    var Cancel$2 = Cancel_1;

    var isHttps = /https:?/;

    /**
     *
     * @param {http.ClientRequestArgs} options
     * @param {AxiosProxyConfig} proxy
     * @param {string} location
     */
    function setProxy(options, proxy, location) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.port = proxy.port;
      options.path = location;

      // Basic proxy authorization
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }

      // If a proxy is used, any redirects must also pass through the proxy
      options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
      };
    }

    /*eslint consistent-return:0*/
    var http_1 = function httpAdapter(config) {
      return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }

          if (config.signal) {
            config.signal.removeEventListener('abort', onCanceled);
          }
        }
        var resolve = function resolve(value) {
          done();
          resolvePromise(value);
        };
        var reject = function reject(value) {
          done();
          rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        var headerNames = {};

        Object.keys(headers).forEach(function storeLowerName(name) {
          headerNames[name.toLowerCase()] = name;
        });

        // Set User-Agent (required by some servers)
        // See https://github.com/axios/axios/issues/69
        if ('user-agent' in headerNames) {
          // User-Agent is specified; handle case where no UA header is desired
          if (!headers[headerNames['user-agent']]) {
            delete headers[headerNames['user-agent']];
          }
          // Otherwise, use specified value
        } else {
          // Only set header if it hasn't been set in config
          headers['User-Agent'] = 'axios/' + VERSION$1;
        }

        if (data && !utils$8.isStream(data)) {
          if (Buffer.isBuffer(data)) ; else if (utils$8.isArrayBuffer(data)) {
            data = Buffer.from(new Uint8Array(data));
          } else if (utils$8.isString(data)) {
            data = Buffer.from(data, 'utf-8');
          } else {
            return reject(createError(
              'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
              config
            ));
          }

          // Add Content-Length header if data exists
          if (!headerNames['content-length']) {
            headers['Content-Length'] = data.length;
          }
        }

        // HTTP basic authentication
        var auth = undefined;
        if (config.auth) {
          var username = config.auth.username || '';
          var password = config.auth.password || '';
          auth = username + ':' + password;
        }

        // Parse url
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || 'http:';

        if (!auth && parsed.auth) {
          var urlAuth = parsed.auth.split(':');
          var urlUsername = urlAuth[0] || '';
          var urlPassword = urlAuth[1] || '';
          auth = urlUsername + ':' + urlPassword;
        }

        if (auth && headerNames.authorization) {
          delete headers[headerNames.authorization];
        }

        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

        var options = {
          path: buildURL$1(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
          method: config.method.toUpperCase(),
          headers: headers,
          agent: agent,
          agents: { http: config.httpAgent, https: config.httpsAgent },
          auth: auth
        };

        if (config.socketPath) {
          options.socketPath = config.socketPath;
        } else {
          options.hostname = parsed.hostname;
          options.port = parsed.port;
        }

        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
          var proxyEnv = protocol.slice(0, -1) + '_proxy';
          var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
          if (proxyUrl) {
            var parsedProxyUrl = url.parse(proxyUrl);
            var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
            var shouldProxy = true;

            if (noProxyEnv) {
              var noProxy = noProxyEnv.split(',').map(function trim(s) {
                return s.trim();
              });

              shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                if (!proxyElement) {
                  return false;
                }
                if (proxyElement === '*') {
                  return true;
                }
                if (proxyElement[0] === '.' &&
                    parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                  return true;
                }

                return parsed.hostname === proxyElement;
              });
            }

            if (shouldProxy) {
              proxy = {
                host: parsedProxyUrl.hostname,
                port: parsedProxyUrl.port,
                protocol: parsedProxyUrl.protocol
              };

              if (parsedProxyUrl.auth) {
                var proxyUrlAuth = parsedProxyUrl.auth.split(':');
                proxy.auth = {
                  username: proxyUrlAuth[0],
                  password: proxyUrlAuth[1]
                };
              }
            }
          }
        }

        if (proxy) {
          options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
          setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
        }

        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
          transport = config.transport;
        } else if (config.maxRedirects === 0) {
          transport = isHttpsProxy ? https : http;
        } else {
          if (config.maxRedirects) {
            options.maxRedirects = config.maxRedirects;
          }
          transport = isHttpsProxy ? httpsFollow : httpFollow;
        }

        if (config.maxBodyLength > -1) {
          options.maxBodyLength = config.maxBodyLength;
        }

        if (config.insecureHTTPParser) {
          options.insecureHTTPParser = config.insecureHTTPParser;
        }

        // Create the request
        var req = transport.request(options, function handleResponse(res) {
          if (req.aborted) return;

          // uncompress the response body transparently if required
          var stream = res;

          // return the last request in case of redirects
          var lastRequest = res.req || req;


          // if no content, is HEAD request or decompress disabled we should not decompress
          if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
            switch (res.headers['content-encoding']) {
            /*eslint default-case:0*/
            case 'gzip':
            case 'compress':
            case 'deflate':
            // add the unzipper to the body stream processing pipeline
              stream = stream.pipe(zlib.createUnzip());

              // remove the content-encoding in order to not confuse downstream operations
              delete res.headers['content-encoding'];
              break;
            }
          }

          var response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            config: config,
            request: lastRequest
          };

          if (config.responseType === 'stream') {
            response.data = stream;
            settle(resolve, reject, response);
          } else {
            var responseBuffer = [];
            var totalResponseBytes = 0;
            stream.on('data', function handleStreamData(chunk) {
              responseBuffer.push(chunk);
              totalResponseBytes += chunk.length;

              // make sure the content length is not over the maxContentLength if specified
              if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                stream.destroy();
                reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
                  config, null, lastRequest));
              }
            });

            stream.on('error', function handleStreamError(err) {
              if (req.aborted) return;
              reject(enhanceError$1(err, config, null, lastRequest));
            });

            stream.on('end', function handleStreamEnd() {
              var responseData = Buffer.concat(responseBuffer);
              if (config.responseType !== 'arraybuffer') {
                responseData = responseData.toString(config.responseEncoding);
                if (!config.responseEncoding || config.responseEncoding === 'utf8') {
                  responseData = utils$8.stripBOM(responseData);
                }
              }

              response.data = responseData;
              settle(resolve, reject, response);
            });
          }
        });

        // Handle errors
        req.on('error', function handleRequestError(err) {
          if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
          reject(enhanceError$1(err, config, null, req));
        });

        // Handle request timeout
        if (config.timeout) {
          // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
          var timeout = parseInt(config.timeout, 10);

          if (isNaN(timeout)) {
            reject(createError(
              'error trying to parse `config.timeout` to int',
              config,
              'ERR_PARSE_TIMEOUT',
              req
            ));

            return;
          }

          // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
          // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
          // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
          // And then these socket which be hang up will devoring CPU little by little.
          // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
          req.setTimeout(timeout, function handleRequestTimeout() {
            req.abort();
            var transitional = config.transitional || defaults$5.transitional;
            reject(createError(
              'timeout of ' + timeout + 'ms exceeded',
              config,
              transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
              req
            ));
          });
        }

        if (config.cancelToken || config.signal) {
          // Handle cancellation
          // eslint-disable-next-line func-names
          onCanceled = function(cancel) {
            if (req.aborted) return;

            req.abort();
            reject(!cancel || (cancel && cancel.type) ? new Cancel$2('canceled') : cancel);
          };

          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
          }
        }


        // Send the request
        if (utils$8.isStream(data)) {
          data.on('error', function handleStreamError(err) {
            reject(enhanceError$1(err, config, null, req));
          }).pipe(req);
        } else {
          req.end(data);
        }
      });
    };

    var utils$7 = utils$g;
    var normalizeHeaderName = normalizeHeaderName$1;
    var enhanceError = enhanceError$3;

    var DEFAULT_CONTENT_TYPE = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    function setContentTypeIfUnset(headers, value) {
      if (!utils$7.isUndefined(headers) && utils$7.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
      }
    }

    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== 'undefined') {
        // For browsers use XHR adapter
        adapter = xhr;
      } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
        // For node use HTTP adapter
        adapter = http_1;
      }
      return adapter;
    }

    function stringifySafely(rawValue, parser, encoder) {
      if (utils$7.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils$7.trim(rawValue);
        } catch (e) {
          if (e.name !== 'SyntaxError') {
            throw e;
          }
        }
      }

      return (encoder || JSON.stringify)(rawValue);
    }

    var defaults$4 = {

      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      },

      adapter: getDefaultAdapter(),

      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, 'Accept');
        normalizeHeaderName(headers, 'Content-Type');

        if (utils$7.isFormData(data) ||
          utils$7.isArrayBuffer(data) ||
          utils$7.isBuffer(data) ||
          utils$7.isStream(data) ||
          utils$7.isFile(data) ||
          utils$7.isBlob(data)
        ) {
          return data;
        }
        if (utils$7.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils$7.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
          return data.toString();
        }
        if (utils$7.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
          setContentTypeIfUnset(headers, 'application/json');
          return stringifySafely(data);
        }
        return data;
      }],

      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults$4.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

        if (strictJSONParsing || (forcedJSONParsing && utils$7.isString(data) && data.length)) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === 'SyntaxError') {
                throw enhanceError(e, this, 'E_JSON_PARSE');
              }
              throw e;
            }
          }
        }

        return data;
      }],

      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,

      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',

      maxContentLength: -1,
      maxBodyLength: -1,

      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },

      headers: {
        common: {
          'Accept': 'application/json, text/plain, */*'
        }
      }
    };

    utils$7.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
      defaults$4.headers[method] = {};
    });

    utils$7.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      defaults$4.headers[method] = utils$7.merge(DEFAULT_CONTENT_TYPE);
    });

    var defaults_1 = defaults$4;

    var utils$6 = utils$g;
    var defaults$3 = defaults_1;

    /**
     * Transform the data for a request or a response
     *
     * @param {Object|String} data The data to be transformed
     * @param {Array} headers The headers for the request or response
     * @param {Array|Function} fns A single function or Array of functions
     * @returns {*} The resulting transformed data
     */
    var transformData$1 = function transformData(data, headers, fns) {
      var context = this || defaults$3;
      /*eslint no-param-reassign:0*/
      utils$6.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });

      return data;
    };

    var isCancel$1 = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };

    var utils$5 = utils$g;
    var transformData = transformData$1;
    var isCancel = isCancel$1;
    var defaults$2 = defaults_1;
    var Cancel$1 = Cancel_1;

    /**
     * Throws a `Cancel` if cancellation has been requested.
     */
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }

      if (config.signal && config.signal.aborted) {
        throw new Cancel$1('canceled');
      }
    }

    /**
     * Dispatch a request to the server using the configured adapter.
     *
     * @param {object} config The config that is to be used for the request
     * @returns {Promise} The Promise to be fulfilled
     */
    var dispatchRequest$1 = function dispatchRequest(config) {
      throwIfCancellationRequested(config);

      // Ensure headers exist
      config.headers = config.headers || {};

      // Transform request data
      config.data = transformData.call(
        config,
        config.data,
        config.headers,
        config.transformRequest
      );

      // Flatten headers
      config.headers = utils$5.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
      );

      utils$5.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );

      var adapter = config.adapter || defaults$2.adapter;

      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);

        // Transform response data
        response.data = transformData.call(
          config,
          response.data,
          response.headers,
          config.transformResponse
        );

        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);

          // Transform response data
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }

        return Promise.reject(reason);
      });
    };

    var utils$4 = utils$g;

    /**
     * Config-specific merge-function which creates a new config-object
     * by merging two configuration objects together.
     *
     * @param {Object} config1
     * @param {Object} config2
     * @returns {Object} New object resulting from merging config2 to config1
     */
    var mergeConfig$2 = function mergeConfig(config1, config2) {
      // eslint-disable-next-line no-param-reassign
      config2 = config2 || {};
      var config = {};

      function getMergedValue(target, source) {
        if (utils$4.isPlainObject(target) && utils$4.isPlainObject(source)) {
          return utils$4.merge(target, source);
        } else if (utils$4.isPlainObject(source)) {
          return utils$4.merge({}, source);
        } else if (utils$4.isArray(source)) {
          return source.slice();
        }
        return source;
      }

      // eslint-disable-next-line consistent-return
      function mergeDeepProperties(prop) {
        if (!utils$4.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils$4.isUndefined(config1[prop])) {
          return getMergedValue(undefined, config1[prop]);
        }
      }

      // eslint-disable-next-line consistent-return
      function valueFromConfig2(prop) {
        if (!utils$4.isUndefined(config2[prop])) {
          return getMergedValue(undefined, config2[prop]);
        }
      }

      // eslint-disable-next-line consistent-return
      function defaultToConfig2(prop) {
        if (!utils$4.isUndefined(config2[prop])) {
          return getMergedValue(undefined, config2[prop]);
        } else if (!utils$4.isUndefined(config1[prop])) {
          return getMergedValue(undefined, config1[prop]);
        }
      }

      // eslint-disable-next-line consistent-return
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(undefined, config1[prop]);
        }
      }

      var mergeMap = {
        'url': valueFromConfig2,
        'method': valueFromConfig2,
        'data': valueFromConfig2,
        'baseURL': defaultToConfig2,
        'transformRequest': defaultToConfig2,
        'transformResponse': defaultToConfig2,
        'paramsSerializer': defaultToConfig2,
        'timeout': defaultToConfig2,
        'timeoutMessage': defaultToConfig2,
        'withCredentials': defaultToConfig2,
        'adapter': defaultToConfig2,
        'responseType': defaultToConfig2,
        'xsrfCookieName': defaultToConfig2,
        'xsrfHeaderName': defaultToConfig2,
        'onUploadProgress': defaultToConfig2,
        'onDownloadProgress': defaultToConfig2,
        'decompress': defaultToConfig2,
        'maxContentLength': defaultToConfig2,
        'maxBodyLength': defaultToConfig2,
        'transport': defaultToConfig2,
        'httpAgent': defaultToConfig2,
        'httpsAgent': defaultToConfig2,
        'cancelToken': defaultToConfig2,
        'socketPath': defaultToConfig2,
        'responseEncoding': defaultToConfig2,
        'validateStatus': mergeDirectKeys
      };

      utils$4.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        (utils$4.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
      });

      return config;
    };

    var VERSION = data.version;

    var validators$1 = {};

    // eslint-disable-next-line func-names
    ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
      validators$1[type] = function validator(thing) {
        return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
      };
    });

    var deprecatedWarnings = {};

    /**
     * Transitional option validator
     * @param {function|boolean?} validator - set to false if the transitional option has been removed
     * @param {string?} version - deprecated version / removed since version
     * @param {string?} message - some message with additional info
     * @returns {function}
     */
    validators$1.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
      }

      // eslint-disable-next-line func-names
      return function(value, opt, opts) {
        if (validator === false) {
          throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
        }

        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          // eslint-disable-next-line no-console
          console.warn(
            formatMessage(
              opt,
              ' has been deprecated since v' + version + ' and will be removed in the near future'
            )
          );
        }

        return validator ? validator(value, opt, opts) : true;
      };
    };

    /**
     * Assert object's properties type
     * @param {object} options
     * @param {object} schema
     * @param {boolean?} allowUnknown
     */

    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === undefined || validator(value, opt, options);
          if (result !== true) {
            throw new TypeError('option ' + opt + ' must be ' + result);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw Error('Unknown option ' + opt);
        }
      }
    }

    var validator$1 = {
      assertOptions: assertOptions,
      validators: validators$1
    };

    var utils$3 = utils$g;
    var buildURL = buildURL$3;
    var InterceptorManager = InterceptorManager_1;
    var dispatchRequest = dispatchRequest$1;
    var mergeConfig$1 = mergeConfig$2;
    var validator = validator$1;

    var validators = validator.validators;
    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     */
    function Axios$1(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }

    /**
     * Dispatch a request
     *
     * @param {Object} config The config specific for this request (merged with this.defaults)
     */
    Axios$1.prototype.request = function request(config) {
      /*eslint no-param-reassign:0*/
      // Allow for axios('example/url'[, config]) a la fetch API
      if (typeof config === 'string') {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }

      config = mergeConfig$1(this.defaults, config);

      // Set config.method
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = 'get';
      }

      var transitional = config.transitional;

      if (transitional !== undefined) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }

      // filter out skipped interceptors
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
          return;
        }

        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });

      var promise;

      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, undefined];

        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);

        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }

        return promise;
      }


      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }

      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }

      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }

      return promise;
    };

    Axios$1.prototype.getUri = function getUri(config) {
      config = mergeConfig$1(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
    };

    // Provide aliases for supported request methods
    utils$3.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
      /*eslint func-names:0*/
      Axios$1.prototype[method] = function(url, config) {
        return this.request(mergeConfig$1(config || {}, {
          method: method,
          url: url,
          data: (config || {}).data
        }));
      };
    });

    utils$3.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      /*eslint func-names:0*/
      Axios$1.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig$1(config || {}, {
          method: method,
          url: url,
          data: data
        }));
      };
    });

    var Axios_1 = Axios$1;

    var Cancel = Cancel_1;

    /**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @class
     * @param {Function} executor The executor function.
     */
    function CancelToken(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }

      var resolvePromise;

      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });

      var token = this;

      // eslint-disable-next-line func-names
      this.promise.then(function(cancel) {
        if (!token._listeners) return;

        var i;
        var l = token._listeners.length;

        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });

      // eslint-disable-next-line func-names
      this.promise.then = function(onfulfilled) {
        var _resolve;
        // eslint-disable-next-line func-names
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);

        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };

        return promise;
      };

      executor(function cancel(message) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }

        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }

    /**
     * Throws a `Cancel` if cancellation has been requested.
     */
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };

    /**
     * Subscribe to the cancel signal
     */

    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }

      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };

    /**
     * Unsubscribe from the cancel signal
     */

    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };

    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token: token,
        cancel: cancel
      };
    };

    var CancelToken_1 = CancelToken;

    /**
     * Syntactic sugar for invoking a function and expanding an array for arguments.
     *
     * Common use case would be to use `Function.prototype.apply`.
     *
     *  ```js
     *  function f(x, y, z) {}
     *  var args = [1, 2, 3];
     *  f.apply(null, args);
     *  ```
     *
     * With `spread` this example can be re-written.
     *
     *  ```js
     *  spread(function(x, y, z) {})([1, 2, 3]);
     *  ```
     *
     * @param {Function} callback
     * @returns {Function}
     */
    var spread = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };

    /**
     * Determines whether the payload is an error thrown by Axios
     *
     * @param {*} payload The value to test
     * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
     */
    var isAxiosError = function isAxiosError(payload) {
      return (typeof payload === 'object') && (payload.isAxiosError === true);
    };

    var utils$2 = utils$g;
    var bind = bind$2;
    var Axios = Axios_1;
    var mergeConfig = mergeConfig$2;
    var defaults$1 = defaults_1;

    /**
     * Create an instance of Axios
     *
     * @param {Object} defaultConfig The default config for the instance
     * @return {Axios} A new instance of Axios
     */
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);

      // Copy axios.prototype to instance
      utils$2.extend(instance, Axios.prototype, context);

      // Copy context to instance
      utils$2.extend(instance, context);

      // Factory for creating new instances
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };

      return instance;
    }

    // Create the default instance to be exported
    var axios$1 = createInstance(defaults$1);

    // Expose Axios class to allow class inheritance
    axios$1.Axios = Axios;

    // Expose Cancel & CancelToken
    axios$1.Cancel = Cancel_1;
    axios$1.CancelToken = CancelToken_1;
    axios$1.isCancel = isCancel$1;
    axios$1.VERSION = data.version;

    // Expose all/spread
    axios$1.all = function all(promises) {
      return Promise.all(promises);
    };
    axios$1.spread = spread;

    // Expose isAxiosError
    axios$1.isAxiosError = isAxiosError;

    axios$2.exports = axios$1;

    // Allow use of default import syntax in TypeScript
    axios$2.exports.default = axios$1;

    var axios = axios$2.exports;

    var urlJoin$1 = {exports: {}};

    (function (module) {
    (function (name, context, definition) {
      if (module.exports) module.exports = definition();
      else context[name] = definition();
    })('urljoin', commonjsGlobal, function () {

      function normalize (strArray) {
        var resultArray = [];
        if (strArray.length === 0) { return ''; }

        if (typeof strArray[0] !== 'string') {
          throw new TypeError('Url must be a string. Received ' + strArray[0]);
        }

        // If the first part is a plain protocol, we combine it with the next part.
        if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
          var first = strArray.shift();
          strArray[0] = first + strArray[0];
        }

        // There must be two or three slashes in the file protocol, two slashes in anything else.
        if (strArray[0].match(/^file:\/\/\//)) {
          strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
        } else {
          strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
        }

        for (var i = 0; i < strArray.length; i++) {
          var component = strArray[i];

          if (typeof component !== 'string') {
            throw new TypeError('Url must be a string. Received ' + component);
          }

          if (component === '') { continue; }

          if (i > 0) {
            // Removing the starting slashes for each component but the first.
            component = component.replace(/^[\/]+/, '');
          }
          if (i < strArray.length - 1) {
            // Removing the ending slashes for each component but the last.
            component = component.replace(/[\/]+$/, '');
          } else {
            // For the last component we will combine multiple slashes to a single one.
            component = component.replace(/[\/]+$/, '/');
          }

          resultArray.push(component);

        }

        var str = resultArray.join('/');
        // Each input component is now separated by a single slash except the possible first plain protocol part.

        // remove trailing slash before parameters or hash
        str = str.replace(/\/(\?|&|#[^!])/g, '$1');

        // replace ? in parameters with &
        var parts = str.split('?');
        str = parts.shift() + (parts.length > 0 ? '?': '') + parts.join('&');

        return str;
      }

      return function () {
        var input;

        if (typeof arguments[0] === 'object') {
          input = arguments[0];
        } else {
          input = [].slice.call(arguments);
        }

        return normalize(input);
      };

    });
    }(urlJoin$1));

    var urlJoin = urlJoin$1.exports;

    var re$6 = {exports: {}};

    // Note: this is the semver.org version of the spec that it implements
    // Not necessarily the package version of this code.
    const SEMVER_SPEC_VERSION = '2.0.0';

    const MAX_LENGTH$2 = 256;
    const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER ||
      /* istanbul ignore next */ 9007199254740991;

    // Max safe segment length for coercion.
    const MAX_SAFE_COMPONENT_LENGTH = 16;

    var constants$1 = {
      SEMVER_SPEC_VERSION,
      MAX_LENGTH: MAX_LENGTH$2,
      MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
      MAX_SAFE_COMPONENT_LENGTH
    };

    const debug$4 = (
      typeof process === 'object' &&
      process.env &&
      process.env.NODE_DEBUG &&
      /\bsemver\b/i.test(process.env.NODE_DEBUG)
    ) ? (...args) => console.error('SEMVER', ...args)
      : () => {};

    var debug_1 = debug$4;

    (function (module, exports) {
    const { MAX_SAFE_COMPONENT_LENGTH } = constants$1;
    const debug = debug_1;
    exports = module.exports = {};

    // The actual regexps go on exports.re
    const re = exports.re = [];
    const src = exports.src = [];
    const t = exports.t = {};
    let R = 0;

    const createToken = (name, value, isGlobal) => {
      const index = R++;
      debug(index, value);
      t[name] = index;
      src[index] = value;
      re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
    };

    // The following Regular Expressions can be used for tokenizing,
    // validating, and parsing SemVer version strings.

    // ## Numeric Identifier
    // A single `0`, or a non-zero digit followed by zero or more digits.

    createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
    createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+');

    // ## Non-numeric Identifier
    // Zero or more digits, followed by a letter or hyphen, and then zero or
    // more letters, digits, or hyphens.

    createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*');

    // ## Main Version
    // Three dot-separated numeric identifiers.

    createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
                       `(${src[t.NUMERICIDENTIFIER]})\\.` +
                       `(${src[t.NUMERICIDENTIFIER]})`);

    createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                            `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                            `(${src[t.NUMERICIDENTIFIERLOOSE]})`);

    // ## Pre-release Version Identifier
    // A numeric identifier, or a non-numeric identifier.

    createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
}|${src[t.NONNUMERICIDENTIFIER]})`);

    createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
}|${src[t.NONNUMERICIDENTIFIER]})`);

    // ## Pre-release Version
    // Hyphen, followed by one or more dot-separated pre-release version
    // identifiers.

    createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);

    createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);

    // ## Build Metadata Identifier
    // Any combination of digits, letters, or hyphens.

    createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+');

    // ## Build Metadata
    // Plus sign, followed by one or more period-separated build metadata
    // identifiers.

    createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);

    // ## Full Version String
    // A main version, followed optionally by a pre-release version and
    // build metadata.

    // Note that the only major, minor, patch, and pre-release sections of
    // the version string are capturing groups.  The build metadata is not a
    // capturing group, because it should not ever be used in version
    // comparison.

    createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
}${src[t.PRERELEASE]}?${
  src[t.BUILD]}?`);

    createToken('FULL', `^${src[t.FULLPLAIN]}$`);

    // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
    // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
    // common in the npm registry.
    createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
}${src[t.PRERELEASELOOSE]}?${
  src[t.BUILD]}?`);

    createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);

    createToken('GTLT', '((?:<|>)?=?)');

    // Something like "2.*" or "1.2.x".
    // Note that "x.x" is a valid xRange identifer, meaning "any version"
    // Only the first item is strictly required.
    createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);

    createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
                       `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                       `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                       `(?:${src[t.PRERELEASE]})?${
                     src[t.BUILD]}?` +
                       `)?)?`);

    createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                            `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                            `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                            `(?:${src[t.PRERELEASELOOSE]})?${
                          src[t.BUILD]}?` +
                            `)?)?`);

    createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);

    // Coercion.
    // Extract anything that could conceivably be a part of a valid semver
    createToken('COERCE', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
                  `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
                  `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
                  `(?:$|[^\\d])`);
    createToken('COERCERTL', src[t.COERCE], true);

    // Tilde ranges.
    // Meaning is "reasonably at or greater than"
    createToken('LONETILDE', '(?:~>?)');

    createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = '$1~';

    createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);

    // Caret ranges.
    // Meaning is "at least and backwards compatible with"
    createToken('LONECARET', '(?:\\^)');

    createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = '$1^';

    createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);

    // A simple gt/lt/eq thing, or just "" to indicate "any version"
    createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);

    // An expression to strip any whitespace between the gtlt and the thing
    // it modifies, so that `> 1.2.3` ==> `>1.2.3`
    createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = '$1$2$3';

    // Something like `1.2.3 - 1.2.4`
    // Note that these all use the loose form, because they'll be
    // checked against either the strict or loose comparator form
    // later.
    createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
                       `\\s+-\\s+` +
                       `(${src[t.XRANGEPLAIN]})` +
                       `\\s*$`);

    createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
                            `\\s+-\\s+` +
                            `(${src[t.XRANGEPLAINLOOSE]})` +
                            `\\s*$`);

    // Star ranges basically just allow anything at all.
    createToken('STAR', '(<|>)?=?\\s*\\*');
    // >=0.0.0 is like a star
    createToken('GTE0', '^\\s*>=\\s*0\.0\.0\\s*$');
    createToken('GTE0PRE', '^\\s*>=\\s*0\.0\.0-0\\s*$');
    }(re$6, re$6.exports));

    // parse out just the options we care about so we always get a consistent
    // obj with keys in a consistent order.
    const opts = ['includePrerelease', 'loose', 'rtl'];
    const parseOptions$4 = options =>
      !options ? {}
      : typeof options !== 'object' ? { loose: true }
      : opts.filter(k => options[k]).reduce((options, k) => {
        options[k] = true;
        return options
      }, {});
    var parseOptions_1 = parseOptions$4;

    const numeric = /^[0-9]+$/;
    const compareIdentifiers$1 = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);

      if (anum && bnum) {
        a = +a;
        b = +b;
      }

      return a === b ? 0
        : (anum && !bnum) ? -1
        : (bnum && !anum) ? 1
        : a < b ? -1
        : 1
    };

    const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);

    var identifiers = {
      compareIdentifiers: compareIdentifiers$1,
      rcompareIdentifiers
    };

    const debug$3 = debug_1;
    const { MAX_LENGTH: MAX_LENGTH$1, MAX_SAFE_INTEGER } = constants$1;
    const { re: re$5, t: t$4 } = re$6.exports;

    const parseOptions$3 = parseOptions_1;
    const { compareIdentifiers } = identifiers;
    class SemVer$e {
      constructor (version, options) {
        options = parseOptions$3(options);

        if (version instanceof SemVer$e) {
          if (version.loose === !!options.loose &&
              version.includePrerelease === !!options.includePrerelease) {
            return version
          } else {
            version = version.version;
          }
        } else if (typeof version !== 'string') {
          throw new TypeError(`Invalid Version: ${version}`)
        }

        if (version.length > MAX_LENGTH$1) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH$1} characters`
          )
        }

        debug$3('SemVer', version, options);
        this.options = options;
        this.loose = !!options.loose;
        // this isn't actually relevant for versions, but keep it so that we
        // don't run into trouble passing this.options around.
        this.includePrerelease = !!options.includePrerelease;

        const m = version.trim().match(options.loose ? re$5[t$4.LOOSE] : re$5[t$4.FULL]);

        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`)
        }

        this.raw = version;

        // these are actually numbers
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];

        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError('Invalid major version')
        }

        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError('Invalid minor version')
        }

        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError('Invalid patch version')
        }

        // numberify any prerelease numeric ids
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split('.').map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num
              }
            }
            return id
          });
        }

        this.build = m[5] ? m[5].split('.') : [];
        this.format();
      }

      format () {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join('.')}`;
        }
        return this.version
      }

      toString () {
        return this.version
      }

      compare (other) {
        debug$3('SemVer.compare', this.version, this.options, other);
        if (!(other instanceof SemVer$e)) {
          if (typeof other === 'string' && other === this.version) {
            return 0
          }
          other = new SemVer$e(other, this.options);
        }

        if (other.version === this.version) {
          return 0
        }

        return this.compareMain(other) || this.comparePre(other)
      }

      compareMain (other) {
        if (!(other instanceof SemVer$e)) {
          other = new SemVer$e(other, this.options);
        }

        return (
          compareIdentifiers(this.major, other.major) ||
          compareIdentifiers(this.minor, other.minor) ||
          compareIdentifiers(this.patch, other.patch)
        )
      }

      comparePre (other) {
        if (!(other instanceof SemVer$e)) {
          other = new SemVer$e(other, this.options);
        }

        // NOT having a prerelease is > having one
        if (this.prerelease.length && !other.prerelease.length) {
          return -1
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0
        }

        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug$3('prerelease compare', i, a, b);
          if (a === undefined && b === undefined) {
            return 0
          } else if (b === undefined) {
            return 1
          } else if (a === undefined) {
            return -1
          } else if (a === b) {
            continue
          } else {
            return compareIdentifiers(a, b)
          }
        } while (++i)
      }

      compareBuild (other) {
        if (!(other instanceof SemVer$e)) {
          other = new SemVer$e(other, this.options);
        }

        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug$3('prerelease compare', i, a, b);
          if (a === undefined && b === undefined) {
            return 0
          } else if (b === undefined) {
            return 1
          } else if (a === undefined) {
            return -1
          } else if (a === b) {
            continue
          } else {
            return compareIdentifiers(a, b)
          }
        } while (++i)
      }

      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc (release, identifier) {
        switch (release) {
          case 'premajor':
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc('pre', identifier);
            break
          case 'preminor':
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc('pre', identifier);
            break
          case 'prepatch':
            // If this is already a prerelease, it will bump to the next version
            // drop any prereleases that might already exist, since they are not
            // relevant at this point.
            this.prerelease.length = 0;
            this.inc('patch', identifier);
            this.inc('pre', identifier);
            break
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case 'prerelease':
            if (this.prerelease.length === 0) {
              this.inc('patch', identifier);
            }
            this.inc('pre', identifier);
            break

          case 'major':
            // If this is a pre-major version, bump up to the same major version.
            // Otherwise increment major.
            // 1.0.0-5 bumps to 1.0.0
            // 1.1.0 bumps to 2.0.0
            if (
              this.minor !== 0 ||
              this.patch !== 0 ||
              this.prerelease.length === 0
            ) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break
          case 'minor':
            // If this is a pre-minor version, bump up to the same minor version.
            // Otherwise increment minor.
            // 1.2.0-5 bumps to 1.2.0
            // 1.2.1 bumps to 1.3.0
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break
          case 'patch':
            // If this is not a pre-release version, it will increment the patch.
            // If it is a pre-release it will bump up to the same patch version.
            // 1.2.0-5 patches to 1.2.0
            // 1.2.0 patches to 1.2.1
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case 'pre':
            if (this.prerelease.length === 0) {
              this.prerelease = [0];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === 'number') {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                // didn't increment anything
                this.prerelease.push(0);
              }
            }
            if (identifier) {
              // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
              // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
              if (this.prerelease[0] === identifier) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = [identifier, 0];
                }
              } else {
                this.prerelease = [identifier, 0];
              }
            }
            break

          default:
            throw new Error(`invalid increment argument: ${release}`)
        }
        this.format();
        this.raw = this.version;
        return this
      }
    }

    var semver$3 = SemVer$e;

    const {MAX_LENGTH} = constants$1;
    const { re: re$4, t: t$3 } = re$6.exports;
    const SemVer$d = semver$3;

    const parseOptions$2 = parseOptions_1;
    const parse$6 = (version, options) => {
      options = parseOptions$2(options);

      if (version instanceof SemVer$d) {
        return version
      }

      if (typeof version !== 'string') {
        return null
      }

      if (version.length > MAX_LENGTH) {
        return null
      }

      const r = options.loose ? re$4[t$3.LOOSE] : re$4[t$3.FULL];
      if (!r.test(version)) {
        return null
      }

      try {
        return new SemVer$d(version, options)
      } catch (er) {
        return null
      }
    };

    var parse_1 = parse$6;

    const parse$5 = parse_1;
    const valid$1 = (version, options) => {
      const v = parse$5(version, options);
      return v ? v.version : null
    };
    var valid_1 = valid$1;

    const parse$4 = parse_1;
    const clean = (version, options) => {
      const s = parse$4(version.trim().replace(/^[=v]+/, ''), options);
      return s ? s.version : null
    };
    var clean_1 = clean;

    const SemVer$c = semver$3;

    const inc = (version, release, options, identifier) => {
      if (typeof (options) === 'string') {
        identifier = options;
        options = undefined;
      }

      try {
        return new SemVer$c(version, options).inc(release, identifier).version
      } catch (er) {
        return null
      }
    };
    var inc_1 = inc;

    const SemVer$b = semver$3;
    const compare$a = (a, b, loose) =>
      new SemVer$b(a, loose).compare(new SemVer$b(b, loose));

    var compare_1 = compare$a;

    const compare$9 = compare_1;
    const eq$2 = (a, b, loose) => compare$9(a, b, loose) === 0;
    var eq_1 = eq$2;

    const parse$3 = parse_1;
    const eq$1 = eq_1;

    const diff = (version1, version2) => {
      if (eq$1(version1, version2)) {
        return null
      } else {
        const v1 = parse$3(version1);
        const v2 = parse$3(version2);
        const hasPre = v1.prerelease.length || v2.prerelease.length;
        const prefix = hasPre ? 'pre' : '';
        const defaultResult = hasPre ? 'prerelease' : '';
        for (const key in v1) {
          if (key === 'major' || key === 'minor' || key === 'patch') {
            if (v1[key] !== v2[key]) {
              return prefix + key
            }
          }
        }
        return defaultResult // may be undefined
      }
    };
    var diff_1 = diff;

    const SemVer$a = semver$3;
    const major = (a, loose) => new SemVer$a(a, loose).major;
    var major_1 = major;

    const SemVer$9 = semver$3;
    const minor = (a, loose) => new SemVer$9(a, loose).minor;
    var minor_1 = minor;

    const SemVer$8 = semver$3;
    const patch$2 = (a, loose) => new SemVer$8(a, loose).patch;
    var patch_1 = patch$2;

    const parse$2 = parse_1;
    const prerelease = (version, options) => {
      const parsed = parse$2(version, options);
      return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
    };
    var prerelease_1 = prerelease;

    const compare$8 = compare_1;
    const rcompare = (a, b, loose) => compare$8(b, a, loose);
    var rcompare_1 = rcompare;

    const compare$7 = compare_1;
    const compareLoose = (a, b) => compare$7(a, b, true);
    var compareLoose_1 = compareLoose;

    const SemVer$7 = semver$3;
    const compareBuild$2 = (a, b, loose) => {
      const versionA = new SemVer$7(a, loose);
      const versionB = new SemVer$7(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB)
    };
    var compareBuild_1 = compareBuild$2;

    const compareBuild$1 = compareBuild_1;
    const sort$1 = (list, loose) => list.sort((a, b) => compareBuild$1(a, b, loose));
    var sort_1 = sort$1;

    const compareBuild = compareBuild_1;
    const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
    var rsort_1 = rsort;

    const compare$6 = compare_1;
    const gt$3 = (a, b, loose) => compare$6(a, b, loose) > 0;
    var gt_1 = gt$3;

    const compare$5 = compare_1;
    const lt$2 = (a, b, loose) => compare$5(a, b, loose) < 0;
    var lt_1 = lt$2;

    const compare$4 = compare_1;
    const neq$1 = (a, b, loose) => compare$4(a, b, loose) !== 0;
    var neq_1 = neq$1;

    const compare$3 = compare_1;
    const gte$2 = (a, b, loose) => compare$3(a, b, loose) >= 0;
    var gte_1 = gte$2;

    const compare$2 = compare_1;
    const lte$2 = (a, b, loose) => compare$2(a, b, loose) <= 0;
    var lte_1 = lte$2;

    const eq = eq_1;
    const neq = neq_1;
    const gt$2 = gt_1;
    const gte$1 = gte_1;
    const lt$1 = lt_1;
    const lte$1 = lte_1;

    const cmp$1 = (a, op, b, loose) => {
      switch (op) {
        case '===':
          if (typeof a === 'object')
            a = a.version;
          if (typeof b === 'object')
            b = b.version;
          return a === b

        case '!==':
          if (typeof a === 'object')
            a = a.version;
          if (typeof b === 'object')
            b = b.version;
          return a !== b

        case '':
        case '=':
        case '==':
          return eq(a, b, loose)

        case '!=':
          return neq(a, b, loose)

        case '>':
          return gt$2(a, b, loose)

        case '>=':
          return gte$1(a, b, loose)

        case '<':
          return lt$1(a, b, loose)

        case '<=':
          return lte$1(a, b, loose)

        default:
          throw new TypeError(`Invalid operator: ${op}`)
      }
    };
    var cmp_1 = cmp$1;

    const SemVer$6 = semver$3;
    const parse$1 = parse_1;
    const {re: re$3, t: t$2} = re$6.exports;

    const coerce = (version, options) => {
      if (version instanceof SemVer$6) {
        return version
      }

      if (typeof version === 'number') {
        version = String(version);
      }

      if (typeof version !== 'string') {
        return null
      }

      options = options || {};

      let match = null;
      if (!options.rtl) {
        match = version.match(re$3[t$2.COERCE]);
      } else {
        // Find the right-most coercible string that does not share
        // a terminus with a more left-ward coercible string.
        // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
        //
        // Walk through the string checking with a /g regexp
        // Manually set the index so as to pick up overlapping matches.
        // Stop when we get a match that ends at the string end, since no
        // coercible string can be more right-ward without the same terminus.
        let next;
        while ((next = re$3[t$2.COERCERTL].exec(version)) &&
            (!match || match.index + match[0].length !== version.length)
        ) {
          if (!match ||
                next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          re$3[t$2.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
        }
        // leave it in a clean state
        re$3[t$2.COERCERTL].lastIndex = -1;
      }

      if (match === null)
        return null

      return parse$1(`${match[2]}.${match[3] || '0'}.${match[4] || '0'}`, options)
    };
    var coerce_1 = coerce;

    var yallist = Yallist$1;

    Yallist$1.Node = Node$1;
    Yallist$1.create = Yallist$1;

    function Yallist$1 (list) {
      var self = this;
      if (!(self instanceof Yallist$1)) {
        self = new Yallist$1();
      }

      self.tail = null;
      self.head = null;
      self.length = 0;

      if (list && typeof list.forEach === 'function') {
        list.forEach(function (item) {
          self.push(item);
        });
      } else if (arguments.length > 0) {
        for (var i = 0, l = arguments.length; i < l; i++) {
          self.push(arguments[i]);
        }
      }

      return self
    }

    Yallist$1.prototype.removeNode = function (node) {
      if (node.list !== this) {
        throw new Error('removing node which does not belong to this list')
      }

      var next = node.next;
      var prev = node.prev;

      if (next) {
        next.prev = prev;
      }

      if (prev) {
        prev.next = next;
      }

      if (node === this.head) {
        this.head = next;
      }
      if (node === this.tail) {
        this.tail = prev;
      }

      node.list.length--;
      node.next = null;
      node.prev = null;
      node.list = null;

      return next
    };

    Yallist$1.prototype.unshiftNode = function (node) {
      if (node === this.head) {
        return
      }

      if (node.list) {
        node.list.removeNode(node);
      }

      var head = this.head;
      node.list = this;
      node.next = head;
      if (head) {
        head.prev = node;
      }

      this.head = node;
      if (!this.tail) {
        this.tail = node;
      }
      this.length++;
    };

    Yallist$1.prototype.pushNode = function (node) {
      if (node === this.tail) {
        return
      }

      if (node.list) {
        node.list.removeNode(node);
      }

      var tail = this.tail;
      node.list = this;
      node.prev = tail;
      if (tail) {
        tail.next = node;
      }

      this.tail = node;
      if (!this.head) {
        this.head = node;
      }
      this.length++;
    };

    Yallist$1.prototype.push = function () {
      for (var i = 0, l = arguments.length; i < l; i++) {
        push(this, arguments[i]);
      }
      return this.length
    };

    Yallist$1.prototype.unshift = function () {
      for (var i = 0, l = arguments.length; i < l; i++) {
        unshift(this, arguments[i]);
      }
      return this.length
    };

    Yallist$1.prototype.pop = function () {
      if (!this.tail) {
        return undefined
      }

      var res = this.tail.value;
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      this.length--;
      return res
    };

    Yallist$1.prototype.shift = function () {
      if (!this.head) {
        return undefined
      }

      var res = this.head.value;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      this.length--;
      return res
    };

    Yallist$1.prototype.forEach = function (fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.head, i = 0; walker !== null; i++) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.next;
      }
    };

    Yallist$1.prototype.forEachReverse = function (fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.prev;
      }
    };

    Yallist$1.prototype.get = function (n) {
      for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
        // abort out of the list early if we hit a cycle
        walker = walker.next;
      }
      if (i === n && walker !== null) {
        return walker.value
      }
    };

    Yallist$1.prototype.getReverse = function (n) {
      for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
        // abort out of the list early if we hit a cycle
        walker = walker.prev;
      }
      if (i === n && walker !== null) {
        return walker.value
      }
    };

    Yallist$1.prototype.map = function (fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist$1();
      for (var walker = this.head; walker !== null;) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.next;
      }
      return res
    };

    Yallist$1.prototype.mapReverse = function (fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist$1();
      for (var walker = this.tail; walker !== null;) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.prev;
      }
      return res
    };

    Yallist$1.prototype.reduce = function (fn, initial) {
      var acc;
      var walker = this.head;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.head) {
        walker = this.head.next;
        acc = this.head.value;
      } else {
        throw new TypeError('Reduce of empty list with no initial value')
      }

      for (var i = 0; walker !== null; i++) {
        acc = fn(acc, walker.value, i);
        walker = walker.next;
      }

      return acc
    };

    Yallist$1.prototype.reduceReverse = function (fn, initial) {
      var acc;
      var walker = this.tail;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.tail) {
        walker = this.tail.prev;
        acc = this.tail.value;
      } else {
        throw new TypeError('Reduce of empty list with no initial value')
      }

      for (var i = this.length - 1; walker !== null; i--) {
        acc = fn(acc, walker.value, i);
        walker = walker.prev;
      }

      return acc
    };

    Yallist$1.prototype.toArray = function () {
      var arr = new Array(this.length);
      for (var i = 0, walker = this.head; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.next;
      }
      return arr
    };

    Yallist$1.prototype.toArrayReverse = function () {
      var arr = new Array(this.length);
      for (var i = 0, walker = this.tail; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.prev;
      }
      return arr
    };

    Yallist$1.prototype.slice = function (from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist$1();
      if (to < from || to < 0) {
        return ret
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
        walker = walker.next;
      }
      for (; walker !== null && i < to; i++, walker = walker.next) {
        ret.push(walker.value);
      }
      return ret
    };

    Yallist$1.prototype.sliceReverse = function (from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist$1();
      if (to < from || to < 0) {
        return ret
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
        walker = walker.prev;
      }
      for (; walker !== null && i > from; i--, walker = walker.prev) {
        ret.push(walker.value);
      }
      return ret
    };

    Yallist$1.prototype.splice = function (start, deleteCount, ...nodes) {
      if (start > this.length) {
        start = this.length - 1;
      }
      if (start < 0) {
        start = this.length + start;
      }

      for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
        walker = walker.next;
      }

      var ret = [];
      for (var i = 0; walker && i < deleteCount; i++) {
        ret.push(walker.value);
        walker = this.removeNode(walker);
      }
      if (walker === null) {
        walker = this.tail;
      }

      if (walker !== this.head && walker !== this.tail) {
        walker = walker.prev;
      }

      for (var i = 0; i < nodes.length; i++) {
        walker = insert(this, walker, nodes[i]);
      }
      return ret;
    };

    Yallist$1.prototype.reverse = function () {
      var head = this.head;
      var tail = this.tail;
      for (var walker = head; walker !== null; walker = walker.prev) {
        var p = walker.prev;
        walker.prev = walker.next;
        walker.next = p;
      }
      this.head = tail;
      this.tail = head;
      return this
    };

    function insert (self, node, value) {
      var inserted = node === self.head ?
        new Node$1(value, null, node, self) :
        new Node$1(value, node, node.next, self);

      if (inserted.next === null) {
        self.tail = inserted;
      }
      if (inserted.prev === null) {
        self.head = inserted;
      }

      self.length++;

      return inserted
    }

    function push (self, item) {
      self.tail = new Node$1(item, self.tail, null, self);
      if (!self.head) {
        self.head = self.tail;
      }
      self.length++;
    }

    function unshift (self, item) {
      self.head = new Node$1(item, null, self.head, self);
      if (!self.tail) {
        self.tail = self.head;
      }
      self.length++;
    }

    function Node$1 (value, prev, next, list) {
      if (!(this instanceof Node$1)) {
        return new Node$1(value, prev, next, list)
      }

      this.list = list;
      this.value = value;

      if (prev) {
        prev.next = this;
        this.prev = prev;
      } else {
        this.prev = null;
      }

      if (next) {
        next.prev = this;
        this.next = next;
      } else {
        this.next = null;
      }
    }

    try {
      // add if support for Symbol.iterator is present
      require('./iterator.js')(Yallist$1);
    } catch (er) {}

    // A linked list to keep track of recently-used-ness
    const Yallist = yallist;

    const MAX = Symbol('max');
    const LENGTH = Symbol('length');
    const LENGTH_CALCULATOR = Symbol('lengthCalculator');
    const ALLOW_STALE = Symbol('allowStale');
    const MAX_AGE = Symbol('maxAge');
    const DISPOSE = Symbol('dispose');
    const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
    const LRU_LIST = Symbol('lruList');
    const CACHE = Symbol('cache');
    const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');

    const naiveLength = () => 1;

    // lruList is a yallist where the head is the youngest
    // item, and the tail is the oldest.  the list contains the Hit
    // objects as the entries.
    // Each Hit object has a reference to its Yallist.Node.  This
    // never changes.
    //
    // cache is a Map (or PseudoMap) that matches the keys to
    // the Yallist.Node object.
    class LRUCache {
      constructor (options) {
        if (typeof options === 'number')
          options = { max: options };

        if (!options)
          options = {};

        if (options.max && (typeof options.max !== 'number' || options.max < 0))
          throw new TypeError('max must be a non-negative number')
        // Kind of weird to have a default max of Infinity, but oh well.
        this[MAX] = options.max || Infinity;

        const lc = options.length || naiveLength;
        this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc;
        this[ALLOW_STALE] = options.stale || false;
        if (options.maxAge && typeof options.maxAge !== 'number')
          throw new TypeError('maxAge must be a number')
        this[MAX_AGE] = options.maxAge || 0;
        this[DISPOSE] = options.dispose;
        this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
        this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
        this.reset();
      }

      // resize the cache when the max changes.
      set max (mL) {
        if (typeof mL !== 'number' || mL < 0)
          throw new TypeError('max must be a non-negative number')

        this[MAX] = mL || Infinity;
        trim(this);
      }
      get max () {
        return this[MAX]
      }

      set allowStale (allowStale) {
        this[ALLOW_STALE] = !!allowStale;
      }
      get allowStale () {
        return this[ALLOW_STALE]
      }

      set maxAge (mA) {
        if (typeof mA !== 'number')
          throw new TypeError('maxAge must be a non-negative number')

        this[MAX_AGE] = mA;
        trim(this);
      }
      get maxAge () {
        return this[MAX_AGE]
      }

      // resize the cache when the lengthCalculator changes.
      set lengthCalculator (lC) {
        if (typeof lC !== 'function')
          lC = naiveLength;

        if (lC !== this[LENGTH_CALCULATOR]) {
          this[LENGTH_CALCULATOR] = lC;
          this[LENGTH] = 0;
          this[LRU_LIST].forEach(hit => {
            hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
            this[LENGTH] += hit.length;
          });
        }
        trim(this);
      }
      get lengthCalculator () { return this[LENGTH_CALCULATOR] }

      get length () { return this[LENGTH] }
      get itemCount () { return this[LRU_LIST].length }

      rforEach (fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].tail; walker !== null;) {
          const prev = walker.prev;
          forEachStep(this, fn, walker, thisp);
          walker = prev;
        }
      }

      forEach (fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].head; walker !== null;) {
          const next = walker.next;
          forEachStep(this, fn, walker, thisp);
          walker = next;
        }
      }

      keys () {
        return this[LRU_LIST].toArray().map(k => k.key)
      }

      values () {
        return this[LRU_LIST].toArray().map(k => k.value)
      }

      reset () {
        if (this[DISPOSE] &&
            this[LRU_LIST] &&
            this[LRU_LIST].length) {
          this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
        }

        this[CACHE] = new Map(); // hash of items by key
        this[LRU_LIST] = new Yallist(); // list of items in order of use recency
        this[LENGTH] = 0; // length of items in the list
      }

      dump () {
        return this[LRU_LIST].map(hit =>
          isStale(this, hit) ? false : {
            k: hit.key,
            v: hit.value,
            e: hit.now + (hit.maxAge || 0)
          }).toArray().filter(h => h)
      }

      dumpLru () {
        return this[LRU_LIST]
      }

      set (key, value, maxAge) {
        maxAge = maxAge || this[MAX_AGE];

        if (maxAge && typeof maxAge !== 'number')
          throw new TypeError('maxAge must be a number')

        const now = maxAge ? Date.now() : 0;
        const len = this[LENGTH_CALCULATOR](value, key);

        if (this[CACHE].has(key)) {
          if (len > this[MAX]) {
            del(this, this[CACHE].get(key));
            return false
          }

          const node = this[CACHE].get(key);
          const item = node.value;

          // dispose of the old one before overwriting
          // split out into 2 ifs for better coverage tracking
          if (this[DISPOSE]) {
            if (!this[NO_DISPOSE_ON_SET])
              this[DISPOSE](key, item.value);
          }

          item.now = now;
          item.maxAge = maxAge;
          item.value = value;
          this[LENGTH] += len - item.length;
          item.length = len;
          this.get(key);
          trim(this);
          return true
        }

        const hit = new Entry(key, value, len, now, maxAge);

        // oversized objects fall out of cache automatically.
        if (hit.length > this[MAX]) {
          if (this[DISPOSE])
            this[DISPOSE](key, value);

          return false
        }

        this[LENGTH] += hit.length;
        this[LRU_LIST].unshift(hit);
        this[CACHE].set(key, this[LRU_LIST].head);
        trim(this);
        return true
      }

      has (key) {
        if (!this[CACHE].has(key)) return false
        const hit = this[CACHE].get(key).value;
        return !isStale(this, hit)
      }

      get (key) {
        return get(this, key, true)
      }

      peek (key) {
        return get(this, key, false)
      }

      pop () {
        const node = this[LRU_LIST].tail;
        if (!node)
          return null

        del(this, node);
        return node.value
      }

      del (key) {
        del(this, this[CACHE].get(key));
      }

      load (arr) {
        // reset the cache
        this.reset();

        const now = Date.now();
        // A previous serialized cache has the most recent items first
        for (let l = arr.length - 1; l >= 0; l--) {
          const hit = arr[l];
          const expiresAt = hit.e || 0;
          if (expiresAt === 0)
            // the item was created without expiration in a non aged cache
            this.set(hit.k, hit.v);
          else {
            const maxAge = expiresAt - now;
            // dont add already expired items
            if (maxAge > 0) {
              this.set(hit.k, hit.v, maxAge);
            }
          }
        }
      }

      prune () {
        this[CACHE].forEach((value, key) => get(this, key, false));
      }
    }

    const get = (self, key, doUse) => {
      const node = self[CACHE].get(key);
      if (node) {
        const hit = node.value;
        if (isStale(self, hit)) {
          del(self, node);
          if (!self[ALLOW_STALE])
            return undefined
        } else {
          if (doUse) {
            if (self[UPDATE_AGE_ON_GET])
              node.value.now = Date.now();
            self[LRU_LIST].unshiftNode(node);
          }
        }
        return hit.value
      }
    };

    const isStale = (self, hit) => {
      if (!hit || (!hit.maxAge && !self[MAX_AGE]))
        return false

      const diff = Date.now() - hit.now;
      return hit.maxAge ? diff > hit.maxAge
        : self[MAX_AGE] && (diff > self[MAX_AGE])
    };

    const trim = self => {
      if (self[LENGTH] > self[MAX]) {
        for (let walker = self[LRU_LIST].tail;
          self[LENGTH] > self[MAX] && walker !== null;) {
          // We know that we're about to delete this one, and also
          // what the next least recently used key will be, so just
          // go ahead and set it now.
          const prev = walker.prev;
          del(self, walker);
          walker = prev;
        }
      }
    };

    const del = (self, node) => {
      if (node) {
        const hit = node.value;
        if (self[DISPOSE])
          self[DISPOSE](hit.key, hit.value);

        self[LENGTH] -= hit.length;
        self[CACHE].delete(hit.key);
        self[LRU_LIST].removeNode(node);
      }
    };

    class Entry {
      constructor (key, value, length, now, maxAge) {
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
      }
    }

    const forEachStep = (self, fn, node, thisp) => {
      let hit = node.value;
      if (isStale(self, hit)) {
        del(self, node);
        if (!self[ALLOW_STALE])
          hit = undefined;
      }
      if (hit)
        fn.call(thisp, hit.value, hit.key, self);
    };

    var lruCache = LRUCache;

    // hoisted class for cyclic dependency
    class Range$a {
      constructor (range, options) {
        options = parseOptions$1(options);

        if (range instanceof Range$a) {
          if (
            range.loose === !!options.loose &&
            range.includePrerelease === !!options.includePrerelease
          ) {
            return range
          } else {
            return new Range$a(range.raw, options)
          }
        }

        if (range instanceof Comparator$3) {
          // just put it in the set and return
          this.raw = range.value;
          this.set = [[range]];
          this.format();
          return this
        }

        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;

        // First, split based on boolean or ||
        this.raw = range;
        this.set = range
          .split(/\s*\|\|\s*/)
          // map the range to a 2d array of comparators
          .map(range => this.parseRange(range.trim()))
          // throw out any comparator lists that are empty
          // this generally means that it was not a valid range, which is allowed
          // in loose mode, but will still throw if the WHOLE range is invalid.
          .filter(c => c.length);

        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${range}`)
        }

        // if we have any that are not the null set, throw out null sets.
        if (this.set.length > 1) {
          // keep the first one, in case they're all null sets
          const first = this.set[0];
          this.set = this.set.filter(c => !isNullSet(c[0]));
          if (this.set.length === 0)
            this.set = [first];
          else if (this.set.length > 1) {
            // if we have any that are *, then the range is just *
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break
              }
            }
          }
        }

        this.format();
      }

      format () {
        this.range = this.set
          .map((comps) => {
            return comps.join(' ').trim()
          })
          .join('||')
          .trim();
        return this.range
      }

      toString () {
        return this.range
      }

      parseRange (range) {
        range = range.trim();

        // memoize range parsing for performance.
        // this is a very hot path, and fully deterministic.
        const memoOpts = Object.keys(this.options).join(',');
        const memoKey = `parseRange:${memoOpts}:${range}`;
        const cached = cache.get(memoKey);
        if (cached)
          return cached

        const loose = this.options.loose;
        // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
        const hr = loose ? re$2[t$1.HYPHENRANGELOOSE] : re$2[t$1.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug$2('hyphen replace', range);
        // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
        range = range.replace(re$2[t$1.COMPARATORTRIM], comparatorTrimReplace);
        debug$2('comparator trim', range, re$2[t$1.COMPARATORTRIM]);

        // `~ 1.2.3` => `~1.2.3`
        range = range.replace(re$2[t$1.TILDETRIM], tildeTrimReplace);

        // `^ 1.2.3` => `^1.2.3`
        range = range.replace(re$2[t$1.CARETTRIM], caretTrimReplace);

        // normalize spaces
        range = range.split(/\s+/).join(' ');

        // At this point, the range is completely trimmed and
        // ready to be split into comparators.

        const compRe = loose ? re$2[t$1.COMPARATORLOOSE] : re$2[t$1.COMPARATOR];
        const rangeList = range
          .split(' ')
          .map(comp => parseComparator(comp, this.options))
          .join(' ')
          .split(/\s+/)
          // >=0.0.0 is equivalent to *
          .map(comp => replaceGTE0(comp, this.options))
          // in loose mode, throw out any that are not valid comparators
          .filter(this.options.loose ? comp => !!comp.match(compRe) : () => true)
          .map(comp => new Comparator$3(comp, this.options));

        // if any comparators are the null set, then replace with JUST null set
        // if more than one comparator, remove any * comparators
        // also, don't include the same comparator more than once
        rangeList.length;
        const rangeMap = new Map();
        for (const comp of rangeList) {
          if (isNullSet(comp))
            return [comp]
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has(''))
          rangeMap.delete('');

        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result
      }

      intersects (range, options) {
        if (!(range instanceof Range$a)) {
          throw new TypeError('a Range is required')
        }

        return this.set.some((thisComparators) => {
          return (
            isSatisfiable(thisComparators, options) &&
            range.set.some((rangeComparators) => {
              return (
                isSatisfiable(rangeComparators, options) &&
                thisComparators.every((thisComparator) => {
                  return rangeComparators.every((rangeComparator) => {
                    return thisComparator.intersects(rangeComparator, options)
                  })
                })
              )
            })
          )
        })
      }

      // if ANY of the sets match ALL of its comparators, then pass
      test (version) {
        if (!version) {
          return false
        }

        if (typeof version === 'string') {
          try {
            version = new SemVer$5(version, this.options);
          } catch (er) {
            return false
          }
        }

        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version, this.options)) {
            return true
          }
        }
        return false
      }
    }
    var range = Range$a;

    const LRU = lruCache;
    const cache = new LRU({ max: 1000 });

    const parseOptions$1 = parseOptions_1;
    const Comparator$3 = comparator;
    const debug$2 = debug_1;
    const SemVer$5 = semver$3;
    const {
      re: re$2,
      t: t$1,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = re$6.exports;

    const isNullSet = c => c.value === '<0.0.0-0';
    const isAny = c => c.value === '';

    // take a set of comparators and determine whether there
    // exists a version which can satisfy it
    const isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();

      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options)
        });

        testComparator = remainingComparators.pop();
      }

      return result
    };

    // comprised of xranges, tildes, stars, and gtlt's at this point.
    // already replaced the hyphen ranges
    // turn into a set of JUST comparators.
    const parseComparator = (comp, options) => {
      debug$2('comp', comp, options);
      comp = replaceCarets(comp, options);
      debug$2('caret', comp);
      comp = replaceTildes(comp, options);
      debug$2('tildes', comp);
      comp = replaceXRanges(comp, options);
      debug$2('xrange', comp);
      comp = replaceStars(comp, options);
      debug$2('stars', comp);
      return comp
    };

    const isX = id => !id || id.toLowerCase() === 'x' || id === '*';

    // ~, ~> --> * (any, kinda silly)
    // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
    // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
    // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
    // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
    // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
    const replaceTildes = (comp, options) =>
      comp.trim().split(/\s+/).map((comp) => {
        return replaceTilde(comp, options)
      }).join(' ');

    const replaceTilde = (comp, options) => {
      const r = options.loose ? re$2[t$1.TILDELOOSE] : re$2[t$1.TILDE];
      return comp.replace(r, (_, M, m, p, pr) => {
        debug$2('tilde', comp, _, M, m, p, pr);
        let ret;

        if (isX(M)) {
          ret = '';
        } else if (isX(m)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          // ~1.2 == >=1.2.0 <1.3.0-0
          ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug$2('replaceTilde pr', pr);
          ret = `>=${M}.${m}.${p}-${pr
      } <${M}.${+m + 1}.0-0`;
        } else {
          // ~1.2.3 == >=1.2.3 <1.3.0-0
          ret = `>=${M}.${m}.${p
      } <${M}.${+m + 1}.0-0`;
        }

        debug$2('tilde return', ret);
        return ret
      })
    };

    // ^ --> * (any, kinda silly)
    // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
    // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
    // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
    // ^1.2.3 --> >=1.2.3 <2.0.0-0
    // ^1.2.0 --> >=1.2.0 <2.0.0-0
    const replaceCarets = (comp, options) =>
      comp.trim().split(/\s+/).map((comp) => {
        return replaceCaret(comp, options)
      }).join(' ');

    const replaceCaret = (comp, options) => {
      debug$2('caret', comp, options);
      const r = options.loose ? re$2[t$1.CARETLOOSE] : re$2[t$1.CARET];
      const z = options.includePrerelease ? '-0' : '';
      return comp.replace(r, (_, M, m, p, pr) => {
        debug$2('caret', comp, _, M, m, p, pr);
        let ret;

        if (isX(M)) {
          ret = '';
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === '0') {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug$2('replaceCaret pr', pr);
          if (M === '0') {
            if (m === '0') {
              ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr
        } <${+M + 1}.0.0-0`;
          }
        } else {
          debug$2('no pr');
          if (M === '0') {
            if (m === '0') {
              ret = `>=${M}.${m}.${p
          }${z} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p
          }${z} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p
        } <${+M + 1}.0.0-0`;
          }
        }

        debug$2('caret return', ret);
        return ret
      })
    };

    const replaceXRanges = (comp, options) => {
      debug$2('replaceXRanges', comp, options);
      return comp.split(/\s+/).map((comp) => {
        return replaceXRange(comp, options)
      }).join(' ')
    };

    const replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re$2[t$1.XRANGELOOSE] : re$2[t$1.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug$2('xRange', comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;

        if (gtlt === '=' && anyX) {
          gtlt = '';
        }

        // if we're including prereleases in the match, then we need
        // to fix this to -0, the lowest possible prerelease value
        pr = options.includePrerelease ? '-0' : '';

        if (xM) {
          if (gtlt === '>' || gtlt === '<') {
            // nothing is allowed
            ret = '<0.0.0-0';
          } else {
            // nothing is forbidden
            ret = '*';
          }
        } else if (gtlt && anyX) {
          // we know patch is an x, because we have any x at all.
          // replace X with 0
          if (xm) {
            m = 0;
          }
          p = 0;

          if (gtlt === '>') {
            // >1 => >=2.0.0
            // >1.2 => >=1.3.0
            gtlt = '>=';
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === '<=') {
            // <=0.7.x is actually <0.8.0, since any 0.7.x should
            // pass.  Similarly, <=7.x is actually <8.0.0, etc.
            gtlt = '<';
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }

          if (gtlt === '<')
            pr = '-0';

          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr
      } <${M}.${+m + 1}.0-0`;
        }

        debug$2('xRange return', ret);

        return ret
      })
    };

    // Because * is AND-ed with everything else in the comparator,
    // and '' means "any version", just remove the *s entirely.
    const replaceStars = (comp, options) => {
      debug$2('replaceStars', comp, options);
      // Looseness is ignored here.  star is always as loose as it gets!
      return comp.trim().replace(re$2[t$1.STAR], '')
    };

    const replaceGTE0 = (comp, options) => {
      debug$2('replaceGTE0', comp, options);
      return comp.trim()
        .replace(re$2[options.includePrerelease ? t$1.GTE0PRE : t$1.GTE0], '')
    };

    // This function is passed to string.replace(re[t.HYPHENRANGE])
    // M, m, patch, prerelease, build
    // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
    // 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
    // 1.2 - 3.4 => >=1.2.0 <3.5.0-0
    const hyphenReplace = incPr => ($0,
      from, fM, fm, fp, fpr, fb,
      to, tM, tm, tp, tpr, tb) => {
      if (isX(fM)) {
        from = '';
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? '-0' : ''}`;
      }

      if (isX(tM)) {
        to = '';
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }

      return (`${from} ${to}`).trim()
    };

    const testSet = (set, version, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false
        }
      }

      if (version.prerelease.length && !options.includePrerelease) {
        // Find the set of versions that are allowed to have prereleases
        // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
        // That should allow `1.2.3-pr.2` to pass.
        // However, `1.2.4-alpha.notready` should NOT be allowed,
        // even though it's within the range set by the comparators.
        for (let i = 0; i < set.length; i++) {
          debug$2(set[i].semver);
          if (set[i].semver === Comparator$3.ANY) {
            continue
          }

          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version.major &&
                allowed.minor === version.minor &&
                allowed.patch === version.patch) {
              return true
            }
          }
        }

        // Version has a -pre, but it's not one of the ones we like.
        return false
      }

      return true
    };

    const ANY$2 = Symbol('SemVer ANY');
    // hoisted class for cyclic dependency
    class Comparator$2 {
      static get ANY () {
        return ANY$2
      }
      constructor (comp, options) {
        options = parseOptions(options);

        if (comp instanceof Comparator$2) {
          if (comp.loose === !!options.loose) {
            return comp
          } else {
            comp = comp.value;
          }
        }

        debug$1('comparator', comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);

        if (this.semver === ANY$2) {
          this.value = '';
        } else {
          this.value = this.operator + this.semver.version;
        }

        debug$1('comp', this);
      }

      parse (comp) {
        const r = this.options.loose ? re$1[t.COMPARATORLOOSE] : re$1[t.COMPARATOR];
        const m = comp.match(r);

        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`)
        }

        this.operator = m[1] !== undefined ? m[1] : '';
        if (this.operator === '=') {
          this.operator = '';
        }

        // if it literally is just '>' or '' then allow anything.
        if (!m[2]) {
          this.semver = ANY$2;
        } else {
          this.semver = new SemVer$4(m[2], this.options.loose);
        }
      }

      toString () {
        return this.value
      }

      test (version) {
        debug$1('Comparator.test', version, this.options.loose);

        if (this.semver === ANY$2 || version === ANY$2) {
          return true
        }

        if (typeof version === 'string') {
          try {
            version = new SemVer$4(version, this.options);
          } catch (er) {
            return false
          }
        }

        return cmp(version, this.operator, this.semver, this.options)
      }

      intersects (comp, options) {
        if (!(comp instanceof Comparator$2)) {
          throw new TypeError('a Comparator is required')
        }

        if (!options || typeof options !== 'object') {
          options = {
            loose: !!options,
            includePrerelease: false
          };
        }

        if (this.operator === '') {
          if (this.value === '') {
            return true
          }
          return new Range$9(comp.value, options).test(this.value)
        } else if (comp.operator === '') {
          if (comp.value === '') {
            return true
          }
          return new Range$9(this.value, options).test(comp.semver)
        }

        const sameDirectionIncreasing =
          (this.operator === '>=' || this.operator === '>') &&
          (comp.operator === '>=' || comp.operator === '>');
        const sameDirectionDecreasing =
          (this.operator === '<=' || this.operator === '<') &&
          (comp.operator === '<=' || comp.operator === '<');
        const sameSemVer = this.semver.version === comp.semver.version;
        const differentDirectionsInclusive =
          (this.operator === '>=' || this.operator === '<=') &&
          (comp.operator === '>=' || comp.operator === '<=');
        const oppositeDirectionsLessThan =
          cmp(this.semver, '<', comp.semver, options) &&
          (this.operator === '>=' || this.operator === '>') &&
            (comp.operator === '<=' || comp.operator === '<');
        const oppositeDirectionsGreaterThan =
          cmp(this.semver, '>', comp.semver, options) &&
          (this.operator === '<=' || this.operator === '<') &&
            (comp.operator === '>=' || comp.operator === '>');

        return (
          sameDirectionIncreasing ||
          sameDirectionDecreasing ||
          (sameSemVer && differentDirectionsInclusive) ||
          oppositeDirectionsLessThan ||
          oppositeDirectionsGreaterThan
        )
      }
    }

    var comparator = Comparator$2;

    const parseOptions = parseOptions_1;
    const {re: re$1, t} = re$6.exports;
    const cmp = cmp_1;
    const debug$1 = debug_1;
    const SemVer$4 = semver$3;
    const Range$9 = range;

    const Range$8 = range;
    const satisfies$3 = (version, range, options) => {
      try {
        range = new Range$8(range, options);
      } catch (er) {
        return false
      }
      return range.test(version)
    };
    var satisfies_1 = satisfies$3;

    const Range$7 = range;

    // Mostly just for testing and legacy API reasons
    const toComparators = (range, options) =>
      new Range$7(range, options).set
        .map(comp => comp.map(c => c.value).join(' ').trim().split(' '));

    var toComparators_1 = toComparators;

    const SemVer$3 = semver$3;
    const Range$6 = range;

    const maxSatisfying = (versions, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range$6(range, options);
      } catch (er) {
        return null
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          // satisfies(v, range, options)
          if (!max || maxSV.compare(v) === -1) {
            // compare(max, v, true)
            max = v;
            maxSV = new SemVer$3(max, options);
          }
        }
      });
      return max
    };
    var maxSatisfying_1 = maxSatisfying;

    const SemVer$2 = semver$3;
    const Range$5 = range;
    const minSatisfying = (versions, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range$5(range, options);
      } catch (er) {
        return null
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          // satisfies(v, range, options)
          if (!min || minSV.compare(v) === 1) {
            // compare(min, v, true)
            min = v;
            minSV = new SemVer$2(min, options);
          }
        }
      });
      return min
    };
    var minSatisfying_1 = minSatisfying;

    const SemVer$1 = semver$3;
    const Range$4 = range;
    const gt$1 = gt_1;

    const minVersion = (range, loose) => {
      range = new Range$4(range, loose);

      let minver = new SemVer$1('0.0.0');
      if (range.test(minver)) {
        return minver
      }

      minver = new SemVer$1('0.0.0-0');
      if (range.test(minver)) {
        return minver
      }

      minver = null;
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];

        let setMin = null;
        comparators.forEach((comparator) => {
          // Clone to avoid manipulating the comparator's semver object.
          const compver = new SemVer$1(comparator.semver.version);
          switch (comparator.operator) {
            case '>':
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
              /* fallthrough */
            case '':
            case '>=':
              if (!setMin || gt$1(compver, setMin)) {
                setMin = compver;
              }
              break
            case '<':
            case '<=':
              /* Ignore maximum versions */
              break
            /* istanbul ignore next */
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`)
          }
        });
        if (setMin && (!minver || gt$1(minver, setMin)))
          minver = setMin;
      }

      if (minver && range.test(minver)) {
        return minver
      }

      return null
    };
    var minVersion_1 = minVersion;

    const Range$3 = range;
    const validRange = (range, options) => {
      try {
        // Return '*' instead of '' so that truthiness works.
        // This will throw if it's invalid anyway
        return new Range$3(range, options).range || '*'
      } catch (er) {
        return null
      }
    };
    var valid = validRange;

    const SemVer = semver$3;
    const Comparator$1 = comparator;
    const {ANY: ANY$1} = Comparator$1;
    const Range$2 = range;
    const satisfies$2 = satisfies_1;
    const gt = gt_1;
    const lt = lt_1;
    const lte = lte_1;
    const gte = gte_1;

    const outside$2 = (version, range, hilo, options) => {
      version = new SemVer(version, options);
      range = new Range$2(range, options);

      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case '>':
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = '>';
          ecomp = '>=';
          break
        case '<':
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = '<';
          ecomp = '<=';
          break
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"')
      }

      // If it satisfies the range it is not outside
      if (satisfies$2(version, range, options)) {
        return false
      }

      // From now on, variable terms are as if we're in "gtr" mode.
      // but note that everything is flipped for the "ltr" function.

      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];

        let high = null;
        let low = null;

        comparators.forEach((comparator) => {
          if (comparator.semver === ANY$1) {
            comparator = new Comparator$1('>=0.0.0');
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });

        // If the edge version comparator has a operator then our version
        // isn't outside it
        if (high.operator === comp || high.operator === ecomp) {
          return false
        }

        // If the lowest version comparator has an operator and our version
        // is less than it then it isn't higher than the range
        if ((!low.operator || low.operator === comp) &&
            ltefn(version, low.semver)) {
          return false
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false
        }
      }
      return true
    };

    var outside_1 = outside$2;

    // Determine if version is greater than all the versions possible in the range.
    const outside$1 = outside_1;
    const gtr = (version, range, options) => outside$1(version, range, '>', options);
    var gtr_1 = gtr;

    const outside = outside_1;
    // Determine if version is less than all the versions possible in the range
    const ltr = (version, range, options) => outside(version, range, '<', options);
    var ltr_1 = ltr;

    const Range$1 = range;
    const intersects = (r1, r2, options) => {
      r1 = new Range$1(r1, options);
      r2 = new Range$1(r2, options);
      return r1.intersects(r2)
    };
    var intersects_1 = intersects;

    // given a set of versions and a range, create a "simplified" range
    // that includes the same versions that the original range does
    // If the original range is shorter than the simplified one, return that.
    const satisfies$1 = satisfies_1;
    const compare$1 = compare_1;
    var simplify = (versions, range, options) => {
      const set = [];
      let min = null;
      let prev = null;
      const v = versions.sort((a, b) => compare$1(a, b, options));
      for (const version of v) {
        const included = satisfies$1(version, range, options);
        if (included) {
          prev = version;
          if (!min)
            min = version;
        } else {
          if (prev) {
            set.push([min, prev]);
          }
          prev = null;
          min = null;
        }
      }
      if (min)
        set.push([min, null]);

      const ranges = [];
      for (const [min, max] of set) {
        if (min === max)
          ranges.push(min);
        else if (!max && min === v[0])
          ranges.push('*');
        else if (!max)
          ranges.push(`>=${min}`);
        else if (min === v[0])
          ranges.push(`<=${max}`);
        else
          ranges.push(`${min} - ${max}`);
      }
      const simplified = ranges.join(' || ');
      const original = typeof range.raw === 'string' ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range
    };

    const Range = range;
    const Comparator = comparator;
    const { ANY } = Comparator;
    const satisfies = satisfies_1;
    const compare = compare_1;

    // Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
    // - Every simple range `r1, r2, ...` is a null set, OR
    // - Every simple range `r1, r2, ...` which is not a null set is a subset of
    //   some `R1, R2, ...`
    //
    // Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
    // - If c is only the ANY comparator
    //   - If C is only the ANY comparator, return true
    //   - Else if in prerelease mode, return false
    //   - else replace c with `[>=0.0.0]`
    // - If C is only the ANY comparator
    //   - if in prerelease mode, return true
    //   - else replace C with `[>=0.0.0]`
    // - Let EQ be the set of = comparators in c
    // - If EQ is more than one, return true (null set)
    // - Let GT be the highest > or >= comparator in c
    // - Let LT be the lowest < or <= comparator in c
    // - If GT and LT, and GT.semver > LT.semver, return true (null set)
    // - If any C is a = range, and GT or LT are set, return false
    // - If EQ
    //   - If GT, and EQ does not satisfy GT, return true (null set)
    //   - If LT, and EQ does not satisfy LT, return true (null set)
    //   - If EQ satisfies every C, return true
    //   - Else return false
    // - If GT
    //   - If GT.semver is lower than any > or >= comp in C, return false
    //   - If GT is >=, and GT.semver does not satisfy every C, return false
    //   - If GT.semver has a prerelease, and not in prerelease mode
    //     - If no C has a prerelease and the GT.semver tuple, return false
    // - If LT
    //   - If LT.semver is greater than any < or <= comp in C, return false
    //   - If LT is <=, and LT.semver does not satisfy every C, return false
    //   - If GT.semver has a prerelease, and not in prerelease mode
    //     - If no C has a prerelease and the LT.semver tuple, return false
    // - Else return true

    const subset = (sub, dom, options = {}) => {
      if (sub === dom)
        return true

      sub = new Range(sub, options);
      dom = new Range(dom, options);
      let sawNonNull = false;

      OUTER: for (const simpleSub of sub.set) {
        for (const simpleDom of dom.set) {
          const isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub)
            continue OUTER
        }
        // the null set is a subset of everything, but null simple ranges in
        // a complex range should be ignored.  so if we saw a non-null range,
        // then we know this isn't a subset, but if EVERY simple range was null,
        // then it is a subset.
        if (sawNonNull)
          return false
      }
      return true
    };

    const simpleSubset = (sub, dom, options) => {
      if (sub === dom)
        return true

      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY)
          return true
        else if (options.includePrerelease)
          sub = [ new Comparator('>=0.0.0-0') ];
        else
          sub = [ new Comparator('>=0.0.0') ];
      }

      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease)
          return true
        else
          dom = [ new Comparator('>=0.0.0') ];
      }

      const eqSet = new Set();
      let gt, lt;
      for (const c of sub) {
        if (c.operator === '>' || c.operator === '>=')
          gt = higherGT(gt, c, options);
        else if (c.operator === '<' || c.operator === '<=')
          lt = lowerLT(lt, c, options);
        else
          eqSet.add(c.semver);
      }

      if (eqSet.size > 1)
        return null

      let gtltComp;
      if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0)
          return null
        else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<='))
          return null
      }

      // will iterate one or zero times
      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options))
          return null

        if (lt && !satisfies(eq, String(lt), options))
          return null

        for (const c of dom) {
          if (!satisfies(eq, String(c), options))
            return false
        }

        return true
      }

      let higher, lower;
      let hasDomLT, hasDomGT;
      // if the subset has a prerelease, we need a comparator in the superset
      // with the same tuple and a prerelease, or it's not a subset
      let needDomLTPre = lt &&
        !options.includePrerelease &&
        lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt &&
        !options.includePrerelease &&
        gt.semver.prerelease.length ? gt.semver : false;
      // exception: <1.2.3-0 is the same as <1.2.3
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 &&
          lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }

      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>=';
        hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<=';
        if (gt) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length &&
                c.semver.major === needDomGTPre.major &&
                c.semver.minor === needDomGTPre.minor &&
                c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === '>' || c.operator === '>=') {
            higher = higherGT(gt, c, options);
            if (higher === c && higher !== gt)
              return false
          } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options))
            return false
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length &&
                c.semver.major === needDomLTPre.major &&
                c.semver.minor === needDomLTPre.minor &&
                c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === '<' || c.operator === '<=') {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt)
              return false
          } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options))
            return false
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0)
          return false
      }

      // if there was a < or >, and nothing in the dom, then must be false
      // UNLESS it was limited by another range in the other direction.
      // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
      if (gt && hasDomLT && !lt && gtltComp !== 0)
        return false

      if (lt && hasDomGT && !gt && gtltComp !== 0)
        return false

      // we needed a prerelease range in a specific tuple, but didn't get one
      // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
      // because it includes prereleases in the 1.2.3 tuple
      if (needDomGTPre || needDomLTPre)
        return false

      return true
    };

    // >=1.2.3 is lower than >1.2.3
    const higherGT = (a, b, options) => {
      if (!a)
        return b
      const comp = compare(a.semver, b.semver, options);
      return comp > 0 ? a
        : comp < 0 ? b
        : b.operator === '>' && a.operator === '>=' ? b
        : a
    };

    // <=1.2.3 is higher than <1.2.3
    const lowerLT = (a, b, options) => {
      if (!a)
        return b
      const comp = compare(a.semver, b.semver, options);
      return comp < 0 ? a
        : comp > 0 ? b
        : b.operator === '<' && a.operator === '<=' ? b
        : a
    };

    var subset_1 = subset;

    // just pre-load all the stuff that index.js lazily exports
    const internalRe = re$6.exports;
    var semver$2 = {
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants$1.SEMVER_SPEC_VERSION,
      SemVer: semver$3,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers,
      parse: parse_1,
      valid: valid_1,
      clean: clean_1,
      inc: inc_1,
      diff: diff_1,
      major: major_1,
      minor: minor_1,
      patch: patch_1,
      prerelease: prerelease_1,
      compare: compare_1,
      rcompare: rcompare_1,
      compareLoose: compareLoose_1,
      compareBuild: compareBuild_1,
      sort: sort_1,
      rsort: rsort_1,
      gt: gt_1,
      lt: lt_1,
      eq: eq_1,
      neq: neq_1,
      gte: gte_1,
      lte: lte_1,
      cmp: cmp_1,
      coerce: coerce_1,
      Comparator: comparator,
      Range: range,
      satisfies: satisfies_1,
      toComparators: toComparators_1,
      maxSatisfying: maxSatisfying_1,
      minSatisfying: minSatisfying_1,
      minVersion: minVersion_1,
      validRange: valid,
      outside: outside_1,
      gtr: gtr_1,
      ltr: ltr_1,
      intersects: intersects_1,
      simplifyRange: simplify,
      subset: subset_1,
    };

    var semver$1 = {exports: {}};

    (function (module, exports) {
    exports = module.exports = SemVer;

    var debug;
    /* istanbul ignore next */
    if (typeof process === 'object' &&
        process.env &&
        process.env.NODE_DEBUG &&
        /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
      debug = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift('SEMVER');
        console.log.apply(console, args);
      };
    } else {
      debug = function () {};
    }

    // Note: this is the semver.org version of the spec that it implements
    // Not necessarily the package version of this code.
    exports.SEMVER_SPEC_VERSION = '2.0.0';

    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
      /* istanbul ignore next */ 9007199254740991;

    // Max safe segment length for coercion.
    var MAX_SAFE_COMPONENT_LENGTH = 16;

    // The actual regexps go on exports.re
    var re = exports.re = [];
    var src = exports.src = [];
    var R = 0;

    // The following Regular Expressions can be used for tokenizing,
    // validating, and parsing SemVer version strings.

    // ## Numeric Identifier
    // A single `0`, or a non-zero digit followed by zero or more digits.

    var NUMERICIDENTIFIER = R++;
    src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
    var NUMERICIDENTIFIERLOOSE = R++;
    src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';

    // ## Non-numeric Identifier
    // Zero or more digits, followed by a letter or hyphen, and then zero or
    // more letters, digits, or hyphens.

    var NONNUMERICIDENTIFIER = R++;
    src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';

    // ## Main Version
    // Three dot-separated numeric identifiers.

    var MAINVERSION = R++;
    src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                       '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                       '(' + src[NUMERICIDENTIFIER] + ')';

    var MAINVERSIONLOOSE = R++;
    src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                            '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                            '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

    // ## Pre-release Version Identifier
    // A numeric identifier, or a non-numeric identifier.

    var PRERELEASEIDENTIFIER = R++;
    src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                                '|' + src[NONNUMERICIDENTIFIER] + ')';

    var PRERELEASEIDENTIFIERLOOSE = R++;
    src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                     '|' + src[NONNUMERICIDENTIFIER] + ')';

    // ## Pre-release Version
    // Hyphen, followed by one or more dot-separated pre-release version
    // identifiers.

    var PRERELEASE = R++;
    src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                      '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

    var PRERELEASELOOSE = R++;
    src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                           '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

    // ## Build Metadata Identifier
    // Any combination of digits, letters, or hyphens.

    var BUILDIDENTIFIER = R++;
    src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

    // ## Build Metadata
    // Plus sign, followed by one or more period-separated build metadata
    // identifiers.

    var BUILD = R++;
    src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
                 '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';

    // ## Full Version String
    // A main version, followed optionally by a pre-release version and
    // build metadata.

    // Note that the only major, minor, patch, and pre-release sections of
    // the version string are capturing groups.  The build metadata is not a
    // capturing group, because it should not ever be used in version
    // comparison.

    var FULL = R++;
    var FULLPLAIN = 'v?' + src[MAINVERSION] +
                    src[PRERELEASE] + '?' +
                    src[BUILD] + '?';

    src[FULL] = '^' + FULLPLAIN + '$';

    // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
    // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
    // common in the npm registry.
    var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                     src[PRERELEASELOOSE] + '?' +
                     src[BUILD] + '?';

    var LOOSE = R++;
    src[LOOSE] = '^' + LOOSEPLAIN + '$';

    var GTLT = R++;
    src[GTLT] = '((?:<|>)?=?)';

    // Something like "2.*" or "1.2.x".
    // Note that "x.x" is a valid xRange identifer, meaning "any version"
    // Only the first item is strictly required.
    var XRANGEIDENTIFIERLOOSE = R++;
    src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
    var XRANGEIDENTIFIER = R++;
    src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

    var XRANGEPLAIN = R++;
    src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                       '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                       '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                       '(?:' + src[PRERELEASE] + ')?' +
                       src[BUILD] + '?' +
                       ')?)?';

    var XRANGEPLAINLOOSE = R++;
    src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                            '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                            '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                            '(?:' + src[PRERELEASELOOSE] + ')?' +
                            src[BUILD] + '?' +
                            ')?)?';

    var XRANGE = R++;
    src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
    var XRANGELOOSE = R++;
    src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

    // Coercion.
    // Extract anything that could conceivably be a part of a valid semver
    var COERCE = R++;
    src[COERCE] = '(?:^|[^\\d])' +
                  '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
                  '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
                  '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
                  '(?:$|[^\\d])';

    // Tilde ranges.
    // Meaning is "reasonably at or greater than"
    var LONETILDE = R++;
    src[LONETILDE] = '(?:~>?)';

    var TILDETRIM = R++;
    src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
    re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
    var tildeTrimReplace = '$1~';

    var TILDE = R++;
    src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
    var TILDELOOSE = R++;
    src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

    // Caret ranges.
    // Meaning is "at least and backwards compatible with"
    var LONECARET = R++;
    src[LONECARET] = '(?:\\^)';

    var CARETTRIM = R++;
    src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
    re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
    var caretTrimReplace = '$1^';

    var CARET = R++;
    src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
    var CARETLOOSE = R++;
    src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

    // A simple gt/lt/eq thing, or just "" to indicate "any version"
    var COMPARATORLOOSE = R++;
    src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
    var COMPARATOR = R++;
    src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';

    // An expression to strip any whitespace between the gtlt and the thing
    // it modifies, so that `> 1.2.3` ==> `>1.2.3`
    var COMPARATORTRIM = R++;
    src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                          '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

    // this one has to use the /g flag
    re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
    var comparatorTrimReplace = '$1$2$3';

    // Something like `1.2.3 - 1.2.4`
    // Note that these all use the loose form, because they'll be
    // checked against either the strict or loose comparator form
    // later.
    var HYPHENRANGE = R++;
    src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                       '\\s+-\\s+' +
                       '(' + src[XRANGEPLAIN] + ')' +
                       '\\s*$';

    var HYPHENRANGELOOSE = R++;
    src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                            '\\s+-\\s+' +
                            '(' + src[XRANGEPLAINLOOSE] + ')' +
                            '\\s*$';

    // Star ranges basically just allow anything at all.
    var STAR = R++;
    src[STAR] = '(<|>)?=?\\s*\\*';

    // Compile to actual regexp objects.
    // All are flag-free, unless they were created above with a flag.
    for (var i = 0; i < R; i++) {
      debug(i, src[i]);
      if (!re[i]) {
        re[i] = new RegExp(src[i]);
      }
    }

    exports.parse = parse;
    function parse (version, options) {
      if (!options || typeof options !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      if (version instanceof SemVer) {
        return version
      }

      if (typeof version !== 'string') {
        return null
      }

      if (version.length > MAX_LENGTH) {
        return null
      }

      var r = options.loose ? re[LOOSE] : re[FULL];
      if (!r.test(version)) {
        return null
      }

      try {
        return new SemVer(version, options)
      } catch (er) {
        return null
      }
    }

    exports.valid = valid;
    function valid (version, options) {
      var v = parse(version, options);
      return v ? v.version : null
    }

    exports.clean = clean;
    function clean (version, options) {
      var s = parse(version.trim().replace(/^[=v]+/, ''), options);
      return s ? s.version : null
    }

    exports.SemVer = SemVer;

    function SemVer (version, options) {
      if (!options || typeof options !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        if (version.loose === options.loose) {
          return version
        } else {
          version = version.version;
        }
      } else if (typeof version !== 'string') {
        throw new TypeError('Invalid Version: ' + version)
      }

      if (version.length > MAX_LENGTH) {
        throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
      }

      if (!(this instanceof SemVer)) {
        return new SemVer(version, options)
      }

      debug('SemVer', version, options);
      this.options = options;
      this.loose = !!options.loose;

      var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL]);

      if (!m) {
        throw new TypeError('Invalid Version: ' + version)
      }

      this.raw = version;

      // these are actually numbers
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];

      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError('Invalid major version')
      }

      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError('Invalid minor version')
      }

      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError('Invalid patch version')
      }

      // numberify any prerelease numeric ids
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split('.').map(function (id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num
            }
          }
          return id
        });
      }

      this.build = m[5] ? m[5].split('.') : [];
      this.format();
    }

    SemVer.prototype.format = function () {
      this.version = this.major + '.' + this.minor + '.' + this.patch;
      if (this.prerelease.length) {
        this.version += '-' + this.prerelease.join('.');
      }
      return this.version
    };

    SemVer.prototype.toString = function () {
      return this.version
    };

    SemVer.prototype.compare = function (other) {
      debug('SemVer.compare', this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }

      return this.compareMain(other) || this.comparePre(other)
    };

    SemVer.prototype.compareMain = function (other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }

      return compareIdentifiers(this.major, other.major) ||
             compareIdentifiers(this.minor, other.minor) ||
             compareIdentifiers(this.patch, other.patch)
    };

    SemVer.prototype.comparePre = function (other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }

      // NOT having a prerelease is > having one
      if (this.prerelease.length && !other.prerelease.length) {
        return -1
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0
      }

      var i = 0;
      do {
        var a = this.prerelease[i];
        var b = other.prerelease[i];
        debug('prerelease compare', i, a, b);
        if (a === undefined && b === undefined) {
          return 0
        } else if (b === undefined) {
          return 1
        } else if (a === undefined) {
          return -1
        } else if (a === b) {
          continue
        } else {
          return compareIdentifiers(a, b)
        }
      } while (++i)
    };

    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    SemVer.prototype.inc = function (release, identifier) {
      switch (release) {
        case 'premajor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc('pre', identifier);
          break
        case 'preminor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc('pre', identifier);
          break
        case 'prepatch':
          // If this is already a prerelease, it will bump to the next version
          // drop any prereleases that might already exist, since they are not
          // relevant at this point.
          this.prerelease.length = 0;
          this.inc('patch', identifier);
          this.inc('pre', identifier);
          break
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case 'prerelease':
          if (this.prerelease.length === 0) {
            this.inc('patch', identifier);
          }
          this.inc('pre', identifier);
          break

        case 'major':
          // If this is a pre-major version, bump up to the same major version.
          // Otherwise increment major.
          // 1.0.0-5 bumps to 1.0.0
          // 1.1.0 bumps to 2.0.0
          if (this.minor !== 0 ||
              this.patch !== 0 ||
              this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break
        case 'minor':
          // If this is a pre-minor version, bump up to the same minor version.
          // Otherwise increment minor.
          // 1.2.0-5 bumps to 1.2.0
          // 1.2.1 bumps to 1.3.0
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break
        case 'patch':
          // If this is not a pre-release version, it will increment the patch.
          // If it is a pre-release it will bump up to the same patch version.
          // 1.2.0-5 patches to 1.2.0
          // 1.2.0 patches to 1.2.1
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break
        // This probably shouldn't be used publicly.
        // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
        case 'pre':
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            var i = this.prerelease.length;
            while (--i >= 0) {
              if (typeof this.prerelease[i] === 'number') {
                this.prerelease[i]++;
                i = -2;
              }
            }
            if (i === -1) {
              // didn't increment anything
              this.prerelease.push(0);
            }
          }
          if (identifier) {
            // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
            // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }
          break

        default:
          throw new Error('invalid increment argument: ' + release)
      }
      this.format();
      this.raw = this.version;
      return this
    };

    exports.inc = inc;
    function inc (version, release, loose, identifier) {
      if (typeof (loose) === 'string') {
        identifier = loose;
        loose = undefined;
      }

      try {
        return new SemVer(version, loose).inc(release, identifier).version
      } catch (er) {
        return null
      }
    }

    exports.diff = diff;
    function diff (version1, version2) {
      if (eq(version1, version2)) {
        return null
      } else {
        var v1 = parse(version1);
        var v2 = parse(version2);
        var prefix = '';
        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = 'pre';
          var defaultResult = 'prerelease';
        }
        for (var key in v1) {
          if (key === 'major' || key === 'minor' || key === 'patch') {
            if (v1[key] !== v2[key]) {
              return prefix + key
            }
          }
        }
        return defaultResult // may be undefined
      }
    }

    exports.compareIdentifiers = compareIdentifiers;

    var numeric = /^[0-9]+$/;
    function compareIdentifiers (a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);

      if (anum && bnum) {
        a = +a;
        b = +b;
      }

      return a === b ? 0
        : (anum && !bnum) ? -1
        : (bnum && !anum) ? 1
        : a < b ? -1
        : 1
    }

    exports.rcompareIdentifiers = rcompareIdentifiers;
    function rcompareIdentifiers (a, b) {
      return compareIdentifiers(b, a)
    }

    exports.major = major;
    function major (a, loose) {
      return new SemVer(a, loose).major
    }

    exports.minor = minor;
    function minor (a, loose) {
      return new SemVer(a, loose).minor
    }

    exports.patch = patch;
    function patch (a, loose) {
      return new SemVer(a, loose).patch
    }

    exports.compare = compare;
    function compare (a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose))
    }

    exports.compareLoose = compareLoose;
    function compareLoose (a, b) {
      return compare(a, b, true)
    }

    exports.rcompare = rcompare;
    function rcompare (a, b, loose) {
      return compare(b, a, loose)
    }

    exports.sort = sort;
    function sort (list, loose) {
      return list.sort(function (a, b) {
        return exports.compare(a, b, loose)
      })
    }

    exports.rsort = rsort;
    function rsort (list, loose) {
      return list.sort(function (a, b) {
        return exports.rcompare(a, b, loose)
      })
    }

    exports.gt = gt;
    function gt (a, b, loose) {
      return compare(a, b, loose) > 0
    }

    exports.lt = lt;
    function lt (a, b, loose) {
      return compare(a, b, loose) < 0
    }

    exports.eq = eq;
    function eq (a, b, loose) {
      return compare(a, b, loose) === 0
    }

    exports.neq = neq;
    function neq (a, b, loose) {
      return compare(a, b, loose) !== 0
    }

    exports.gte = gte;
    function gte (a, b, loose) {
      return compare(a, b, loose) >= 0
    }

    exports.lte = lte;
    function lte (a, b, loose) {
      return compare(a, b, loose) <= 0
    }

    exports.cmp = cmp;
    function cmp (a, op, b, loose) {
      switch (op) {
        case '===':
          if (typeof a === 'object')
            a = a.version;
          if (typeof b === 'object')
            b = b.version;
          return a === b

        case '!==':
          if (typeof a === 'object')
            a = a.version;
          if (typeof b === 'object')
            b = b.version;
          return a !== b

        case '':
        case '=':
        case '==':
          return eq(a, b, loose)

        case '!=':
          return neq(a, b, loose)

        case '>':
          return gt(a, b, loose)

        case '>=':
          return gte(a, b, loose)

        case '<':
          return lt(a, b, loose)

        case '<=':
          return lte(a, b, loose)

        default:
          throw new TypeError('Invalid operator: ' + op)
      }
    }

    exports.Comparator = Comparator;
    function Comparator (comp, options) {
      if (!options || typeof options !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp
        } else {
          comp = comp.value;
        }
      }

      if (!(this instanceof Comparator)) {
        return new Comparator(comp, options)
      }

      debug('comparator', comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);

      if (this.semver === ANY) {
        this.value = '';
      } else {
        this.value = this.operator + this.semver.version;
      }

      debug('comp', this);
    }

    var ANY = {};
    Comparator.prototype.parse = function (comp) {
      var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var m = comp.match(r);

      if (!m) {
        throw new TypeError('Invalid comparator: ' + comp)
      }

      this.operator = m[1];
      if (this.operator === '=') {
        this.operator = '';
      }

      // if it literally is just '>' or '' then allow anything.
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    };

    Comparator.prototype.toString = function () {
      return this.value
    };

    Comparator.prototype.test = function (version) {
      debug('Comparator.test', version, this.options.loose);

      if (this.semver === ANY) {
        return true
      }

      if (typeof version === 'string') {
        version = new SemVer(version, this.options);
      }

      return cmp(version, this.operator, this.semver, this.options)
    };

    Comparator.prototype.intersects = function (comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError('a Comparator is required')
      }

      if (!options || typeof options !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      var rangeTmp;

      if (this.operator === '') {
        rangeTmp = new Range(comp.value, options);
        return satisfies(this.value, rangeTmp, options)
      } else if (comp.operator === '') {
        rangeTmp = new Range(this.value, options);
        return satisfies(comp.semver, rangeTmp, options)
      }

      var sameDirectionIncreasing =
        (this.operator === '>=' || this.operator === '>') &&
        (comp.operator === '>=' || comp.operator === '>');
      var sameDirectionDecreasing =
        (this.operator === '<=' || this.operator === '<') &&
        (comp.operator === '<=' || comp.operator === '<');
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive =
        (this.operator === '>=' || this.operator === '<=') &&
        (comp.operator === '>=' || comp.operator === '<=');
      var oppositeDirectionsLessThan =
        cmp(this.semver, '<', comp.semver, options) &&
        ((this.operator === '>=' || this.operator === '>') &&
        (comp.operator === '<=' || comp.operator === '<'));
      var oppositeDirectionsGreaterThan =
        cmp(this.semver, '>', comp.semver, options) &&
        ((this.operator === '<=' || this.operator === '<') &&
        (comp.operator === '>=' || comp.operator === '>'));

      return sameDirectionIncreasing || sameDirectionDecreasing ||
        (sameSemVer && differentDirectionsInclusive) ||
        oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
    };

    exports.Range = Range;
    function Range (range, options) {
      if (!options || typeof options !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      if (range instanceof Range) {
        if (range.loose === !!options.loose &&
            range.includePrerelease === !!options.includePrerelease) {
          return range
        } else {
          return new Range(range.raw, options)
        }
      }

      if (range instanceof Comparator) {
        return new Range(range.value, options)
      }

      if (!(this instanceof Range)) {
        return new Range(range, options)
      }

      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;

      // First, split based on boolean or ||
      this.raw = range;
      this.set = range.split(/\s*\|\|\s*/).map(function (range) {
        return this.parseRange(range.trim())
      }, this).filter(function (c) {
        // throw out any that are not relevant for whatever reason
        return c.length
      });

      if (!this.set.length) {
        throw new TypeError('Invalid SemVer Range: ' + range)
      }

      this.format();
    }

    Range.prototype.format = function () {
      this.range = this.set.map(function (comps) {
        return comps.join(' ').trim()
      }).join('||').trim();
      return this.range
    };

    Range.prototype.toString = function () {
      return this.range
    };

    Range.prototype.parseRange = function (range) {
      var loose = this.options.loose;
      range = range.trim();
      // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
      var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug('hyphen replace', range);
      // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
      range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
      debug('comparator trim', range, re[COMPARATORTRIM]);

      // `~ 1.2.3` => `~1.2.3`
      range = range.replace(re[TILDETRIM], tildeTrimReplace);

      // `^ 1.2.3` => `^1.2.3`
      range = range.replace(re[CARETTRIM], caretTrimReplace);

      // normalize spaces
      range = range.split(/\s+/).join(' ');

      // At this point, the range is completely trimmed and
      // ready to be split into comparators.

      var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var set = range.split(' ').map(function (comp) {
        return parseComparator(comp, this.options)
      }, this).join(' ').split(/\s+/);
      if (this.options.loose) {
        // in loose mode, throw out any that are not valid comparators
        set = set.filter(function (comp) {
          return !!comp.match(compRe)
        });
      }
      set = set.map(function (comp) {
        return new Comparator(comp, this.options)
      }, this);

      return set
    };

    Range.prototype.intersects = function (range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError('a Range is required')
      }

      return this.set.some(function (thisComparators) {
        return thisComparators.every(function (thisComparator) {
          return range.set.some(function (rangeComparators) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options)
            })
          })
        })
      })
    };

    // Mostly just for testing and legacy API reasons
    exports.toComparators = toComparators;
    function toComparators (range, options) {
      return new Range(range, options).set.map(function (comp) {
        return comp.map(function (c) {
          return c.value
        }).join(' ').trim().split(' ')
      })
    }

    // comprised of xranges, tildes, stars, and gtlt's at this point.
    // already replaced the hyphen ranges
    // turn into a set of JUST comparators.
    function parseComparator (comp, options) {
      debug('comp', comp, options);
      comp = replaceCarets(comp, options);
      debug('caret', comp);
      comp = replaceTildes(comp, options);
      debug('tildes', comp);
      comp = replaceXRanges(comp, options);
      debug('xrange', comp);
      comp = replaceStars(comp, options);
      debug('stars', comp);
      return comp
    }

    function isX (id) {
      return !id || id.toLowerCase() === 'x' || id === '*'
    }

    // ~, ~> --> * (any, kinda silly)
    // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
    // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
    // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
    // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
    // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
    function replaceTildes (comp, options) {
      return comp.trim().split(/\s+/).map(function (comp) {
        return replaceTilde(comp, options)
      }).join(' ')
    }

    function replaceTilde (comp, options) {
      var r = options.loose ? re[TILDELOOSE] : re[TILDE];
      return comp.replace(r, function (_, M, m, p, pr) {
        debug('tilde', comp, _, M, m, p, pr);
        var ret;

        if (isX(M)) {
          ret = '';
        } else if (isX(m)) {
          ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
        } else if (isX(p)) {
          // ~1.2 == >=1.2.0 <1.3.0
          ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
        } else if (pr) {
          debug('replaceTilde pr', pr);
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0';
        } else {
          // ~1.2.3 == >=1.2.3 <1.3.0
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0';
        }

        debug('tilde return', ret);
        return ret
      })
    }

    // ^ --> * (any, kinda silly)
    // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
    // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
    // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
    // ^1.2.3 --> >=1.2.3 <2.0.0
    // ^1.2.0 --> >=1.2.0 <2.0.0
    function replaceCarets (comp, options) {
      return comp.trim().split(/\s+/).map(function (comp) {
        return replaceCaret(comp, options)
      }).join(' ')
    }

    function replaceCaret (comp, options) {
      debug('caret', comp, options);
      var r = options.loose ? re[CARETLOOSE] : re[CARET];
      return comp.replace(r, function (_, M, m, p, pr) {
        debug('caret', comp, _, M, m, p, pr);
        var ret;

        if (isX(M)) {
          ret = '';
        } else if (isX(m)) {
          ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
        } else if (isX(p)) {
          if (M === '0') {
            ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
          } else {
            ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
          }
        } else if (pr) {
          debug('replaceCaret pr', pr);
          if (M === '0') {
            if (m === '0') {
              ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                    ' <' + M + '.' + m + '.' + (+p + 1);
            } else {
              ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                    ' <' + M + '.' + (+m + 1) + '.0';
            }
          } else {
            ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                  ' <' + (+M + 1) + '.0.0';
          }
        } else {
          debug('no pr');
          if (M === '0') {
            if (m === '0') {
              ret = '>=' + M + '.' + m + '.' + p +
                    ' <' + M + '.' + m + '.' + (+p + 1);
            } else {
              ret = '>=' + M + '.' + m + '.' + p +
                    ' <' + M + '.' + (+m + 1) + '.0';
            }
          } else {
            ret = '>=' + M + '.' + m + '.' + p +
                  ' <' + (+M + 1) + '.0.0';
          }
        }

        debug('caret return', ret);
        return ret
      })
    }

    function replaceXRanges (comp, options) {
      debug('replaceXRanges', comp, options);
      return comp.split(/\s+/).map(function (comp) {
        return replaceXRange(comp, options)
      }).join(' ')
    }

    function replaceXRange (comp, options) {
      comp = comp.trim();
      var r = options.loose ? re[XRANGELOOSE] : re[XRANGE];
      return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
        debug('xRange', comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;

        if (gtlt === '=' && anyX) {
          gtlt = '';
        }

        if (xM) {
          if (gtlt === '>' || gtlt === '<') {
            // nothing is allowed
            ret = '<0.0.0';
          } else {
            // nothing is forbidden
            ret = '*';
          }
        } else if (gtlt && anyX) {
          // we know patch is an x, because we have any x at all.
          // replace X with 0
          if (xm) {
            m = 0;
          }
          p = 0;

          if (gtlt === '>') {
            // >1 => >=2.0.0
            // >1.2 => >=1.3.0
            // >1.2.3 => >= 1.2.4
            gtlt = '>=';
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === '<=') {
            // <=0.7.x is actually <0.8.0, since any 0.7.x should
            // pass.  Similarly, <=7.x is actually <8.0.0, etc.
            gtlt = '<';
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }

          ret = gtlt + M + '.' + m + '.' + p;
        } else if (xm) {
          ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
        } else if (xp) {
          ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
        }

        debug('xRange return', ret);

        return ret
      })
    }

    // Because * is AND-ed with everything else in the comparator,
    // and '' means "any version", just remove the *s entirely.
    function replaceStars (comp, options) {
      debug('replaceStars', comp, options);
      // Looseness is ignored here.  star is always as loose as it gets!
      return comp.trim().replace(re[STAR], '')
    }

    // This function is passed to string.replace(re[HYPHENRANGE])
    // M, m, patch, prerelease, build
    // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
    // 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
    // 1.2 - 3.4 => >=1.2.0 <3.5.0
    function hyphenReplace ($0,
      from, fM, fm, fp, fpr, fb,
      to, tM, tm, tp, tpr, tb) {
      if (isX(fM)) {
        from = '';
      } else if (isX(fm)) {
        from = '>=' + fM + '.0.0';
      } else if (isX(fp)) {
        from = '>=' + fM + '.' + fm + '.0';
      } else {
        from = '>=' + from;
      }

      if (isX(tM)) {
        to = '';
      } else if (isX(tm)) {
        to = '<' + (+tM + 1) + '.0.0';
      } else if (isX(tp)) {
        to = '<' + tM + '.' + (+tm + 1) + '.0';
      } else if (tpr) {
        to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
      } else {
        to = '<=' + to;
      }

      return (from + ' ' + to).trim()
    }

    // if ANY of the sets match ALL of its comparators, then pass
    Range.prototype.test = function (version) {
      if (!version) {
        return false
      }

      if (typeof version === 'string') {
        version = new SemVer(version, this.options);
      }

      for (var i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version, this.options)) {
          return true
        }
      }
      return false
    };

    function testSet (set, version, options) {
      for (var i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false
        }
      }

      if (version.prerelease.length && !options.includePrerelease) {
        // Find the set of versions that are allowed to have prereleases
        // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
        // That should allow `1.2.3-pr.2` to pass.
        // However, `1.2.4-alpha.notready` should NOT be allowed,
        // even though it's within the range set by the comparators.
        for (i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === ANY) {
            continue
          }

          if (set[i].semver.prerelease.length > 0) {
            var allowed = set[i].semver;
            if (allowed.major === version.major &&
                allowed.minor === version.minor &&
                allowed.patch === version.patch) {
              return true
            }
          }
        }

        // Version has a -pre, but it's not one of the ones we like.
        return false
      }

      return true
    }

    exports.satisfies = satisfies;
    function satisfies (version, range, options) {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false
      }
      return range.test(version)
    }

    exports.maxSatisfying = maxSatisfying;
    function maxSatisfying (versions, range, options) {
      var max = null;
      var maxSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null
      }
      versions.forEach(function (v) {
        if (rangeObj.test(v)) {
          // satisfies(v, range, options)
          if (!max || maxSV.compare(v) === -1) {
            // compare(max, v, true)
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max
    }

    exports.minSatisfying = minSatisfying;
    function minSatisfying (versions, range, options) {
      var min = null;
      var minSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null
      }
      versions.forEach(function (v) {
        if (rangeObj.test(v)) {
          // satisfies(v, range, options)
          if (!min || minSV.compare(v) === 1) {
            // compare(min, v, true)
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min
    }

    exports.minVersion = minVersion;
    function minVersion (range, loose) {
      range = new Range(range, loose);

      var minver = new SemVer('0.0.0');
      if (range.test(minver)) {
        return minver
      }

      minver = new SemVer('0.0.0-0');
      if (range.test(minver)) {
        return minver
      }

      minver = null;
      for (var i = 0; i < range.set.length; ++i) {
        var comparators = range.set[i];

        comparators.forEach(function (comparator) {
          // Clone to avoid manipulating the comparator's semver object.
          var compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case '>':
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
              /* fallthrough */
            case '':
            case '>=':
              if (!minver || gt(minver, compver)) {
                minver = compver;
              }
              break
            case '<':
            case '<=':
              /* Ignore maximum versions */
              break
            /* istanbul ignore next */
            default:
              throw new Error('Unexpected operation: ' + comparator.operator)
          }
        });
      }

      if (minver && range.test(minver)) {
        return minver
      }

      return null
    }

    exports.validRange = validRange;
    function validRange (range, options) {
      try {
        // Return '*' instead of '' so that truthiness works.
        // This will throw if it's invalid anyway
        return new Range(range, options).range || '*'
      } catch (er) {
        return null
      }
    }

    // Determine if version is less than all the versions possible in the range
    exports.ltr = ltr;
    function ltr (version, range, options) {
      return outside(version, range, '<', options)
    }

    // Determine if version is greater than all the versions possible in the range.
    exports.gtr = gtr;
    function gtr (version, range, options) {
      return outside(version, range, '>', options)
    }

    exports.outside = outside;
    function outside (version, range, hilo, options) {
      version = new SemVer(version, options);
      range = new Range(range, options);

      var gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case '>':
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = '>';
          ecomp = '>=';
          break
        case '<':
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = '<';
          ecomp = '<=';
          break
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"')
      }

      // If it satisifes the range it is not outside
      if (satisfies(version, range, options)) {
        return false
      }

      // From now on, variable terms are as if we're in "gtr" mode.
      // but note that everything is flipped for the "ltr" function.

      for (var i = 0; i < range.set.length; ++i) {
        var comparators = range.set[i];

        var high = null;
        var low = null;

        comparators.forEach(function (comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator('>=0.0.0');
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });

        // If the edge version comparator has a operator then our version
        // isn't outside it
        if (high.operator === comp || high.operator === ecomp) {
          return false
        }

        // If the lowest version comparator has an operator and our version
        // is less than it then it isn't higher than the range
        if ((!low.operator || low.operator === comp) &&
            ltefn(version, low.semver)) {
          return false
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false
        }
      }
      return true
    }

    exports.prerelease = prerelease;
    function prerelease (version, options) {
      var parsed = parse(version, options);
      return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
    }

    exports.intersects = intersects;
    function intersects (r1, r2, options) {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2)
    }

    exports.coerce = coerce;
    function coerce (version) {
      if (version instanceof SemVer) {
        return version
      }

      if (typeof version !== 'string') {
        return null
      }

      var match = version.match(re[COERCE]);

      if (match == null) {
        return null
      }

      return parse(match[1] +
        '.' + (match[2] || '0') +
        '.' + (match[3] || '0'))
    }
    }(semver$1, semver$1.exports));

    var semverRegex$1 = function () {
    	return /\bv?(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?\b/ig;
    };

    var semver = semver$1.exports;
    var semverRegex = semverRegex$1;

    function sort(semvers, compare) {
    	if (!semvers instanceof Array) {
    		throw new Error('It is not an array');
    	}

    	return semvers.sort(function (v1, v2) {
    		var sv1 = semverRegex().exec(v1)[0] || v1;
    		var sv2 = semverRegex().exec(v2)[0] || v2;

    		return compare(sv1, sv2);
    	});
    }

    var semverSort = {
    	asc: function (semvers) {
    		return sort(semvers, semver.compare);
    	},

    	desc: function (semvers) {
    		return sort(semvers, semver.rcompare);
    	}
    };

    log$1.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
    log$1.heading = 'js-cli';
    log$1.addLevel('success', 2000, { fg: 'green', bold: true });

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter$2(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    const getNpmInfo = (npmName, registry) => {
        if (!npmName) {
            return null;
        }
        const registryUrl = registry || getDefaultRegistry();
        const npmInfoUrl = urlJoin(registryUrl, npmName);
        return axios.get(npmInfoUrl).then(response => {
            if (response.status === 200) {
                return response.data;
            }
        }).catch((err) => {
            return Promise.reject(err);
        });
    };
    const getDefaultRegistry = (isOriginal = false) => {
        return isOriginal ? 'https://registry.npm.taobao.org' : 'https://registry.npmjs.org';
    };
    const getNpmVersions = (appName, registry = '') => __awaiter$2(void 0, void 0, void 0, function* () {
        const data = yield getNpmInfo(appName, registry);
        if (data) {
            return Object.keys(data.versions);
        }
        else {
            return [];
        }
    });
    const getNpmSemverVersion = (baseVersion, npmName, registry = '') => __awaiter$2(void 0, void 0, void 0, function* () {
        const versions = yield getNpmVersions(npmName, registry);
        const newVersions = getSemverVersions(baseVersion, versions);
        if (newVersions && newVersions.length > 0) {
            return newVersions[0];
        }
        return null;
    });
    const getSemverVersions = (baseVersion, versions) => {
        return semverSort.desc(versions.filter(version => semver$2.satisfies(version, `^${baseVersion}`)));
    };
    const getNpmLatestVersion = (npmName, registry = '') => __awaiter$2(void 0, void 0, void 0, function* () {
        const versions = yield getNpmVersions(npmName);
        if (versions) {
            return semverSort.desc(versions)[0];
        }
        return '';
    });

    var getNpmInfo$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        getDefaultRegistry: getDefaultRegistry,
        getNpmSemverVersion: getNpmSemverVersion,
        getNpmLatestVersion: getNpmLatestVersion
    });

    const BASE_URL = process.env.JS_CLI_BASE_URL ? process.env.JS_CLI_BASE_URL : 'http://1.116.156.44:8085';
    const request = axios.create({
        baseURL: BASE_URL,
        timeout: 30000,
    });
    request.interceptors.response.use((response) => {
        if (response.status === 200) {
            return response.data;
        }
    }, (error) => {
        return Promise.reject(error);
    });
    const isObject = (o) => {
        return Object.prototype.toString.call(o) === '[object Object]';
    };
    const spawn = (command, args, options = {}) => {
        const win32 = process.platform === 'win32';
        const cmd = win32 ? 'cmd' : command;
        const cmdArgs = win32 ? ['/c'].concat(command, args) : args;
        return cp__default["default"].spawn(cmd, cmdArgs, options || {});
    };

    var pkgDir$2 = {exports: {}};

    var findUp$1 = {exports: {}};

    var locatePath = {exports: {}};

    class Node {
    	/// value;
    	/// next;

    	constructor(value) {
    		this.value = value;

    		// TODO: Remove this when targeting Node.js 12.
    		this.next = undefined;
    	}
    }

    class Queue$1 {
    	// TODO: Use private class fields when targeting Node.js 12.
    	// #_head;
    	// #_tail;
    	// #_size;

    	constructor() {
    		this.clear();
    	}

    	enqueue(value) {
    		const node = new Node(value);

    		if (this._head) {
    			this._tail.next = node;
    			this._tail = node;
    		} else {
    			this._head = node;
    			this._tail = node;
    		}

    		this._size++;
    	}

    	dequeue() {
    		const current = this._head;
    		if (!current) {
    			return;
    		}

    		this._head = this._head.next;
    		this._size--;
    		return current.value;
    	}

    	clear() {
    		this._head = undefined;
    		this._tail = undefined;
    		this._size = 0;
    	}

    	get size() {
    		return this._size;
    	}

    	* [Symbol.iterator]() {
    		let current = this._head;

    		while (current) {
    			yield current.value;
    			current = current.next;
    		}
    	}
    }

    var yoctoQueue = Queue$1;

    const Queue = yoctoQueue;

    const pLimit$1 = concurrency => {
    	if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
    		throw new TypeError('Expected `concurrency` to be a number from 1 and up');
    	}

    	const queue = new Queue();
    	let activeCount = 0;

    	const next = () => {
    		activeCount--;

    		if (queue.size > 0) {
    			queue.dequeue()();
    		}
    	};

    	const run = async (fn, resolve, ...args) => {
    		activeCount++;

    		const result = (async () => fn(...args))();

    		resolve(result);

    		try {
    			await result;
    		} catch {}

    		next();
    	};

    	const enqueue = (fn, resolve, ...args) => {
    		queue.enqueue(run.bind(null, fn, resolve, ...args));

    		(async () => {
    			// This function needs to wait until the next microtask before comparing
    			// `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
    			// when the run function is dequeued and called. The comparison in the if-statement
    			// needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
    			await Promise.resolve();

    			if (activeCount < concurrency && queue.size > 0) {
    				queue.dequeue()();
    			}
    		})();
    	};

    	const generator = (fn, ...args) => new Promise(resolve => {
    		enqueue(fn, resolve, ...args);
    	});

    	Object.defineProperties(generator, {
    		activeCount: {
    			get: () => activeCount
    		},
    		pendingCount: {
    			get: () => queue.size
    		},
    		clearQueue: {
    			value: () => {
    				queue.clear();
    			}
    		}
    	});

    	return generator;
    };

    var pLimit_1 = pLimit$1;

    const pLimit = pLimit_1;

    class EndError extends Error {
    	constructor(value) {
    		super();
    		this.value = value;
    	}
    }

    // The input can also be a promise, so we await it
    const testElement = async (element, tester) => tester(await element);

    // The input can also be a promise, so we `Promise.all()` them both
    const finder = async element => {
    	const values = await Promise.all(element);
    	if (values[1] === true) {
    		throw new EndError(values[0]);
    	}

    	return false;
    };

    const pLocate$1 = async (iterable, tester, options) => {
    	options = {
    		concurrency: Infinity,
    		preserveOrder: true,
    		...options
    	};

    	const limit = pLimit(options.concurrency);

    	// Start all the promises concurrently with optional limit
    	const items = [...iterable].map(element => [element, limit(testElement, element, tester)]);

    	// Check the promises either serially or concurrently
    	const checkLimit = pLimit(options.preserveOrder ? 1 : Infinity);

    	try {
    		await Promise.all(items.map(element => checkLimit(finder, element)));
    	} catch (error) {
    		if (error instanceof EndError) {
    			return error.value;
    		}

    		throw error;
    	}
    };

    var pLocate_1 = pLocate$1;

    const path$g = require$$1__default$1["default"];
    const fs$n = require$$0__default$7["default"];
    const {promisify: promisify$1} = require$$0__default$1["default"];
    const pLocate = pLocate_1;

    const fsStat = promisify$1(fs$n.stat);
    const fsLStat = promisify$1(fs$n.lstat);

    const typeMappings = {
    	directory: 'isDirectory',
    	file: 'isFile'
    };

    function checkType({type}) {
    	if (type in typeMappings) {
    		return;
    	}

    	throw new Error(`Invalid type specified: ${type}`);
    }

    const matchType = (type, stat) => type === undefined || stat[typeMappings[type]]();

    locatePath.exports = async (paths, options) => {
    	options = {
    		cwd: process.cwd(),
    		type: 'file',
    		allowSymlinks: true,
    		...options
    	};

    	checkType(options);

    	const statFn = options.allowSymlinks ? fsStat : fsLStat;

    	return pLocate(paths, async path_ => {
    		try {
    			const stat = await statFn(path$g.resolve(options.cwd, path_));
    			return matchType(options.type, stat);
    		} catch {
    			return false;
    		}
    	}, options);
    };

    locatePath.exports.sync = (paths, options) => {
    	options = {
    		cwd: process.cwd(),
    		allowSymlinks: true,
    		type: 'file',
    		...options
    	};

    	checkType(options);

    	const statFn = options.allowSymlinks ? fs$n.statSync : fs$n.lstatSync;

    	for (const path_ of paths) {
    		try {
    			const stat = statFn(path$g.resolve(options.cwd, path_));

    			if (matchType(options.type, stat)) {
    				return path_;
    			}
    		} catch {}
    	}
    };

    var pathExists$9 = {exports: {}};

    const fs$m = require$$0__default$7["default"];
    const {promisify} = require$$0__default$1["default"];

    const pAccess = promisify(fs$m.access);

    pathExists$9.exports = async path => {
    	try {
    		await pAccess(path);
    		return true;
    	} catch (_) {
    		return false;
    	}
    };

    pathExists$9.exports.sync = path => {
    	try {
    		fs$m.accessSync(path);
    		return true;
    	} catch (_) {
    		return false;
    	}
    };

    var _pathExists = pathExists$9.exports;

    (function (module) {
    const path = require$$1__default$1["default"];
    const locatePath$1 = locatePath.exports;
    const pathExists = pathExists$9.exports;

    const stop = Symbol('findUp.stop');

    module.exports = async (name, options = {}) => {
    	let directory = path.resolve(options.cwd || '');
    	const {root} = path.parse(directory);
    	const paths = [].concat(name);

    	const runMatcher = async locateOptions => {
    		if (typeof name !== 'function') {
    			return locatePath$1(paths, locateOptions);
    		}

    		const foundPath = await name(locateOptions.cwd);
    		if (typeof foundPath === 'string') {
    			return locatePath$1([foundPath], locateOptions);
    		}

    		return foundPath;
    	};

    	// eslint-disable-next-line no-constant-condition
    	while (true) {
    		// eslint-disable-next-line no-await-in-loop
    		const foundPath = await runMatcher({...options, cwd: directory});

    		if (foundPath === stop) {
    			return;
    		}

    		if (foundPath) {
    			return path.resolve(directory, foundPath);
    		}

    		if (directory === root) {
    			return;
    		}

    		directory = path.dirname(directory);
    	}
    };

    module.exports.sync = (name, options = {}) => {
    	let directory = path.resolve(options.cwd || '');
    	const {root} = path.parse(directory);
    	const paths = [].concat(name);

    	const runMatcher = locateOptions => {
    		if (typeof name !== 'function') {
    			return locatePath$1.sync(paths, locateOptions);
    		}

    		const foundPath = name(locateOptions.cwd);
    		if (typeof foundPath === 'string') {
    			return locatePath$1.sync([foundPath], locateOptions);
    		}

    		return foundPath;
    	};

    	// eslint-disable-next-line no-constant-condition
    	while (true) {
    		const foundPath = runMatcher({...options, cwd: directory});

    		if (foundPath === stop) {
    			return;
    		}

    		if (foundPath) {
    			return path.resolve(directory, foundPath);
    		}

    		if (directory === root) {
    			return;
    		}

    		directory = path.dirname(directory);
    	}
    };

    module.exports.exists = pathExists;

    module.exports.sync.exists = pathExists.sync;

    module.exports.stop = stop;
    }(findUp$1));

    const path$f = require$$1__default$1["default"];
    const findUp = findUp$1.exports;

    const pkgDir = async cwd => {
    	const filePath = await findUp('package.json', {cwd});
    	return filePath && path$f.dirname(filePath);
    };

    pkgDir$2.exports = pkgDir;

    pkgDir$2.exports.sync = cwd => {
    	const filePath = findUp.sync('package.json', {cwd});
    	return filePath && path$f.dirname(filePath);
    };

    var pkgDir$1 = pkgDir$2.exports;

    var fs$l = {};

    var universalify$1 = {};

    universalify$1.fromCallback = function (fn) {
      return Object.defineProperty(function (...args) {
        if (typeof args[args.length - 1] === 'function') fn.apply(this, args);
        else {
          return new Promise((resolve, reject) => {
            fn.call(
              this,
              ...args,
              (err, res) => (err != null) ? reject(err) : resolve(res)
            );
          })
        }
      }, 'name', { value: fn.name })
    };

    universalify$1.fromPromise = function (fn) {
      return Object.defineProperty(function (...args) {
        const cb = args[args.length - 1];
        if (typeof cb !== 'function') return fn.apply(this, args)
        else fn.apply(this, args.slice(0, -1)).then(r => cb(null, r), cb);
      }, 'name', { value: fn.name })
    };

    var constants = require$$0__default$8["default"];

    var origCwd = process.cwd;
    var cwd = null;

    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;

    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd
    };
    try {
      process.cwd();
    } catch (er) {}

    // This check is needed until node.js 12 is required
    if (typeof process.chdir === 'function') {
      var chdir = process.chdir;
      process.chdir = function (d) {
        cwd = null;
        chdir.call(process, d);
      };
      if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
    }

    var polyfills$1 = patch$1;

    function patch$1 (fs) {
      // (re-)implement some things that are known busted or missing.

      // lchmod, broken prior to 0.6.2
      // back-port the fix here.
      if (constants.hasOwnProperty('O_SYMLINK') &&
          process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs);
      }

      // lutimes implementation, or no-op
      if (!fs.lutimes) {
        patchLutimes(fs);
      }

      // https://github.com/isaacs/node-graceful-fs/issues/4
      // Chown should not fail on einval or eperm if non-root.
      // It should not fail on enosys ever, as this just indicates
      // that a fs doesn't support the intended operation.

      fs.chown = chownFix(fs.chown);
      fs.fchown = chownFix(fs.fchown);
      fs.lchown = chownFix(fs.lchown);

      fs.chmod = chmodFix(fs.chmod);
      fs.fchmod = chmodFix(fs.fchmod);
      fs.lchmod = chmodFix(fs.lchmod);

      fs.chownSync = chownFixSync(fs.chownSync);
      fs.fchownSync = chownFixSync(fs.fchownSync);
      fs.lchownSync = chownFixSync(fs.lchownSync);

      fs.chmodSync = chmodFixSync(fs.chmodSync);
      fs.fchmodSync = chmodFixSync(fs.fchmodSync);
      fs.lchmodSync = chmodFixSync(fs.lchmodSync);

      fs.stat = statFix(fs.stat);
      fs.fstat = statFix(fs.fstat);
      fs.lstat = statFix(fs.lstat);

      fs.statSync = statFixSync(fs.statSync);
      fs.fstatSync = statFixSync(fs.fstatSync);
      fs.lstatSync = statFixSync(fs.lstatSync);

      // if lchmod/lchown do not exist, then make them no-ops
      if (!fs.lchmod) {
        fs.lchmod = function (path, mode, cb) {
          if (cb) process.nextTick(cb);
        };
        fs.lchmodSync = function () {};
      }
      if (!fs.lchown) {
        fs.lchown = function (path, uid, gid, cb) {
          if (cb) process.nextTick(cb);
        };
        fs.lchownSync = function () {};
      }

      // on Windows, A/V software can lock the directory, causing this
      // to fail with an EACCES or EPERM if the directory contains newly
      // created files.  Try again on failure, for up to 60 seconds.

      // Set the timeout this long because some Windows Anti-Virus, such as Parity
      // bit9, may lock files for up to a minute, causing npm package install
      // failures. Also, take care to yield the scheduler. Windows scheduling gives
      // CPU to a busy looping process, which can cause the program causing the lock
      // contention to be starved of CPU by node, so the contention doesn't resolve.
      if (platform === "win32") {
        fs.rename = (function (fs$rename) { return function (from, to, cb) {
          var start = Date.now();
          var backoff = 0;
          fs$rename(from, to, function CB (er) {
            if (er
                && (er.code === "EACCES" || er.code === "EPERM")
                && Date.now() - start < 60000) {
              setTimeout(function() {
                fs.stat(to, function (stater, st) {
                  if (stater && stater.code === "ENOENT")
                    fs$rename(from, to, CB);
                  else
                    cb(er);
                });
              }, backoff);
              if (backoff < 100)
                backoff += 10;
              return;
            }
            if (cb) cb(er);
          });
        }})(fs.rename);
      }

      // if read() returns EAGAIN, then just try it again.
      fs.read = (function (fs$read) {
        function read (fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === 'function') {
            var eagCounter = 0;
            callback = function (er, _, __) {
              if (er && er.code === 'EAGAIN' && eagCounter < 10) {
                eagCounter ++;
                return fs$read.call(fs, fd, buffer, offset, length, position, callback)
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs, fd, buffer, offset, length, position, callback)
        }

        // This ensures `util.promisify` works as it does for native `fs.read`.
        if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
        return read
      })(fs.read);

      fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
        var eagCounter = 0;
        while (true) {
          try {
            return fs$readSync.call(fs, fd, buffer, offset, length, position)
          } catch (er) {
            if (er.code === 'EAGAIN' && eagCounter < 10) {
              eagCounter ++;
              continue
            }
            throw er
          }
        }
      }})(fs.readSync);

      function patchLchmod (fs) {
        fs.lchmod = function (path, mode, callback) {
          fs.open( path
                 , constants.O_WRONLY | constants.O_SYMLINK
                 , mode
                 , function (err, fd) {
            if (err) {
              if (callback) callback(err);
              return
            }
            // prefer to return the chmod error, if one occurs,
            // but still try to close, and report closing errors if they occur.
            fs.fchmod(fd, mode, function (err) {
              fs.close(fd, function(err2) {
                if (callback) callback(err || err2);
              });
            });
          });
        };

        fs.lchmodSync = function (path, mode) {
          var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);

          // prefer to return the chmod error, if one occurs,
          // but still try to close, and report closing errors if they occur.
          var threw = true;
          var ret;
          try {
            ret = fs.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs.closeSync(fd);
              } catch (er) {}
            } else {
              fs.closeSync(fd);
            }
          }
          return ret
        };
      }

      function patchLutimes (fs) {
        if (constants.hasOwnProperty("O_SYMLINK")) {
          fs.lutimes = function (path, at, mt, cb) {
            fs.open(path, constants.O_SYMLINK, function (er, fd) {
              if (er) {
                if (cb) cb(er);
                return
              }
              fs.futimes(fd, at, mt, function (er) {
                fs.close(fd, function (er2) {
                  if (cb) cb(er || er2);
                });
              });
            });
          };

          fs.lutimesSync = function (path, at, mt) {
            var fd = fs.openSync(path, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs.closeSync(fd);
                } catch (er) {}
              } else {
                fs.closeSync(fd);
              }
            }
            return ret
          };

        } else {
          fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb); };
          fs.lutimesSync = function () {};
        }
      }

      function chmodFix (orig) {
        if (!orig) return orig
        return function (target, mode, cb) {
          return orig.call(fs, target, mode, function (er) {
            if (chownErOk(er)) er = null;
            if (cb) cb.apply(this, arguments);
          })
        }
      }

      function chmodFixSync (orig) {
        if (!orig) return orig
        return function (target, mode) {
          try {
            return orig.call(fs, target, mode)
          } catch (er) {
            if (!chownErOk(er)) throw er
          }
        }
      }


      function chownFix (orig) {
        if (!orig) return orig
        return function (target, uid, gid, cb) {
          return orig.call(fs, target, uid, gid, function (er) {
            if (chownErOk(er)) er = null;
            if (cb) cb.apply(this, arguments);
          })
        }
      }

      function chownFixSync (orig) {
        if (!orig) return orig
        return function (target, uid, gid) {
          try {
            return orig.call(fs, target, uid, gid)
          } catch (er) {
            if (!chownErOk(er)) throw er
          }
        }
      }

      function statFix (orig) {
        if (!orig) return orig
        // Older versions of Node erroneously returned signed integers for
        // uid + gid.
        return function (target, options, cb) {
          if (typeof options === 'function') {
            cb = options;
            options = null;
          }
          function callback (er, stats) {
            if (stats) {
              if (stats.uid < 0) stats.uid += 0x100000000;
              if (stats.gid < 0) stats.gid += 0x100000000;
            }
            if (cb) cb.apply(this, arguments);
          }
          return options ? orig.call(fs, target, options, callback)
            : orig.call(fs, target, callback)
        }
      }

      function statFixSync (orig) {
        if (!orig) return orig
        // Older versions of Node erroneously returned signed integers for
        // uid + gid.
        return function (target, options) {
          var stats = options ? orig.call(fs, target, options)
            : orig.call(fs, target);
          if (stats.uid < 0) stats.uid += 0x100000000;
          if (stats.gid < 0) stats.gid += 0x100000000;
          return stats;
        }
      }

      // ENOSYS means that the fs doesn't support the op. Just ignore
      // that, because it doesn't matter.
      //
      // if there's no getuid, or if getuid() is something other
      // than 0, and the error is EINVAL or EPERM, then just ignore
      // it.
      //
      // This specific case is a silent failure in cp, install, tar,
      // and most other unix tools that manage permissions.
      //
      // When running as root, or if other types of errors are
      // encountered, then it's strict.
      function chownErOk (er) {
        if (!er)
          return true

        if (er.code === "ENOSYS")
          return true

        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true
        }

        return false
      }
    }

    var Stream = require$$0__default$2["default"].Stream;

    var legacyStreams = legacy$1;

    function legacy$1 (fs) {
      return {
        ReadStream: ReadStream,
        WriteStream: WriteStream
      }

      function ReadStream (path, options) {
        if (!(this instanceof ReadStream)) return new ReadStream(path, options);

        Stream.call(this);

        var self = this;

        this.path = path;
        this.fd = null;
        this.readable = true;
        this.paused = false;

        this.flags = 'r';
        this.mode = 438; /*=0666*/
        this.bufferSize = 64 * 1024;

        options = options || {};

        // Mixin options into this
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }

        if (this.encoding) this.setEncoding(this.encoding);

        if (this.start !== undefined) {
          if ('number' !== typeof this.start) {
            throw TypeError('start must be a Number');
          }
          if (this.end === undefined) {
            this.end = Infinity;
          } else if ('number' !== typeof this.end) {
            throw TypeError('end must be a Number');
          }

          if (this.start > this.end) {
            throw new Error('start must be <= end');
          }

          this.pos = this.start;
        }

        if (this.fd !== null) {
          process.nextTick(function() {
            self._read();
          });
          return;
        }

        fs.open(this.path, this.flags, this.mode, function (err, fd) {
          if (err) {
            self.emit('error', err);
            self.readable = false;
            return;
          }

          self.fd = fd;
          self.emit('open', fd);
          self._read();
        });
      }

      function WriteStream (path, options) {
        if (!(this instanceof WriteStream)) return new WriteStream(path, options);

        Stream.call(this);

        this.path = path;
        this.fd = null;
        this.writable = true;

        this.flags = 'w';
        this.encoding = 'binary';
        this.mode = 438; /*=0666*/
        this.bytesWritten = 0;

        options = options || {};

        // Mixin options into this
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }

        if (this.start !== undefined) {
          if ('number' !== typeof this.start) {
            throw TypeError('start must be a Number');
          }
          if (this.start < 0) {
            throw new Error('start must be >= zero');
          }

          this.pos = this.start;
        }

        this.busy = false;
        this._queue = [];

        if (this.fd === null) {
          this._open = fs.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
          this.flush();
        }
      }
    }

    var clone_1 = clone$1;

    var getPrototypeOf = Object.getPrototypeOf || function (obj) {
      return obj.__proto__
    };

    function clone$1 (obj) {
      if (obj === null || typeof obj !== 'object')
        return obj

      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = Object.create(null);

      Object.getOwnPropertyNames(obj).forEach(function (key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
      });

      return copy
    }

    var fs$k = require$$0__default$7["default"];
    var polyfills = polyfills$1;
    var legacy = legacyStreams;
    var clone = clone_1;

    var util$1 = require$$0__default$1["default"];

    /* istanbul ignore next - node 0.x polyfill */
    var gracefulQueue;
    var previousSymbol;

    /* istanbul ignore else - node 0.x polyfill */
    if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
      gracefulQueue = Symbol.for('graceful-fs.queue');
      // This is used in testing by future versions
      previousSymbol = Symbol.for('graceful-fs.previous');
    } else {
      gracefulQueue = '___graceful-fs.queue';
      previousSymbol = '___graceful-fs.previous';
    }

    function noop () {}

    function publishQueue(context, queue) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue
        }
      });
    }

    var debug = noop;
    if (util$1.debuglog)
      debug = util$1.debuglog('gfs4');
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
      debug = function() {
        var m = util$1.format.apply(util$1, arguments);
        m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ');
        console.error(m);
      };

    // Once time initialization
    if (!fs$k[gracefulQueue]) {
      // This queue can be shared by multiple loaded instances
      var queue = commonjsGlobal[gracefulQueue] || [];
      publishQueue(fs$k, queue);

      // Patch fs.close/closeSync to shared queue version, because we need
      // to retry() whenever a close happens *anywhere* in the program.
      // This is essential when multiple graceful-fs instances are
      // in play at the same time.
      fs$k.close = (function (fs$close) {
        function close (fd, cb) {
          return fs$close.call(fs$k, fd, function (err) {
            // This function uses the graceful-fs shared queue
            if (!err) {
              resetQueue();
            }

            if (typeof cb === 'function')
              cb.apply(this, arguments);
          })
        }

        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close
      })(fs$k.close);

      fs$k.closeSync = (function (fs$closeSync) {
        function closeSync (fd) {
          // This function uses the graceful-fs shared queue
          fs$closeSync.apply(fs$k, arguments);
          resetQueue();
        }

        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync
      })(fs$k.closeSync);

      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
        process.on('exit', function() {
          debug(fs$k[gracefulQueue]);
          require$$0__default$5["default"].equal(fs$k[gracefulQueue].length, 0);
        });
      }
    }

    if (!commonjsGlobal[gracefulQueue]) {
      publishQueue(commonjsGlobal, fs$k[gracefulQueue]);
    }

    var gracefulFs = patch(clone(fs$k));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs$k.__patched) {
        gracefulFs = patch(fs$k);
        fs$k.__patched = true;
    }

    function patch (fs) {
      // Everything that references the open() function needs to be in here
      polyfills(fs);
      fs.gracefulify = patch;

      fs.createReadStream = createReadStream;
      fs.createWriteStream = createWriteStream;
      var fs$readFile = fs.readFile;
      fs.readFile = readFile;
      function readFile (path, options, cb) {
        if (typeof options === 'function')
          cb = options, options = null;

        return go$readFile(path, options, cb)

        function go$readFile (path, options, cb, startTime) {
          return fs$readFile(path, options, function (err) {
            if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
              enqueue([go$readFile, [path, options, cb], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb === 'function')
                cb.apply(this, arguments);
            }
          })
        }
      }

      var fs$writeFile = fs.writeFile;
      fs.writeFile = writeFile;
      function writeFile (path, data, options, cb) {
        if (typeof options === 'function')
          cb = options, options = null;

        return go$writeFile(path, data, options, cb)

        function go$writeFile (path, data, options, cb, startTime) {
          return fs$writeFile(path, data, options, function (err) {
            if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
              enqueue([go$writeFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb === 'function')
                cb.apply(this, arguments);
            }
          })
        }
      }

      var fs$appendFile = fs.appendFile;
      if (fs$appendFile)
        fs.appendFile = appendFile;
      function appendFile (path, data, options, cb) {
        if (typeof options === 'function')
          cb = options, options = null;

        return go$appendFile(path, data, options, cb)

        function go$appendFile (path, data, options, cb, startTime) {
          return fs$appendFile(path, data, options, function (err) {
            if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
              enqueue([go$appendFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb === 'function')
                cb.apply(this, arguments);
            }
          })
        }
      }

      var fs$copyFile = fs.copyFile;
      if (fs$copyFile)
        fs.copyFile = copyFile;
      function copyFile (src, dest, flags, cb) {
        if (typeof flags === 'function') {
          cb = flags;
          flags = 0;
        }
        return go$copyFile(src, dest, flags, cb)

        function go$copyFile (src, dest, flags, cb, startTime) {
          return fs$copyFile(src, dest, flags, function (err) {
            if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
              enqueue([go$copyFile, [src, dest, flags, cb], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb === 'function')
                cb.apply(this, arguments);
            }
          })
        }
      }

      var fs$readdir = fs.readdir;
      fs.readdir = readdir;
      function readdir (path, options, cb) {
        if (typeof options === 'function')
          cb = options, options = null;

        return go$readdir(path, options, cb)

        function go$readdir (path, options, cb, startTime) {
          return fs$readdir(path, options, function (err, files) {
            if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
              enqueue([go$readdir, [path, options, cb], err, startTime || Date.now(), Date.now()]);
            else {
              if (files && files.sort)
                files.sort();

              if (typeof cb === 'function')
                cb.call(this, err, files);
            }
          })
        }
      }

      if (process.version.substr(0, 4) === 'v0.8') {
        var legStreams = legacy(fs);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }

      var fs$ReadStream = fs.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }

      var fs$WriteStream = fs.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }

      Object.defineProperty(fs, 'ReadStream', {
        get: function () {
          return ReadStream
        },
        set: function (val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs, 'WriteStream', {
        get: function () {
          return WriteStream
        },
        set: function (val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });

      // legacy names
      var FileReadStream = ReadStream;
      Object.defineProperty(fs, 'FileReadStream', {
        get: function () {
          return FileReadStream
        },
        set: function (val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs, 'FileWriteStream', {
        get: function () {
          return FileWriteStream
        },
        set: function (val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });

      function ReadStream (path, options) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
      }

      function ReadStream$open () {
        var that = this;
        open(that.path, that.flags, that.mode, function (err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();

            that.emit('error', err);
          } else {
            that.fd = fd;
            that.emit('open', fd);
            that.read();
          }
        });
      }

      function WriteStream (path, options) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
      }

      function WriteStream$open () {
        var that = this;
        open(that.path, that.flags, that.mode, function (err, fd) {
          if (err) {
            that.destroy();
            that.emit('error', err);
          } else {
            that.fd = fd;
            that.emit('open', fd);
          }
        });
      }

      function createReadStream (path, options) {
        return new fs.ReadStream(path, options)
      }

      function createWriteStream (path, options) {
        return new fs.WriteStream(path, options)
      }

      var fs$open = fs.open;
      fs.open = open;
      function open (path, flags, mode, cb) {
        if (typeof mode === 'function')
          cb = mode, mode = null;

        return go$open(path, flags, mode, cb)

        function go$open (path, flags, mode, cb, startTime) {
          return fs$open(path, flags, mode, function (err, fd) {
            if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
              enqueue([go$open, [path, flags, mode, cb], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb === 'function')
                cb.apply(this, arguments);
            }
          })
        }
      }

      return fs
    }

    function enqueue (elem) {
      debug('ENQUEUE', elem[0].name, elem[1]);
      fs$k[gracefulQueue].push(elem);
      retry();
    }

    // keep track of the timeout between retry() calls
    var retryTimer;

    // reset the startTime and lastTime to now
    // this resets the start of the 60 second overall timeout as well as the
    // delay between attempts so that we'll retry these jobs sooner
    function resetQueue () {
      var now = Date.now();
      for (var i = 0; i < fs$k[gracefulQueue].length; ++i) {
        // entries that are only a length of 2 are from an older version, don't
        // bother modifying those since they'll be retried anyway.
        if (fs$k[gracefulQueue][i].length > 2) {
          fs$k[gracefulQueue][i][3] = now; // startTime
          fs$k[gracefulQueue][i][4] = now; // lastTime
        }
      }
      // call retry to make sure we're actively processing the queue
      retry();
    }

    function retry () {
      // clear the timer and remove it to help prevent unintended concurrency
      clearTimeout(retryTimer);
      retryTimer = undefined;

      if (fs$k[gracefulQueue].length === 0)
        return

      var elem = fs$k[gracefulQueue].shift();
      var fn = elem[0];
      var args = elem[1];
      // these items may be unset if they were added by an older graceful-fs
      var err = elem[2];
      var startTime = elem[3];
      var lastTime = elem[4];

      // if we don't have a startTime we have no way of knowing if we've waited
      // long enough, so go ahead and retry this item now
      if (startTime === undefined) {
        debug('RETRY', fn.name, args);
        fn.apply(null, args);
      } else if (Date.now() - startTime >= 60000) {
        // it's been more than 60 seconds total, bail now
        debug('TIMEOUT', fn.name, args);
        var cb = args.pop();
        if (typeof cb === 'function')
          cb.call(null, err);
      } else {
        // the amount of time between the last attempt and right now
        var sinceAttempt = Date.now() - lastTime;
        // the amount of time between when we first tried, and when we last tried
        // rounded up to at least 1
        var sinceStart = Math.max(lastTime - startTime, 1);
        // backoff. wait longer than the total time we've been retrying, but only
        // up to a maximum of 100ms
        var desiredDelay = Math.min(sinceStart * 1.2, 100);
        // it's been long enough since the last retry, do it again
        if (sinceAttempt >= desiredDelay) {
          debug('RETRY', fn.name, args);
          fn.apply(null, args.concat([startTime]));
        } else {
          // if we can't do this job yet, push it to the end of the queue
          // and let the next iteration check again
          fs$k[gracefulQueue].push(elem);
        }
      }

      // schedule our next run if one isn't already scheduled
      if (retryTimer === undefined) {
        retryTimer = setTimeout(retry, 0);
      }
    }

    (function (exports) {
    // This is adapted from https://github.com/normalize/mz
    // Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
    const u = universalify$1.fromCallback;
    const fs = gracefulFs;

    const api = [
      'access',
      'appendFile',
      'chmod',
      'chown',
      'close',
      'copyFile',
      'fchmod',
      'fchown',
      'fdatasync',
      'fstat',
      'fsync',
      'ftruncate',
      'futimes',
      'lchmod',
      'lchown',
      'link',
      'lstat',
      'mkdir',
      'mkdtemp',
      'open',
      'opendir',
      'readdir',
      'readFile',
      'readlink',
      'realpath',
      'rename',
      'rm',
      'rmdir',
      'stat',
      'symlink',
      'truncate',
      'unlink',
      'utimes',
      'writeFile'
    ].filter(key => {
      // Some commands are not available on some systems. Ex:
      // fs.opendir was added in Node.js v12.12.0
      // fs.rm was added in Node.js v14.14.0
      // fs.lchown is not available on at least some Linux
      return typeof fs[key] === 'function'
    });

    // Export cloned fs:
    Object.assign(exports, fs);

    // Universalify async methods:
    api.forEach(method => {
      exports[method] = u(fs[method]);
    });
    exports.realpath.native = u(fs.realpath.native);

    // We differ from mz/fs in that we still ship the old, broken, fs.exists()
    // since we are a drop-in replacement for the native module
    exports.exists = function (filename, callback) {
      if (typeof callback === 'function') {
        return fs.exists(filename, callback)
      }
      return new Promise(resolve => {
        return fs.exists(filename, resolve)
      })
    };

    // fs.read(), fs.write(), & fs.writev() need special treatment due to multiple callback args

    exports.read = function (fd, buffer, offset, length, position, callback) {
      if (typeof callback === 'function') {
        return fs.read(fd, buffer, offset, length, position, callback)
      }
      return new Promise((resolve, reject) => {
        fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
          if (err) return reject(err)
          resolve({ bytesRead, buffer });
        });
      })
    };

    // Function signature can be
    // fs.write(fd, buffer[, offset[, length[, position]]], callback)
    // OR
    // fs.write(fd, string[, position[, encoding]], callback)
    // We need to handle both cases, so we use ...args
    exports.write = function (fd, buffer, ...args) {
      if (typeof args[args.length - 1] === 'function') {
        return fs.write(fd, buffer, ...args)
      }

      return new Promise((resolve, reject) => {
        fs.write(fd, buffer, ...args, (err, bytesWritten, buffer) => {
          if (err) return reject(err)
          resolve({ bytesWritten, buffer });
        });
      })
    };

    // fs.writev only available in Node v12.9.0+
    if (typeof fs.writev === 'function') {
      // Function signature is
      // s.writev(fd, buffers[, position], callback)
      // We need to handle the optional arg, so we use ...args
      exports.writev = function (fd, buffers, ...args) {
        if (typeof args[args.length - 1] === 'function') {
          return fs.writev(fd, buffers, ...args)
        }

        return new Promise((resolve, reject) => {
          fs.writev(fd, buffers, ...args, (err, bytesWritten, buffers) => {
            if (err) return reject(err)
            resolve({ bytesWritten, buffers });
          });
        })
      };
    }
    }(fs$l));

    var makeDir$1 = {};

    var utils$1 = {};

    const path$e = require$$1__default$1["default"];

    // https://github.com/nodejs/node/issues/8987
    // https://github.com/libuv/libuv/pull/1088
    utils$1.checkPath = function checkPath (pth) {
      if (process.platform === 'win32') {
        const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path$e.parse(pth).root, ''));

        if (pathHasInvalidWinCharacters) {
          const error = new Error(`Path contains invalid characters: ${pth}`);
          error.code = 'EINVAL';
          throw error
        }
      }
    };

    const fs$j = fs$l;
    const { checkPath } = utils$1;

    const getMode = options => {
      const defaults = { mode: 0o777 };
      if (typeof options === 'number') return options
      return ({ ...defaults, ...options }).mode
    };

    makeDir$1.makeDir = async (dir, options) => {
      checkPath(dir);

      return fs$j.mkdir(dir, {
        mode: getMode(options),
        recursive: true
      })
    };

    makeDir$1.makeDirSync = (dir, options) => {
      checkPath(dir);

      return fs$j.mkdirSync(dir, {
        mode: getMode(options),
        recursive: true
      })
    };

    const u$a = universalify$1.fromPromise;
    const { makeDir: _makeDir, makeDirSync } = makeDir$1;
    const makeDir = u$a(_makeDir);

    var mkdirs$2 = {
      mkdirs: makeDir,
      mkdirsSync: makeDirSync,
      // alias
      mkdirp: makeDir,
      mkdirpSync: makeDirSync,
      ensureDir: makeDir,
      ensureDirSync: makeDirSync
    };

    const fs$i = gracefulFs;

    function utimesMillis$1 (path, atime, mtime, callback) {
      // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
      fs$i.open(path, 'r+', (err, fd) => {
        if (err) return callback(err)
        fs$i.futimes(fd, atime, mtime, futimesErr => {
          fs$i.close(fd, closeErr => {
            if (callback) callback(futimesErr || closeErr);
          });
        });
      });
    }

    function utimesMillisSync$1 (path, atime, mtime) {
      const fd = fs$i.openSync(path, 'r+');
      fs$i.futimesSync(fd, atime, mtime);
      return fs$i.closeSync(fd)
    }

    var utimes = {
      utimesMillis: utimesMillis$1,
      utimesMillisSync: utimesMillisSync$1
    };

    const fs$h = fs$l;
    const path$d = require$$1__default$1["default"];
    const util = require$$0__default$1["default"];

    function getStats$2 (src, dest, opts) {
      const statFunc = opts.dereference
        ? (file) => fs$h.stat(file, { bigint: true })
        : (file) => fs$h.lstat(file, { bigint: true });
      return Promise.all([
        statFunc(src),
        statFunc(dest).catch(err => {
          if (err.code === 'ENOENT') return null
          throw err
        })
      ]).then(([srcStat, destStat]) => ({ srcStat, destStat }))
    }

    function getStatsSync (src, dest, opts) {
      let destStat;
      const statFunc = opts.dereference
        ? (file) => fs$h.statSync(file, { bigint: true })
        : (file) => fs$h.lstatSync(file, { bigint: true });
      const srcStat = statFunc(src);
      try {
        destStat = statFunc(dest);
      } catch (err) {
        if (err.code === 'ENOENT') return { srcStat, destStat: null }
        throw err
      }
      return { srcStat, destStat }
    }

    function checkPaths (src, dest, funcName, opts, cb) {
      util.callbackify(getStats$2)(src, dest, opts, (err, stats) => {
        if (err) return cb(err)
        const { srcStat, destStat } = stats;

        if (destStat) {
          if (areIdentical$2(srcStat, destStat)) {
            const srcBaseName = path$d.basename(src);
            const destBaseName = path$d.basename(dest);
            if (funcName === 'move' &&
              srcBaseName !== destBaseName &&
              srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
              return cb(null, { srcStat, destStat, isChangingCase: true })
            }
            return cb(new Error('Source and destination must not be the same.'))
          }
          if (srcStat.isDirectory() && !destStat.isDirectory()) {
            return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`))
          }
          if (!srcStat.isDirectory() && destStat.isDirectory()) {
            return cb(new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`))
          }
        }

        if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
          return cb(new Error(errMsg(src, dest, funcName)))
        }
        return cb(null, { srcStat, destStat })
      });
    }

    function checkPathsSync (src, dest, funcName, opts) {
      const { srcStat, destStat } = getStatsSync(src, dest, opts);

      if (destStat) {
        if (areIdentical$2(srcStat, destStat)) {
          const srcBaseName = path$d.basename(src);
          const destBaseName = path$d.basename(dest);
          if (funcName === 'move' &&
            srcBaseName !== destBaseName &&
            srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
            return { srcStat, destStat, isChangingCase: true }
          }
          throw new Error('Source and destination must not be the same.')
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`)
        }
      }

      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName))
      }
      return { srcStat, destStat }
    }

    // recursively check if dest parent is a subdirectory of src.
    // It works for all file types including symlinks since it
    // checks the src and dest inodes. It starts from the deepest
    // parent and stops once it reaches the src parent or the root path.
    function checkParentPaths (src, srcStat, dest, funcName, cb) {
      const srcParent = path$d.resolve(path$d.dirname(src));
      const destParent = path$d.resolve(path$d.dirname(dest));
      if (destParent === srcParent || destParent === path$d.parse(destParent).root) return cb()
      fs$h.stat(destParent, { bigint: true }, (err, destStat) => {
        if (err) {
          if (err.code === 'ENOENT') return cb()
          return cb(err)
        }
        if (areIdentical$2(srcStat, destStat)) {
          return cb(new Error(errMsg(src, dest, funcName)))
        }
        return checkParentPaths(src, srcStat, destParent, funcName, cb)
      });
    }

    function checkParentPathsSync (src, srcStat, dest, funcName) {
      const srcParent = path$d.resolve(path$d.dirname(src));
      const destParent = path$d.resolve(path$d.dirname(dest));
      if (destParent === srcParent || destParent === path$d.parse(destParent).root) return
      let destStat;
      try {
        destStat = fs$h.statSync(destParent, { bigint: true });
      } catch (err) {
        if (err.code === 'ENOENT') return
        throw err
      }
      if (areIdentical$2(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName))
      }
      return checkParentPathsSync(src, srcStat, destParent, funcName)
    }

    function areIdentical$2 (srcStat, destStat) {
      return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev
    }

    // return true if dest is a subdir of src, otherwise false.
    // It only checks the path strings.
    function isSrcSubdir (src, dest) {
      const srcArr = path$d.resolve(src).split(path$d.sep).filter(i => i);
      const destArr = path$d.resolve(dest).split(path$d.sep).filter(i => i);
      return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true)
    }

    function errMsg (src, dest, funcName) {
      return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`
    }

    var stat$4 = {
      checkPaths,
      checkPathsSync,
      checkParentPaths,
      checkParentPathsSync,
      isSrcSubdir,
      areIdentical: areIdentical$2
    };

    const fs$g = gracefulFs;
    const path$c = require$$1__default$1["default"];
    const mkdirsSync$1 = mkdirs$2.mkdirsSync;
    const utimesMillisSync = utimes.utimesMillisSync;
    const stat$3 = stat$4;

    function copySync$2 (src, dest, opts) {
      if (typeof opts === 'function') {
        opts = { filter: opts };
      }

      opts = opts || {};
      opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
      opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

      // Warn about using preserveTimestamps on 32-bit node
      if (opts.preserveTimestamps && process.arch === 'ia32') {
        console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`);
      }

      const { srcStat, destStat } = stat$3.checkPathsSync(src, dest, 'copy', opts);
      stat$3.checkParentPathsSync(src, srcStat, dest, 'copy');
      return handleFilterAndCopy(destStat, src, dest, opts)
    }

    function handleFilterAndCopy (destStat, src, dest, opts) {
      if (opts.filter && !opts.filter(src, dest)) return
      const destParent = path$c.dirname(dest);
      if (!fs$g.existsSync(destParent)) mkdirsSync$1(destParent);
      return getStats$1(destStat, src, dest, opts)
    }

    function startCopy$1 (destStat, src, dest, opts) {
      if (opts.filter && !opts.filter(src, dest)) return
      return getStats$1(destStat, src, dest, opts)
    }

    function getStats$1 (destStat, src, dest, opts) {
      const statSync = opts.dereference ? fs$g.statSync : fs$g.lstatSync;
      const srcStat = statSync(src);

      if (srcStat.isDirectory()) return onDir$1(srcStat, destStat, src, dest, opts)
      else if (srcStat.isFile() ||
               srcStat.isCharacterDevice() ||
               srcStat.isBlockDevice()) return onFile$1(srcStat, destStat, src, dest, opts)
      else if (srcStat.isSymbolicLink()) return onLink$1(destStat, src, dest, opts)
      else if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`)
      else if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`)
      throw new Error(`Unknown file: ${src}`)
    }

    function onFile$1 (srcStat, destStat, src, dest, opts) {
      if (!destStat) return copyFile$1(srcStat, src, dest, opts)
      return mayCopyFile$1(srcStat, src, dest, opts)
    }

    function mayCopyFile$1 (srcStat, src, dest, opts) {
      if (opts.overwrite) {
        fs$g.unlinkSync(dest);
        return copyFile$1(srcStat, src, dest, opts)
      } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`)
      }
    }

    function copyFile$1 (srcStat, src, dest, opts) {
      fs$g.copyFileSync(src, dest);
      if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
      return setDestMode$1(dest, srcStat.mode)
    }

    function handleTimestamps (srcMode, src, dest) {
      // Make sure the file is writable before setting the timestamp
      // otherwise open fails with EPERM when invoked with 'r+'
      // (through utimes call)
      if (fileIsNotWritable$1(srcMode)) makeFileWritable$1(dest, srcMode);
      return setDestTimestamps$1(src, dest)
    }

    function fileIsNotWritable$1 (srcMode) {
      return (srcMode & 0o200) === 0
    }

    function makeFileWritable$1 (dest, srcMode) {
      return setDestMode$1(dest, srcMode | 0o200)
    }

    function setDestMode$1 (dest, srcMode) {
      return fs$g.chmodSync(dest, srcMode)
    }

    function setDestTimestamps$1 (src, dest) {
      // The initial srcStat.atime cannot be trusted
      // because it is modified by the read(2) system call
      // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
      const updatedSrcStat = fs$g.statSync(src);
      return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime)
    }

    function onDir$1 (srcStat, destStat, src, dest, opts) {
      if (!destStat) return mkDirAndCopy$1(srcStat.mode, src, dest, opts)
      return copyDir$1(src, dest, opts)
    }

    function mkDirAndCopy$1 (srcMode, src, dest, opts) {
      fs$g.mkdirSync(dest);
      copyDir$1(src, dest, opts);
      return setDestMode$1(dest, srcMode)
    }

    function copyDir$1 (src, dest, opts) {
      fs$g.readdirSync(src).forEach(item => copyDirItem$1(item, src, dest, opts));
    }

    function copyDirItem$1 (item, src, dest, opts) {
      const srcItem = path$c.join(src, item);
      const destItem = path$c.join(dest, item);
      const { destStat } = stat$3.checkPathsSync(srcItem, destItem, 'copy', opts);
      return startCopy$1(destStat, srcItem, destItem, opts)
    }

    function onLink$1 (destStat, src, dest, opts) {
      let resolvedSrc = fs$g.readlinkSync(src);
      if (opts.dereference) {
        resolvedSrc = path$c.resolve(process.cwd(), resolvedSrc);
      }

      if (!destStat) {
        return fs$g.symlinkSync(resolvedSrc, dest)
      } else {
        let resolvedDest;
        try {
          resolvedDest = fs$g.readlinkSync(dest);
        } catch (err) {
          // dest exists and is a regular file or directory,
          // Windows may throw UNKNOWN error. If dest already exists,
          // fs throws error anyway, so no need to guard against it here.
          if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs$g.symlinkSync(resolvedSrc, dest)
          throw err
        }
        if (opts.dereference) {
          resolvedDest = path$c.resolve(process.cwd(), resolvedDest);
        }
        if (stat$3.isSrcSubdir(resolvedSrc, resolvedDest)) {
          throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`)
        }

        // prevent copy if src is a subdir of dest since unlinking
        // dest in this case would result in removing src contents
        // and therefore a broken symlink would be created.
        if (fs$g.statSync(dest).isDirectory() && stat$3.isSrcSubdir(resolvedDest, resolvedSrc)) {
          throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`)
        }
        return copyLink$1(resolvedSrc, dest)
      }
    }

    function copyLink$1 (resolvedSrc, dest) {
      fs$g.unlinkSync(dest);
      return fs$g.symlinkSync(resolvedSrc, dest)
    }

    var copySync_1 = copySync$2;

    var copySync$1 = {
      copySync: copySync_1
    };

    const u$9 = universalify$1.fromPromise;
    const fs$f = fs$l;

    function pathExists$8 (path) {
      return fs$f.access(path).then(() => true).catch(() => false)
    }

    var pathExists_1 = {
      pathExists: u$9(pathExists$8),
      pathExistsSync: fs$f.existsSync
    };

    const fs$e = gracefulFs;
    const path$b = require$$1__default$1["default"];
    const mkdirs$1 = mkdirs$2.mkdirs;
    const pathExists$7 = pathExists_1.pathExists;
    const utimesMillis = utimes.utimesMillis;
    const stat$2 = stat$4;

    function copy$2 (src, dest, opts, cb) {
      if (typeof opts === 'function' && !cb) {
        cb = opts;
        opts = {};
      } else if (typeof opts === 'function') {
        opts = { filter: opts };
      }

      cb = cb || function () {};
      opts = opts || {};

      opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
      opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

      // Warn about using preserveTimestamps on 32-bit node
      if (opts.preserveTimestamps && process.arch === 'ia32') {
        console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`);
      }

      stat$2.checkPaths(src, dest, 'copy', opts, (err, stats) => {
        if (err) return cb(err)
        const { srcStat, destStat } = stats;
        stat$2.checkParentPaths(src, srcStat, dest, 'copy', err => {
          if (err) return cb(err)
          if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb)
          return checkParentDir(destStat, src, dest, opts, cb)
        });
      });
    }

    function checkParentDir (destStat, src, dest, opts, cb) {
      const destParent = path$b.dirname(dest);
      pathExists$7(destParent, (err, dirExists) => {
        if (err) return cb(err)
        if (dirExists) return getStats(destStat, src, dest, opts, cb)
        mkdirs$1(destParent, err => {
          if (err) return cb(err)
          return getStats(destStat, src, dest, opts, cb)
        });
      });
    }

    function handleFilter (onInclude, destStat, src, dest, opts, cb) {
      Promise.resolve(opts.filter(src, dest)).then(include => {
        if (include) return onInclude(destStat, src, dest, opts, cb)
        return cb()
      }, error => cb(error));
    }

    function startCopy (destStat, src, dest, opts, cb) {
      if (opts.filter) return handleFilter(getStats, destStat, src, dest, opts, cb)
      return getStats(destStat, src, dest, opts, cb)
    }

    function getStats (destStat, src, dest, opts, cb) {
      const stat = opts.dereference ? fs$e.stat : fs$e.lstat;
      stat(src, (err, srcStat) => {
        if (err) return cb(err)

        if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts, cb)
        else if (srcStat.isFile() ||
                 srcStat.isCharacterDevice() ||
                 srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts, cb)
        else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts, cb)
        else if (srcStat.isSocket()) return cb(new Error(`Cannot copy a socket file: ${src}`))
        else if (srcStat.isFIFO()) return cb(new Error(`Cannot copy a FIFO pipe: ${src}`))
        return cb(new Error(`Unknown file: ${src}`))
      });
    }

    function onFile (srcStat, destStat, src, dest, opts, cb) {
      if (!destStat) return copyFile(srcStat, src, dest, opts, cb)
      return mayCopyFile(srcStat, src, dest, opts, cb)
    }

    function mayCopyFile (srcStat, src, dest, opts, cb) {
      if (opts.overwrite) {
        fs$e.unlink(dest, err => {
          if (err) return cb(err)
          return copyFile(srcStat, src, dest, opts, cb)
        });
      } else if (opts.errorOnExist) {
        return cb(new Error(`'${dest}' already exists`))
      } else return cb()
    }

    function copyFile (srcStat, src, dest, opts, cb) {
      fs$e.copyFile(src, dest, err => {
        if (err) return cb(err)
        if (opts.preserveTimestamps) return handleTimestampsAndMode(srcStat.mode, src, dest, cb)
        return setDestMode(dest, srcStat.mode, cb)
      });
    }

    function handleTimestampsAndMode (srcMode, src, dest, cb) {
      // Make sure the file is writable before setting the timestamp
      // otherwise open fails with EPERM when invoked with 'r+'
      // (through utimes call)
      if (fileIsNotWritable(srcMode)) {
        return makeFileWritable(dest, srcMode, err => {
          if (err) return cb(err)
          return setDestTimestampsAndMode(srcMode, src, dest, cb)
        })
      }
      return setDestTimestampsAndMode(srcMode, src, dest, cb)
    }

    function fileIsNotWritable (srcMode) {
      return (srcMode & 0o200) === 0
    }

    function makeFileWritable (dest, srcMode, cb) {
      return setDestMode(dest, srcMode | 0o200, cb)
    }

    function setDestTimestampsAndMode (srcMode, src, dest, cb) {
      setDestTimestamps(src, dest, err => {
        if (err) return cb(err)
        return setDestMode(dest, srcMode, cb)
      });
    }

    function setDestMode (dest, srcMode, cb) {
      return fs$e.chmod(dest, srcMode, cb)
    }

    function setDestTimestamps (src, dest, cb) {
      // The initial srcStat.atime cannot be trusted
      // because it is modified by the read(2) system call
      // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
      fs$e.stat(src, (err, updatedSrcStat) => {
        if (err) return cb(err)
        return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb)
      });
    }

    function onDir (srcStat, destStat, src, dest, opts, cb) {
      if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts, cb)
      return copyDir(src, dest, opts, cb)
    }

    function mkDirAndCopy (srcMode, src, dest, opts, cb) {
      fs$e.mkdir(dest, err => {
        if (err) return cb(err)
        copyDir(src, dest, opts, err => {
          if (err) return cb(err)
          return setDestMode(dest, srcMode, cb)
        });
      });
    }

    function copyDir (src, dest, opts, cb) {
      fs$e.readdir(src, (err, items) => {
        if (err) return cb(err)
        return copyDirItems(items, src, dest, opts, cb)
      });
    }

    function copyDirItems (items, src, dest, opts, cb) {
      const item = items.pop();
      if (!item) return cb()
      return copyDirItem(items, item, src, dest, opts, cb)
    }

    function copyDirItem (items, item, src, dest, opts, cb) {
      const srcItem = path$b.join(src, item);
      const destItem = path$b.join(dest, item);
      stat$2.checkPaths(srcItem, destItem, 'copy', opts, (err, stats) => {
        if (err) return cb(err)
        const { destStat } = stats;
        startCopy(destStat, srcItem, destItem, opts, err => {
          if (err) return cb(err)
          return copyDirItems(items, src, dest, opts, cb)
        });
      });
    }

    function onLink (destStat, src, dest, opts, cb) {
      fs$e.readlink(src, (err, resolvedSrc) => {
        if (err) return cb(err)
        if (opts.dereference) {
          resolvedSrc = path$b.resolve(process.cwd(), resolvedSrc);
        }

        if (!destStat) {
          return fs$e.symlink(resolvedSrc, dest, cb)
        } else {
          fs$e.readlink(dest, (err, resolvedDest) => {
            if (err) {
              // dest exists and is a regular file or directory,
              // Windows may throw UNKNOWN error. If dest already exists,
              // fs throws error anyway, so no need to guard against it here.
              if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs$e.symlink(resolvedSrc, dest, cb)
              return cb(err)
            }
            if (opts.dereference) {
              resolvedDest = path$b.resolve(process.cwd(), resolvedDest);
            }
            if (stat$2.isSrcSubdir(resolvedSrc, resolvedDest)) {
              return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`))
            }

            // do not copy if src is a subdir of dest since unlinking
            // dest in this case would result in removing src contents
            // and therefore a broken symlink would be created.
            if (destStat.isDirectory() && stat$2.isSrcSubdir(resolvedDest, resolvedSrc)) {
              return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`))
            }
            return copyLink(resolvedSrc, dest, cb)
          });
        }
      });
    }

    function copyLink (resolvedSrc, dest, cb) {
      fs$e.unlink(dest, err => {
        if (err) return cb(err)
        return fs$e.symlink(resolvedSrc, dest, cb)
      });
    }

    var copy_1 = copy$2;

    const u$8 = universalify$1.fromCallback;
    var copy$1 = {
      copy: u$8(copy_1)
    };

    const fs$d = gracefulFs;
    const path$a = require$$1__default$1["default"];
    const assert = require$$0__default$5["default"];

    const isWindows = (process.platform === 'win32');

    function defaults (options) {
      const methods = [
        'unlink',
        'chmod',
        'stat',
        'lstat',
        'rmdir',
        'readdir'
      ];
      methods.forEach(m => {
        options[m] = options[m] || fs$d[m];
        m = m + 'Sync';
        options[m] = options[m] || fs$d[m];
      });

      options.maxBusyTries = options.maxBusyTries || 3;
    }

    function rimraf$1 (p, options, cb) {
      let busyTries = 0;

      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      assert(p, 'rimraf: missing path');
      assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string');
      assert.strictEqual(typeof cb, 'function', 'rimraf: callback function required');
      assert(options, 'rimraf: invalid options argument provided');
      assert.strictEqual(typeof options, 'object', 'rimraf: options should be object');

      defaults(options);

      rimraf_(p, options, function CB (er) {
        if (er) {
          if ((er.code === 'EBUSY' || er.code === 'ENOTEMPTY' || er.code === 'EPERM') &&
              busyTries < options.maxBusyTries) {
            busyTries++;
            const time = busyTries * 100;
            // try again, with the same exact callback as this one.
            return setTimeout(() => rimraf_(p, options, CB), time)
          }

          // already gone
          if (er.code === 'ENOENT') er = null;
        }

        cb(er);
      });
    }

    // Two possible strategies.
    // 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
    // 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
    //
    // Both result in an extra syscall when you guess wrong.  However, there
    // are likely far more normal files in the world than directories.  This
    // is based on the assumption that a the average number of files per
    // directory is >= 1.
    //
    // If anyone ever complains about this, then I guess the strategy could
    // be made configurable somehow.  But until then, YAGNI.
    function rimraf_ (p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === 'function');

      // sunos lets the root user unlink directories, which is... weird.
      // so we have to lstat here and make sure it's not a dir.
      options.lstat(p, (er, st) => {
        if (er && er.code === 'ENOENT') {
          return cb(null)
        }

        // Windows can EPERM on stat.  Life is suffering.
        if (er && er.code === 'EPERM' && isWindows) {
          return fixWinEPERM(p, options, er, cb)
        }

        if (st && st.isDirectory()) {
          return rmdir(p, options, er, cb)
        }

        options.unlink(p, er => {
          if (er) {
            if (er.code === 'ENOENT') {
              return cb(null)
            }
            if (er.code === 'EPERM') {
              return (isWindows)
                ? fixWinEPERM(p, options, er, cb)
                : rmdir(p, options, er, cb)
            }
            if (er.code === 'EISDIR') {
              return rmdir(p, options, er, cb)
            }
          }
          return cb(er)
        });
      });
    }

    function fixWinEPERM (p, options, er, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === 'function');

      options.chmod(p, 0o666, er2 => {
        if (er2) {
          cb(er2.code === 'ENOENT' ? null : er);
        } else {
          options.stat(p, (er3, stats) => {
            if (er3) {
              cb(er3.code === 'ENOENT' ? null : er);
            } else if (stats.isDirectory()) {
              rmdir(p, options, er, cb);
            } else {
              options.unlink(p, cb);
            }
          });
        }
      });
    }

    function fixWinEPERMSync (p, options, er) {
      let stats;

      assert(p);
      assert(options);

      try {
        options.chmodSync(p, 0o666);
      } catch (er2) {
        if (er2.code === 'ENOENT') {
          return
        } else {
          throw er
        }
      }

      try {
        stats = options.statSync(p);
      } catch (er3) {
        if (er3.code === 'ENOENT') {
          return
        } else {
          throw er
        }
      }

      if (stats.isDirectory()) {
        rmdirSync(p, options, er);
      } else {
        options.unlinkSync(p);
      }
    }

    function rmdir (p, options, originalEr, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === 'function');

      // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
      // if we guessed wrong, and it's not a directory, then
      // raise the original error.
      options.rmdir(p, er => {
        if (er && (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM')) {
          rmkids(p, options, cb);
        } else if (er && er.code === 'ENOTDIR') {
          cb(originalEr);
        } else {
          cb(er);
        }
      });
    }

    function rmkids (p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === 'function');

      options.readdir(p, (er, files) => {
        if (er) return cb(er)

        let n = files.length;
        let errState;

        if (n === 0) return options.rmdir(p, cb)

        files.forEach(f => {
          rimraf$1(path$a.join(p, f), options, er => {
            if (errState) {
              return
            }
            if (er) return cb(errState = er)
            if (--n === 0) {
              options.rmdir(p, cb);
            }
          });
        });
      });
    }

    // this looks simpler, and is strictly *faster*, but will
    // tie up the JavaScript thread and fail on excessively
    // deep directory trees.
    function rimrafSync (p, options) {
      let st;

      options = options || {};
      defaults(options);

      assert(p, 'rimraf: missing path');
      assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string');
      assert(options, 'rimraf: missing options');
      assert.strictEqual(typeof options, 'object', 'rimraf: options should be object');

      try {
        st = options.lstatSync(p);
      } catch (er) {
        if (er.code === 'ENOENT') {
          return
        }

        // Windows can EPERM on stat.  Life is suffering.
        if (er.code === 'EPERM' && isWindows) {
          fixWinEPERMSync(p, options, er);
        }
      }

      try {
        // sunos lets the root user unlink directories, which is... weird.
        if (st && st.isDirectory()) {
          rmdirSync(p, options, null);
        } else {
          options.unlinkSync(p);
        }
      } catch (er) {
        if (er.code === 'ENOENT') {
          return
        } else if (er.code === 'EPERM') {
          return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
        } else if (er.code !== 'EISDIR') {
          throw er
        }
        rmdirSync(p, options, er);
      }
    }

    function rmdirSync (p, options, originalEr) {
      assert(p);
      assert(options);

      try {
        options.rmdirSync(p);
      } catch (er) {
        if (er.code === 'ENOTDIR') {
          throw originalEr
        } else if (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM') {
          rmkidsSync(p, options);
        } else if (er.code !== 'ENOENT') {
          throw er
        }
      }
    }

    function rmkidsSync (p, options) {
      assert(p);
      assert(options);
      options.readdirSync(p).forEach(f => rimrafSync(path$a.join(p, f), options));

      if (isWindows) {
        // We only end up here once we got ENOTEMPTY at least once, and
        // at this point, we are guaranteed to have removed all the kids.
        // So, we know that it won't be ENOENT or ENOTDIR or anything else.
        // try really hard to delete stuff on windows, because it has a
        // PROFOUNDLY annoying habit of not closing handles promptly when
        // files are deleted, resulting in spurious ENOTEMPTY errors.
        const startTime = Date.now();
        do {
          try {
            const ret = options.rmdirSync(p, options);
            return ret
          } catch {}
        } while (Date.now() - startTime < 500) // give up after 500ms
      } else {
        const ret = options.rmdirSync(p, options);
        return ret
      }
    }

    var rimraf_1 = rimraf$1;
    rimraf$1.sync = rimrafSync;

    const fs$c = gracefulFs;
    const u$7 = universalify$1.fromCallback;
    const rimraf = rimraf_1;

    function remove$2 (path, callback) {
      // Node 14.14.0+
      if (fs$c.rm) return fs$c.rm(path, { recursive: true, force: true }, callback)
      rimraf(path, callback);
    }

    function removeSync$1 (path) {
      // Node 14.14.0+
      if (fs$c.rmSync) return fs$c.rmSync(path, { recursive: true, force: true })
      rimraf.sync(path);
    }

    var remove_1 = {
      remove: u$7(remove$2),
      removeSync: removeSync$1
    };

    const u$6 = universalify$1.fromPromise;
    const fs$b = fs$l;
    const path$9 = require$$1__default$1["default"];
    const mkdir$3 = mkdirs$2;
    const remove$1 = remove_1;

    const emptyDir = u$6(async function emptyDir (dir) {
      let items;
      try {
        items = await fs$b.readdir(dir);
      } catch {
        return mkdir$3.mkdirs(dir)
      }

      return Promise.all(items.map(item => remove$1.remove(path$9.join(dir, item))))
    });

    function emptyDirSync (dir) {
      let items;
      try {
        items = fs$b.readdirSync(dir);
      } catch {
        return mkdir$3.mkdirsSync(dir)
      }

      items.forEach(item => {
        item = path$9.join(dir, item);
        remove$1.removeSync(item);
      });
    }

    var empty = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };

    const u$5 = universalify$1.fromCallback;
    const path$8 = require$$1__default$1["default"];
    const fs$a = gracefulFs;
    const mkdir$2 = mkdirs$2;

    function createFile (file, callback) {
      function makeFile () {
        fs$a.writeFile(file, '', err => {
          if (err) return callback(err)
          callback();
        });
      }

      fs$a.stat(file, (err, stats) => { // eslint-disable-line handle-callback-err
        if (!err && stats.isFile()) return callback()
        const dir = path$8.dirname(file);
        fs$a.stat(dir, (err, stats) => {
          if (err) {
            // if the directory doesn't exist, make it
            if (err.code === 'ENOENT') {
              return mkdir$2.mkdirs(dir, err => {
                if (err) return callback(err)
                makeFile();
              })
            }
            return callback(err)
          }

          if (stats.isDirectory()) makeFile();
          else {
            // parent is not a directory
            // This is just to cause an internal ENOTDIR error to be thrown
            fs$a.readdir(dir, err => {
              if (err) return callback(err)
            });
          }
        });
      });
    }

    function createFileSync (file) {
      let stats;
      try {
        stats = fs$a.statSync(file);
      } catch {}
      if (stats && stats.isFile()) return

      const dir = path$8.dirname(file);
      try {
        if (!fs$a.statSync(dir).isDirectory()) {
          // parent is not a directory
          // This is just to cause an internal ENOTDIR error to be thrown
          fs$a.readdirSync(dir);
        }
      } catch (err) {
        // If the stat call above failed because the directory doesn't exist, create it
        if (err && err.code === 'ENOENT') mkdir$2.mkdirsSync(dir);
        else throw err
      }

      fs$a.writeFileSync(file, '');
    }

    var file$1 = {
      createFile: u$5(createFile),
      createFileSync
    };

    const u$4 = universalify$1.fromCallback;
    const path$7 = require$$1__default$1["default"];
    const fs$9 = gracefulFs;
    const mkdir$1 = mkdirs$2;
    const pathExists$6 = pathExists_1.pathExists;
    const { areIdentical: areIdentical$1 } = stat$4;

    function createLink (srcpath, dstpath, callback) {
      function makeLink (srcpath, dstpath) {
        fs$9.link(srcpath, dstpath, err => {
          if (err) return callback(err)
          callback(null);
        });
      }

      fs$9.lstat(dstpath, (_, dstStat) => {
        fs$9.lstat(srcpath, (err, srcStat) => {
          if (err) {
            err.message = err.message.replace('lstat', 'ensureLink');
            return callback(err)
          }
          if (dstStat && areIdentical$1(srcStat, dstStat)) return callback(null)

          const dir = path$7.dirname(dstpath);
          pathExists$6(dir, (err, dirExists) => {
            if (err) return callback(err)
            if (dirExists) return makeLink(srcpath, dstpath)
            mkdir$1.mkdirs(dir, err => {
              if (err) return callback(err)
              makeLink(srcpath, dstpath);
            });
          });
        });
      });
    }

    function createLinkSync (srcpath, dstpath) {
      let dstStat;
      try {
        dstStat = fs$9.lstatSync(dstpath);
      } catch {}

      try {
        const srcStat = fs$9.lstatSync(srcpath);
        if (dstStat && areIdentical$1(srcStat, dstStat)) return
      } catch (err) {
        err.message = err.message.replace('lstat', 'ensureLink');
        throw err
      }

      const dir = path$7.dirname(dstpath);
      const dirExists = fs$9.existsSync(dir);
      if (dirExists) return fs$9.linkSync(srcpath, dstpath)
      mkdir$1.mkdirsSync(dir);

      return fs$9.linkSync(srcpath, dstpath)
    }

    var link$1 = {
      createLink: u$4(createLink),
      createLinkSync
    };

    const path$6 = require$$1__default$1["default"];
    const fs$8 = gracefulFs;
    const pathExists$5 = pathExists_1.pathExists;

    /**
     * Function that returns two types of paths, one relative to symlink, and one
     * relative to the current working directory. Checks if path is absolute or
     * relative. If the path is relative, this function checks if the path is
     * relative to symlink or relative to current working directory. This is an
     * initiative to find a smarter `srcpath` to supply when building symlinks.
     * This allows you to determine which path to use out of one of three possible
     * types of source paths. The first is an absolute path. This is detected by
     * `path.isAbsolute()`. When an absolute path is provided, it is checked to
     * see if it exists. If it does it's used, if not an error is returned
     * (callback)/ thrown (sync). The other two options for `srcpath` are a
     * relative url. By default Node's `fs.symlink` works by creating a symlink
     * using `dstpath` and expects the `srcpath` to be relative to the newly
     * created symlink. If you provide a `srcpath` that does not exist on the file
     * system it results in a broken symlink. To minimize this, the function
     * checks to see if the 'relative to symlink' source file exists, and if it
     * does it will use it. If it does not, it checks if there's a file that
     * exists that is relative to the current working directory, if does its used.
     * This preserves the expectations of the original fs.symlink spec and adds
     * the ability to pass in `relative to current working direcotry` paths.
     */

    function symlinkPaths$1 (srcpath, dstpath, callback) {
      if (path$6.isAbsolute(srcpath)) {
        return fs$8.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace('lstat', 'ensureSymlink');
            return callback(err)
          }
          return callback(null, {
            toCwd: srcpath,
            toDst: srcpath
          })
        })
      } else {
        const dstdir = path$6.dirname(dstpath);
        const relativeToDst = path$6.join(dstdir, srcpath);
        return pathExists$5(relativeToDst, (err, exists) => {
          if (err) return callback(err)
          if (exists) {
            return callback(null, {
              toCwd: relativeToDst,
              toDst: srcpath
            })
          } else {
            return fs$8.lstat(srcpath, (err) => {
              if (err) {
                err.message = err.message.replace('lstat', 'ensureSymlink');
                return callback(err)
              }
              return callback(null, {
                toCwd: srcpath,
                toDst: path$6.relative(dstdir, srcpath)
              })
            })
          }
        })
      }
    }

    function symlinkPathsSync$1 (srcpath, dstpath) {
      let exists;
      if (path$6.isAbsolute(srcpath)) {
        exists = fs$8.existsSync(srcpath);
        if (!exists) throw new Error('absolute srcpath does not exist')
        return {
          toCwd: srcpath,
          toDst: srcpath
        }
      } else {
        const dstdir = path$6.dirname(dstpath);
        const relativeToDst = path$6.join(dstdir, srcpath);
        exists = fs$8.existsSync(relativeToDst);
        if (exists) {
          return {
            toCwd: relativeToDst,
            toDst: srcpath
          }
        } else {
          exists = fs$8.existsSync(srcpath);
          if (!exists) throw new Error('relative srcpath does not exist')
          return {
            toCwd: srcpath,
            toDst: path$6.relative(dstdir, srcpath)
          }
        }
      }
    }

    var symlinkPaths_1 = {
      symlinkPaths: symlinkPaths$1,
      symlinkPathsSync: symlinkPathsSync$1
    };

    const fs$7 = gracefulFs;

    function symlinkType$1 (srcpath, type, callback) {
      callback = (typeof type === 'function') ? type : callback;
      type = (typeof type === 'function') ? false : type;
      if (type) return callback(null, type)
      fs$7.lstat(srcpath, (err, stats) => {
        if (err) return callback(null, 'file')
        type = (stats && stats.isDirectory()) ? 'dir' : 'file';
        callback(null, type);
      });
    }

    function symlinkTypeSync$1 (srcpath, type) {
      let stats;

      if (type) return type
      try {
        stats = fs$7.lstatSync(srcpath);
      } catch {
        return 'file'
      }
      return (stats && stats.isDirectory()) ? 'dir' : 'file'
    }

    var symlinkType_1 = {
      symlinkType: symlinkType$1,
      symlinkTypeSync: symlinkTypeSync$1
    };

    const u$3 = universalify$1.fromCallback;
    const path$5 = require$$1__default$1["default"];
    const fs$6 = fs$l;
    const _mkdirs = mkdirs$2;
    const mkdirs = _mkdirs.mkdirs;
    const mkdirsSync = _mkdirs.mkdirsSync;

    const _symlinkPaths = symlinkPaths_1;
    const symlinkPaths = _symlinkPaths.symlinkPaths;
    const symlinkPathsSync = _symlinkPaths.symlinkPathsSync;

    const _symlinkType = symlinkType_1;
    const symlinkType = _symlinkType.symlinkType;
    const symlinkTypeSync = _symlinkType.symlinkTypeSync;

    const pathExists$4 = pathExists_1.pathExists;

    const { areIdentical } = stat$4;

    function createSymlink (srcpath, dstpath, type, callback) {
      callback = (typeof type === 'function') ? type : callback;
      type = (typeof type === 'function') ? false : type;

      fs$6.lstat(dstpath, (err, stats) => {
        if (!err && stats.isSymbolicLink()) {
          Promise.all([
            fs$6.stat(srcpath),
            fs$6.stat(dstpath)
          ]).then(([srcStat, dstStat]) => {
            if (areIdentical(srcStat, dstStat)) return callback(null)
            _createSymlink(srcpath, dstpath, type, callback);
          });
        } else _createSymlink(srcpath, dstpath, type, callback);
      });
    }

    function _createSymlink (srcpath, dstpath, type, callback) {
      symlinkPaths(srcpath, dstpath, (err, relative) => {
        if (err) return callback(err)
        srcpath = relative.toDst;
        symlinkType(relative.toCwd, type, (err, type) => {
          if (err) return callback(err)
          const dir = path$5.dirname(dstpath);
          pathExists$4(dir, (err, dirExists) => {
            if (err) return callback(err)
            if (dirExists) return fs$6.symlink(srcpath, dstpath, type, callback)
            mkdirs(dir, err => {
              if (err) return callback(err)
              fs$6.symlink(srcpath, dstpath, type, callback);
            });
          });
        });
      });
    }

    function createSymlinkSync (srcpath, dstpath, type) {
      let stats;
      try {
        stats = fs$6.lstatSync(dstpath);
      } catch {}
      if (stats && stats.isSymbolicLink()) {
        const srcStat = fs$6.statSync(srcpath);
        const dstStat = fs$6.statSync(dstpath);
        if (areIdentical(srcStat, dstStat)) return
      }

      const relative = symlinkPathsSync(srcpath, dstpath);
      srcpath = relative.toDst;
      type = symlinkTypeSync(relative.toCwd, type);
      const dir = path$5.dirname(dstpath);
      const exists = fs$6.existsSync(dir);
      if (exists) return fs$6.symlinkSync(srcpath, dstpath, type)
      mkdirsSync(dir);
      return fs$6.symlinkSync(srcpath, dstpath, type)
    }

    var symlink$1 = {
      createSymlink: u$3(createSymlink),
      createSymlinkSync
    };

    const file = file$1;
    const link = link$1;
    const symlink = symlink$1;

    var ensure = {
      // file
      createFile: file.createFile,
      createFileSync: file.createFileSync,
      ensureFile: file.createFile,
      ensureFileSync: file.createFileSync,
      // link
      createLink: link.createLink,
      createLinkSync: link.createLinkSync,
      ensureLink: link.createLink,
      ensureLinkSync: link.createLinkSync,
      // symlink
      createSymlink: symlink.createSymlink,
      createSymlinkSync: symlink.createSymlinkSync,
      ensureSymlink: symlink.createSymlink,
      ensureSymlinkSync: symlink.createSymlinkSync
    };

    function stringify$3 (obj, { EOL = '\n', finalEOL = true, replacer = null, spaces } = {}) {
      const EOF = finalEOL ? EOL : '';
      const str = JSON.stringify(obj, replacer, spaces);

      return str.replace(/\n/g, EOL) + EOF
    }

    function stripBom$1 (content) {
      // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
      if (Buffer.isBuffer(content)) content = content.toString('utf8');
      return content.replace(/^\uFEFF/, '')
    }

    var utils = { stringify: stringify$3, stripBom: stripBom$1 };

    let _fs;
    try {
      _fs = require('graceful-fs');
    } catch (_) {
      _fs = require$$0__default$7["default"];
    }
    const universalify = universalify$1;
    const { stringify: stringify$2, stripBom } = utils;

    async function _readFile (file, options = {}) {
      if (typeof options === 'string') {
        options = { encoding: options };
      }

      const fs = options.fs || _fs;

      const shouldThrow = 'throws' in options ? options.throws : true;

      let data = await universalify.fromCallback(fs.readFile)(file, options);

      data = stripBom(data);

      let obj;
      try {
        obj = JSON.parse(data, options ? options.reviver : null);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err
        } else {
          return null
        }
      }

      return obj
    }

    const readFile = universalify.fromPromise(_readFile);

    function readFileSync (file, options = {}) {
      if (typeof options === 'string') {
        options = { encoding: options };
      }

      const fs = options.fs || _fs;

      const shouldThrow = 'throws' in options ? options.throws : true;

      try {
        let content = fs.readFileSync(file, options);
        content = stripBom(content);
        return JSON.parse(content, options.reviver)
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err
        } else {
          return null
        }
      }
    }

    async function _writeFile (file, obj, options = {}) {
      const fs = options.fs || _fs;

      const str = stringify$2(obj, options);

      await universalify.fromCallback(fs.writeFile)(file, str, options);
    }

    const writeFile = universalify.fromPromise(_writeFile);

    function writeFileSync (file, obj, options = {}) {
      const fs = options.fs || _fs;

      const str = stringify$2(obj, options);
      // not sure if fs.writeFileSync returns anything, but just in case
      return fs.writeFileSync(file, str, options)
    }

    const jsonfile$1 = {
      readFile,
      readFileSync,
      writeFile,
      writeFileSync
    };

    var jsonfile_1 = jsonfile$1;

    const jsonFile$1 = jsonfile_1;

    var jsonfile = {
      // jsonfile exports
      readJson: jsonFile$1.readFile,
      readJsonSync: jsonFile$1.readFileSync,
      writeJson: jsonFile$1.writeFile,
      writeJsonSync: jsonFile$1.writeFileSync
    };

    const u$2 = universalify$1.fromCallback;
    const fs$5 = gracefulFs;
    const path$4 = require$$1__default$1["default"];
    const mkdir = mkdirs$2;
    const pathExists$3 = pathExists_1.pathExists;

    function outputFile$1 (file, data, encoding, callback) {
      if (typeof encoding === 'function') {
        callback = encoding;
        encoding = 'utf8';
      }

      const dir = path$4.dirname(file);
      pathExists$3(dir, (err, itDoes) => {
        if (err) return callback(err)
        if (itDoes) return fs$5.writeFile(file, data, encoding, callback)

        mkdir.mkdirs(dir, err => {
          if (err) return callback(err)

          fs$5.writeFile(file, data, encoding, callback);
        });
      });
    }

    function outputFileSync$1 (file, ...args) {
      const dir = path$4.dirname(file);
      if (fs$5.existsSync(dir)) {
        return fs$5.writeFileSync(file, ...args)
      }
      mkdir.mkdirsSync(dir);
      fs$5.writeFileSync(file, ...args);
    }

    var output = {
      outputFile: u$2(outputFile$1),
      outputFileSync: outputFileSync$1
    };

    const { stringify: stringify$1 } = utils;
    const { outputFile } = output;

    async function outputJson (file, data, options = {}) {
      const str = stringify$1(data, options);

      await outputFile(file, str, options);
    }

    var outputJson_1 = outputJson;

    const { stringify } = utils;
    const { outputFileSync } = output;

    function outputJsonSync (file, data, options) {
      const str = stringify(data, options);

      outputFileSync(file, str, options);
    }

    var outputJsonSync_1 = outputJsonSync;

    const u$1 = universalify$1.fromPromise;
    const jsonFile = jsonfile;

    jsonFile.outputJson = u$1(outputJson_1);
    jsonFile.outputJsonSync = outputJsonSync_1;
    // aliases
    jsonFile.outputJSON = jsonFile.outputJson;
    jsonFile.outputJSONSync = jsonFile.outputJsonSync;
    jsonFile.writeJSON = jsonFile.writeJson;
    jsonFile.writeJSONSync = jsonFile.writeJsonSync;
    jsonFile.readJSON = jsonFile.readJson;
    jsonFile.readJSONSync = jsonFile.readJsonSync;

    var json = jsonFile;

    const fs$4 = gracefulFs;
    const path$3 = require$$1__default$1["default"];
    const copySync = copySync$1.copySync;
    const removeSync = remove_1.removeSync;
    const mkdirpSync = mkdirs$2.mkdirpSync;
    const stat$1 = stat$4;

    function moveSync$1 (src, dest, opts) {
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;

      const { srcStat, isChangingCase = false } = stat$1.checkPathsSync(src, dest, 'move', opts);
      stat$1.checkParentPathsSync(src, srcStat, dest, 'move');
      if (!isParentRoot$1(dest)) mkdirpSync(path$3.dirname(dest));
      return doRename$1(src, dest, overwrite, isChangingCase)
    }

    function isParentRoot$1 (dest) {
      const parent = path$3.dirname(dest);
      const parsedPath = path$3.parse(parent);
      return parsedPath.root === parent
    }

    function doRename$1 (src, dest, overwrite, isChangingCase) {
      if (isChangingCase) return rename$1(src, dest, overwrite)
      if (overwrite) {
        removeSync(dest);
        return rename$1(src, dest, overwrite)
      }
      if (fs$4.existsSync(dest)) throw new Error('dest already exists.')
      return rename$1(src, dest, overwrite)
    }

    function rename$1 (src, dest, overwrite) {
      try {
        fs$4.renameSync(src, dest);
      } catch (err) {
        if (err.code !== 'EXDEV') throw err
        return moveAcrossDevice$1(src, dest, overwrite)
      }
    }

    function moveAcrossDevice$1 (src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copySync(src, dest, opts);
      return removeSync(src)
    }

    var moveSync_1 = moveSync$1;

    var moveSync = {
      moveSync: moveSync_1
    };

    const fs$3 = gracefulFs;
    const path$2 = require$$1__default$1["default"];
    const copy = copy$1.copy;
    const remove = remove_1.remove;
    const mkdirp = mkdirs$2.mkdirp;
    const pathExists$2 = pathExists_1.pathExists;
    const stat = stat$4;

    function move$1 (src, dest, opts, cb) {
      if (typeof opts === 'function') {
        cb = opts;
        opts = {};
      }

      const overwrite = opts.overwrite || opts.clobber || false;

      stat.checkPaths(src, dest, 'move', opts, (err, stats) => {
        if (err) return cb(err)
        const { srcStat, isChangingCase = false } = stats;
        stat.checkParentPaths(src, srcStat, dest, 'move', err => {
          if (err) return cb(err)
          if (isParentRoot(dest)) return doRename(src, dest, overwrite, isChangingCase, cb)
          mkdirp(path$2.dirname(dest), err => {
            if (err) return cb(err)
            return doRename(src, dest, overwrite, isChangingCase, cb)
          });
        });
      });
    }

    function isParentRoot (dest) {
      const parent = path$2.dirname(dest);
      const parsedPath = path$2.parse(parent);
      return parsedPath.root === parent
    }

    function doRename (src, dest, overwrite, isChangingCase, cb) {
      if (isChangingCase) return rename(src, dest, overwrite, cb)
      if (overwrite) {
        return remove(dest, err => {
          if (err) return cb(err)
          return rename(src, dest, overwrite, cb)
        })
      }
      pathExists$2(dest, (err, destExists) => {
        if (err) return cb(err)
        if (destExists) return cb(new Error('dest already exists.'))
        return rename(src, dest, overwrite, cb)
      });
    }

    function rename (src, dest, overwrite, cb) {
      fs$3.rename(src, dest, err => {
        if (!err) return cb()
        if (err.code !== 'EXDEV') return cb(err)
        return moveAcrossDevice(src, dest, overwrite, cb)
      });
    }

    function moveAcrossDevice (src, dest, overwrite, cb) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copy(src, dest, opts, err => {
        if (err) return cb(err)
        return remove(src, cb)
      });
    }

    var move_1 = move$1;

    const u = universalify$1.fromCallback;
    var move = {
      move: u(move_1)
    };

    var lib$1 = {
      // Export promiseified graceful-fs:
      ...fs$l,
      // Export extra methods:
      ...copySync$1,
      ...copy$1,
      ...empty,
      ...ensure,
      ...json,
      ...mkdirs$2,
      ...moveSync,
      ...move,
      ...output,
      ...pathExists_1,
      ...remove_1
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter$1(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    const npminstall = require('npminstall');
    const pathExists$1 = _pathExists.sync;
    class Package {
        constructor(options) {
            if (!options) {
                throw new Error('Package 类的 options 参数不能为空');
            }
            if (!isObject(options)) {
                throw new Error('Package 类的 options 参数必需为对象');
            }
            this.targetPath = options.targetPath;
            this.storeDir = options.storeDir;
            this.packageName = options.packageName;
            this.packageVersion = options.packageVersion;
            this.cacheFilePathPrefix = this.packageName.replace('/', '_');
        }
        exists() {
            return __awaiter$1(this, void 0, void 0, function* () {
                if (this.storeDir) {
                    yield this.prepare();
                    return pathExists$1(this.cacheFilePath);
                }
                else {
                    return pathExists$1(this.targetPath);
                }
            });
        }
        prepare() {
            return __awaiter$1(this, void 0, void 0, function* () {
                if (this.storeDir && !pathExists$1(this.storeDir)) {
                    lib$1.mkdirpSync(this.storeDir);
                }
                if (this.packageVersion === 'latest') {
                    this.packageVersion = yield getNpmInfo$1.getNpmLatestVersion(this.packageName);
                }
            });
        }
        getSpecificCacheFilePath(packageVersion) {
            return require$$1__default$1["default"].resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${packageVersion}@${this.packageName}`);
        }
        install() {
            return npminstall({
                root: this.targetPath,
                storeDir: this.storeDir,
                registry: getNpmInfo$1.getDefaultRegistry(),
                pkgs: [
                    { name: this.packageName, version: this.packageVersion }
                ]
            });
        }
        update() {
            return __awaiter$1(this, void 0, void 0, function* () {
                yield this.prepare();
                const latestPackageVersion = yield getNpmInfo$1.getNpmLatestVersion(this.packageName);
                const latestFilePath = this.getSpecificCacheFilePath(latestPackageVersion);
                if (!pathExists$1(latestFilePath)) {
                    yield npminstall({
                        root: this.targetPath,
                        storeDir: this.storeDir,
                        registry: getNpmInfo$1.getDefaultRegistry(),
                        pkgs: [
                            { name: this.packageName, version: latestPackageVersion }
                        ]
                    });
                    this.packageVersion = latestPackageVersion;
                }
                else {
                    this.packageVersion = latestPackageVersion;
                }
            });
        }
        get cacheFilePath() {
            return require$$1__default$1["default"].resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${this.packageVersion}@${this.packageName}`);
        }
        _getRootFilePath(targetPath) {
            const dir = pkgDir$1.sync(targetPath);
            if (dir) {
                const pkgFile = require(require$$1__default$1["default"].resolve(dir, 'package.json'));
                if (pkgFile && pkgFile.main) {
                    return require$$1__default$1["default"].resolve(dir, pkgFile.main);
                }
            }
            return null;
        }
        getRootFilePath() {
            if (this.storeDir) {
                return this._getRootFilePath(this.cacheFilePath);
            }
            else {
                return this._getRootFilePath(this.targetPath);
            }
        }
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    const SETTINGS = {
        init: '@js-cli/init'
    };
    const CACHE_DIR = 'dependencies';
    const exec = (..._args) => __awaiter(void 0, void 0, void 0, function* () {
        let targetPath = process.env.CLI_TARGET_PATH;
        const homePath = process.env.CLI_HOME_PATH;
        let storeDir = '';
        let pkg;
        const cmdObj = _args[_args.length - 1];
        const cmdName = cmdObj.name();
        const packageName = SETTINGS[cmdName];
        const packageVersion = 'latest';
        if (!targetPath) {
            targetPath = require$$1__default$1["default"].resolve(homePath, CACHE_DIR);
            storeDir = require$$1__default$1["default"].resolve(targetPath, 'node_modules'); // 缓存目录
            pkg = new Package({
                targetPath,
                storeDir,
                packageName,
                packageVersion
            });
            if (yield pkg.exists()) {
                // 更新 package
                yield pkg.update();
            }
            else {
                // 安装 package
                yield pkg.install();
            }
        }
        else {
            pkg = new Package({
                targetPath,
                storeDir,
                packageName,
                packageVersion
            });
        }
        log$1.verbose('targetPath', targetPath);
        log$1.verbose('homePath', homePath);
        log$1.verbose('storeDir', storeDir);
        const rootFile = pkg.getRootFilePath();
        if (rootFile) {
            try {
                const args = Array.from(_args);
                const cmd = args[args.length - 1];
                const o = Object.create(null);
                Object.keys(cmd).forEach(key => {
                    if (cmd.hasOwnProperty(key) && !key.startsWith('_') && key !== 'parent') {
                        o[key] = cmd[key];
                    }
                });
                args[args.length - 1] = o;
                const code = `require('${rootFile}').init.call(null, ${JSON.stringify(args)})`;
                const child = spawn('node', ['-e', code], {
                    cwd: process.cwd(),
                    stdio: 'inherit'
                });
                child.on('error', (e) => {
                    log$1.error('spwan on errpr', e.message);
                    process.exit(1);
                });
                child.on('exit', (e) => {
                    log$1.verbose('spawn success', '命令执行成功');
                    process.exit(e);
                });
            }
            catch (e) {
                log$1.error('spwan catch error', e.message);
            }
        }
    });

    var lib = {exports: {}};

    var colors$1 = {exports: {}};

    var styles$1 = {exports: {}};

    /*
    The MIT License (MIT)

    Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

    */

    (function (module) {
    var styles = {};
    module['exports'] = styles;

    var codes = {
      reset: [0, 0],

      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29],

      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      gray: [90, 39],
      grey: [90, 39],

      brightRed: [91, 39],
      brightGreen: [92, 39],
      brightYellow: [93, 39],
      brightBlue: [94, 39],
      brightMagenta: [95, 39],
      brightCyan: [96, 39],
      brightWhite: [97, 39],

      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      bgGray: [100, 49],
      bgGrey: [100, 49],

      bgBrightRed: [101, 49],
      bgBrightGreen: [102, 49],
      bgBrightYellow: [103, 49],
      bgBrightBlue: [104, 49],
      bgBrightMagenta: [105, 49],
      bgBrightCyan: [106, 49],
      bgBrightWhite: [107, 49],

      // legacy styles for colors pre v1.0.0
      blackBG: [40, 49],
      redBG: [41, 49],
      greenBG: [42, 49],
      yellowBG: [43, 49],
      blueBG: [44, 49],
      magentaBG: [45, 49],
      cyanBG: [46, 49],
      whiteBG: [47, 49],

    };

    Object.keys(codes).forEach(function(key) {
      var val = codes[key];
      var style = styles[key] = [];
      style.open = '\u001b[' + val[0] + 'm';
      style.close = '\u001b[' + val[1] + 'm';
    });
    }(styles$1));

    /*
    MIT License

    Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
    of the Software, and to permit persons to whom the Software is furnished to do
    so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */

    var hasFlag$2 = function(flag, argv) {
      argv = argv || process.argv;

      var terminatorPos = argv.indexOf('--');
      var prefix = /^-{1,2}/.test(flag) ? '' : '--';
      var pos = argv.indexOf(prefix + flag);

      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };

    /*
    The MIT License (MIT)

    Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

    */

    var os$1 = require$$0__default$4["default"];
    var hasFlag$1 = hasFlag$2;

    var env = process.env;

    var forceColor = void 0;
    if (hasFlag$1('no-color') || hasFlag$1('no-colors') || hasFlag$1('color=false')) {
      forceColor = false;
    } else if (hasFlag$1('color') || hasFlag$1('colors') || hasFlag$1('color=true')
               || hasFlag$1('color=always')) {
      forceColor = true;
    }
    if ('FORCE_COLOR' in env) {
      forceColor = env.FORCE_COLOR.length === 0
        || parseInt(env.FORCE_COLOR, 10) !== 0;
    }

    function translateLevel(level) {
      if (level === 0) {
        return false;
      }

      return {
        level: level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3,
      };
    }

    function supportsColor$2(stream) {
      if (forceColor === false) {
        return 0;
      }

      if (hasFlag$1('color=16m') || hasFlag$1('color=full')
          || hasFlag$1('color=truecolor')) {
        return 3;
      }

      if (hasFlag$1('color=256')) {
        return 2;
      }

      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }

      var min = forceColor ? 1 : 0;

      if (process.platform === 'win32') {
        // Node.js 7.5.0 is the first version of Node.js to include a patch to
        // libuv that enables 256 color output on Windows. Anything earlier and it
        // won't work. However, here we target Node.js 8 at minimum as it is an LTS
        // release, and Node.js 7 is not. Windows 10 build 10586 is the first
        // Windows release that supports 256 colors. Windows 10 build 14931 is the
        // first release that supports 16m/TrueColor.
        var osRelease = os$1.release().split('.');
        if (Number(process.versions.node.split('.')[0]) >= 8
            && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }

        return 1;
      }

      if ('CI' in env) {
        if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(function(sign) {
          return sign in env;
        }) || env.CI_NAME === 'codeship') {
          return 1;
        }

        return min;
      }

      if ('TEAMCITY_VERSION' in env) {
        return (/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0
        );
      }

      if ('TERM_PROGRAM' in env) {
        var version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

        switch (env.TERM_PROGRAM) {
          case 'iTerm.app':
            return version >= 3 ? 3 : 2;
          case 'Hyper':
            return 3;
          case 'Apple_Terminal':
            return 2;
          // No default
        }
      }

      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }

      if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }

      if ('COLORTERM' in env) {
        return 1;
      }

      if (env.TERM === 'dumb') {
        return min;
      }

      return min;
    }

    function getSupportLevel(stream) {
      var level = supportsColor$2(stream);
      return translateLevel(level);
    }

    var supportsColors = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr),
    };

    var trap = {exports: {}};

    (function (module) {
    module['exports'] = function runTheTrap(text, options) {
      var result = '';
      text = text || 'Run the trap, drop the bass';
      text = text.split('');
      var trap = {
        a: ['\u0040', '\u0104', '\u023a', '\u0245', '\u0394', '\u039b', '\u0414'],
        b: ['\u00df', '\u0181', '\u0243', '\u026e', '\u03b2', '\u0e3f'],
        c: ['\u00a9', '\u023b', '\u03fe'],
        d: ['\u00d0', '\u018a', '\u0500', '\u0501', '\u0502', '\u0503'],
        e: ['\u00cb', '\u0115', '\u018e', '\u0258', '\u03a3', '\u03be', '\u04bc',
          '\u0a6c'],
        f: ['\u04fa'],
        g: ['\u0262'],
        h: ['\u0126', '\u0195', '\u04a2', '\u04ba', '\u04c7', '\u050a'],
        i: ['\u0f0f'],
        j: ['\u0134'],
        k: ['\u0138', '\u04a0', '\u04c3', '\u051e'],
        l: ['\u0139'],
        m: ['\u028d', '\u04cd', '\u04ce', '\u0520', '\u0521', '\u0d69'],
        n: ['\u00d1', '\u014b', '\u019d', '\u0376', '\u03a0', '\u048a'],
        o: ['\u00d8', '\u00f5', '\u00f8', '\u01fe', '\u0298', '\u047a', '\u05dd',
          '\u06dd', '\u0e4f'],
        p: ['\u01f7', '\u048e'],
        q: ['\u09cd'],
        r: ['\u00ae', '\u01a6', '\u0210', '\u024c', '\u0280', '\u042f'],
        s: ['\u00a7', '\u03de', '\u03df', '\u03e8'],
        t: ['\u0141', '\u0166', '\u0373'],
        u: ['\u01b1', '\u054d'],
        v: ['\u05d8'],
        w: ['\u0428', '\u0460', '\u047c', '\u0d70'],
        x: ['\u04b2', '\u04fe', '\u04fc', '\u04fd'],
        y: ['\u00a5', '\u04b0', '\u04cb'],
        z: ['\u01b5', '\u0240'],
      };
      text.forEach(function(c) {
        c = c.toLowerCase();
        var chars = trap[c] || [' '];
        var rand = Math.floor(Math.random() * chars.length);
        if (typeof trap[c] !== 'undefined') {
          result += trap[c][rand];
        } else {
          result += c;
        }
      });
      return result;
    };
    }(trap));

    var zalgo = {exports: {}};

    (function (module) {
    // please no
    module['exports'] = function zalgo(text, options) {
      text = text || '   he is here   ';
      var soul = {
        'up': [
          '̍', '̎', '̄', '̅',
          '̿', '̑', '̆', '̐',
          '͒', '͗', '͑', '̇',
          '̈', '̊', '͂', '̓',
          '̈', '͊', '͋', '͌',
          '̃', '̂', '̌', '͐',
          '̀', '́', '̋', '̏',
          '̒', '̓', '̔', '̽',
          '̉', 'ͣ', 'ͤ', 'ͥ',
          'ͦ', 'ͧ', 'ͨ', 'ͩ',
          'ͪ', 'ͫ', 'ͬ', 'ͭ',
          'ͮ', 'ͯ', '̾', '͛',
          '͆', '̚',
        ],
        'down': [
          '̖', '̗', '̘', '̙',
          '̜', '̝', '̞', '̟',
          '̠', '̤', '̥', '̦',
          '̩', '̪', '̫', '̬',
          '̭', '̮', '̯', '̰',
          '̱', '̲', '̳', '̹',
          '̺', '̻', '̼', 'ͅ',
          '͇', '͈', '͉', '͍',
          '͎', '͓', '͔', '͕',
          '͖', '͙', '͚', '̣',
        ],
        'mid': [
          '̕', '̛', '̀', '́',
          '͘', '̡', '̢', '̧',
          '̨', '̴', '̵', '̶',
          '͜', '͝', '͞',
          '͟', '͠', '͢', '̸',
          '̷', '͡', ' ҉',
        ],
      };
      var all = [].concat(soul.up, soul.down, soul.mid);

      function randomNumber(range) {
        var r = Math.floor(Math.random() * range);
        return r;
      }

      function isChar(character) {
        var bool = false;
        all.filter(function(i) {
          bool = (i === character);
        });
        return bool;
      }


      function heComes(text, options) {
        var result = '';
        var counts;
        var l;
        options = options || {};
        options['up'] =
          typeof options['up'] !== 'undefined' ? options['up'] : true;
        options['mid'] =
          typeof options['mid'] !== 'undefined' ? options['mid'] : true;
        options['down'] =
          typeof options['down'] !== 'undefined' ? options['down'] : true;
        options['size'] =
          typeof options['size'] !== 'undefined' ? options['size'] : 'maxi';
        text = text.split('');
        for (l in text) {
          if (isChar(l)) {
            continue;
          }
          result = result + text[l];
          counts = {'up': 0, 'down': 0, 'mid': 0};
          switch (options.size) {
            case 'mini':
              counts.up = randomNumber(8);
              counts.mid = randomNumber(2);
              counts.down = randomNumber(8);
              break;
            case 'maxi':
              counts.up = randomNumber(16) + 3;
              counts.mid = randomNumber(4) + 1;
              counts.down = randomNumber(64) + 3;
              break;
            default:
              counts.up = randomNumber(8) + 1;
              counts.mid = randomNumber(6) / 2;
              counts.down = randomNumber(8) + 1;
              break;
          }

          var arr = ['up', 'mid', 'down'];
          for (var d in arr) {
            var index = arr[d];
            for (var i = 0; i <= counts[index]; i++) {
              if (options[index]) {
                result = result + soul[index][randomNumber(soul[index].length)];
              }
            }
          }
        }
        return result;
      }
      // don't summon him
      return heComes(text, options);
    };
    }(zalgo));

    var america = {exports: {}};

    (function (module) {
    module['exports'] = function(colors) {
      return function(letter, i, exploded) {
        if (letter === ' ') return letter;
        switch (i%3) {
          case 0: return colors.red(letter);
          case 1: return colors.white(letter);
          case 2: return colors.blue(letter);
        }
      };
    };
    }(america));

    var zebra = {exports: {}};

    (function (module) {
    module['exports'] = function(colors) {
      return function(letter, i, exploded) {
        return i % 2 === 0 ? letter : colors.inverse(letter);
      };
    };
    }(zebra));

    var rainbow = {exports: {}};

    (function (module) {
    module['exports'] = function(colors) {
      // RoY G BiV
      var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];
      return function(letter, i, exploded) {
        if (letter === ' ') {
          return letter;
        } else {
          return colors[rainbowColors[i++ % rainbowColors.length]](letter);
        }
      };
    };
    }(rainbow));

    var random = {exports: {}};

    (function (module) {
    module['exports'] = function(colors) {
      var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green',
        'blue', 'white', 'cyan', 'magenta', 'brightYellow', 'brightRed',
        'brightGreen', 'brightBlue', 'brightWhite', 'brightCyan', 'brightMagenta'];
      return function(letter, i, exploded) {
        return letter === ' ' ? letter :
          colors[
              available[Math.round(Math.random() * (available.length - 2))]
          ](letter);
      };
    };
    }(random));

    /*

    The MIT License (MIT)

    Original Library
      - Copyright (c) Marak Squires

    Additional functionality
     - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

    */

    (function (module) {
    var colors = {};
    module['exports'] = colors;

    colors.themes = {};

    var util = require$$0__default$1["default"];
    var ansiStyles = colors.styles = styles$1.exports;
    var defineProps = Object.defineProperties;
    var newLineRegex = new RegExp(/[\r\n]+/g);

    colors.supportsColor = supportsColors.supportsColor;

    if (typeof colors.enabled === 'undefined') {
      colors.enabled = colors.supportsColor() !== false;
    }

    colors.enable = function() {
      colors.enabled = true;
    };

    colors.disable = function() {
      colors.enabled = false;
    };

    colors.stripColors = colors.strip = function(str) {
      return ('' + str).replace(/\x1B\[\d+m/g, '');
    };

    // eslint-disable-next-line no-unused-vars
    colors.stylize = function stylize(str, style) {
      if (!colors.enabled) {
        return str+'';
      }

      var styleMap = ansiStyles[style];

      // Stylize should work for non-ANSI styles, too
      if(!styleMap && style in colors){
        // Style maps like trap operate as functions on strings;
        // they don't have properties like open or close.
        return colors[style](str);
      }

      return styleMap.open + str + styleMap.close;
    };

    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    var escapeStringRegexp = function(str) {
      if (typeof str !== 'string') {
        throw new TypeError('Expected a string');
      }
      return str.replace(matchOperatorsRe, '\\$&');
    };

    function build(_styles) {
      var builder = function builder() {
        return applyStyle.apply(builder, arguments);
      };
      builder._styles = _styles;
      // __proto__ is used because we must return a function, but there is
      // no way to create a function with a different prototype.
      builder.__proto__ = proto;
      return builder;
    }

    var styles = (function() {
      var ret = {};
      ansiStyles.grey = ansiStyles.gray;
      Object.keys(ansiStyles).forEach(function(key) {
        ansiStyles[key].closeRe =
          new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
        ret[key] = {
          get: function() {
            return build(this._styles.concat(key));
          },
        };
      });
      return ret;
    })();

    var proto = defineProps(function colors() {}, styles);

    function applyStyle() {
      var args = Array.prototype.slice.call(arguments);

      var str = args.map(function(arg) {
        // Use weak equality check so we can colorize null/undefined in safe mode
        if (arg != null && arg.constructor === String) {
          return arg;
        } else {
          return util.inspect(arg);
        }
      }).join(' ');

      if (!colors.enabled || !str) {
        return str;
      }

      var newLinesPresent = str.indexOf('\n') != -1;

      var nestedStyles = this._styles;

      var i = nestedStyles.length;
      while (i--) {
        var code = ansiStyles[nestedStyles[i]];
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
        if (newLinesPresent) {
          str = str.replace(newLineRegex, function(match) {
            return code.close + match + code.open;
          });
        }
      }

      return str;
    }

    colors.setTheme = function(theme) {
      if (typeof theme === 'string') {
        console.log('colors.setTheme now only accepts an object, not a string.  ' +
          'If you are trying to set a theme from a file, it is now your (the ' +
          'caller\'s) responsibility to require the file.  The old syntax ' +
          'looked like colors.setTheme(__dirname + ' +
          '\'/../themes/generic-logging.js\'); The new syntax looks like '+
          'colors.setTheme(require(__dirname + ' +
          '\'/../themes/generic-logging.js\'));');
        return;
      }
      for (var style in theme) {
        (function(style) {
          colors[style] = function(str) {
            if (typeof theme[style] === 'object') {
              var out = str;
              for (var i in theme[style]) {
                out = colors[theme[style][i]](out);
              }
              return out;
            }
            return colors[theme[style]](str);
          };
        })(style);
      }
    };

    function init() {
      var ret = {};
      Object.keys(styles).forEach(function(name) {
        ret[name] = {
          get: function() {
            return build([name]);
          },
        };
      });
      return ret;
    }

    var sequencer = function sequencer(map, str) {
      var exploded = str.split('');
      exploded = exploded.map(map);
      return exploded.join('');
    };

    // custom formatter methods
    colors.trap = trap.exports;
    colors.zalgo = zalgo.exports;

    // maps
    colors.maps = {};
    colors.maps.america = america.exports(colors);
    colors.maps.zebra = zebra.exports(colors);
    colors.maps.rainbow = rainbow.exports(colors);
    colors.maps.random = random.exports(colors);

    for (var map in colors.maps) {
      (function(map) {
        colors[map] = function(str) {
          return sequencer(colors.maps[map], str);
        };
      })(map);
    }

    defineProps(colors, init());
    }(colors$1));

    var extendStringPrototype = {exports: {}};

    (function (module) {
    var colors = colors$1.exports;

    module['exports'] = function() {
      //
      // Extends prototype of native string object to allow for "foo".red syntax
      //
      var addProperty = function(color, func) {
        String.prototype.__defineGetter__(color, func);
      };

      addProperty('strip', function() {
        return colors.strip(this);
      });

      addProperty('stripColors', function() {
        return colors.strip(this);
      });

      addProperty('trap', function() {
        return colors.trap(this);
      });

      addProperty('zalgo', function() {
        return colors.zalgo(this);
      });

      addProperty('zebra', function() {
        return colors.zebra(this);
      });

      addProperty('rainbow', function() {
        return colors.rainbow(this);
      });

      addProperty('random', function() {
        return colors.random(this);
      });

      addProperty('america', function() {
        return colors.america(this);
      });

      //
      // Iterate through all default styles and colors
      //
      var x = Object.keys(colors.styles);
      x.forEach(function(style) {
        addProperty(style, function() {
          return colors.stylize(this, style);
        });
      });

      function applyTheme(theme) {
        //
        // Remark: This is a list of methods that exist
        // on String that you should not overwrite.
        //
        var stringPrototypeBlacklist = [
          '__defineGetter__', '__defineSetter__', '__lookupGetter__',
          '__lookupSetter__', 'charAt', 'constructor', 'hasOwnProperty',
          'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString',
          'valueOf', 'charCodeAt', 'indexOf', 'lastIndexOf', 'length',
          'localeCompare', 'match', 'repeat', 'replace', 'search', 'slice',
          'split', 'substring', 'toLocaleLowerCase', 'toLocaleUpperCase',
          'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight',
        ];

        Object.keys(theme).forEach(function(prop) {
          if (stringPrototypeBlacklist.indexOf(prop) !== -1) {
            console.log('warn: '.red + ('String.prototype' + prop).magenta +
              ' is probably something you don\'t want to override.  ' +
              'Ignoring style name');
          } else {
            if (typeof(theme[prop]) === 'string') {
              colors[prop] = colors[theme[prop]];
              addProperty(prop, function() {
                return colors[prop](this);
              });
            } else {
              var themePropApplicator = function(str) {
                var ret = str || this;
                for (var t = 0; t < theme[prop].length; t++) {
                  ret = colors[theme[prop][t]](ret);
                }
                return ret;
              };
              addProperty(prop, themePropApplicator);
              colors[prop] = function(str) {
                return themePropApplicator(str);
              };
            }
          }
        });
      }

      colors.setTheme = function(theme) {
        if (typeof theme === 'string') {
          console.log('colors.setTheme now only accepts an object, not a string. ' +
            'If you are trying to set a theme from a file, it is now your (the ' +
            'caller\'s) responsibility to require the file.  The old syntax ' +
            'looked like colors.setTheme(__dirname + ' +
            '\'/../themes/generic-logging.js\'); The new syntax looks like '+
            'colors.setTheme(require(__dirname + ' +
            '\'/../themes/generic-logging.js\'));');
          return;
        } else {
          applyTheme(theme);
        }
      };
    };
    }(extendStringPrototype));

    (function (module) {
    var colors = colors$1.exports;
    module['exports'] = colors;

    // Remark: By default, colors will add style properties to String.prototype.
    //
    // If you don't wish to extend String.prototype, you can do this instead and
    // native String will not be touched:
    //
    //   var colors = require('colors/safe);
    //   colors.red("foo")
    //
    //
    extendStringPrototype.exports();
    }(lib));

    var colors = lib.exports;

    var isRoot$2 = function () {
    	return process.getuid && process.getuid() === 0;
    };

    var DEFAULT_UIDS = {
    	darwin: 501,
    	freebsd: 1000,
    	linux: 1000,
    	sunos: 100
    };

    var defaultUid$1 = function (platform) {
    	return DEFAULT_UIDS[platform || process.platform];
    };

    var isRoot$1 = isRoot$2;
    var defaultUid = defaultUid$1;

    var downgradeRoot$1 = function () {
    	if (isRoot$1()) {
    		// setgid needs to happen before setuid to avoid EPERM
    		if (process.setgid) {
    			var gid = parseInt(process.env.SUDO_GID, 10);
    			if (gid && gid > 0) {
    				process.setgid(gid);
    			}
    		}
    		if (process.setuid) {
    			var uid = parseInt(process.env.SUDO_UID, 10) || defaultUid();
    			if (uid && uid > 0) {
    				process.setuid(uid);
    			}
    		}
    	}
    };

    var chalk$1 = {exports: {}};

    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

    var escapeStringRegexp$1 = function (str) {
    	if (typeof str !== 'string') {
    		throw new TypeError('Expected a string');
    	}

    	return str.replace(matchOperatorsRe, '\\$&');
    };

    var ansiStyles$1 = {exports: {}};

    (function (module) {

    function assembleStyles () {
    	var styles = {
    		modifiers: {
    			reset: [0, 0],
    			bold: [1, 22], // 21 isn't widely supported and 22 does the same thing
    			dim: [2, 22],
    			italic: [3, 23],
    			underline: [4, 24],
    			inverse: [7, 27],
    			hidden: [8, 28],
    			strikethrough: [9, 29]
    		},
    		colors: {
    			black: [30, 39],
    			red: [31, 39],
    			green: [32, 39],
    			yellow: [33, 39],
    			blue: [34, 39],
    			magenta: [35, 39],
    			cyan: [36, 39],
    			white: [37, 39],
    			gray: [90, 39]
    		},
    		bgColors: {
    			bgBlack: [40, 49],
    			bgRed: [41, 49],
    			bgGreen: [42, 49],
    			bgYellow: [43, 49],
    			bgBlue: [44, 49],
    			bgMagenta: [45, 49],
    			bgCyan: [46, 49],
    			bgWhite: [47, 49]
    		}
    	};

    	// fix humans
    	styles.colors.grey = styles.colors.gray;

    	Object.keys(styles).forEach(function (groupName) {
    		var group = styles[groupName];

    		Object.keys(group).forEach(function (styleName) {
    			var style = group[styleName];

    			styles[styleName] = group[styleName] = {
    				open: '\u001b[' + style[0] + 'm',
    				close: '\u001b[' + style[1] + 'm'
    			};
    		});

    		Object.defineProperty(styles, groupName, {
    			value: group,
    			enumerable: false
    		});
    	});

    	return styles;
    }

    Object.defineProperty(module, 'exports', {
    	enumerable: true,
    	get: assembleStyles
    });
    }(ansiStyles$1));

    var ansiRegex$2 = function () {
    	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
    };

    var ansiRegex$1 = ansiRegex$2();

    var stripAnsi$1 = function (str) {
    	return typeof str === 'string' ? str.replace(ansiRegex$1, '') : str;
    };

    var ansiRegex = ansiRegex$2;
    var re = new RegExp(ansiRegex().source); // remove the `g` flag
    var hasAnsi$1 = re.test.bind(re);

    var argv = process.argv;

    var terminator = argv.indexOf('--');
    var hasFlag = function (flag) {
    	flag = '--' + flag;
    	var pos = argv.indexOf(flag);
    	return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
    };

    var supportsColor$1 = (function () {
    	if ('FORCE_COLOR' in process.env) {
    		return true;
    	}

    	if (hasFlag('no-color') ||
    		hasFlag('no-colors') ||
    		hasFlag('color=false')) {
    		return false;
    	}

    	if (hasFlag('color') ||
    		hasFlag('colors') ||
    		hasFlag('color=true') ||
    		hasFlag('color=always')) {
    		return true;
    	}

    	if (process.stdout && !process.stdout.isTTY) {
    		return false;
    	}

    	if (process.platform === 'win32') {
    		return true;
    	}

    	if ('COLORTERM' in process.env) {
    		return true;
    	}

    	if (process.env.TERM === 'dumb') {
    		return false;
    	}

    	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
    		return true;
    	}

    	return false;
    })();

    var escapeStringRegexp = escapeStringRegexp$1;
    var ansiStyles = ansiStyles$1.exports;
    var stripAnsi = stripAnsi$1;
    var hasAnsi = hasAnsi$1;
    var supportsColor = supportsColor$1;
    var defineProps = Object.defineProperties;
    var isSimpleWindowsTerm = process.platform === 'win32' && !/^xterm/i.test(process.env.TERM);

    function Chalk(options) {
    	// detect mode if not set manually
    	this.enabled = !options || options.enabled === undefined ? supportsColor : options.enabled;
    }

    // use bright blue on Windows as the normal blue color is illegible
    if (isSimpleWindowsTerm) {
    	ansiStyles.blue.open = '\u001b[94m';
    }

    var styles = (function () {
    	var ret = {};

    	Object.keys(ansiStyles).forEach(function (key) {
    		ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

    		ret[key] = {
    			get: function () {
    				return build.call(this, this._styles.concat(key));
    			}
    		};
    	});

    	return ret;
    })();

    var proto = defineProps(function chalk() {}, styles);

    function build(_styles) {
    	var builder = function () {
    		return applyStyle.apply(builder, arguments);
    	};

    	builder._styles = _styles;
    	builder.enabled = this.enabled;
    	// __proto__ is used because we must return a function, but there is
    	// no way to create a function with a different prototype.
    	/* eslint-disable no-proto */
    	builder.__proto__ = proto;

    	return builder;
    }

    function applyStyle() {
    	// support varags, but simply cast to string in case there's only one arg
    	var args = arguments;
    	var argsLen = args.length;
    	var str = argsLen !== 0 && String(arguments[0]);

    	if (argsLen > 1) {
    		// don't slice `arguments`, it prevents v8 optimizations
    		for (var a = 1; a < argsLen; a++) {
    			str += ' ' + args[a];
    		}
    	}

    	if (!this.enabled || !str) {
    		return str;
    	}

    	var nestedStyles = this._styles;
    	var i = nestedStyles.length;

    	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
    	// see https://github.com/chalk/chalk/issues/58
    	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
    	var originalDim = ansiStyles.dim.open;
    	if (isSimpleWindowsTerm && (nestedStyles.indexOf('gray') !== -1 || nestedStyles.indexOf('grey') !== -1)) {
    		ansiStyles.dim.open = '';
    	}

    	while (i--) {
    		var code = ansiStyles[nestedStyles[i]];

    		// Replace any instances already present with a re-opening code
    		// otherwise only the part of the string until said closing code
    		// will be colored, and the rest will simply be 'plain'.
    		str = code.open + str.replace(code.closeRe, code.open) + code.close;
    	}

    	// Reset the original 'dim' if we changed it to work around the Windows dimmed gray issue.
    	ansiStyles.dim.open = originalDim;

    	return str;
    }

    function init() {
    	var ret = {};

    	Object.keys(styles).forEach(function (name) {
    		ret[name] = {
    			get: function () {
    				return build.call(this, [name]);
    			}
    		};
    	});

    	return ret;
    }

    defineProps(Chalk.prototype, init());

    chalk$1.exports = new Chalk();
    chalk$1.exports.styles = ansiStyles;
    chalk$1.exports.hasColor = hasAnsi;
    chalk$1.exports.stripColor = stripAnsi;
    chalk$1.exports.supportsColor = supportsColor;

    var fs$2 = require$$0__default$7["default"];

    var isDocker$1;

    function hasDockerEnv() {
    	try {
    		fs$2.statSync('/.dockerenv');
    		return true;
    	} catch (err) {
    		return false;
    	}
    }

    function hasDockerCGroup() {
    	try {
    		return fs$2.readFileSync('/proc/self/cgroup', 'utf8').indexOf('docker') !== -1;
    	} catch (err) {
    		return false;
    	}
    }

    function check() {
    	return hasDockerEnv() || hasDockerCGroup();
    }

    var isDocker_1 = function () {
    	if (isDocker$1 === undefined) {
    		isDocker$1 = check();
    	}

    	return isDocker$1;
    };

    var chalk = chalk$1.exports;
    var isRoot = isRoot$2;
    var isDocker = isDocker_1;

    var sudoBlock$1 = function (message) {
    	var defaultMessage = chalk.red.bold('You are not allowed to run this app with root permissions.') + '\nIf running without ' + chalk.bold('sudo') + ' doesn\'t work, you can either fix your permission problems or change where npm stores global packages by putting ' + chalk.bold('~/npm/bin') + ' in your PATH and running:\n' + chalk.blue('npm config set prefix ~/npm') + '\n\nSee: ' + chalk.underline('https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md');

    	if (isRoot() && !isDocker()) {
    		console.error(message || defaultMessage);
    		process.exit(77);
    	}
    };

    var downgradeRoot = downgradeRoot$1;
    var sudoBlock = sudoBlock$1;

    var rootCheck = function () {
    	try {
    		downgradeRoot();
    	} catch (err) {}

    	sudoBlock.apply(null, arguments);
    };

    var main = {};

    /* @flow */

    /*::

    type DotenvParseOptions = {
      debug?: boolean
    }

    // keys and values from src
    type DotenvParseOutput = { [string]: string }

    type DotenvConfigOptions = {
      path?: string, // path to .env file
      encoding?: string, // encoding of .env file
      debug?: string // turn on logging for debugging purposes
    }

    type DotenvConfigOutput = {
      parsed?: DotenvParseOutput,
      error?: Error
    }

    */

    const fs$1 = require$$0__default$7["default"];
    const path$1 = require$$1__default$1["default"];
    const os = require$$0__default$4["default"];

    function log (message /*: string */) {
      console.log(`[dotenv][DEBUG] ${message}`);
    }

    const NEWLINE = '\n';
    const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
    const RE_NEWLINES = /\\n/g;
    const NEWLINES_MATCH = /\r\n|\n|\r/;

    // Parses src into an Object
    function parse (src /*: string | Buffer */, options /*: ?DotenvParseOptions */) /*: DotenvParseOutput */ {
      const debug = Boolean(options && options.debug);
      const obj = {};

      // convert Buffers before splitting into lines and processing
      src.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {
        // matching "KEY' and 'VAL' in 'KEY=VAL'
        const keyValueArr = line.match(RE_INI_KEY_VAL);
        // matched?
        if (keyValueArr != null) {
          const key = keyValueArr[1];
          // default undefined or missing values to empty string
          let val = (keyValueArr[2] || '');
          const end = val.length - 1;
          const isDoubleQuoted = val[0] === '"' && val[end] === '"';
          const isSingleQuoted = val[0] === "'" && val[end] === "'";

          // if single or double quoted, remove quotes
          if (isSingleQuoted || isDoubleQuoted) {
            val = val.substring(1, end);

            // if double quoted, expand newlines
            if (isDoubleQuoted) {
              val = val.replace(RE_NEWLINES, NEWLINE);
            }
          } else {
            // remove surrounding whitespace
            val = val.trim();
          }

          obj[key] = val;
        } else if (debug) {
          log(`did not match key and value when parsing line ${idx + 1}: ${line}`);
        }
      });

      return obj
    }

    function resolveHome (envPath) {
      return envPath[0] === '~' ? path$1.join(os.homedir(), envPath.slice(1)) : envPath
    }

    // Populates process.env from .env file
    function config (options /*: ?DotenvConfigOptions */) /*: DotenvConfigOutput */ {
      let dotenvPath = path$1.resolve(process.cwd(), '.env');
      let encoding /*: string */ = 'utf8';
      let debug = false;

      if (options) {
        if (options.path != null) {
          dotenvPath = resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
        if (options.debug != null) {
          debug = true;
        }
      }

      try {
        // specifying an encoding returns a string instead of a buffer
        const parsed = parse(fs$1.readFileSync(dotenvPath, { encoding }), { debug });

        Object.keys(parsed).forEach(function (key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else if (debug) {
            log(`"${key}" is already defined in \`process.env\` and will not be overwritten`);
          }
        });

        return { parsed }
      } catch (e) {
        return { error: e }
      }
    }

    main.config = config;
    main.parse = parse;

    var commander$1 = {exports: {}};

    var argument = {};

    var error = {};

    // @ts-check

    /**
     * CommanderError class
     * @class
     */
    class CommanderError$1 extends Error {
      /**
       * Constructs the CommanderError class
       * @param {number} exitCode suggested exit code which could be used with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @constructor
       */
      constructor(exitCode, code, message) {
        super(message);
        // properly capture stack trace in Node.js
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code;
        this.exitCode = exitCode;
        this.nestedError = undefined;
      }
    }

    /**
     * InvalidArgumentError class
     * @class
     */
    class InvalidArgumentError$2 extends CommanderError$1 {
      /**
       * Constructs the InvalidArgumentError class
       * @param {string} [message] explanation of why argument is invalid
       * @constructor
       */
      constructor(message) {
        super(1, 'commander.invalidArgument', message);
        // properly capture stack trace in Node.js
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
      }
    }

    error.CommanderError = CommanderError$1;
    error.InvalidArgumentError = InvalidArgumentError$2;

    const { InvalidArgumentError: InvalidArgumentError$1 } = error;

    // @ts-check

    class Argument$1 {
      /**
       * Initialize a new command argument with the given name and description.
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @param {string} name
       * @param {string} [description]
       */

      constructor(name, description) {
        this.description = description || '';
        this.variadic = false;
        this.parseArg = undefined;
        this.defaultValue = undefined;
        this.defaultValueDescription = undefined;
        this.argChoices = undefined;

        switch (name[0]) {
          case '<': // e.g. <required>
            this.required = true;
            this._name = name.slice(1, -1);
            break;
          case '[': // e.g. [optional]
            this.required = false;
            this._name = name.slice(1, -1);
            break;
          default:
            this.required = true;
            this._name = name;
            break;
        }

        if (this._name.length > 3 && this._name.slice(-3) === '...') {
          this.variadic = true;
          this._name = this._name.slice(0, -3);
        }
      }

      /**
       * Return argument name.
       *
       * @return {string}
       */

      name() {
        return this._name;
      };

      /**
       * @api private
       */

      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }

        return previous.concat(value);
      }

      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {any} value
       * @param {string} [description]
       * @return {Argument}
       */

      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      };

      /**
       * Set the custom handler for processing CLI command arguments into argument values.
       *
       * @param {Function} [fn]
       * @return {Argument}
       */

      argParser(fn) {
        this.parseArg = fn;
        return this;
      };

      /**
       * Only allow option value to be one of choices.
       *
       * @param {string[]} values
       * @return {Argument}
       */

      choices(values) {
        this.argChoices = values;
        this.parseArg = (arg, previous) => {
          if (!values.includes(arg)) {
            throw new InvalidArgumentError$1(`Allowed choices are ${values.join(', ')}.`);
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      };

      /**
       * Make option-argument required.
       */
      argRequired() {
        this.required = true;
        return this;
      }

      /**
       * Make option-argument optional.
       */
      argOptional() {
        this.required = false;
        return this;
      }
    }

    /**
     * Takes an argument and returns its human readable equivalent for help usage.
     *
     * @param {Argument} arg
     * @return {string}
     * @api private
     */

    function humanReadableArgName$2(arg) {
      const nameOutput = arg.name() + (arg.variadic === true ? '...' : '');

      return arg.required
        ? '<' + nameOutput + '>'
        : '[' + nameOutput + ']';
    }

    argument.Argument = Argument$1;
    argument.humanReadableArgName = humanReadableArgName$2;

    var command = {};

    var help = {};

    const { humanReadableArgName: humanReadableArgName$1 } = argument;

    /**
     * TypeScript import types for JSDoc, used by Visual Studio Code IntelliSense and `npm run typescript-checkJS`
     * https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types
     * @typedef { import("./argument.js").Argument } Argument
     * @typedef { import("./command.js").Command } Command
     * @typedef { import("./option.js").Option } Option
     */

    // @ts-check

    // Although this is a class, methods are static in style to allow override using subclass or just functions.
    class Help$1 {
      constructor() {
        this.helpWidth = undefined;
        this.sortSubcommands = false;
        this.sortOptions = false;
      }

      /**
       * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
       *
       * @param {Command} cmd
       * @returns {Command[]}
       */

      visibleCommands(cmd) {
        const visibleCommands = cmd.commands.filter(cmd => !cmd._hidden);
        if (cmd._hasImplicitHelpCommand()) {
          // Create a command matching the implicit help command.
          const [, helpName, helpArgs] = cmd._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/);
          const helpCommand = cmd.createCommand(helpName)
            .helpOption(false);
          helpCommand.description(cmd._helpCommandDescription);
          if (helpArgs) helpCommand.arguments(helpArgs);
          visibleCommands.push(helpCommand);
        }
        if (this.sortSubcommands) {
          visibleCommands.sort((a, b) => {
            // @ts-ignore: overloaded return type
            return a.name().localeCompare(b.name());
          });
        }
        return visibleCommands;
      }

      /**
       * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */

      visibleOptions(cmd) {
        const visibleOptions = cmd.options.filter((option) => !option.hidden);
        // Implicit help
        const showShortHelpFlag = cmd._hasHelpOption && cmd._helpShortFlag && !cmd._findOption(cmd._helpShortFlag);
        const showLongHelpFlag = cmd._hasHelpOption && !cmd._findOption(cmd._helpLongFlag);
        if (showShortHelpFlag || showLongHelpFlag) {
          let helpOption;
          if (!showShortHelpFlag) {
            helpOption = cmd.createOption(cmd._helpLongFlag, cmd._helpDescription);
          } else if (!showLongHelpFlag) {
            helpOption = cmd.createOption(cmd._helpShortFlag, cmd._helpDescription);
          } else {
            helpOption = cmd.createOption(cmd._helpFlags, cmd._helpDescription);
          }
          visibleOptions.push(helpOption);
        }
        if (this.sortOptions) {
          const getSortKey = (option) => {
            // WYSIWYG for order displayed in help with short before long, no special handling for negated.
            return option.short ? option.short.replace(/^-/, '') : option.long.replace(/^--/, '');
          };
          visibleOptions.sort((a, b) => {
            return getSortKey(a).localeCompare(getSortKey(b));
          });
        }
        return visibleOptions;
      }

      /**
       * Get an array of the arguments if any have a description.
       *
       * @param {Command} cmd
       * @returns {Argument[]}
       */

      visibleArguments(cmd) {
        // Side effect! Apply the legacy descriptions before the arguments are displayed.
        if (cmd._argsDescription) {
          cmd._args.forEach(argument => {
            argument.description = argument.description || cmd._argsDescription[argument.name()] || '';
          });
        }

        // If there are any arguments with a description then return all the arguments.
        if (cmd._args.find(argument => argument.description)) {
          return cmd._args;
        }    return [];
      }

      /**
       * Get the command term to show in the list of subcommands.
       *
       * @param {Command} cmd
       * @returns {string}
       */

      subcommandTerm(cmd) {
        // Legacy. Ignores custom usage string, and nested commands.
        const args = cmd._args.map(arg => humanReadableArgName$1(arg)).join(' ');
        return cmd._name +
          (cmd._aliases[0] ? '|' + cmd._aliases[0] : '') +
          (cmd.options.length ? ' [options]' : '') + // simplistic check for non-help option
          (args ? ' ' + args : '');
      }

      /**
       * Get the option term to show in the list of options.
       *
       * @param {Option} option
       * @returns {string}
       */

      optionTerm(option) {
        return option.flags;
      }

      /**
       * Get the argument term to show in the list of arguments.
       *
       * @param {Argument} argument
       * @returns {string}
       */

      argumentTerm(argument) {
        return argument.name();
      }

      /**
       * Get the longest command term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */

      longestSubcommandTermLength(cmd, helper) {
        return helper.visibleCommands(cmd).reduce((max, command) => {
          return Math.max(max, helper.subcommandTerm(command).length);
        }, 0);
      };

      /**
       * Get the longest option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */

      longestOptionTermLength(cmd, helper) {
        return helper.visibleOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      };

      /**
       * Get the longest argument term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */

      longestArgumentTermLength(cmd, helper) {
        return helper.visibleArguments(cmd).reduce((max, argument) => {
          return Math.max(max, helper.argumentTerm(argument).length);
        }, 0);
      };

      /**
       * Get the command usage to be displayed at the top of the built-in help.
       *
       * @param {Command} cmd
       * @returns {string}
       */

      commandUsage(cmd) {
        // Usage
        let cmdName = cmd._name;
        if (cmd._aliases[0]) {
          cmdName = cmdName + '|' + cmd._aliases[0];
        }
        let parentCmdNames = '';
        for (let parentCmd = cmd.parent; parentCmd; parentCmd = parentCmd.parent) {
          parentCmdNames = parentCmd.name() + ' ' + parentCmdNames;
        }
        return parentCmdNames + cmdName + ' ' + cmd.usage();
      }

      /**
       * Get the description for the command.
       *
       * @param {Command} cmd
       * @returns {string}
       */

      commandDescription(cmd) {
        // @ts-ignore: overloaded return type
        return cmd.description();
      }

      /**
       * Get the command description to show in the list of subcommands.
       *
       * @param {Command} cmd
       * @returns {string}
       */

      subcommandDescription(cmd) {
        // @ts-ignore: overloaded return type
        return cmd.description();
      }

      /**
       * Get the option description to show in the list of options.
       *
       * @param {Option} option
       * @return {string}
       */

      optionDescription(option) {
        const extraInfo = [];
        // Some of these do not make sense for negated boolean and suppress for backwards compatibility.

        if (option.argChoices && !option.negate) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(', ')}`);
        }
        if (option.defaultValue !== undefined && !option.negate) {
          extraInfo.push(`default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`);
        }
        if (option.envVar !== undefined) {
          extraInfo.push(`env: ${option.envVar}`);
        }
        if (extraInfo.length > 0) {
          return `${option.description} (${extraInfo.join(', ')})`;
        }

        return option.description;
      };

      /**
       * Get the argument description to show in the list of arguments.
       *
       * @param {Argument} argument
       * @return {string}
       */

      argumentDescription(argument) {
        const extraInfo = [];
        if (argument.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(', ')}`);
        }
        if (argument.defaultValue !== undefined) {
          extraInfo.push(`default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`);
        }
        if (extraInfo.length > 0) {
          const extraDescripton = `(${extraInfo.join(', ')})`;
          if (argument.description) {
            return `${argument.description} ${extraDescripton}`;
          }
          return extraDescripton;
        }
        return argument.description;
      }

      /**
       * Generate the built-in help text.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {string}
       */

      formatHelp(cmd, helper) {
        const termWidth = helper.padWidth(cmd, helper);
        const helpWidth = helper.helpWidth || 80;
        const itemIndentWidth = 2;
        const itemSeparatorWidth = 2; // between term and description
        function formatItem(term, description) {
          if (description) {
            const fullText = `${term.padEnd(termWidth + itemSeparatorWidth)}${description}`;
            return helper.wrap(fullText, helpWidth - itemIndentWidth, termWidth + itemSeparatorWidth);
          }
          return term;
        }    function formatList(textArray) {
          return textArray.join('\n').replace(/^/gm, ' '.repeat(itemIndentWidth));
        }

        // Usage
        let output = [`Usage: ${helper.commandUsage(cmd)}`, ''];

        // Description
        const commandDescription = helper.commandDescription(cmd);
        if (commandDescription.length > 0) {
          output = output.concat([commandDescription, '']);
        }

        // Arguments
        const argumentList = helper.visibleArguments(cmd).map((argument) => {
          return formatItem(helper.argumentTerm(argument), helper.argumentDescription(argument));
        });
        if (argumentList.length > 0) {
          output = output.concat(['Arguments:', formatList(argumentList), '']);
        }

        // Options
        const optionList = helper.visibleOptions(cmd).map((option) => {
          return formatItem(helper.optionTerm(option), helper.optionDescription(option));
        });
        if (optionList.length > 0) {
          output = output.concat(['Options:', formatList(optionList), '']);
        }

        // Commands
        const commandList = helper.visibleCommands(cmd).map((cmd) => {
          return formatItem(helper.subcommandTerm(cmd), helper.subcommandDescription(cmd));
        });
        if (commandList.length > 0) {
          output = output.concat(['Commands:', formatList(commandList), '']);
        }

        return output.join('\n');
      }

      /**
       * Calculate the pad width from the maximum term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */

      padWidth(cmd, helper) {
        return Math.max(
          helper.longestOptionTermLength(cmd, helper),
          helper.longestSubcommandTermLength(cmd, helper),
          helper.longestArgumentTermLength(cmd, helper)
        );
      };

      /**
       * Wrap the given string to width characters per line, with lines after the first indented.
       * Do not wrap if insufficient room for wrapping (minColumnWidth), or string is manually formatted.
       *
       * @param {string} str
       * @param {number} width
       * @param {number} indent
       * @param {number} [minColumnWidth=40]
       * @return {string}
       *
       */

      wrap(str, width, indent, minColumnWidth = 40) {
        // Detect manually wrapped and indented strings by searching for line breaks
        // followed by multiple spaces/tabs.
        if (str.match(/[\n]\s+/)) return str;
        // Do not wrap if not enough room for a wrapped column of text (as could end up with a word per line).
        const columnWidth = width - indent;
        if (columnWidth < minColumnWidth) return str;

        const leadingStr = str.substr(0, indent);
        const columnText = str.substr(indent);

        const indentString = ' '.repeat(indent);
        const regex = new RegExp('.{1,' + (columnWidth - 1) + '}([\\s\u200B]|$)|[^\\s\u200B]+?([\\s\u200B]|$)', 'g');
        const lines = columnText.match(regex) || [];
        return leadingStr + lines.map((line, i) => {
          if (line.slice(-1) === '\n') {
            line = line.slice(0, line.length - 1);
          }
          return ((i > 0) ? indentString : '') + line.trimRight();
        }).join('\n');
      }
    }

    help.Help = Help$1;

    var option = {};

    const { InvalidArgumentError } = error;

    // @ts-check

    class Option$1 {
      /**
       * Initialize a new `Option` with the given `flags` and `description`.
       *
       * @param {string} flags
       * @param {string} [description]
       */

      constructor(flags, description) {
        this.flags = flags;
        this.description = description || '';

        this.required = flags.includes('<'); // A value must be supplied when the option is specified.
        this.optional = flags.includes('['); // A value is optional when the option is specified.
        // variadic test ignores <value,...> et al which might be used to describe custom splitting of single argument
        this.variadic = /\w\.\.\.[>\]]$/.test(flags); // The option can take multiple values.
        this.mandatory = false; // The option must have a value after parsing, which usually means it must be specified on command line.
        const optionFlags = splitOptionFlags$1(flags);
        this.short = optionFlags.shortFlag;
        this.long = optionFlags.longFlag;
        this.negate = false;
        if (this.long) {
          this.negate = this.long.startsWith('--no-');
        }
        this.defaultValue = undefined;
        this.defaultValueDescription = undefined;
        this.envVar = undefined;
        this.parseArg = undefined;
        this.hidden = false;
        this.argChoices = undefined;
      }

      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {any} value
       * @param {string} [description]
       * @return {Option}
       */

      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      };

      /**
       * Set environment variable to check for option value.
       * Priority order of option values is default < env < cli
       *
       * @param {string} name
       * @return {Option}
       */

      env(name) {
        this.envVar = name;
        return this;
      };

      /**
       * Set the custom handler for processing CLI option arguments into option values.
       *
       * @param {Function} [fn]
       * @return {Option}
       */

      argParser(fn) {
        this.parseArg = fn;
        return this;
      };

      /**
       * Whether the option is mandatory and must have a value after parsing.
       *
       * @param {boolean} [mandatory=true]
       * @return {Option}
       */

      makeOptionMandatory(mandatory = true) {
        this.mandatory = !!mandatory;
        return this;
      };

      /**
       * Hide option in help.
       *
       * @param {boolean} [hide=true]
       * @return {Option}
       */

      hideHelp(hide = true) {
        this.hidden = !!hide;
        return this;
      };

      /**
       * @api private
       */

      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }

        return previous.concat(value);
      }

      /**
       * Only allow option value to be one of choices.
       *
       * @param {string[]} values
       * @return {Option}
       */

      choices(values) {
        this.argChoices = values;
        this.parseArg = (arg, previous) => {
          if (!values.includes(arg)) {
            throw new InvalidArgumentError(`Allowed choices are ${values.join(', ')}.`);
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      };

      /**
       * Return option name.
       *
       * @return {string}
       */

      name() {
        if (this.long) {
          return this.long.replace(/^--/, '');
        }
        return this.short.replace(/^-/, '');
      };

      /**
       * Return option name, in a camelcase format that can be used
       * as a object attribute key.
       *
       * @return {string}
       * @api private
       */

      attributeName() {
        return camelcase(this.name().replace(/^no-/, ''));
      };

      /**
       * Check if `arg` matches the short or long flag.
       *
       * @param {string} arg
       * @return {boolean}
       * @api private
       */

      is(arg) {
        return this.short === arg || this.long === arg;
      };
    }

    /**
     * Convert string from kebab-case to camelCase.
     *
     * @param {string} str
     * @return {string}
     * @api private
     */

    function camelcase(str) {
      return str.split('-').reduce((str, word) => {
        return str + word[0].toUpperCase() + word.slice(1);
      });
    }

    /**
     * Split the short and long flag out of something like '-m,--mixed <value>'
     *
     * @api private
     */

    function splitOptionFlags$1(flags) {
      let shortFlag;
      let longFlag;
      // Use original very loose parsing to maintain backwards compatibility for now,
      // which allowed for example unintended `-sw, --short-word` [sic].
      const flagParts = flags.split(/[ |,]+/);
      if (flagParts.length > 1 && !/^[[<]/.test(flagParts[1])) shortFlag = flagParts.shift();
      longFlag = flagParts.shift();
      // Add support for lone short flag without significantly changing parsing!
      if (!shortFlag && /^-[^-]$/.test(longFlag)) {
        shortFlag = longFlag;
        longFlag = undefined;
      }
      return { shortFlag, longFlag };
    }

    option.Option = Option$1;
    option.splitOptionFlags = splitOptionFlags$1;

    var suggestSimilar$2 = {};

    const maxDistance = 3;

    function editDistance(a, b) {
      // https://en.wikipedia.org/wiki/Damerau–Levenshtein_distance
      // Calculating optimal string alignment distance, no substring is edited more than once.
      // (Simple implementation.)

      // Quick early exit, return worst case.
      if (Math.abs(a.length - b.length) > maxDistance) return Math.max(a.length, b.length);

      // distance between prefix substrings of a and b
      const d = [];

      // pure deletions turn a into empty string
      for (let i = 0; i <= a.length; i++) {
        d[i] = [i];
      }
      // pure insertions turn empty string into b
      for (let j = 0; j <= b.length; j++) {
        d[0][j] = j;
      }

      // fill matrix
      for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
          let cost = 1;
          if (a[i - 1] === b[j - 1]) {
            cost = 0;
          } else {
            cost = 1;
          }
          d[i][j] = Math.min(
            d[i - 1][j] + 1, // deletion
            d[i][j - 1] + 1, // insertion
            d[i - 1][j - 1] + cost // substitution
          );
          // transposition
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
            d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
          }
        }
      }

      return d[a.length][b.length];
    }

    /**
     * Find close matches, restricted to same number of edits.
     *
     * @param {string} word
     * @param {string[]} candidates
     * @returns {string}
     */

    function suggestSimilar$1(word, candidates) {
      if (!candidates || candidates.length === 0) return '';
      // remove possible duplicates
      candidates = Array.from(new Set(candidates));

      const searchingOptions = word.startsWith('--');
      if (searchingOptions) {
        word = word.slice(2);
        candidates = candidates.map(candidate => candidate.slice(2));
      }

      let similar = [];
      let bestDistance = maxDistance;
      const minSimilarity = 0.4;
      candidates.forEach((candidate) => {
        if (candidate.length <= 1) return; // no one character guesses

        const distance = editDistance(word, candidate);
        const length = Math.max(word.length, candidate.length);
        const similarity = (length - distance) / length;
        if (similarity > minSimilarity) {
          if (distance < bestDistance) {
            // better edit distance, throw away previous worse matches
            bestDistance = distance;
            similar = [candidate];
          } else if (distance === bestDistance) {
            similar.push(candidate);
          }
        }
      });

      similar.sort((a, b) => a.localeCompare(b));
      if (searchingOptions) {
        similar = similar.map(candidate => `--${candidate}`);
      }

      if (similar.length > 1) {
        return `\n(Did you mean one of ${similar.join(', ')}?)`;
      }
      if (similar.length === 1) {
        return `\n(Did you mean ${similar[0]}?)`;
      }
      return '';
    }

    suggestSimilar$2.suggestSimilar = suggestSimilar$1;

    const EventEmitter = require$$0__default["default"].EventEmitter;
    const childProcess = cp__default["default"];
    const path = require$$1__default$1["default"];
    const fs = require$$0__default$7["default"];

    const { Argument, humanReadableArgName } = argument;
    const { CommanderError } = error;
    const { Help } = help;
    const { Option, splitOptionFlags } = option;
    const { suggestSimilar } = suggestSimilar$2;

    // @ts-check

    class Command extends EventEmitter {
      /**
       * Initialize a new `Command`.
       *
       * @param {string} [name]
       */

      constructor(name) {
        super();
        /** @type {Command[]} */
        this.commands = [];
        /** @type {Option[]} */
        this.options = [];
        this.parent = null;
        this._allowUnknownOption = false;
        this._allowExcessArguments = true;
        /** @type {Argument[]} */
        this._args = [];
        /** @type {string[]} */
        this.args = []; // cli args with options removed
        this.rawArgs = [];
        this.processedArgs = []; // like .args but after custom processing and collecting variadic
        this._scriptPath = null;
        this._name = name || '';
        this._optionValues = {};
        this._optionValueSources = {}; // default < config < env < cli
        this._storeOptionsAsProperties = false;
        this._actionHandler = null;
        this._executableHandler = false;
        this._executableFile = null; // custom name for executable
        this._defaultCommandName = null;
        this._exitCallback = null;
        this._aliases = [];
        this._combineFlagAndOptionalValue = true;
        this._description = '';
        this._argsDescription = undefined; // legacy
        this._enablePositionalOptions = false;
        this._passThroughOptions = false;
        this._lifeCycleHooks = {}; // a hash of arrays
        /** @type {boolean | string} */
        this._showHelpAfterError = false;
        this._showSuggestionAfterError = false;

        // see .configureOutput() for docs
        this._outputConfiguration = {
          writeOut: (str) => process.stdout.write(str),
          writeErr: (str) => process.stderr.write(str),
          getOutHelpWidth: () => process.stdout.isTTY ? process.stdout.columns : undefined,
          getErrHelpWidth: () => process.stderr.isTTY ? process.stderr.columns : undefined,
          outputError: (str, write) => write(str)
        };

        this._hidden = false;
        this._hasHelpOption = true;
        this._helpFlags = '-h, --help';
        this._helpDescription = 'display help for command';
        this._helpShortFlag = '-h';
        this._helpLongFlag = '--help';
        this._addImplicitHelpCommand = undefined; // Deliberately undefined, not decided whether true or false
        this._helpCommandName = 'help';
        this._helpCommandnameAndArgs = 'help [command]';
        this._helpCommandDescription = 'display help for command';
        this._helpConfiguration = {};
      }

      /**
       * Copy settings that are useful to have in common across root command and subcommands.
       *
       * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
       *
       * @param {Command} sourceCommand
       * @return {Command} returns `this` for executable command
       */
      copyInheritedSettings(sourceCommand) {
        this._outputConfiguration = sourceCommand._outputConfiguration;
        this._hasHelpOption = sourceCommand._hasHelpOption;
        this._helpFlags = sourceCommand._helpFlags;
        this._helpDescription = sourceCommand._helpDescription;
        this._helpShortFlag = sourceCommand._helpShortFlag;
        this._helpLongFlag = sourceCommand._helpLongFlag;
        this._helpCommandName = sourceCommand._helpCommandName;
        this._helpCommandnameAndArgs = sourceCommand._helpCommandnameAndArgs;
        this._helpCommandDescription = sourceCommand._helpCommandDescription;
        this._helpConfiguration = sourceCommand._helpConfiguration;
        this._exitCallback = sourceCommand._exitCallback;
        this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
        this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
        this._allowExcessArguments = sourceCommand._allowExcessArguments;
        this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
        this._showHelpAfterError = sourceCommand._showHelpAfterError;
        this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;

        return this;
      }

      /**
       * Define a command.
       *
       * There are two styles of command: pay attention to where to put the description.
       *
       * @example
       * // Command implemented using action handler (description is supplied separately to `.command`)
       * program
       *   .command('clone <source> [destination]')
       *   .description('clone a repository into a newly created directory')
       *   .action((source, destination) => {
       *     console.log('clone command called');
       *   });
       *
       * // Command implemented using separate executable file (description is second parameter to `.command`)
       * program
       *   .command('start <service>', 'start named service')
       *   .command('stop [service]', 'stop named service, or all if no name supplied');
       *
       * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
       * @param {Object|string} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
       * @param {Object} [execOpts] - configuration options (for executable)
       * @return {Command} returns new command for action handler, or `this` for executable command
       */

      command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
        let desc = actionOptsOrExecDesc;
        let opts = execOpts;
        if (typeof desc === 'object' && desc !== null) {
          opts = desc;
          desc = null;
        }
        opts = opts || {};
        const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);

        const cmd = this.createCommand(name);
        if (desc) {
          cmd.description(desc);
          cmd._executableHandler = true;
        }
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        cmd._hidden = !!(opts.noHelp || opts.hidden); // noHelp is deprecated old name for hidden
        cmd._executableFile = opts.executableFile || null; // Custom name for executable file, set missing to null to match constructor
        if (args) cmd.arguments(args);
        this.commands.push(cmd);
        cmd.parent = this;
        cmd.copyInheritedSettings(this);

        if (desc) return this;
        return cmd;
      };

      /**
       * Factory routine to create a new unattached command.
       *
       * See .command() for creating an attached subcommand, which uses this routine to
       * create the command. You can override createCommand to customise subcommands.
       *
       * @param {string} [name]
       * @return {Command} new command
       */

      createCommand(name) {
        return new Command(name);
      };

      /**
       * You can customise the help with a subclass of Help by overriding createHelp,
       * or by overriding Help properties using configureHelp().
       *
       * @return {Help}
       */

      createHelp() {
        return Object.assign(new Help(), this.configureHelp());
      };

      /**
       * You can customise the help by overriding Help properties using configureHelp(),
       * or with a subclass of Help by overriding createHelp().
       *
       * @param {Object} [configuration] - configuration options
       * @return {Command|Object} `this` command for chaining, or stored configuration
       */

      configureHelp(configuration) {
        if (configuration === undefined) return this._helpConfiguration;

        this._helpConfiguration = configuration;
        return this;
      }

      /**
       * The default output goes to stdout and stderr. You can customise this for special
       * applications. You can also customise the display of errors by overriding outputError.
       *
       * The configuration properties are all functions:
       *
       *     // functions to change where being written, stdout and stderr
       *     writeOut(str)
       *     writeErr(str)
       *     // matching functions to specify width for wrapping help
       *     getOutHelpWidth()
       *     getErrHelpWidth()
       *     // functions based on what is being written out
       *     outputError(str, write) // used for displaying errors, and not used for displaying help
       *
       * @param {Object} [configuration] - configuration options
       * @return {Command|Object} `this` command for chaining, or stored configuration
       */

      configureOutput(configuration) {
        if (configuration === undefined) return this._outputConfiguration;

        Object.assign(this._outputConfiguration, configuration);
        return this;
      }

      /**
       * Display the help or a custom message after an error occurs.
       *
       * @param {boolean|string} [displayHelp]
       * @return {Command} `this` command for chaining
       */
      showHelpAfterError(displayHelp = true) {
        if (typeof displayHelp !== 'string') displayHelp = !!displayHelp;
        this._showHelpAfterError = displayHelp;
        return this;
      }

      /**
       * Display suggestion of similar commands for unknown commands, or options for unknown options.
       *
       * @param {boolean} [displaySuggestion]
       * @return {Command} `this` command for chaining
       */
      showSuggestionAfterError(displaySuggestion = true) {
        this._showSuggestionAfterError = !!displaySuggestion;
        return this;
      }

      /**
       * Add a prepared subcommand.
       *
       * See .command() for creating an attached subcommand which inherits settings from its parent.
       *
       * @param {Command} cmd - new subcommand
       * @param {Object} [opts] - configuration options
       * @return {Command} `this` command for chaining
       */

      addCommand(cmd, opts) {
        if (!cmd._name) throw new Error('Command passed to .addCommand() must have a name');

        // To keep things simple, block automatic name generation for deeply nested executables.
        // Fail fast and detect when adding rather than later when parsing.
        function checkExplicitNames(commandArray) {
          commandArray.forEach((cmd) => {
            if (cmd._executableHandler && !cmd._executableFile) {
              throw new Error(`Must specify executableFile for deeply nested executable: ${cmd.name()}`);
            }
            checkExplicitNames(cmd.commands);
          });
        }
        checkExplicitNames(cmd.commands);

        opts = opts || {};
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        if (opts.noHelp || opts.hidden) cmd._hidden = true; // modifying passed command due to existing implementation

        this.commands.push(cmd);
        cmd.parent = this;
        return this;
      };

      /**
       * Factory routine to create a new unattached argument.
       *
       * See .argument() for creating an attached argument, which uses this routine to
       * create the argument. You can override createArgument to return a custom argument.
       *
       * @param {string} name
       * @param {string} [description]
       * @return {Argument} new argument
       */

      createArgument(name, description) {
        return new Argument(name, description);
      };

      /**
       * Define argument syntax for command.
       *
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @example
       * program.argument('<input-file>');
       * program.argument('[output-file]');
       *
       * @param {string} name
       * @param {string} [description]
       * @param {Function|*} [fn] - custom argument processing function
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      argument(name, description, fn, defaultValue) {
        const argument = this.createArgument(name, description);
        if (typeof fn === 'function') {
          argument.default(defaultValue).argParser(fn);
        } else {
          argument.default(fn);
        }
        this.addArgument(argument);
        return this;
      }

      /**
       * Define argument syntax for command, adding multiple at once (without descriptions).
       *
       * See also .argument().
       *
       * @example
       * program.arguments('<cmd> [env]');
       *
       * @param {string} names
       * @return {Command} `this` command for chaining
       */

      arguments(names) {
        names.split(/ +/).forEach((detail) => {
          this.argument(detail);
        });
        return this;
      };

      /**
       * Define argument syntax for command, adding a prepared argument.
       *
       * @param {Argument} argument
       * @return {Command} `this` command for chaining
       */
      addArgument(argument) {
        const previousArgument = this._args.slice(-1)[0];
        if (previousArgument && previousArgument.variadic) {
          throw new Error(`only the last argument can be variadic '${previousArgument.name()}'`);
        }
        if (argument.required && argument.defaultValue !== undefined && argument.parseArg === undefined) {
          throw new Error(`a default value for a required argument is never used: '${argument.name()}'`);
        }
        this._args.push(argument);
        return this;
      }

      /**
       * Override default decision whether to add implicit help command.
       *
       *    addHelpCommand() // force on
       *    addHelpCommand(false); // force off
       *    addHelpCommand('help [cmd]', 'display help for [cmd]'); // force on with custom details
       *
       * @return {Command} `this` command for chaining
       */

      addHelpCommand(enableOrNameAndArgs, description) {
        if (enableOrNameAndArgs === false) {
          this._addImplicitHelpCommand = false;
        } else {
          this._addImplicitHelpCommand = true;
          if (typeof enableOrNameAndArgs === 'string') {
            this._helpCommandName = enableOrNameAndArgs.split(' ')[0];
            this._helpCommandnameAndArgs = enableOrNameAndArgs;
          }
          this._helpCommandDescription = description || this._helpCommandDescription;
        }
        return this;
      };

      /**
       * @return {boolean}
       * @api private
       */

      _hasImplicitHelpCommand() {
        if (this._addImplicitHelpCommand === undefined) {
          return this.commands.length && !this._actionHandler && !this._findCommand('help');
        }
        return this._addImplicitHelpCommand;
      };

      /**
       * Add hook for life cycle event.
       *
       * @param {string} event
       * @param {Function} listener
       * @return {Command} `this` command for chaining
       */

      hook(event, listener) {
        const allowedValues = ['preAction', 'postAction'];
        if (!allowedValues.includes(event)) {
          throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        if (this._lifeCycleHooks[event]) {
          this._lifeCycleHooks[event].push(listener);
        } else {
          this._lifeCycleHooks[event] = [listener];
        }
        return this;
      }

      /**
       * Register callback to use as replacement for calling process.exit.
       *
       * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
       * @return {Command} `this` command for chaining
       */

      exitOverride(fn) {
        if (fn) {
          this._exitCallback = fn;
        } else {
          this._exitCallback = (err) => {
            if (err.code !== 'commander.executeSubCommandAsync') {
              throw err;
            }
          };
        }
        return this;
      };

      /**
       * Call process.exit, and _exitCallback if defined.
       *
       * @param {number} exitCode exit code for using with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @return never
       * @api private
       */

      _exit(exitCode, code, message) {
        if (this._exitCallback) {
          this._exitCallback(new CommanderError(exitCode, code, message));
          // Expecting this line is not reached.
        }
        process.exit(exitCode);
      };

      /**
       * Register callback `fn` for the command.
       *
       * @example
       * program
       *   .command('serve')
       *   .description('start service')
       *   .action(function() {
       *      // do work here
       *   });
       *
       * @param {Function} fn
       * @return {Command} `this` command for chaining
       */

      action(fn) {
        const listener = (args) => {
          // The .action callback takes an extra parameter which is the command or options.
          const expectedArgsCount = this._args.length;
          const actionArgs = args.slice(0, expectedArgsCount);
          if (this._storeOptionsAsProperties) {
            actionArgs[expectedArgsCount] = this; // backwards compatible "options"
          } else {
            actionArgs[expectedArgsCount] = this.opts();
          }
          actionArgs.push(this);

          return fn.apply(this, actionArgs);
        };
        this._actionHandler = listener;
        return this;
      };

      /**
       * Factory routine to create a new unattached option.
       *
       * See .option() for creating an attached option, which uses this routine to
       * create the option. You can override createOption to return a custom option.
       *
       * @param {string} flags
       * @param {string} [description]
       * @return {Option} new option
       */

      createOption(flags, description) {
        return new Option(flags, description);
      };

      /**
       * Add an option.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addOption(option) {
        const oname = option.name();
        const name = option.attributeName();

        let defaultValue = option.defaultValue;

        // preassign default value for --no-*, [optional], <required>, or plain flag if boolean value
        if (option.negate || option.optional || option.required || typeof defaultValue === 'boolean') {
          // when --no-foo we make sure default is true, unless a --foo option is already defined
          if (option.negate) {
            const positiveLongFlag = option.long.replace(/^--no-/, '--');
            defaultValue = this._findOption(positiveLongFlag) ? this.getOptionValue(name) : true;
          }
          // preassign only if we have a default
          if (defaultValue !== undefined) {
            this.setOptionValueWithSource(name, defaultValue, 'default');
          }
        }

        // register the option
        this.options.push(option);

        // handler for cli and env supplied values
        const handleOptionValue = (val, invalidValueMessage, valueSource) => {
          // Note: using closure to access lots of lexical scoped variables.
          const oldValue = this.getOptionValue(name);

          // custom processing
          if (val !== null && option.parseArg) {
            try {
              val = option.parseArg(val, oldValue === undefined ? defaultValue : oldValue);
            } catch (err) {
              if (err.code === 'commander.invalidArgument') {
                const message = `${invalidValueMessage} ${err.message}`;
                this._displayError(err.exitCode, err.code, message);
              }
              throw err;
            }
          } else if (val !== null && option.variadic) {
            val = option._concatValue(val, oldValue);
          }

          // unassigned or boolean value
          if (typeof oldValue === 'boolean' || typeof oldValue === 'undefined') {
            // if no value, negate false, and we have a default, then use it!
            if (val == null) {
              this.setOptionValueWithSource(name, option.negate ? false : defaultValue || true, valueSource);
            } else {
              this.setOptionValueWithSource(name, val, valueSource);
            }
          } else if (val !== null) {
            // reassign
            this.setOptionValueWithSource(name, option.negate ? false : val, valueSource);
          }
        };

        this.on('option:' + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
          handleOptionValue(val, invalidValueMessage, 'cli');
        });

        if (option.envVar) {
          this.on('optionEnv:' + oname, (val) => {
            const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, 'env');
          });
        }

        return this;
      }

      /**
       * Internal implementation shared by .option() and .requiredOption()
       *
       * @api private
       */
      _optionEx(config, flags, description, fn, defaultValue) {
        const option = this.createOption(flags, description);
        option.makeOptionMandatory(!!config.mandatory);
        if (typeof fn === 'function') {
          option.default(defaultValue).argParser(fn);
        } else if (fn instanceof RegExp) {
          // deprecated
          const regex = fn;
          fn = (val, def) => {
            const m = regex.exec(val);
            return m ? m[0] : def;
          };
          option.default(defaultValue).argParser(fn);
        } else {
          option.default(fn);
        }

        return this.addOption(option);
      }

      /**
       * Define option with `flags`, `description` and optional
       * coercion `fn`.
       *
       * The `flags` string contains the short and/or long flags,
       * separated by comma, a pipe or space. The following are all valid
       * all will output this way when `--help` is used.
       *
       *     "-p, --pepper"
       *     "-p|--pepper"
       *     "-p --pepper"
       *
       * @example
       * // simple boolean defaulting to undefined
       * program.option('-p, --pepper', 'add pepper');
       *
       * program.pepper
       * // => undefined
       *
       * --pepper
       * program.pepper
       * // => true
       *
       * // simple boolean defaulting to true (unless non-negated option is also defined)
       * program.option('-C, --no-cheese', 'remove cheese');
       *
       * program.cheese
       * // => true
       *
       * --no-cheese
       * program.cheese
       * // => false
       *
       * // required argument
       * program.option('-C, --chdir <path>', 'change the working directory');
       *
       * --chdir /tmp
       * program.chdir
       * // => "/tmp"
       *
       * // optional argument
       * program.option('-c, --cheese [type]', 'add cheese [marble]');
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {Function|*} [fn] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */

      option(flags, description, fn, defaultValue) {
        return this._optionEx({}, flags, description, fn, defaultValue);
      };

      /**
      * Add a required option which must have a value after parsing. This usually means
      * the option must be specified on the command line. (Otherwise the same as .option().)
      *
      * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
      *
      * @param {string} flags
      * @param {string} [description]
      * @param {Function|*} [fn] - custom option processing function or default value
      * @param {*} [defaultValue]
      * @return {Command} `this` command for chaining
      */

      requiredOption(flags, description, fn, defaultValue) {
        return this._optionEx({ mandatory: true }, flags, description, fn, defaultValue);
      };

      /**
       * Alter parsing of short flags with optional values.
       *
       * @example
       * // for `.option('-f,--flag [value]'):
       * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
       * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
       *
       * @param {Boolean} [combine=true] - if `true` or omitted, an optional value can be specified directly after the flag.
       */
      combineFlagAndOptionalValue(combine = true) {
        this._combineFlagAndOptionalValue = !!combine;
        return this;
      };

      /**
       * Allow unknown options on the command line.
       *
       * @param {Boolean} [allowUnknown=true] - if `true` or omitted, no error will be thrown
       * for unknown options.
       */
      allowUnknownOption(allowUnknown = true) {
        this._allowUnknownOption = !!allowUnknown;
        return this;
      };

      /**
       * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
       *
       * @param {Boolean} [allowExcess=true] - if `true` or omitted, no error will be thrown
       * for excess arguments.
       */
      allowExcessArguments(allowExcess = true) {
        this._allowExcessArguments = !!allowExcess;
        return this;
      };

      /**
       * Enable positional options. Positional means global options are specified before subcommands which lets
       * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
       * The default behaviour is non-positional and global options may appear anywhere on the command line.
       *
       * @param {Boolean} [positional=true]
       */
      enablePositionalOptions(positional = true) {
        this._enablePositionalOptions = !!positional;
        return this;
      };

      /**
       * Pass through options that come after command-arguments rather than treat them as command-options,
       * so actual command-options come before command-arguments. Turning this on for a subcommand requires
       * positional options to have been enabled on the program (parent commands).
       * The default behaviour is non-positional and options may appear before or after command-arguments.
       *
       * @param {Boolean} [passThrough=true]
       * for unknown options.
       */
      passThroughOptions(passThrough = true) {
        this._passThroughOptions = !!passThrough;
        if (!!this.parent && passThrough && !this.parent._enablePositionalOptions) {
          throw new Error('passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)');
        }
        return this;
      };

      /**
        * Whether to store option values as properties on command object,
        * or store separately (specify false). In both cases the option values can be accessed using .opts().
        *
        * @param {boolean} [storeAsProperties=true]
        * @return {Command} `this` command for chaining
        */

      storeOptionsAsProperties(storeAsProperties = true) {
        this._storeOptionsAsProperties = !!storeAsProperties;
        if (this.options.length) {
          throw new Error('call .storeOptionsAsProperties() before adding options');
        }
        return this;
      };

      /**
       * Retrieve option value.
       *
       * @param {string} key
       * @return {Object} value
       */

      getOptionValue(key) {
        if (this._storeOptionsAsProperties) {
          return this[key];
        }
        return this._optionValues[key];
      };

      /**
       * Store option value.
       *
       * @param {string} key
       * @param {Object} value
       * @return {Command} `this` command for chaining
       */

      setOptionValue(key, value) {
        if (this._storeOptionsAsProperties) {
          this[key] = value;
        } else {
          this._optionValues[key] = value;
        }
        return this;
      };

      /**
       * Store option value and where the value came from.
        *
        * @param {string} key
        * @param {Object} value
        * @param {string} source - expected values are default/config/env/cli
        * @return {Command} `this` command for chaining
        */

      setOptionValueWithSource(key, value, source) {
        this.setOptionValue(key, value);
        this._optionValueSources[key] = source;
        return this;
      }

      /**
        * Get source of option value.
        * Expected values are default | config | env | cli
        *
        * @param {string} key
        * @return {string}
        */

      getOptionValueSource(key) {
        return this._optionValueSources[key];
      };

      /**
       * Get user arguments implied or explicit arguments.
       * Side-effects: set _scriptPath if args included application, and use that to set implicit command name.
       *
       * @api private
       */

      _prepareUserArgs(argv, parseOptions) {
        if (argv !== undefined && !Array.isArray(argv)) {
          throw new Error('first parameter to parse must be array or undefined');
        }
        parseOptions = parseOptions || {};

        // Default to using process.argv
        if (argv === undefined) {
          argv = process.argv;
          // @ts-ignore: unknown property
          if (process.versions && process.versions.electron) {
            parseOptions.from = 'electron';
          }
        }
        this.rawArgs = argv.slice();

        // make it a little easier for callers by supporting various argv conventions
        let userArgs;
        switch (parseOptions.from) {
          case undefined:
          case 'node':
            this._scriptPath = argv[1];
            userArgs = argv.slice(2);
            break;
          case 'electron':
            // @ts-ignore: unknown property
            if (process.defaultApp) {
              this._scriptPath = argv[1];
              userArgs = argv.slice(2);
            } else {
              userArgs = argv.slice(1);
            }
            break;
          case 'user':
            userArgs = argv.slice(0);
            break;
          default:
            throw new Error(`unexpected parse option { from: '${parseOptions.from}' }`);
        }
        if (!this._scriptPath && require.main) {
          this._scriptPath = require.main.filename;
        }

        // Guess name, used in usage in help.
        this._name = this._name || (this._scriptPath && path.basename(this._scriptPath, path.extname(this._scriptPath)));

        return userArgs;
      }

      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * The default expectation is that the arguments are from node and have the application as argv[0]
       * and the script being run in argv[1], with user parameters after that.
       *
       * @example
       * program.parse(process.argv);
       * program.parse(); // implicitly use process.argv and auto-detect node vs electron conventions
       * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv] - optional, defaults to process.argv
       * @param {Object} [parseOptions] - optionally specify style of options with from: node/user/electron
       * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
       * @return {Command} `this` command for chaining
       */

      parse(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        this._parseCommand([], userArgs);

        return this;
      };

      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Use parseAsync instead of parse if any of your action handlers are async. Returns a Promise.
       *
       * The default expectation is that the arguments are from node and have the application as argv[0]
       * and the script being run in argv[1], with user parameters after that.
       *
       * @example
       * await program.parseAsync(process.argv);
       * await program.parseAsync(); // implicitly use process.argv and auto-detect node vs electron conventions
       * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv]
       * @param {Object} [parseOptions]
       * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
       * @return {Promise}
       */

      async parseAsync(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        await this._parseCommand([], userArgs);

        return this;
      };

      /**
       * Execute a sub-command executable.
       *
       * @api private
       */

      _executeSubCommand(subcommand, args) {
        args = args.slice();
        let launchWithNode = false; // Use node for source targets so do not need to get permissions correct, and on Windows.
        const sourceExt = ['.js', '.ts', '.tsx', '.mjs', '.cjs'];

        // Not checking for help first. Unlikely to have mandatory and executable, and can't robustly test for help flags in external command.
        this._checkForMissingMandatoryOptions();

        // Want the entry script as the reference for command name and directory for searching for other files.
        let scriptPath = this._scriptPath;
        // Fallback in case not set, due to how Command created or called.
        if (!scriptPath && require.main) {
          scriptPath = require.main.filename;
        }

        let baseDir;
        try {
          const resolvedLink = fs.realpathSync(scriptPath);
          baseDir = path.dirname(resolvedLink);
        } catch (e) {
          baseDir = '.'; // dummy, probably not going to find executable!
        }

        // name of the subcommand, like `pm-install`
        let bin = path.basename(scriptPath, path.extname(scriptPath)) + '-' + subcommand._name;
        if (subcommand._executableFile) {
          bin = subcommand._executableFile;
        }

        const localBin = path.join(baseDir, bin);
        if (fs.existsSync(localBin)) {
          // prefer local `./<bin>` to bin in the $PATH
          bin = localBin;
        } else {
          // Look for source files.
          sourceExt.forEach((ext) => {
            if (fs.existsSync(`${localBin}${ext}`)) {
              bin = `${localBin}${ext}`;
            }
          });
        }
        launchWithNode = sourceExt.includes(path.extname(bin));

        let proc;
        if (process.platform !== 'win32') {
          if (launchWithNode) {
            args.unshift(bin);
            // add executable arguments to spawn
            args = incrementNodeInspectorPort(process.execArgv).concat(args);

            proc = childProcess.spawn(process.argv[0], args, { stdio: 'inherit' });
          } else {
            proc = childProcess.spawn(bin, args, { stdio: 'inherit' });
          }
        } else {
          args.unshift(bin);
          // add executable arguments to spawn
          args = incrementNodeInspectorPort(process.execArgv).concat(args);
          proc = childProcess.spawn(process.execPath, args, { stdio: 'inherit' });
        }

        const signals = ['SIGUSR1', 'SIGUSR2', 'SIGTERM', 'SIGINT', 'SIGHUP'];
        signals.forEach((signal) => {
          // @ts-ignore
          process.on(signal, () => {
            if (proc.killed === false && proc.exitCode === null) {
              proc.kill(signal);
            }
          });
        });

        // By default terminate process when spawned process terminates.
        // Suppressing the exit if exitCallback defined is a bit messy and of limited use, but does allow process to stay running!
        const exitCallback = this._exitCallback;
        if (!exitCallback) {
          proc.on('close', process.exit.bind(process));
        } else {
          proc.on('close', () => {
            exitCallback(new CommanderError(process.exitCode || 0, 'commander.executeSubCommandAsync', '(close)'));
          });
        }
        proc.on('error', (err) => {
          // @ts-ignore
          if (err.code === 'ENOENT') {
            const executableMissing = `'${bin}' does not exist
 - if '${subcommand._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name`;
            throw new Error(executableMissing);
          // @ts-ignore
          } else if (err.code === 'EACCES') {
            throw new Error(`'${bin}' not executable`);
          }
          if (!exitCallback) {
            process.exit(1);
          } else {
            const wrappedError = new CommanderError(1, 'commander.executeSubCommandAsync', '(error)');
            wrappedError.nestedError = err;
            exitCallback(wrappedError);
          }
        });

        // Store the reference to the child process
        this.runningCommand = proc;
      };

      /**
       * @api private
       */

      _dispatchSubcommand(commandName, operands, unknown) {
        const subCommand = this._findCommand(commandName);
        if (!subCommand) this.help({ error: true });

        if (subCommand._executableHandler) {
          this._executeSubCommand(subCommand, operands.concat(unknown));
        } else {
          return subCommand._parseCommand(operands, unknown);
        }
      };

      /**
       * Check this.args against expected this._args.
       *
       * @api private
       */

      _checkNumberOfArguments() {
        // too few
        this._args.forEach((arg, i) => {
          if (arg.required && this.args[i] == null) {
            this.missingArgument(arg.name());
          }
        });
        // too many
        if (this._args.length > 0 && this._args[this._args.length - 1].variadic) {
          return;
        }
        if (this.args.length > this._args.length) {
          this._excessArguments(this.args);
        }
      };

      /**
       * Process this.args using this._args and save as this.processedArgs!
       *
       * @api private
       */

      _processArguments() {
        const myParseArg = (argument, value, previous) => {
          // Extra processing for nice error message on parsing failure.
          let parsedValue = value;
          if (value !== null && argument.parseArg) {
            try {
              parsedValue = argument.parseArg(value, previous);
            } catch (err) {
              if (err.code === 'commander.invalidArgument') {
                const message = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'. ${err.message}`;
                this._displayError(err.exitCode, err.code, message);
              }
              throw err;
            }
          }
          return parsedValue;
        };

        this._checkNumberOfArguments();

        const processedArgs = [];
        this._args.forEach((declaredArg, index) => {
          let value = declaredArg.defaultValue;
          if (declaredArg.variadic) {
            // Collect together remaining arguments for passing together as an array.
            if (index < this.args.length) {
              value = this.args.slice(index);
              if (declaredArg.parseArg) {
                value = value.reduce((processed, v) => {
                  return myParseArg(declaredArg, v, processed);
                }, declaredArg.defaultValue);
              }
            } else if (value === undefined) {
              value = [];
            }
          } else if (index < this.args.length) {
            value = this.args[index];
            if (declaredArg.parseArg) {
              value = myParseArg(declaredArg, value, declaredArg.defaultValue);
            }
          }
          processedArgs[index] = value;
        });
        this.processedArgs = processedArgs;
      }

      /**
       * Once we have a promise we chain, but call synchronously until then.
       *
       * @param {Promise|undefined} promise
       * @param {Function} fn
       * @return {Promise|undefined}
       * @api private
       */

      _chainOrCall(promise, fn) {
        // thenable
        if (promise && promise.then && typeof promise.then === 'function') {
          // already have a promise, chain callback
          return promise.then(() => fn());
        }
        // callback might return a promise
        return fn();
      }

      /**
       *
       * @param {Promise|undefined} promise
       * @param {string} event
       * @return {Promise|undefined}
       * @api private
       */

      _chainOrCallHooks(promise, event) {
        let result = promise;
        const hooks = [];
        getCommandAndParents(this)
          .reverse()
          .filter(cmd => cmd._lifeCycleHooks[event] !== undefined)
          .forEach(hookedCommand => {
            hookedCommand._lifeCycleHooks[event].forEach((callback) => {
              hooks.push({ hookedCommand, callback });
            });
          });
        if (event === 'postAction') {
          hooks.reverse();
        }

        hooks.forEach((hookDetail) => {
          result = this._chainOrCall(result, () => {
            return hookDetail.callback(hookDetail.hookedCommand, this);
          });
        });
        return result;
      }

      /**
       * Process arguments in context of this command.
       * Returns action result, in case it is a promise.
       *
       * @api private
       */

      _parseCommand(operands, unknown) {
        const parsed = this.parseOptions(unknown);
        this._parseOptionsEnv(); // after cli, so parseArg not called on both cli and env
        operands = operands.concat(parsed.operands);
        unknown = parsed.unknown;
        this.args = operands.concat(unknown);

        if (operands && this._findCommand(operands[0])) {
          return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
        }
        if (this._hasImplicitHelpCommand() && operands[0] === this._helpCommandName) {
          if (operands.length === 1) {
            this.help();
          }
          return this._dispatchSubcommand(operands[1], [], [this._helpLongFlag]);
        }
        if (this._defaultCommandName) {
          outputHelpIfRequested(this, unknown); // Run the help for default command from parent rather than passing to default command
          return this._dispatchSubcommand(this._defaultCommandName, operands, unknown);
        }
        if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
          // probably missing subcommand and no handler, user needs help (and exit)
          this.help({ error: true });
        }

        outputHelpIfRequested(this, parsed.unknown);
        this._checkForMissingMandatoryOptions();

        // We do not always call this check to avoid masking a "better" error, like unknown command.
        const checkForUnknownOptions = () => {
          if (parsed.unknown.length > 0) {
            this.unknownOption(parsed.unknown[0]);
          }
        };

        const commandEvent = `command:${this.name()}`;
        if (this._actionHandler) {
          checkForUnknownOptions();
          this._processArguments();

          let actionResult;
          actionResult = this._chainOrCallHooks(actionResult, 'preAction');
          actionResult = this._chainOrCall(actionResult, () => this._actionHandler(this.processedArgs));
          if (this.parent) this.parent.emit(commandEvent, operands, unknown); // legacy
          actionResult = this._chainOrCallHooks(actionResult, 'postAction');
          return actionResult;
        }
        if (this.parent && this.parent.listenerCount(commandEvent)) {
          checkForUnknownOptions();
          this._processArguments();
          this.parent.emit(commandEvent, operands, unknown); // legacy
        } else if (operands.length) {
          if (this._findCommand('*')) { // legacy default command
            return this._dispatchSubcommand('*', operands, unknown);
          }
          if (this.listenerCount('command:*')) {
            // skip option check, emit event for possible misspelling suggestion
            this.emit('command:*', operands, unknown);
          } else if (this.commands.length) {
            this.unknownCommand();
          } else {
            checkForUnknownOptions();
            this._processArguments();
          }
        } else if (this.commands.length) {
          checkForUnknownOptions();
          // This command has subcommands and nothing hooked up at this level, so display help (and exit).
          this.help({ error: true });
        } else {
          checkForUnknownOptions();
          this._processArguments();
          // fall through for caller to handle after calling .parse()
        }
      };

      /**
       * Find matching command.
       *
       * @api private
       */
      _findCommand(name) {
        if (!name) return undefined;
        return this.commands.find(cmd => cmd._name === name || cmd._aliases.includes(name));
      };

      /**
       * Return an option matching `arg` if any.
       *
       * @param {string} arg
       * @return {Option}
       * @api private
       */

      _findOption(arg) {
        return this.options.find(option => option.is(arg));
      };

      /**
       * Display an error message if a mandatory option does not have a value.
       * Lazy calling after checking for help flags from leaf subcommand.
       *
       * @api private
       */

      _checkForMissingMandatoryOptions() {
        // Walk up hierarchy so can call in subcommand after checking for displaying help.
        for (let cmd = this; cmd; cmd = cmd.parent) {
          cmd.options.forEach((anOption) => {
            if (anOption.mandatory && (cmd.getOptionValue(anOption.attributeName()) === undefined)) {
              cmd.missingMandatoryOptionValue(anOption);
            }
          });
        }
      };

      /**
       * Parse options from `argv` removing known options,
       * and return argv split into operands and unknown arguments.
       *
       * Examples:
       *
       *     argv => operands, unknown
       *     --known kkk op => [op], []
       *     op --known kkk => [op], []
       *     sub --unknown uuu op => [sub], [--unknown uuu op]
       *     sub -- --unknown uuu op => [sub --unknown uuu op], []
       *
       * @param {String[]} argv
       * @return {{operands: String[], unknown: String[]}}
       */

      parseOptions(argv) {
        const operands = []; // operands, not options or values
        const unknown = []; // first unknown option and remaining unknown args
        let dest = operands;
        const args = argv.slice();

        function maybeOption(arg) {
          return arg.length > 1 && arg[0] === '-';
        }

        // parse options
        let activeVariadicOption = null;
        while (args.length) {
          const arg = args.shift();

          // literal
          if (arg === '--') {
            if (dest === unknown) dest.push(arg);
            dest.push(...args);
            break;
          }

          if (activeVariadicOption && !maybeOption(arg)) {
            this.emit(`option:${activeVariadicOption.name()}`, arg);
            continue;
          }
          activeVariadicOption = null;

          if (maybeOption(arg)) {
            const option = this._findOption(arg);
            // recognised option, call listener to assign value with possible custom processing
            if (option) {
              if (option.required) {
                const value = args.shift();
                if (value === undefined) this.optionMissingArgument(option);
                this.emit(`option:${option.name()}`, value);
              } else if (option.optional) {
                let value = null;
                // historical behaviour is optional value is following arg unless an option
                if (args.length > 0 && !maybeOption(args[0])) {
                  value = args.shift();
                }
                this.emit(`option:${option.name()}`, value);
              } else { // boolean flag
                this.emit(`option:${option.name()}`);
              }
              activeVariadicOption = option.variadic ? option : null;
              continue;
            }
          }

          // Look for combo options following single dash, eat first one if known.
          if (arg.length > 2 && arg[0] === '-' && arg[1] !== '-') {
            const option = this._findOption(`-${arg[1]}`);
            if (option) {
              if (option.required || (option.optional && this._combineFlagAndOptionalValue)) {
                // option with value following in same argument
                this.emit(`option:${option.name()}`, arg.slice(2));
              } else {
                // boolean option, emit and put back remainder of arg for further processing
                this.emit(`option:${option.name()}`);
                args.unshift(`-${arg.slice(2)}`);
              }
              continue;
            }
          }

          // Look for known long flag with value, like --foo=bar
          if (/^--[^=]+=/.test(arg)) {
            const index = arg.indexOf('=');
            const option = this._findOption(arg.slice(0, index));
            if (option && (option.required || option.optional)) {
              this.emit(`option:${option.name()}`, arg.slice(index + 1));
              continue;
            }
          }

          // Not a recognised option by this command.
          // Might be a command-argument, or subcommand option, or unknown option, or help command or option.

          // An unknown option means further arguments also classified as unknown so can be reprocessed by subcommands.
          if (maybeOption(arg)) {
            dest = unknown;
          }

          // If using positionalOptions, stop processing our options at subcommand.
          if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
            if (this._findCommand(arg)) {
              operands.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            } else if (arg === this._helpCommandName && this._hasImplicitHelpCommand()) {
              operands.push(arg);
              if (args.length > 0) operands.push(...args);
              break;
            } else if (this._defaultCommandName) {
              unknown.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            }
          }

          // If using passThroughOptions, stop processing options at first command-argument.
          if (this._passThroughOptions) {
            dest.push(arg);
            if (args.length > 0) dest.push(...args);
            break;
          }

          // add arg
          dest.push(arg);
        }

        return { operands, unknown };
      };

      /**
       * Return an object containing options as key-value pairs
       *
       * @return {Object}
       */
      opts() {
        if (this._storeOptionsAsProperties) {
          // Preserve original behaviour so backwards compatible when still using properties
          const result = {};
          const len = this.options.length;

          for (let i = 0; i < len; i++) {
            const key = this.options[i].attributeName();
            result[key] = key === this._versionOptionName ? this._version : this[key];
          }
          return result;
        }

        return this._optionValues;
      };

      /**
       * Internal bottleneck for handling of parsing errors.
       *
       * @api private
       */
      _displayError(exitCode, code, message) {
        this._outputConfiguration.outputError(`${message}\n`, this._outputConfiguration.writeErr);
        if (typeof this._showHelpAfterError === 'string') {
          this._outputConfiguration.writeErr(`${this._showHelpAfterError}\n`);
        } else if (this._showHelpAfterError) {
          this._outputConfiguration.writeErr('\n');
          this.outputHelp({ error: true });
        }
        this._exit(exitCode, code, message);
      }

      /**
       * Apply any option related environment variables, if option does
       * not have a value from cli or client code.
       *
       * @api private
       */
      _parseOptionsEnv() {
        this.options.forEach((option) => {
          if (option.envVar && option.envVar in process.env) {
            const optionKey = option.attributeName();
            // Priority check. Do not overwrite cli or options from unknown source (client-code).
            if (this.getOptionValue(optionKey) === undefined || ['default', 'config', 'env'].includes(this.getOptionValueSource(optionKey))) {
              if (option.required || option.optional) { // option can take a value
                // keep very simple, optional always takes value
                this.emit(`optionEnv:${option.name()}`, process.env[option.envVar]);
              } else { // boolean
                // keep very simple, only care that envVar defined and not the value
                this.emit(`optionEnv:${option.name()}`);
              }
            }
          }
        });
      }

      /**
       * Argument `name` is missing.
       *
       * @param {string} name
       * @api private
       */

      missingArgument(name) {
        const message = `error: missing required argument '${name}'`;
        this._displayError(1, 'commander.missingArgument', message);
      };

      /**
       * `Option` is missing an argument.
       *
       * @param {Option} option
       * @api private
       */

      optionMissingArgument(option) {
        const message = `error: option '${option.flags}' argument missing`;
        this._displayError(1, 'commander.optionMissingArgument', message);
      };

      /**
       * `Option` does not have a value, and is a mandatory option.
       *
       * @param {Option} option
       * @api private
       */

      missingMandatoryOptionValue(option) {
        const message = `error: required option '${option.flags}' not specified`;
        this._displayError(1, 'commander.missingMandatoryOptionValue', message);
      };

      /**
       * Unknown option `flag`.
       *
       * @param {string} flag
       * @api private
       */

      unknownOption(flag) {
        if (this._allowUnknownOption) return;
        let suggestion = '';

        if (flag.startsWith('--') && this._showSuggestionAfterError) {
          // Looping to pick up the global options too
          let candidateFlags = [];
          let command = this;
          do {
            const moreFlags = command.createHelp().visibleOptions(command)
              .filter(option => option.long)
              .map(option => option.long);
            candidateFlags = candidateFlags.concat(moreFlags);
            command = command.parent;
          } while (command && !command._enablePositionalOptions);
          suggestion = suggestSimilar(flag, candidateFlags);
        }

        const message = `error: unknown option '${flag}'${suggestion}`;
        this._displayError(1, 'commander.unknownOption', message);
      };

      /**
       * Excess arguments, more than expected.
       *
       * @param {string[]} receivedArgs
       * @api private
       */

      _excessArguments(receivedArgs) {
        if (this._allowExcessArguments) return;

        const expected = this._args.length;
        const s = (expected === 1) ? '' : 's';
        const forSubcommand = this.parent ? ` for '${this.name()}'` : '';
        const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
        this._displayError(1, 'commander.excessArguments', message);
      };

      /**
       * Unknown command.
       *
       * @api private
       */

      unknownCommand() {
        const unknownName = this.args[0];
        let suggestion = '';

        if (this._showSuggestionAfterError) {
          const candidateNames = [];
          this.createHelp().visibleCommands(this).forEach((command) => {
            candidateNames.push(command.name());
            // just visible alias
            if (command.alias()) candidateNames.push(command.alias());
          });
          suggestion = suggestSimilar(unknownName, candidateNames);
        }

        const message = `error: unknown command '${unknownName}'${suggestion}`;
        this._displayError(1, 'commander.unknownCommand', message);
      };

      /**
       * Set the program version to `str`.
       *
       * This method auto-registers the "-V, --version" flag
       * which will print the version number when passed.
       *
       * You can optionally supply the  flags and description to override the defaults.
       *
       * @param {string} str
       * @param {string} [flags]
       * @param {string} [description]
       * @return {this | string} `this` command for chaining, or version string if no arguments
       */

      version(str, flags, description) {
        if (str === undefined) return this._version;
        this._version = str;
        flags = flags || '-V, --version';
        description = description || 'output the version number';
        const versionOption = this.createOption(flags, description);
        this._versionOptionName = versionOption.attributeName();
        this.options.push(versionOption);
        this.on('option:' + versionOption.name(), () => {
          this._outputConfiguration.writeOut(`${str}\n`);
          this._exit(0, 'commander.version', str);
        });
        return this;
      };

      /**
       * Set the description to `str`.
       *
       * @param {string} [str]
       * @param {Object} [argsDescription]
       * @return {string|Command}
       */
      description(str, argsDescription) {
        if (str === undefined && argsDescription === undefined) return this._description;
        this._description = str;
        if (argsDescription) {
          this._argsDescription = argsDescription;
        }
        return this;
      };

      /**
       * Set an alias for the command.
       *
       * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
       *
       * @param {string} [alias]
       * @return {string|Command}
       */

      alias(alias) {
        if (alias === undefined) return this._aliases[0]; // just return first, for backwards compatibility

        /** @type {Command} */
        let command = this;
        if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
          // assume adding alias for last added executable subcommand, rather than this
          command = this.commands[this.commands.length - 1];
        }

        if (alias === command._name) throw new Error('Command alias can\'t be the same as its name');

        command._aliases.push(alias);
        return this;
      };

      /**
       * Set aliases for the command.
       *
       * Only the first alias is shown in the auto-generated help.
       *
       * @param {string[]} [aliases]
       * @return {string[]|Command}
       */

      aliases(aliases) {
        // Getter for the array of aliases is the main reason for having aliases() in addition to alias().
        if (aliases === undefined) return this._aliases;

        aliases.forEach((alias) => this.alias(alias));
        return this;
      };

      /**
       * Set / get the command usage `str`.
       *
       * @param {string} [str]
       * @return {String|Command}
       */

      usage(str) {
        if (str === undefined) {
          if (this._usage) return this._usage;

          const args = this._args.map((arg) => {
            return humanReadableArgName(arg);
          });
          return [].concat(
            (this.options.length || this._hasHelpOption ? '[options]' : []),
            (this.commands.length ? '[command]' : []),
            (this._args.length ? args : [])
          ).join(' ');
        }

        this._usage = str;
        return this;
      };

      /**
       * Get or set the name of the command
       *
       * @param {string} [str]
       * @return {string|Command}
       */

      name(str) {
        if (str === undefined) return this._name;
        this._name = str;
        return this;
      };

      /**
       * Return program help documentation.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
       * @return {string}
       */

      helpInformation(contextOptions) {
        const helper = this.createHelp();
        if (helper.helpWidth === undefined) {
          helper.helpWidth = (contextOptions && contextOptions.error) ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.getOutHelpWidth();
        }
        return helper.formatHelp(this, helper);
      };

      /**
       * @api private
       */

      _getHelpContext(contextOptions) {
        contextOptions = contextOptions || {};
        const context = { error: !!contextOptions.error };
        let write;
        if (context.error) {
          write = (arg) => this._outputConfiguration.writeErr(arg);
        } else {
          write = (arg) => this._outputConfiguration.writeOut(arg);
        }
        context.write = contextOptions.write || write;
        context.command = this;
        return context;
      }

      /**
       * Output help information for this command.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */

      outputHelp(contextOptions) {
        let deprecatedCallback;
        if (typeof contextOptions === 'function') {
          deprecatedCallback = contextOptions;
          contextOptions = undefined;
        }
        const context = this._getHelpContext(contextOptions);

        getCommandAndParents(this).reverse().forEach(command => command.emit('beforeAllHelp', context));
        this.emit('beforeHelp', context);

        let helpInformation = this.helpInformation(context);
        if (deprecatedCallback) {
          helpInformation = deprecatedCallback(helpInformation);
          if (typeof helpInformation !== 'string' && !Buffer.isBuffer(helpInformation)) {
            throw new Error('outputHelp callback must return a string or a Buffer');
          }
        }
        context.write(helpInformation);

        this.emit(this._helpLongFlag); // deprecated
        this.emit('afterHelp', context);
        getCommandAndParents(this).forEach(command => command.emit('afterAllHelp', context));
      };

      /**
       * You can pass in flags and a description to override the help
       * flags and help description for your command. Pass in false to
       * disable the built-in help option.
       *
       * @param {string | boolean} [flags]
       * @param {string} [description]
       * @return {Command} `this` command for chaining
       */

      helpOption(flags, description) {
        if (typeof flags === 'boolean') {
          this._hasHelpOption = flags;
          return this;
        }
        this._helpFlags = flags || this._helpFlags;
        this._helpDescription = description || this._helpDescription;

        const helpFlags = splitOptionFlags(this._helpFlags);
        this._helpShortFlag = helpFlags.shortFlag;
        this._helpLongFlag = helpFlags.longFlag;

        return this;
      };

      /**
       * Output help information and exit.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */

      help(contextOptions) {
        this.outputHelp(contextOptions);
        let exitCode = process.exitCode || 0;
        if (exitCode === 0 && contextOptions && typeof contextOptions !== 'function' && contextOptions.error) {
          exitCode = 1;
        }
        // message: do not have all displayed text available so only passing placeholder.
        this._exit(exitCode, 'commander.help', '(outputHelp)');
      };

      /**
       * Add additional text to be displayed with the built-in help.
       *
       * Position is 'before' or 'after' to affect just this command,
       * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
       *
       * @param {string} position - before or after built-in help
       * @param {string | Function} text - string to add, or a function returning a string
       * @return {Command} `this` command for chaining
       */
      addHelpText(position, text) {
        const allowedValues = ['beforeAll', 'before', 'after', 'afterAll'];
        if (!allowedValues.includes(position)) {
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        const helpEvent = `${position}Help`;
        this.on(helpEvent, (context) => {
          let helpStr;
          if (typeof text === 'function') {
            helpStr = text({ error: context.error, command: context.command });
          } else {
            helpStr = text;
          }
          // Ignore falsy value when nothing to output.
          if (helpStr) {
            context.write(`${helpStr}\n`);
          }
        });
        return this;
      }
    }
    /**
     * Output help information if help flags specified
     *
     * @param {Command} cmd - command to output help for
     * @param {Array} args - array of options to search for help flags
     * @api private
     */

    function outputHelpIfRequested(cmd, args) {
      const helpOption = cmd._hasHelpOption && args.find(arg => arg === cmd._helpLongFlag || arg === cmd._helpShortFlag);
      if (helpOption) {
        cmd.outputHelp();
        // (Do not have all displayed text available so only passing placeholder.)
        cmd._exit(0, 'commander.helpDisplayed', '(outputHelp)');
      }
    }

    /**
     * Scan arguments and increment port number for inspect calls (to avoid conflicts when spawning new command).
     *
     * @param {string[]} args - array of arguments from node.execArgv
     * @returns {string[]}
     * @api private
     */

    function incrementNodeInspectorPort(args) {
      // Testing for these options:
      //  --inspect[=[host:]port]
      //  --inspect-brk[=[host:]port]
      //  --inspect-port=[host:]port
      return args.map((arg) => {
        if (!arg.startsWith('--inspect')) {
          return arg;
        }
        let debugOption;
        let debugHost = '127.0.0.1';
        let debugPort = '9229';
        let match;
        if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
          // e.g. --inspect
          debugOption = match[1];
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
          debugOption = match[1];
          if (/^\d+$/.test(match[3])) {
            // e.g. --inspect=1234
            debugPort = match[3];
          } else {
            // e.g. --inspect=localhost
            debugHost = match[3];
          }
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
          // e.g. --inspect=localhost:1234
          debugOption = match[1];
          debugHost = match[3];
          debugPort = match[4];
        }

        if (debugOption && debugPort !== '0') {
          return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
        }
        return arg;
      });
    }

    /**
     * @param {Command} startCommand
     * @returns {Command[]}
     * @api private
     */

    function getCommandAndParents(startCommand) {
      const result = [];
      for (let command = startCommand; command; command = command.parent) {
        result.push(command);
      }
      return result;
    }

    command.Command = Command;

    (function (module, exports) {
    const { Argument } = argument;
    const { Command } = command;
    const { CommanderError, InvalidArgumentError } = error;
    const { Help } = help;
    const { Option } = option;

    // @ts-check

    /**
     * Expose the root command.
     */

    exports = module.exports = new Command();
    exports.program = exports; // More explicit access to global command.
    // Implicit export of createArgument, createCommand, and createOption.

    /**
     * Expose classes
     */

    exports.Argument = Argument;
    exports.Command = Command;
    exports.CommanderError = CommanderError;
    exports.Help = Help;
    exports.InvalidArgumentError = InvalidArgumentError;
    exports.InvalidOptionArgumentError = InvalidArgumentError; // Deprecated
    exports.Option = Option;
    }(commander$1, commander$1.exports));

    var commander = commander$1.exports;

    const userHome = require$$0__default$4["default"].homedir();
    const pathExists = _pathExists.sync;
    const program = new commander.Command();
    const pkg = require('../package.json');
    const DEFAULT_CLI_HOME = '.js-cli';
    const core = () => __awaiter$3(void 0, void 0, void 0, function* () {
        try {
            yield prepare();
            registerCommander();
        }
        catch (e) {
            if (e instanceof Error) {
                log$1.error('core', e.message);
            }
        }
    });
    const prepare = () => __awaiter$3(void 0, void 0, void 0, function* () {
        checkPkgVersion();
        rootCheck();
        checkUserHome();
        checkEnv();
        // await checkGlobalUpdate()
    });
    const checkPkgVersion = () => {
        log$1.info('package', pkg.version);
    };
    const checkUserHome = () => {
        if (!userHome || !pathExists(userHome)) {
            throw new Error(colors.red('当前登录用户主目录不存在'));
        }
    };
    const checkEnv = () => __awaiter$3(void 0, void 0, void 0, function* () {
        const dotenvPath = require$$1__default$1["default"].resolve(userHome, '.env');
        if (pathExists(dotenvPath)) {
            main.config({
                path: dotenvPath
            });
        }
        createDefaultConfig();
        log$1.verbose('环境变量', process.env.CLI_HOME_PATH);
    });
    const createDefaultConfig = () => {
        const cliConfig = {
            home: userHome,
            cliHome: ''
        };
        if (process.env.CLI_HOME) {
            cliConfig['cliHome'] = require$$1__default$1["default"].join(userHome, process.env.CLI_HOME);
        }
        else {
            cliConfig['cliHome'] = require$$1__default$1["default"].join(userHome, DEFAULT_CLI_HOME);
        }
        process.env.CLI_HOME_PATH = cliConfig.cliHome;
    };
    const registerCommander = () => {
        program
            .name(Object.keys(pkg.bin)[0])
            .usage('<command> [options]')
            .version(pkg.version)
            .option('-d, --debug', '是否开启调试模式', false)
            .option('-tp, --targetPath <targetPath>', '是否指定本地调试文件路径', '');
        program
            .command('init [projectName]')
            .option('-f, --force', '是否强制初始化项目', false)
            .action(exec);
        program.on('option:targetPath', function () {
            process.env.CLI_TARGET_PATH = program.opts().targetPath;
        });
        program.on('option:debug', function () {
            if (program.opts().debug) {
                process.env.LOG_LEVEL = 'verbose';
            }
            else {
                process.env.LOG_LEVEL = 'info';
            }
            log$1.level = process.env.LOG_LEVEL;
            log$1.verbose('debug', '开启 debug 模式');
        });
        program.on('command:*', function (obj) {
            const availableCommands = program.commands.map(cmd => cmd.name());
            console.log(colors.red('未知命令' + obj[0]));
            if (availableCommands.length > 0) {
                console.log(colors.red('可用命令' + availableCommands.join(',')));
            }
        });
        program.parse(process.argv);
        if (program.args && program.args.length < 1) {
            program.outputHelp();
        }
    };

    return core;

}));
