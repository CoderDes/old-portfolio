/**
 * @license
 Fotorama 4.6.4 | http://fotorama.io/license/
*/
'use strict';
fotoramaVersion = "4.6.4", function(window, document, obj, $, undefined) {
  /**
   * @param {!Array} stdlib
   * @return {?}
   */
  function f(stdlib) {
    var b = "bez_" + $.makeArray(arguments).join("_").replace(".", "p");
    if ("function" != typeof $.easing[b]) {
      /**
       * @param {!Array} a
       * @param {!Array} b
       * @return {?}
       */
      var c = function(a, b) {
        /** @type {!Array} */
        var o = [null, null];
        /** @type {!Array} */
        var d = [null, null];
        /** @type {!Array} */
        var e = [null, null];
        /**
         * @param {?} f
         * @param {number} g
         * @return {?}
         */
        var f = function(f, g) {
          return e[g] = 3 * a[g], d[g] = 3 * (b[g] - a[g]) - e[g], o[g] = 1 - e[g] - d[g], f * (e[g] + f * (d[g] + f * o[g]));
        };
        /**
         * @param {number} a
         * @return {?}
         */
        var g = function(a) {
          return e[0] + a * (2 * d[0] + 3 * o[0] * a);
        };
        /**
         * @param {!Array} a
         * @return {?}
         */
        var h = function(a) {
          var d;
          /** @type {!Array} */
          var b = a;
          /** @type {number} */
          var knobNode_left_val = 0;
          for (; ++knobNode_left_val < 14 && (d = f(b, 0) - a, !(Math.abs(d) < .001));) {
            /** @type {number} */
            b = b - d / g(b);
          }
          return b;
        };
        return function(a) {
          return f(h(a), 1);
        };
      };
      /**
       * @param {?} b
       * @param {(boolean|number|string)} d
       * @param {number} mysecond_no
       * @param {?} myfirst_no
       * @param {(boolean|number|string)} g
       * @return {?}
       */
      $.easing[b] = function(b, d, mysecond_no, myfirst_no, g) {
        return myfirst_no * c([stdlib[0], stdlib[1]], [stdlib[2], stdlib[3]])(d / g) + mysecond_no;
      };
    }
    return b;
  }
  /**
   * @return {undefined}
   */
  function noop() {
  }
  /**
   * @param {number} n
   * @param {number} x
   * @param {number} y
   * @return {?}
   */
  function log(n, x, y) {
    return Math.max(isNaN(x) ? -1 / 0 : x, Math.min(isNaN(y) ? 1 / 0 : y, n));
  }
  /**
   * @param {string} name
   * @return {?}
   */
  function css(name) {
    return name.match(/ma/) && name.match(/-?\d+(?!d)/g)[name.match(/3d/) ? 12 : 4];
  }
  /**
   * @param {!Object} s
   * @return {?}
   */
  function done(s) {
    return disable ? +css(s.css("transform")) : +s.css("left").replace("px", "");
  }
  /**
   * @param {!Object} b
   * @return {?}
   */
  function func(b) {
    var o = {};
    return disable ? o.transform = "translate3d(" + b + "px,0,0)" : o.left = b, o;
  }
  /**
   * @param {number} speed
   * @return {?}
   */
  function next(speed) {
    return {
      "transition-duration" : speed + "ms"
    };
  }
  /**
   * @param {number} x
   * @param {number} y
   * @return {?}
   */
  function move(x, y) {
    return isNaN(x) ? y : x;
  }
  /**
   * @param {string} string
   * @param {string} regex
   * @return {?}
   */
  function parseInt(string, regex) {
    return move(+String(string).replace(regex || "px", ""));
  }
  /**
   * @param {string} key
   * @return {?}
   */
  function o(key) {
    return /%$/.test(key) ? parseInt(key, "%") : undefined;
  }
  /**
   * @param {string} m
   * @param {number} val
   * @return {?}
   */
  function fn(m, val) {
    return move(o(m) / 100 * val, parseInt(m));
  }
  /**
   * @param {string} value
   * @return {?}
   */
  function isNumber(value) {
    return (!isNaN(parseInt(value)) || !isNaN(parseInt(value, "%"))) && value;
  }
  /**
   * @param {number} y
   * @param {number} n
   * @param {number} prev
   * @param {number} value
   * @return {?}
   */
  function resolve(y, n, prev, value) {
    return (y - (value || 0)) * (n + (prev || 0));
  }
  /**
   * @param {?} debugMessage
   * @param {number} statlist
   * @param {number} laststat
   * @param {number} exception
   * @return {?}
   */
  function debug(debugMessage, statlist, laststat, exception) {
    return -Math.round(debugMessage / (statlist + (laststat || 0)) - (exception || 0));
  }
  /**
   * @param {!Object} a
   * @return {undefined}
   */
  function init(a) {
    var globalDisclaimer = a.data();
    if (!globalDisclaimer.tEnd) {
      var p = a[0];
      var transEndEventNames = {
        WebkitTransition : "webkitTransitionEnd",
        MozTransition : "transitionend",
        OTransition : "oTransitionEnd otransitionend",
        msTransition : "MSTransitionEnd",
        transition : "transitionend"
      };
      bind(p, transEndEventNames[Modernizr.prefixed("transition")], function(column) {
        if (globalDisclaimer.tProp && column.propertyName.match(globalDisclaimer.tProp)) {
          globalDisclaimer.onEndFn();
        }
      });
      /** @type {boolean} */
      globalDisclaimer.tEnd = true;
    }
  }
  /**
   * @param {!Object} f
   * @param {string} a
   * @param {!Function} fn
   * @param {number} n
   * @return {undefined}
   */
  function load(f, a, fn, n) {
    var e;
    var mix = f.data();
    if (mix) {
      /**
       * @return {undefined}
       */
      mix.onEndFn = function() {
        if (!e) {
          /** @type {boolean} */
          e = true;
          clearTimeout(mix.tT);
          fn();
        }
      };
      /** @type {string} */
      mix.tProp = a;
      clearTimeout(mix.tT);
      /** @type {number} */
      mix.tT = setTimeout(function() {
        mix.onEndFn();
      }, 1.5 * n);
      init(f);
    }
  }
  /**
   * @param {!Object} s
   * @param {number} code
   * @return {?}
   */
  function cb(s, code) {
    if (s.length) {
      var popup = s.data();
      if (disable) {
        s.css(next(0));
        /** @type {function(): undefined} */
        popup.onEndFn = noop;
        clearTimeout(popup.tT);
      } else {
        s.stop();
      }
      var n = setTimeout(code, function() {
        return done(s);
      });
      return s.css(func(n)), n;
    }
  }
  /**
   * @return {?}
   */
  function setTimeout() {
    var id;
    /** @type {number} */
    var deep = 0;
    /** @type {number} */
    var _len8 = arguments.length;
    for (; _len8 > deep && (id = deep ? arguments[deep]() : arguments[deep], "number" != typeof id); deep++) {
    }
    return id;
  }
  /**
   * @param {number} a
   * @param {string} b
   * @return {?}
   */
  function x(a, b) {
    return Math.round(a + (b - a) / 1.5);
  }
  /**
   * @return {?}
   */
  function hash2id() {
    return hash2id.p = hash2id.p || ("https:" === obj.protocol ? "https://" : "http://"), hash2id.p;
  }
  /**
   * @param {string} value
   * @return {?}
   */
  function unpack(value) {
    /** @type {!Element} */
    var elem = document.createElement("a");
    return elem.href = value, elem;
  }
  /**
   * @param {string} data
   * @param {boolean} indent
   * @return {?}
   */
  function update(data, indent) {
    if ("string" != typeof data) {
      return data;
    }
    data = unpack(data);
    var name;
    var type;
    if (data.host.match(/youtube\.com/) && data.search) {
      if (name = data.search.split("v=")[1]) {
        var indexOfDotTar = name.indexOf("&");
        if (-1 !== indexOfDotTar) {
          name = name.substring(0, indexOfDotTar);
        }
        /** @type {string} */
        type = "youtube";
      }
    } else {
      if (data.host.match(/youtube\.com|youtu\.be/)) {
        name = data.pathname.replace(/^\/(embed\/|v\/)?/, "").replace(/\/.*/, "");
        /** @type {string} */
        type = "youtube";
      } else {
        if (data.host.match(/vimeo\.com/)) {
          /** @type {string} */
          type = "vimeo";
          name = data.pathname.replace(/^\/(video\/)?/, "").replace(/\/.*/, "");
        }
      }
    }
    return name && type || !indent || (name = data.href, type = "custom"), name ? {
      id : name,
      type : type,
      s : data.search.replace(/^\?/, ""),
      p : hash2id()
    } : false;
  }
  /**
   * @param {!Object} e
   * @param {(Node|NodeList|string)} code
   * @param {!Array} value
   * @return {?}
   */
  function remove(e, code, value) {
    var valueBeforeCaret;
    var tempValue;
    var v = e.video;
    return "youtube" === v.type ? (tempValue = hash2id() + "img.youtube.com/vi/" + v.id + "/default.jpg", valueBeforeCaret = tempValue.replace(/\/default.jpg$/, "/hqdefault.jpg"), e.thumbsReady = true) : "vimeo" === v.type ? $.ajax({
      url : hash2id() + "vimeo.com/api/v2/video/" + v.id + ".json",
      dataType : "jsonp",
      success : function(d) {
        /** @type {boolean} */
        e.thumbsReady = true;
        send(code, {
          img : d[0].thumbnail_large,
          thumb : d[0].thumbnail_small
        }, e.i, value);
      }
    }) : e.thumbsReady = true, {
      img : valueBeforeCaret,
      thumb : tempValue
    };
  }
  /**
   * @param {!NodeList} element
   * @param {?} callback
   * @param {number} id
   * @param {!Array} self
   * @return {undefined}
   */
  function send(element, callback, id, self) {
    /** @type {number} */
    var column = 0;
    var c = element.length;
    for (; c > column; column++) {
      var params = element[column];
      if (params.i === id && params.thumbsReady) {
        var data = {
          videoReady : true
        };
        /** @type {boolean} */
        data[i] = data[k] = data[key] = false;
        self.splice(column, 1, $.extend({}, params, data, callback));
        break;
      }
    }
  }
  /**
   * @param {!Object} elem
   * @return {?}
   */
  function link(elem) {
    /**
     * @param {!Object} url
     * @param {!Object} options
     * @param {string} c
     * @return {undefined}
     */
    function create(url, options, c) {
      var buffer = url.children("img").eq(0);
      var m = url.attr("href");
      var s = url.attr("src");
      var n = buffer.attr("src");
      var video = options.video;
      var videoChecked = c ? update(m, video === true) : false;
      if (videoChecked) {
        /** @type {boolean} */
        m = false;
      } else {
        videoChecked = video;
      }
      set(url, buffer, $.extend(options, {
        video : videoChecked,
        img : options.img || m || s || n,
        thumb : options.thumb || n || s || m
      }));
    }
    /**
     * @param {!Object} title
     * @param {!Object} config
     * @param {!Object} data
     * @return {undefined}
     */
    function set(title, config, data) {
      var e = data.thumb && data.img !== data.thumb;
      var cols = parseInt(data.width || title.attr("width"));
      var n = parseInt(data.height || title.attr("height"));
      $.extend(data, {
        width : cols,
        height : n,
        thumbratio : getType(data.thumbratio || parseInt(data.thumbwidth || config && config.attr("width") || e || cols) / parseInt(data.thumbheight || config && config.attr("height") || e || n))
      });
    }
    /** @type {!Array} */
    var cfgArr = [];
    return elem.children().each(function() {
      var x = $(this);
      var val = render($.extend(x.data(), {
        id : x.attr("id")
      }));
      if (x.is("a, img")) {
        create(x, val, true);
      } else {
        if (x.is(":empty")) {
          return;
        }
        set(x, null, $.extend(val, {
          html : this,
          _html : x.html()
        }));
      }
      cfgArr.push(val);
    }), cfgArr;
  }
  /**
   * @param {!HTMLElement} e
   * @return {?}
   */
  function coordOnBoard(e) {
    return 0 === e.offsetWidth && 0 === e.offsetHeight;
  }
  /**
   * @param {?} selector
   * @return {?}
   */
  function getClass(selector) {
    return !$.contains(document.documentElement, selector);
  }
  /**
   * @param {!Function} response
   * @param {!Function} t
   * @param {number} b
   * @param {string} i
   * @return {?}
   */
  function test(response, t, b, i) {
    return test.i || (test.i = 1, test.ii = [true]), i = i || test.i, "undefined" == typeof test.ii[i] && (test.ii[i] = true), response() ? t() : test.ii[i] && setTimeout(function() {
      if (test.ii[i]) {
        test(response, t, b, i);
      }
    }, b || 100), test.i++;
  }
  /**
   * @param {string} url
   * @return {undefined}
   */
  function _appendQueryParam(url) {
    obj.replace(obj.protocol + "//" + obj.host + obj.pathname.replace(/^\/?/, "/") + obj.search + "#" + url);
  }
  /**
   * @param {!Object} input
   * @param {!Window} e
   * @param {string} type
   * @param {string} s
   * @return {?}
   */
  function start(input, e, type, s) {
    var self = input.data();
    var size = self.measures;
    if (size && (!self.l || self.l.W !== size.width || self.l.H !== size.height || self.l.r !== size.ratio || self.l.w !== e.w || self.l.h !== e.h || self.l.m !== type || self.l.p !== s)) {
      var w = size.width;
      var y = size.height;
      /** @type {number} */
      var h = e.w / e.h;
      /** @type {boolean} */
      var isAEmpty = size.ratio >= h;
      /** @type {boolean} */
      var err = "scaledown" === type;
      /** @type {boolean} */
      var subErr = "contain" === type;
      /** @type {boolean} */
      var isBEmpty = "cover" === type;
      var json = require(s);
      if (isAEmpty && (err || subErr) || !isAEmpty && isBEmpty) {
        w = log(e.w, 0, err ? w : 1 / 0);
        /** @type {number} */
        y = w / size.ratio;
      } else {
        if (isAEmpty && isBEmpty || !isAEmpty && (err || subErr)) {
          y = log(e.h, 0, err ? y : 1 / 0);
          /** @type {number} */
          w = y * size.ratio;
        }
      }
      input.css({
        width : w,
        height : y,
        left : fn(json.x, e.w - w),
        top : fn(json.y, e.h - y)
      });
      self.l = {
        W : size.width,
        H : size.height,
        r : size.ratio,
        w : e.w,
        h : e.h,
        m : type,
        p : s
      };
    }
    return true;
  }
  /**
   * @param {!Object} html
   * @param {!Object} data
   * @return {undefined}
   */
  function applyCSS(html, data) {
    var el = html[0];
    if (el.styleSheet) {
      /** @type {!Object} */
      el.styleSheet.cssText = data;
    } else {
      html.html(data);
    }
  }
  /**
   * @param {(boolean|number|string)} num
   * @param {(boolean|number|string)} max
   * @param {(boolean|number|string)} min
   * @return {?}
   */
  function map(num, max, min) {
    return max === min ? false : max >= num ? "left" : num >= min ? "right" : "left right";
  }
  /**
   * @param {number} a
   * @param {!NodeList} obj
   * @param {boolean} op
   * @param {boolean} b
   * @return {?}
   */
  function get(a, obj, op, b) {
    if (!op) {
      return false;
    }
    if (!isNaN(a)) {
      return a - (b ? 0 : 1);
    }
    var b;
    /** @type {number} */
    var f = 0;
    var c = obj.length;
    for (; c > f; f++) {
      var r = obj[f];
      if (r.id === a) {
        /** @type {number} */
        b = f;
        break;
      }
    }
    return b;
  }
  /**
   * @param {!Object} selector
   * @param {!Function} fn
   * @param {number} self
   * @return {undefined}
   */
  function exports(selector, fn, self) {
    self = self || {};
    selector.each(function() {
      var item;
      var attributes = $(this);
      var subject = attributes.data();
      if (!subject.clickOn) {
        /** @type {boolean} */
        subject.clickOn = true;
        $.extend(initialize(attributes, {
          onStart : function(ui) {
            /** @type {boolean} */
            item = ui;
            (self.onStart || noop).call(this, ui);
          },
          onMove : self.onMove || noop,
          onTouchEnd : self.onTouchEnd || noop,
          onEnd : function(options) {
            if (!options.moved) {
              fn.call(this, item);
            }
          }
        }), {
          noMove : true
        });
      }
    });
  }
  /**
   * @param {string} name
   * @param {number} start
   * @return {?}
   */
  function parse(name, start) {
    return '<div class="' + name + '">' + (start || "") + "</div>";
  }
  /**
   * @param {!Array} values
   * @return {?}
   */
  function create(values) {
    var i = values.length;
    for (; i;) {
      /** @type {number} */
      var id = Math.floor(Math.random() * i--);
      var r = values[i];
      values[i] = values[id];
      values[id] = r;
    }
    return values;
  }
  /**
   * @param {?} val
   * @return {?}
   */
  function getData(val) {
    return "[object Array]" == Object.prototype.toString.call(val) && $.map(val, function(newPaletteColors) {
      return $.extend({}, newPaletteColors);
    });
  }
  /**
   * @param {!Node} obj
   * @param {number} type
   * @param {number} name
   * @return {undefined}
   */
  function format(obj, type, name) {
    obj.scrollLeft(type || 0).scrollTop(name || 0);
  }
  /**
   * @param {!Object} to
   * @return {?}
   */
  function render(to) {
    if (to) {
      var x = {};
      return $.each(to, function(p_Interval, len) {
        x[p_Interval.toLowerCase()] = len;
      }), x;
    }
  }
  /**
   * @param {string} id
   * @return {?}
   */
  function getType(id) {
    if (id) {
      /** @type {number} */
      var num = +id;
      return isNaN(num) ? (num = id.split("/"), +num[0] / +num[1] || undefined) : num;
    }
  }
  /**
   * @param {!HTMLElement} el
   * @param {string} type
   * @param {!Function} method
   * @param {boolean} model
   * @return {undefined}
   */
  function bind(el, type, method, model) {
    if (type) {
      if (el.addEventListener) {
        el.addEventListener(type, method, !!model);
      } else {
        el.attachEvent("on" + type, method);
      }
    }
  }
  /**
   * @param {!HTMLElement} x
   * @return {?}
   */
  function copy(x) {
    return !!x.getAttribute("disabled");
  }
  /**
   * @param {!Object} value
   * @return {?}
   */
  function extend(value) {
    return {
      tabindex : -1 * value + "",
      disabled : value
    };
  }
  /**
   * @param {!HTMLElement} val
   * @param {!Function} fn
   * @return {undefined}
   */
  function define(val, fn) {
    bind(val, "keyup", function(event) {
      if (!copy(val)) {
        if (13 == event.keyCode) {
          fn.call(val, event);
        }
      }
    });
  }
  /**
   * @param {!HTMLElement} name
   * @param {!Function} method
   * @return {undefined}
   */
  function support(name, method) {
    bind(name, "focus", name.onfocusin = function(event) {
      method.call(name, event);
    }, true);
  }
  /**
   * @param {!Object} options
   * @param {boolean} e
   * @return {undefined}
   */
  function trigger(options, e) {
    if (options.preventDefault) {
      options.preventDefault();
    } else {
      /** @type {boolean} */
      options.returnValue = false;
    }
    if (e && options.stopPropagation) {
      options.stopPropagation();
    }
  }
  /**
   * @param {string} sec
   * @return {?}
   */
  function now(sec) {
    return sec ? ">" : "<";
  }
  /**
   * @param {string} n
   * @return {?}
   */
  function require(n) {
    return n = (n + "").split(/\s+/), {
      x : isNumber(n[0]) || y,
      y : isNumber(n[1]) || y
    };
  }
  /**
   * @param {!Object} target
   * @param {!Object} options
   * @return {undefined}
   */
  function callback(target, options) {
    var that = target.data();
    /** @type {number} */
    var element = Math.round(options.pos);
    /**
     * @return {undefined}
     */
    var next = function() {
      /** @type {boolean} */
      that.sliding = false;
      (options.onEnd || noop)();
    };
    if ("undefined" != typeof options.overPos && options.overPos !== options.pos) {
      element = options.overPos;
      /**
       * @return {undefined}
       */
      next = function() {
        callback(target, $.extend({}, options, {
          overPos : options.pos,
          time : Math.max(time, options.time / 2)
        }));
      };
    }
    var position = $.extend(func(element), options.width && {
      width : options.width
    });
    /** @type {boolean} */
    that.sliding = true;
    if (disable) {
      target.css($.extend(next(options.time), position));
      if (options.time > 10) {
        load(target, "transform", next, options.time);
      } else {
        next();
      }
    } else {
      target.stop().animate(position, options.time, e, next);
    }
  }
  /**
   * @param {!Object} parent
   * @param {!Object} obj
   * @param {!Object} el
   * @param {!Object} data
   * @param {!Array} f
   * @param {number} global
   * @return {undefined}
   */
  function check(parent, obj, el, data, f, global) {
    /** @type {boolean} */
    var refresh = "undefined" != typeof global;
    if (refresh || (f.push(arguments), Array.prototype.push.call(arguments, f.length), !(f.length > 1))) {
      parent = parent || $(parent);
      obj = obj || $(obj);
      var prev = parent[0];
      var arr = obj[0];
      /** @type {boolean} */
      var node = "crossfade" === data.method;
      /**
       * @return {undefined}
       */
      var next = function() {
        if (!next.done) {
          /** @type {boolean} */
          next.done = true;
          var arg = (refresh || f.shift()) && f.shift();
          if (arg) {
            check.apply(this, arg);
          }
          (data.onEnd || noop)(!!arg);
        }
      };
      /** @type {number} */
      var parentNode = data.time / (global || 1);
      el.removeClass(ascCls + " " + desCls);
      parent.stop().addClass(ascCls);
      obj.stop().addClass(desCls);
      if (node && arr) {
        parent.fadeTo(0, 0);
      }
      parent.fadeTo(node ? parentNode : 0, 1, node && next);
      obj.fadeTo(parentNode, 0, next);
      if (!(prev && node || arr)) {
        next();
      }
    }
  }
  /**
   * @param {!Object} e
   * @return {undefined}
   */
  function getPosition(e) {
    var event = (e.touches || [])[0] || e;
    e._x = event.pageX;
    e._y = event.clientY;
    e._now = $.now();
  }
  /**
   * @param {!Object} content
   * @param {!Object} options
   * @return {?}
   */
  function initialize(content, options) {
    /**
     * @param {string} event
     * @return {?}
     */
    function init(event) {
      return $target = $(event.target), me.checked = v = source = show_whole_file = false, k || me.flow || event.touches && event.touches.length > 1 || event.which > 1 || h && h.type !== event.type && sh || (v = options.select && $target.is(options.select, name)) ? v : (isEvaluating = "touchstart" === event.type, source = $target.is("a, a *", name), view = me.control, MAX_SIZE = me.noMove || me.noSwipe || view ? 16 : me.snap ? 0 : 4, getPosition(event), e = h = event, EOF = event.type.replace(/down|start/, 
      "move").replace(/Down/, "Move"), (options.onStart || noop).call(name, event, {
        control : view,
        $target : $target
      }), k = me.flow = true, void((!isEvaluating || me.go) && trigger(event)));
    }
    /**
     * @param {!Object} event
     * @return {?}
     */
    function update(event) {
      if (event.touches && event.touches.length > 1 || chart && !event.isPrimary || EOF !== event.type || !k) {
        return k && render(), void(options.onTouchEnd || noop)();
      }
      getPosition(event);
      /** @type {number} */
      var b = Math.abs(event._x - e._x);
      /** @type {number} */
      var a = Math.abs(event._y - e._y);
      /** @type {number} */
      var y = b - a;
      var len = (me.go || me.x || y >= 0) && !me.noSwipe;
      /** @type {boolean} */
      var isUnder = 0 > y;
      if (isEvaluating && !me.checked) {
        if (k = len) {
          trigger(event);
        }
      } else {
        trigger(event);
        (options.onMove || noop).call(name, event, {
          touch : isEvaluating
        });
      }
      if (!show_whole_file && Math.sqrt(Math.pow(b, 2) + Math.pow(a, 2)) > MAX_SIZE) {
        /** @type {boolean} */
        show_whole_file = true;
      }
      me.checked = me.checked || len || isUnder;
    }
    /**
     * @param {!Object} load
     * @return {undefined}
     */
    function render(load) {
      (options.onTouchEnd || noop)();
      var z = k;
      /** @type {boolean} */
      me.control = k = false;
      if (z) {
        /** @type {boolean} */
        me.flow = false;
      }
      if (!(!z || source && !me.checked)) {
        if (load) {
          trigger(load);
        }
        /** @type {boolean} */
        sh = true;
        clearTimeout(_takingTooLongTimeout);
        /** @type {number} */
        _takingTooLongTimeout = setTimeout(function() {
          /** @type {boolean} */
          sh = false;
        }, 1E3);
        (options.onEnd || noop).call(name, {
          moved : show_whole_file,
          $target : $target,
          control : view,
          touch : isEvaluating,
          startEvent : e,
          aborted : !load || "MSPointerCancel" === load.type
        });
      }
    }
    /**
     * @return {undefined}
     */
    function test() {
      if (!me.flow) {
        setTimeout(function() {
          /** @type {boolean} */
          me.flow = true;
        }, 10);
      }
    }
    /**
     * @return {undefined}
     */
    function exit() {
      if (me.flow) {
        setTimeout(function() {
          /** @type {boolean} */
          me.flow = false;
        }, delta);
      }
    }
    var k;
    var e;
    var $target;
    var view;
    var isEvaluating;
    var v;
    var source;
    var MAX_SIZE;
    var show_whole_file;
    var name = content[0];
    var me = {};
    return chart ? (bind(name, "MSPointerDown", init), bind(document, "MSPointerMove", update), bind(document, "MSPointerCancel", render), bind(document, "MSPointerUp", render)) : (bind(name, "touchstart", init), bind(name, "touchmove", update), bind(name, "touchend", render), bind(document, "touchstart", test), bind(document, "touchend", exit), bind(document, "touchcancel", exit), $window.on("scroll", exit), content.on("mousedown", init), editor.on("mousemove", update).on("mouseup", render)), content.on("click", 
    "a", function(load) {
      if (me.checked) {
        trigger(load);
      }
    }), me;
  }
  /**
   * @param {!Object} a
   * @param {!Object} options
   * @return {?}
   */
  function addHandler(a, options) {
    /**
     * @param {!Object} el
     * @param {string} id
     * @return {undefined}
     */
    function handler(el, id) {
      /** @type {boolean} */
      G = true;
      d = x = el._x;
      existingWidget = el._now;
      /** @type {!Array} */
      data = [[existingWidget, d]];
      c = n = o.noMove || id ? 0 : cb(a, (options.getPos || noop)());
      (options.onStart || noop).call(nodeA, el);
    }
    /**
     * @param {?} e
     * @param {!EventTarget} settings
     * @return {undefined}
     */
    function add(e, settings) {
      value = o.min;
      val = o.max;
      f = o.snap;
      alt = e.altKey;
      /** @type {boolean} */
      G = B = false;
      name = settings.control;
      if (!(name || self.sliding)) {
        handler(e);
      }
    }
    /**
     * @param {!Object} event
     * @param {!Object} options
     * @return {undefined}
     */
    function update(event, options) {
      if (!o.noSwipe) {
        if (!G) {
          handler(event);
        }
        x = event._x;
        data.push([event._now, x]);
        /** @type {number} */
        n = c - (d - x);
        ret = map(n, value, val);
        if (value >= n) {
          n = x(n, value);
        } else {
          if (n >= val) {
            n = x(n, val);
          }
        }
        if (!o.noMove) {
          a.css(func(n));
          if (!B) {
            /** @type {boolean} */
            B = true;
            if (!(options.touch || chart)) {
              a.addClass(staggerClassName);
            }
          }
          (options.onMove || noop).call(nodeA, event, {
            pos : n,
            edge : ret
          });
        }
      }
    }
    /**
     * @param {!Object} ev
     * @return {undefined}
     */
    function execute(ev) {
      if (!o.noSwipe || !ev.moved) {
        if (!G) {
          handler(ev.startEvent, true);
        }
        if (!(ev.touch || chart)) {
          a.removeClass(staggerClassName);
        }
        end = $.now();
        var i;
        var j;
        var length;
        var windowRight;
        var size;
        var temp;
        var result;
        var diff;
        var heading;
        /** @type {number} */
        var left = end - delta;
        /** @type {null} */
        var position = null;
        /** @type {number} */
        var limit = time;
        var friction = options.friction;
        /** @type {number} */
        var block_idx = data.length - 1;
        for (; block_idx >= 0; block_idx--) {
          if (i = data[block_idx][0], j = Math.abs(i - left), null === position || length > j) {
            position = i;
            windowRight = data[block_idx][1];
          } else {
            if (position === left || j > length) {
              break;
            }
          }
          /** @type {number} */
          length = j;
        }
        result = log(n, value, val);
        /** @type {number} */
        var width = windowRight - x;
        /** @type {boolean} */
        var isX = width >= 0;
        /** @type {number} */
        var w = end - position;
        /** @type {boolean} */
        var needsHorizontalScrollBar = w > delta;
        /** @type {boolean} */
        var max = !needsHorizontalScrollBar && n !== c && result === n;
        if (f) {
          result = log(Math[max ? isX ? "floor" : "ceil" : "round"](n / f) * f, value, val);
          value = val = result;
        }
        if (max && (f || result === n)) {
          /** @type {number} */
          heading = -(width / w);
          /** @type {number} */
          limit = limit * log(Math.abs(heading), options.timeLow, options.timeHigh);
          /** @type {number} */
          size = Math.round(n + heading * limit / friction);
          if (!f) {
            /** @type {number} */
            result = size;
          }
          if (!isX && size > val || isX && value > size) {
            temp = isX ? value : val;
            /** @type {number} */
            diff = size - temp;
            if (!f) {
              result = temp;
            }
            diff = log(result + .03 * diff, temp - 50, temp + 50);
            /** @type {number} */
            limit = Math.abs((n - diff) / (heading / friction));
          }
        }
        /** @type {number} */
        limit = limit * (alt ? 10 : 1);
        (options.onEnd || noop).call(nodeA, $.extend(ev, {
          moved : ev.moved || needsHorizontalScrollBar && f,
          pos : n,
          newPos : result,
          overPos : diff,
          time : limit
        }));
      }
    }
    var d;
    var x;
    var c;
    var n;
    var ret;
    var data;
    var existingWidget;
    var end;
    var value;
    var val;
    var f;
    var alt;
    var name;
    var B;
    var G;
    var nodeA = a[0];
    var self = a.data();
    var o = {};
    return o = $.extend(initialize(options.$wrap, $.extend({}, options, {
      onStart : add,
      onMove : update,
      onEnd : execute
    })), o);
  }
  /**
   * @param {!Object} data
   * @param {!Object} opts
   * @return {?}
   */
  function handler(data, opts) {
    var y;
    var source;
    var concurency;
    var val = data[0];
    var self = {
      prevent : {}
    };
    return bind(val, event, function(event) {
      var utcDayCalib = event.wheelDeltaY || -1 * event.deltaY || 0;
      var extent = event.wheelDeltaX || -1 * event.deltaX || 0;
      /** @type {(boolean|number)} */
      var response = Math.abs(extent) && !Math.abs(utcDayCalib);
      var time = now(0 > extent);
      /** @type {boolean} */
      var m = source === time;
      var connectNumber = $.now();
      /** @type {boolean} */
      var d = delta > connectNumber - concurency;
      source = time;
      concurency = connectNumber;
      if (response && self.ok && (!self.prevent[time] || y)) {
        trigger(event, true);
        if (!(y && m && d)) {
          if (opts.shift) {
            /** @type {boolean} */
            y = true;
            clearTimeout(self.t);
            /** @type {number} */
            self.t = setTimeout(function() {
              /** @type {boolean} */
              y = false;
            }, ms);
          }
          (opts.onEnd || noop)(event, opts.shift ? time : extent);
        }
      }
    }), self;
  }
  /**
   * @return {undefined}
   */
  function push() {
    $.each($.Fotorama.instances, function(lookupTable, docs) {
      /** @type {!Object} */
      docs.index = lookupTable;
    });
  }
  /**
   * @param {?} resampler
   * @return {undefined}
   */
  function freeResampler(resampler) {
    $.Fotorama.instances.push(resampler);
    push();
  }
  /**
   * @param {?} context
   * @return {undefined}
   */
  function freeDecoderContext(context) {
    $.Fotorama.instances.splice(context.index, 1);
    push();
  }
  /** @type {string} */
  var className = "fotorama";
  /** @type {string} */
  var container = "fullscreen";
  /** @type {string} */
  var date = className + "__wrap";
  /** @type {string} */
  var DEFAULT = date + "--css2";
  /** @type {string} */
  var STATEDISABLED = date + "--css3";
  /** @type {string} */
  var CSS_RESIZE = date + "--video";
  /** @type {string} */
  var next_planting = date + "--fade";
  /** @type {string} */
  var warFilename = date + "--slide";
  /** @type {string} */
  var DISABLED_STATE = date + "--no-controls";
  /** @type {string} */
  var defaultRegionSelectedValue = date + "--no-shadows";
  /** @type {string} */
  var editButton = date + "--pan-y";
  /** @type {string} */
  var password_verify = date + "--rtl";
  /** @type {string} */
  var fixedClass = date + "--only-active";
  /** @type {string} */
  var peakRSS = date + "--no-captions";
  /** @type {string} */
  var valueRulers = date + "--toggle-arrows";
  /** @type {string} */
  var _ = className + "__stage";
  /** @type {string} */
  var apiCallRaw = _ + "__frame";
  /** @type {string} */
  var htmlarea = apiCallRaw + "--video";
  /** @type {string} */
  var uiMessageId = _ + "__shaft";
  /** @type {string} */
  var INVALID_CLASS = className + "__grab";
  /** @type {string} */
  var classNames = className + "__pointer";
  /** @type {string} */
  var prefix = className + "__arr";
  /** @type {string} */
  var statement = prefix + "--disabled";
  /** @type {string} */
  var name = prefix + "--prev";
  /** @type {string} */
  var line = prefix + "--next";
  /** @type {string} */
  var item = className + "__nav";
  /** @type {string} */
  var selected = item + "-wrap";
  /** @type {string} */
  var method = item + "__shaft";
  /** @type {string} */
  var value = item + "--dots";
  /** @type {string} */
  var classes = item + "--thumbs";
  /** @type {string} */
  var offlineforum = item + "__frame";
  /** @type {string} */
  var uniqueness = offlineforum + "--dot";
  /** @type {string} */
  var forumFolderPath = offlineforum + "--thumb";
  /** @type {string} */
  var SORT_PREFIX = className + "__fade";
  /** @type {string} */
  var desCls = SORT_PREFIX + "-front";
  /** @type {string} */
  var ascCls = SORT_PREFIX + "-rear";
  /** @type {string} */
  var selector_sort_ = className + "__shadow";
  /** @type {string} */
  var tableName = selector_sort_ + "s";
  /** @type {string} */
  var center = tableName + "--left";
  /** @type {string} */
  var depth = tableName + "--right";
  /** @type {string} */
  var image = className + "__active";
  /** @type {string} */
  var falseySection = className + "__select";
  /** @type {string} */
  var idSelector = className + "--hidden";
  /** @type {string} */
  var button = className + "--fullscreen";
  /** @type {string} */
  var selector = className + "__fullscreen-icon";
  /** @type {string} */
  var clsFancytreeCellNavMode = className + "__error";
  /** @type {string} */
  var populatedClass = className + "__loading";
  /** @type {string} */
  var activeClassName = className + "__loaded";
  /** @type {string} */
  var complete = activeClassName + "--full";
  /** @type {string} */
  var onfocus = activeClassName + "--img";
  /** @type {string} */
  var staggerClassName = className + "__grabbing";
  /** @type {string} */
  var ss = className + "__img";
  /** @type {string} */
  var IE = ss + "--full";
  /** @type {string} */
  var roleName = className + "__dot";
  /** @type {string} */
  var width = className + "__thumb";
  /** @type {string} */
  var size = width + "-border";
  /** @type {string} */
  var SourceCodeToggleHTML = className + "__html";
  /** @type {string} */
  var id = className + "__video";
  /** @type {string} */
  var url = id + "-play";
  /** @type {string} */
  var response = id + "-close";
  /** @type {string} */
  var widgetElId = className + "__caption";
  /** @type {string} */
  var s = className + "__caption__wrap";
  /** @type {string} */
  var handlerKey = className + "__spinner";
  /** @type {string} */
  var property = '" tabindex="0" role="button';
  var d = $ && $.fn.jquery.split(".");
  if (!d || d[0] < 1 || 1 == d[0] && d[1] < 8) {
    throw "Fotorama requires jQuery 1.8 or later and will not run without it.";
  }
  var masterConfigTemplateSetting = {};
  var Modernizr = function(metaWindow, document, undefined) {
    /**
     * @param {string} message
     * @return {undefined}
     */
    function createCustomError(message) {
      /** @type {string} */
      d.cssText = message;
    }
    /**
     * @param {!Function} a
     * @param {string} b
     * @return {?}
     */
    function is(a, b) {
      return typeof a === b;
    }
    /**
     * @param {string} value
     * @param {string} key
     * @return {?}
     */
    function contains(value, key) {
      return !!~("" + value).indexOf(key);
    }
    /**
     * @param {!Object} props
     * @param {string} prefixed
     * @return {?}
     */
    function testProps(props, prefixed) {
      var i;
      for (i in props) {
        var key = props[i];
        if (!contains(key, "-") && d[key] !== undefined) {
          return "pfx" == prefixed ? key : true;
        }
      }
      return false;
    }
    /**
     * @param {!Object} props
     * @param {!Object} obj
     * @param {!Object} elem
     * @return {?}
     */
    function testDOMProps(props, obj, elem) {
      var i;
      for (i in props) {
        var item = obj[props[i]];
        if (item !== undefined) {
          return elem === false ? props[i] : is(item, "function") ? item.bind(elem || obj) : item;
        }
      }
      return false;
    }
    /**
     * @param {string} prop
     * @param {!Object} prefixed
     * @param {!Object} elem
     * @return {?}
     */
    function testPropsAll(prop, prefixed, elem) {
      var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1);
      /** @type {!Array<string>} */
      var props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(" ");
      return is(prefixed, "string") || is(prefixed, "undefined") ? testProps(props, prefixed) : (props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" "), testDOMProps(props, prefixed, elem));
    }
    var _i;
    var featureName;
    var hasOwnProperty;
    /** @type {string} */
    var version = "2.6.2";
    var Modernizr = {};
    /** @type {!Element} */
    var docElement = document.documentElement;
    /** @type {string} */
    var mod = "modernizr";
    /** @type {!Element} */
    var i = document.createElement(mod);
    /** @type {!CSSStyleDeclaration} */
    var d = i.style;
    /** @type {!Array<string>} */
    var prefixes = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" "));
    /** @type {string} */
    var excludeLink = "Webkit Moz O ms";
    /** @type {!Array<string>} */
    var cssomPrefixes = excludeLink.split(" ");
    /** @type {!Array<string>} */
    var domPrefixes = excludeLink.toLowerCase().split(" ");
    var tests = {};
    /** @type {!Array} */
    var classes = [];
    /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
    var slice = classes.slice;
    /**
     * @param {?} rule
     * @param {?} callback
     * @param {number} nodes
     * @param {string} testnames
     * @return {?}
     */
    var injectElementWithStyles = function(rule, callback, nodes, testnames) {
      var atext;
      var ret;
      var node;
      var docOverflow;
      /** @type {!Element} */
      var div = document.createElement("div");
      /** @type {!HTMLBodyElement} */
      var body = document.body;
      /** @type {!HTMLBodyElement} */
      var fakeBody = body || document.createElement("body");
      if (parseInt(nodes, 10)) {
        for (; nodes--;) {
          /** @type {!Element} */
          node = document.createElement("div");
          node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
          div.appendChild(node);
        }
      }
      return atext = ["&#173;", '<style id="s', mod, '">', rule, "</style>"].join(""), div.id = mod, (body ? div : fakeBody).innerHTML += atext, fakeBody.appendChild(div), body || (fakeBody.style.background = "", fakeBody.style.overflow = "hidden", docOverflow = docElement.style.overflow, docElement.style.overflow = "hidden", docElement.appendChild(fakeBody)), ret = callback(div, rule), body ? div.parentNode.removeChild(div) : (fakeBody.parentNode.removeChild(fakeBody), docElement.style.overflow = 
      docOverflow), !!ret;
    };
    /** @type {function(this:Object, *): boolean} */
    var x = {}.hasOwnProperty;
    /** @type {function(!Object, string): ?} */
    hasOwnProperty = is(x, "undefined") || is(x.call, "undefined") ? function(object, property) {
      return property in object && is(object.constructor.prototype[property], "undefined");
    } : function(obj, node) {
      return x.call(obj, node);
    };
    if (!Function.prototype.bind) {
      /**
       * @param {(Object|null|undefined)} ports
       * @param {...*} p1
       * @return {!Function}
       */
      Function.prototype.bind = function(ports) {
        /** @type {!Function} */
        var self = this;
        if ("function" != typeof self) {
          throw new TypeError;
        }
        /** @type {!Array<?>} */
        var headArgs = slice.call(arguments, 1);
        /**
         * @return {?}
         */
        var bound = function() {
          if (this instanceof bound) {
            /**
             * @return {undefined}
             */
            var F = function() {
            };
            F.prototype = self.prototype;
            var child = new F;
            var result = self.apply(child, headArgs.concat(slice.call(arguments)));
            return Object(result) === result ? result : child;
          }
          return self.apply(ports, headArgs.concat(slice.call(arguments)));
        };
        return bound;
      };
    }
    /**
     * @return {?}
     */
    tests.csstransforms3d = function() {
      /** @type {boolean} */
      var test = !!testPropsAll("perspective");
      return test;
    };
    var key;
    for (key in tests) {
      if (hasOwnProperty(tests, key)) {
        /** @type {string} */
        featureName = key.toLowerCase();
        Modernizr[featureName] = tests[key]();
        classes.push((Modernizr[featureName] ? "" : "no-") + featureName);
      }
    }
    return Modernizr.addTest = function(feature, test) {
      if ("object" == typeof feature) {
        var key;
        for (key in feature) {
          if (hasOwnProperty(feature, key)) {
            Modernizr.addTest(key, feature[key]);
          }
        }
      } else {
        if (feature = feature.toLowerCase(), Modernizr[feature] !== undefined) {
          return Modernizr;
        }
        test = "function" == typeof test ? test() : test;
        if ("undefined" != typeof enableClasses && enableClasses) {
          docElement.className += " " + (test ? "" : "no-") + feature;
        }
        /** @type {boolean} */
        Modernizr[feature] = test;
      }
      return Modernizr;
    }, createCustomError(""), i = _i = null, Modernizr._version = version, Modernizr._prefixes = prefixes, Modernizr._domPrefixes = domPrefixes, Modernizr._cssomPrefixes = cssomPrefixes, Modernizr.testProp = function(prop) {
      return testProps([prop]);
    }, Modernizr.testAllProps = testPropsAll, Modernizr.testStyles = injectElementWithStyles, Modernizr.prefixed = function(prop, obj, elem) {
      return obj ? testPropsAll(prop, obj, elem) : testPropsAll(prop, "pfx");
    }, Modernizr;
  }(window, document);
  var data = {
    ok : false,
    is : function() {
      return false;
    },
    request : function() {
    },
    cancel : function() {
    },
    event : "",
    prefix : ""
  };
  /** @type {!Array<string>} */
  var parts = "webkit moz o ms khtml".split(" ");
  if ("undefined" != typeof document.cancelFullScreen) {
    /** @type {boolean} */
    data.ok = true;
  } else {
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    var length = parts.length;
    for (; length > i; i++) {
      if (data.prefix = parts[i], "undefined" != typeof document[data.prefix + "CancelFullScreen"]) {
        /** @type {boolean} */
        data.ok = true;
        break;
      }
    }
  }
  if (data.ok) {
    /** @type {string} */
    data.event = data.prefix + "fullscreenchange";
    /**
     * @return {?}
     */
    data.is = function() {
      switch(this.prefix) {
        case "":
          return document.fullScreen;
        case "webkit":
          return document.webkitIsFullScreen;
        default:
          return document[this.prefix + "FullScreen"];
      }
    };
    /**
     * @param {!Object} target
     * @return {?}
     */
    data.request = function(target) {
      return "" === this.prefix ? target.requestFullScreen() : target[this.prefix + "RequestFullScreen"]();
    };
    /**
     * @return {?}
     */
    data.cancel = function() {
      return "" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]();
    };
  }
  var Model;
  var opts = {
    lines : 12,
    length : 5,
    width : 2,
    radius : 7,
    corners : 1,
    rotate : 15,
    color : "rgba(128, 128, 128, .75)",
    hwaccel : true
  };
  var defaults = {
    top : "auto",
    left : "auto",
    className : ""
  };
  !function(EMSarray, require) {
    Model = require();
  }(this, function() {
    /**
     * @param {string} tag
     * @param {!Array} properties
     * @return {?}
     */
    function createEl(tag, properties) {
      var propertyName;
      /** @type {!Element} */
      var wrapper = document.createElement(tag || "div");
      for (propertyName in properties) {
        wrapper[propertyName] = properties[propertyName];
      }
      return wrapper;
    }
    /**
     * @param {!Node} parent
     * @return {?}
     */
    function ins(parent) {
      /** @type {number} */
      var i = 1;
      /** @type {number} */
      var length = arguments.length;
      for (; length > i; i++) {
        parent.appendChild(arguments[i]);
      }
      return parent;
    }
    /**
     * @param {number} a
     * @param {number} b
     * @param {number} i
     * @param {number} lines
     * @return {?}
     */
    function addAnimation(a, b, i, lines) {
      /** @type {string} */
      var hash = ["opacity", b, ~~(100 * a), i, lines].join("-");
      /** @type {number} */
      var h = .01 + i / lines * 100;
      /** @type {number} */
      var a__$1 = Math.max(1 - (1 - a) / b * (100 - h), a);
      var prefix = useCssAnimations.substring(0, useCssAnimations.indexOf("Animation")).toLowerCase();
      var getdate = prefix && "-" + prefix + "-" || "";
      return deletedHashes[hash] || (elStyle.insertRule("@" + getdate + "keyframes " + hash + "{0%{opacity:" + a__$1 + "}" + h + "%{opacity:" + a + "}" + (h + .01) + "%{opacity:1}" + (h + b) % 100 + "%{opacity:" + a + "}100%{opacity:" + a__$1 + "}}", elStyle.cssRules.length), deletedHashes[hash] = 1), hash;
    }
    /**
     * @param {!Element} el
     * @param {!Object} prop
     * @return {?}
     */
    function vendor(el, prop) {
      var pp;
      var i;
      var s = el.style;
      prop = prop.charAt(0).toUpperCase() + prop.slice(1);
      /** @type {number} */
      i = 0;
      for (; i < prefixes.length; i++) {
        if (pp = prefixes[i] + prop, s[pp] !== undefined) {
          return pp;
        }
      }
      return s[prop] !== undefined ? prop : void 0;
    }
    /**
     * @param {!Element} el
     * @param {!Object} source
     * @return {?}
     */
    function css(el, source) {
      var n;
      for (n in source) {
        el.style[vendor(el, n) || n] = source[n];
      }
      return el;
    }
    /**
     * @param {!Object} dst
     * @return {?}
     */
    function merge(dst) {
      /** @type {number} */
      var i = 1;
      for (; i < arguments.length; i++) {
        var tmp = arguments[i];
        var p;
        for (p in tmp) {
          if (dst[p] === undefined) {
            dst[p] = tmp[p];
          }
        }
      }
      return dst;
    }
    /**
     * @param {!Object} e
     * @return {?}
     */
    function pos(e) {
      var offset = {
        x : e.offsetLeft,
        y : e.offsetTop
      };
      for (; e = e.offsetParent;) {
        offset.x += e.offsetLeft;
        offset.y += e.offsetTop;
      }
      return offset;
    }
    /**
     * @param {string} str
     * @param {number} i
     * @return {?}
     */
    function getColor(str, i) {
      return "string" == typeof str ? str : str[i % str.length];
    }
    /**
     * @param {?} o
     * @return {?}
     */
    function Spinner(o) {
      return "undefined" == typeof this ? new Spinner(o) : void(this.opts = merge(o || {}, Spinner.defaults, defaults));
    }
    /**
     * @return {undefined}
     */
    function initVML() {
      /**
       * @param {string} tag
       * @param {!Array} attr
       * @return {?}
       */
      function vml(tag, attr) {
        return createEl("<" + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr);
      }
      elStyle.addRule(".spin-vml", "behavior:url(#default#VML)");
      /**
       * @param {!Node} el
       * @param {!Object} o
       * @return {?}
       */
      Spinner.prototype.lines = function(el, o) {
        /**
         * @return {?}
         */
        function grp() {
          return css(vml("group", {
            coordsize : s + " " + s,
            coordorigin : -r + " " + -r
          }), {
            width : s,
            height : s
          });
        }
        /**
         * @param {number} i
         * @param {number} dx
         * @param {string} filter
         * @return {undefined}
         */
        function seg(i, dx, filter) {
          ins(g, ins(css(grp(), {
            rotation : 360 / o.lines * i + "deg",
            left : ~~dx
          }), ins(css(vml("roundrect", {
            arcsize : o.corners
          }), {
            width : r,
            height : o.width,
            left : o.radius,
            top : -o.width >> 1,
            filter : filter
          }), vml("fill", {
            color : getColor(o.color, i),
            opacity : o.opacity
          }), vml("stroke", {
            opacity : 0
          }))));
        }
        var i;
        var r = o.length + o.width;
        /** @type {number} */
        var s = 2 * r;
        /** @type {string} */
        var virtualBorderColor = 2 * -(o.width + o.length) + "px";
        var g = css(grp(), {
          position : "absolute",
          top : virtualBorderColor,
          left : virtualBorderColor
        });
        if (o.shadow) {
          /** @type {number} */
          i = 1;
          for (; i <= o.lines; i++) {
            seg(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
          }
        }
        /** @type {number} */
        i = 1;
        for (; i <= o.lines; i++) {
          seg(i);
        }
        return ins(el, g);
      };
      /**
       * @param {!Node} p
       * @param {?} i
       * @param {number} c
       * @param {string} d
       * @return {undefined}
       */
      Spinner.prototype.opacity = function(p, i, c, d) {
        var e = p.firstChild;
        d = d.shadow && d.lines || 0;
        if (e && i + d < e.childNodes.length) {
          e = e.childNodes[i + d];
          e = e && e.firstChild;
          e = e && e.firstChild;
          if (e) {
            /** @type {number} */
            e.opacity = c;
          }
        }
      };
    }
    var useCssAnimations;
    /** @type {!Array} */
    var prefixes = ["webkit", "Moz", "ms", "O"];
    var deletedHashes = {};
    var elStyle = function() {
      var el = createEl("style", {
        type : "text/css"
      });
      return ins(document.getElementsByTagName("head")[0], el), el.sheet || el.styleSheet;
    }();
    var defaults = {
      lines : 12,
      length : 7,
      width : 5,
      radius : 10,
      rotate : 0,
      corners : 1,
      color : "#000",
      direction : 1,
      speed : 1,
      trail : 100,
      opacity : .25,
      fps : 20,
      zIndex : 2E9,
      className : "spinner",
      top : "auto",
      left : "auto",
      position : "relative"
    };
    Spinner.defaults = {};
    merge(Spinner.prototype, {
      spin : function(e) {
        this.stop();
        var ep;
        var tp;
        var self = this;
        var o = self.opts;
        var el = self.el = css(createEl(0, {
          className : o.className
        }), {
          position : o.position,
          width : 0,
          zIndex : o.zIndex
        });
        var isfMainLine = o.radius + o.length + o.width;
        if (e && (e.insertBefore(el, e.firstChild || null), tp = pos(e), ep = pos(el), css(el, {
          left : ("auto" == o.left ? tp.x - ep.x + (e.offsetWidth >> 1) : parseInt(o.left, 10) + isfMainLine) + "px",
          top : ("auto" == o.top ? tp.y - ep.y + (e.offsetHeight >> 1) : parseInt(o.top, 10) + isfMainLine) + "px"
        })), el.setAttribute("role", "progressbar"), self.lines(el, self.opts), !useCssAnimations) {
          var e;
          /** @type {number} */
          var i = 0;
          /** @type {number} */
          var start = (o.lines - 1) * (1 - o.direction) / 2;
          var fps = o.fps;
          /** @type {number} */
          var f = fps / o.speed;
          /** @type {number} */
          var ostep = (1 - o.opacity) / (f * o.trail / 100);
          /** @type {number} */
          var astep = f / o.lines;
          !function anim() {
            i++;
            /** @type {number} */
            var j = 0;
            for (; j < o.lines; j++) {
              /** @type {number} */
              e = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity);
              self.opacity(el, j * o.direction + start, e, o);
            }
            self.timeout = self.el && setTimeout(anim, ~~(1E3 / fps));
          }();
        }
        return self;
      },
      stop : function() {
        var el = this.el;
        return el && (clearTimeout(this.timeout), el.parentNode && el.parentNode.removeChild(el), this.el = undefined), this;
      },
      lines : function(el, o) {
        /**
         * @param {string} color
         * @param {string} shadow
         * @return {?}
         */
        function fill(color, shadow) {
          return css(createEl(), {
            position : "absolute",
            width : o.length + o.width + "px",
            height : o.width + "px",
            background : color,
            boxShadow : shadow,
            transformOrigin : "left",
            transform : "rotate(" + ~~(360 / o.lines * i + o.rotate) + "deg) translate(" + o.radius + "px,0)",
            borderRadius : (o.corners * o.width >> 1) + "px"
          });
        }
        var seg;
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var start = (o.lines - 1) * (1 - o.direction) / 2;
        for (; i < o.lines; i++) {
          seg = css(createEl(), {
            position : "absolute",
            top : 1 + ~(o.width / 2) + "px",
            transform : o.hwaccel ? "translate3d(0,0,0)" : "",
            opacity : o.opacity,
            animation : useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + " " + 1 / o.speed + "s linear infinite"
          });
          if (o.shadow) {
            ins(seg, css(fill("#000", "0 0 4px #000"), {
              top : "2px"
            }));
          }
          ins(el, ins(seg, fill(getColor(o.color, i), "0 0 1px rgba(0,0,0,.1)")));
        }
        return el;
      },
      opacity : function(p, i, o) {
        if (i < p.childNodes.length) {
          /** @type {number} */
          p.childNodes[i].style.opacity = o;
        }
      }
    });
    var probe = css(createEl("group"), {
      behavior : "url(#default#VML)"
    });
    return !vendor(probe, "transform") && probe.adj ? initVML() : useCssAnimations = vendor(probe, "animation"), Spinner;
  });
  var box;
  var nav_target;
  var $window = $(window);
  var editor = $(document);
  /** @type {boolean} */
  var refresh = "quirks" === obj.hash.replace("#", "");
  var timecreated = Modernizr.csstransforms3d;
  var disable = timecreated && !refresh;
  var discTimecreated = timecreated || "CSS1Compat" === document.compatMode;
  /** @type {boolean} */
  var ok = data.ok;
  /** @type {(Array<string>|null)} */
  var thingie = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i);
  /** @type {(Array<string>|boolean|null)} */
  var res = !disable || thingie;
  /** @type {boolean} */
  var chart = navigator.msPointerEnabled;
  /** @type {string} */
  var event = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
  /** @type {number} */
  var delta = 250;
  /** @type {number} */
  var time = 300;
  /** @type {number} */
  var ms = 1400;
  /** @type {number} */
  var zi = 5E3;
  /** @type {number} */
  var str = 2;
  /** @type {number} */
  var max = 64;
  /** @type {number} */
  var canvasWidth = 500;
  /** @type {number} */
  var rh = 333;
  /** @type {string} */
  var i = "$stageFrame";
  /** @type {string} */
  var key = "$navDotFrame";
  /** @type {string} */
  var k = "$navThumbFrame";
  /** @type {string} */
  var bottom = "auto";
  var e = f([.1, 0, .25, 1]);
  /** @type {number} */
  var 959595 = 99999;
  /** @type {string} */
  var y = "50%";
  var defaultOptions = {
    width : null,
    minwidth : null,
    maxwidth : "100%",
    height : null,
    minheight : null,
    maxheight : null,
    ratio : null,
    margin : str,
    glimpse : 0,
    fit : "contain",
    position : y,
    thumbposition : y,
    nav : "dots",
    navposition : "bottom",
    navwidth : null,
    thumbwidth : max,
    thumbheight : max,
    thumbmargin : str,
    thumbborderwidth : str,
    thumbfit : "cover",
    allowfullscreen : false,
    transition : "slide",
    clicktransition : null,
    transitionduration : time,
    captions : true,
    hash : false,
    startindex : 0,
    loop : false,
    autoplay : false,
    stopautoplayontouch : true,
    keyboard : false,
    arrows : true,
    click : true,
    swipe : true,
    trackpad : false,
    enableifsingleframe : false,
    controlsonstart : true,
    shuffle : false,
    direction : "ltr",
    shadows : true,
    spinner : null
  };
  var keyCodes = {
    left : true,
    right : true,
    down : false,
    up : false,
    space : false,
    home : false,
    end : false
  };
  /**
   * @param {undefined} v
   * @return {undefined}
   */
  test.stop = function(v) {
    /** @type {boolean} */
    test.ii[v] = false;
  };
  var h;
  var EOF;
  var sh;
  var _takingTooLongTimeout;
  /**
   * @param {!Object} $el
   * @param {!Object} options
   * @return {undefined}
   */
  jQuery.Fotorama = function($el, options) {
    /**
     * @return {undefined}
     */
    function add() {
      $.each(params, function(a, item) {
        if (!item.i) {
          /** @type {number} */
          item.i = num++;
          var res = update(item.video, true);
          if (res) {
            var data = {};
            item.video = res;
            if (item.img || item.thumb) {
              /** @type {boolean} */
              item.thumbsReady = true;
            } else {
              data = remove(item, params, that);
            }
            send(params, {
              img : data.img,
              thumb : data.thumb
            }, item.i, that);
          }
        }
      });
    }
    /**
     * @param {string} key
     * @return {?}
     */
    function pressKey(key) {
      return action[key] || that.fullScreen;
    }
    /**
     * @param {!Function} diff
     * @return {undefined}
     */
    function update(diff) {
      /** @type {string} */
      var name = "keydown." + className;
      /** @type {string} */
      var staggerClassName = className + _stagger;
      /** @type {string} */
      var namespacedEvt = "keydown." + staggerClassName;
      /** @type {string} */
      var LEAVE_EVENTS = "resize." + staggerClassName + " orientationchange." + staggerClassName;
      if (diff) {
        editor.on(namespacedEvt, function(event) {
          var type;
          var j;
          if (prev && 27 === event.keyCode) {
            /** @type {boolean} */
            type = true;
            log(prev, true, true);
          } else {
            if (that.fullScreen || options.keyboard && !that.index) {
              if (27 === event.keyCode) {
                /** @type {boolean} */
                type = true;
                that.cancelFullScreen();
              } else {
                if (event.shiftKey && 32 === event.keyCode && pressKey("space") || 37 === event.keyCode && pressKey("left") || 38 === event.keyCode && pressKey("up")) {
                  /** @type {string} */
                  j = "<";
                } else {
                  if (32 === event.keyCode && pressKey("space") || 39 === event.keyCode && pressKey("right") || 40 === event.keyCode && pressKey("down")) {
                    /** @type {string} */
                    j = ">";
                  } else {
                    if (36 === event.keyCode && pressKey("home")) {
                      /** @type {string} */
                      j = "<<";
                    } else {
                      if (35 === event.keyCode && pressKey("end")) {
                        /** @type {string} */
                        j = ">>";
                      }
                    }
                  }
                }
              }
            }
          }
          if (type || j) {
            trigger(event);
          }
          if (j) {
            that.show({
              index : j,
              slow : event.altKey,
              user : true
            });
          }
        });
        if (!that.index) {
          editor.off(name).on(name, "textarea, input, select", function(event) {
            if (!nav_target.hasClass(container)) {
              event.stopPropagation();
            }
          });
        }
        $window.on(LEAVE_EVENTS, that.resize);
      } else {
        editor.off(namespacedEvt);
        $window.off(LEAVE_EVENTS);
      }
    }
    /**
     * @param {!Function} el
     * @return {undefined}
     */
    function destroy(el) {
      if (el !== destroy.f) {
        if (el) {
          $el.html("").addClass(className + " " + staggerClassName).append(wrapper).before(child).before($newHeader);
          freeResampler(that);
        } else {
          wrapper.detach();
          child.detach();
          $newHeader.detach();
          $el.html(component.urtext).removeClass(staggerClassName);
          freeDecoderContext(that);
        }
        update(el);
        /** @type {!Function} */
        destroy.f = el;
      }
    }
    /**
     * @return {undefined}
     */
    function next() {
      params = that.data = params || getData(options.data) || link($el);
      count = that.size = params.length;
      if (!refresh.ok && options.shuffle) {
        create(params);
      }
      add();
      value = resolve(value);
      if (count) {
        destroy(true);
      }
    }
    /**
     * @return {undefined}
     */
    function _init() {
      var user = 2 > count && !options.enableifsingleframe || prev;
      obj.noMove = user || err;
      obj.noSwipe = user || !options.swipe;
      if (!undefined) {
        elem.toggleClass(INVALID_CLASS, !options.click && !obj.noMove && !obj.noSwipe);
      }
      if (chart) {
        wrapper.toggleClass(editButton, !obj.noSwipe);
      }
    }
    /**
     * @param {string} t
     * @return {undefined}
     */
    function extend(t) {
      if (t === true) {
        /** @type {string} */
        t = "";
      }
      /** @type {number} */
      options.autoplay = Math.max(+t || zi, 1.5 * w);
    }
    /**
     * @return {undefined}
     */
    function render() {
      /**
       * @param {string} state
       * @param {string} val
       * @return {undefined}
       */
      function callback(state, val) {
        self[state ? "add" : "remove"].push(val);
      }
      that.options = options = render(options);
      /** @type {boolean} */
      err = "crossfade" === options.transition || "dissolve" === options.transition;
      match = options.loop && (count > 2 || err && (!undefined || "slide" !== undefined));
      /** @type {number} */
      w = +options.transitionduration || time;
      /** @type {boolean} */
      dir = "rtl" === options.direction;
      action = $.extend({}, options.keyboard && keyCodes, options.keyboard);
      var self = {
        add : [],
        remove : []
      };
      if (count > 1 || options.enableifsingleframe) {
        threshold = options.nav;
        /** @type {boolean} */
        Pd = "top" === options.navposition;
        self.remove.push(falseySection);
        app.toggle(!!options.arrows);
      } else {
        /** @type {boolean} */
        threshold = false;
        app.hide();
      }
      abort();
      ViewSpinner = new Model($.extend(opts, options.spinner, defaults, {
        direction : dir ? -1 : 1
      }));
      forEach();
      reset();
      if (options.autoplay) {
        extend(options.autoplay);
      }
      min = parseInt(options.thumbwidth) || max;
      n = parseInt(options.thumbheight) || max;
      config.ok = ref.ok = options.trackpad && !res;
      _init();
      merge(options, [o]);
      /** @type {boolean} */
      isNewStateNearStart = "thumbs" === threshold;
      if (isNewStateNearStart) {
        test(count, "navThumb");
        message = e;
        /** @type {string} */
        j = k;
        applyCSS(child, $.Fotorama.jst.style({
          w : min,
          h : n,
          b : options.thumbborderwidth,
          m : options.thumbmargin,
          s : _stagger,
          q : !discTimecreated
        }));
        input.addClass(classes).removeClass(value);
      } else {
        if ("dots" === threshold) {
          test(count, "navDot");
          message = res;
          /** @type {string} */
          j = key;
          input.addClass(value).removeClass(classes);
        } else {
          /** @type {boolean} */
          threshold = false;
          input.removeClass(classes + " " + value);
        }
      }
      if (threshold) {
        if (Pd) {
          target.insertBefore(content);
        } else {
          target.insertAfter(content);
        }
        /** @type {boolean} */
        init.nav = false;
        init(message, element, "nav");
      }
      object = options.allowfullscreen;
      if (object) {
        dom.prependTo(content);
        /** @type {boolean} */
        matchesSelector = ok && "native" === object;
      } else {
        dom.detach();
        /** @type {boolean} */
        matchesSelector = false;
      }
      callback(err, next_planting);
      callback(!err, warFilename);
      callback(!options.captions, peakRSS);
      callback(dir, password_verify);
      callback("always" !== options.arrows, valueRulers);
      exists = options.shadows && !res;
      callback(!exists, defaultRegionSelectedValue);
      wrapper.addClass(self.add.join(" ")).removeClass(self.remove.join(" "));
      lastQueryOptions = $.extend({}, options);
    }
    /**
     * @param {number} x
     * @return {?}
     */
    function parseInt(x) {
      return 0 > x ? (count + x % count) % count : x >= count ? x % count : x;
    }
    /**
     * @param {number} a
     * @return {?}
     */
    function resolve(a) {
      return log(a, 0, count - 1);
    }
    /**
     * @param {number} a
     * @return {?}
     */
    function zF(a) {
      return match ? parseInt(a) : resolve(a);
    }
    /**
     * @param {number} array
     * @return {?}
     */
    function clone(array) {
      return array > 0 || match ? array - 1 : false;
    }
    /**
     * @param {number} val
     * @return {?}
     */
    function capitalize(val) {
      return count - 1 > val || match ? val + 1 : false;
    }
    /**
     * @return {undefined}
     */
    function animate() {
      /** @type {number} */
      obj.min = match ? -1 / 0 : -resolve(count - 1, o.w, options.margin, result);
      /** @type {number} */
      obj.max = match ? 1 / 0 : -resolve(0, o.w, options.margin, result);
      obj.snap = o.w + options.margin;
    }
    /**
     * @return {undefined}
     */
    function draw() {
      /** @type {number} */
      values.min = Math.min(0, o.nw - element.width());
      /** @type {number} */
      values.max = 0;
      element.toggleClass(INVALID_CLASS, !(values.noMove = values.min === values.max));
    }
    /**
     * @param {!Object} value
     * @param {string} name
     * @param {!Function} fn
     * @return {?}
     */
    function find(value, name, fn) {
      if ("number" == typeof value) {
        /** @type {!Array} */
        value = new Array(value);
        /** @type {boolean} */
        var useAID = true;
      }
      return $.each(value, function(a, id) {
        if (useAID && (id = a), "number" == typeof id) {
          var options = params[parseInt(id)];
          if (options) {
            /** @type {string} */
            var filename = "$" + name + "Frame";
            var data = options[filename];
            fn.call(this, a, id, options, data, filename, data && data.data());
          }
        }
      });
    }
    /**
     * @param {string} width
     * @param {!Function} height
     * @param {string} array
     * @param {!Object} a
     * @return {undefined}
     */
    function max(width, height, array, a) {
      if (!typeB || "*" === typeB && a === b) {
        width = isNumber(options.width) || isNumber(width) || canvasWidth;
        height = isNumber(options.height) || isNumber(height) || rh;
        that.resize({
          width : width,
          ratio : options.ratio || array || width / height
        }, 0, a !== b && "*");
      }
    }
    /**
     * @param {!Array} message
     * @param {string} object
     * @param {!Object} key
     * @param {?} value
     * @param {string} position
     * @param {!Object} isRefresh
     * @return {undefined}
     */
    function callback(message, object, key, value, position, isRefresh) {
      find(message, object, function(a, i, data, l, canCreateDiscussions, self) {
        /**
         * @param {string} data
         * @return {undefined}
         */
        function add(data) {
          var j = parseInt(i);
          cb(data, {
            index : j,
            src : name,
            frame : params[j]
          });
        }
        /**
         * @return {undefined}
         */
        function init() {
          node.remove();
          /** @type {string} */
          $.Fotorama.cache[name] = "error";
          if (data.html && "stage" === object || !style || style === name) {
            if (!name || data.html || isIE) {
              if ("stage" === object) {
                l.trigger("f:load").removeClass(populatedClass + " " + clsFancytreeCellNavMode).addClass(activeClassName);
                add("load");
                max();
              }
            } else {
              l.trigger("f:error").removeClass(populatedClass).addClass(clsFancytreeCellNavMode);
              add("error");
            }
            /** @type {string} */
            self.state = "error";
            if (!(!(count > 1 && params[i] === data) || data.html || data.deleted || data.video || isIE)) {
              /** @type {boolean} */
              data.deleted = true;
              that.splice(i, 1);
            }
          } else {
            data[fifth] = name = style;
            callback([i], object, key, value, position, true);
          }
        }
        /**
         * @return {undefined}
         */
        function initialize() {
          $.Fotorama.measures[name] = that.measures = $.Fotorama.measures[name] || {
            width : img.width,
            height : img.height,
            ratio : img.width / img.height
          };
          max(that.measures.width, that.measures.height, that.measures.ratio, i);
          node.off("load error").addClass(ss + (isIE ? " " + IE : "")).prependTo(l);
          start(node, ($.isFunction(key) ? key() : key) || o, value || data.fit || options.fit, position || data.position || options.position);
          /** @type {string} */
          $.Fotorama.cache[name] = self.state = "loaded";
          setTimeout(function() {
            l.trigger("f:load").removeClass(populatedClass + " " + clsFancytreeCellNavMode).addClass(activeClassName + " " + (isIE ? complete : onfocus));
            if ("stage" === object) {
              add("load");
            } else {
              if (data.thumbratio === bottom || !data.thumbratio && options.thumbratio === bottom) {
                data.thumbratio = that.measures.ratio;
                set();
              }
            }
          }, 0);
        }
        /**
         * @return {undefined}
         */
        function func() {
          /** @type {number} */
          var a = 10;
          test(function() {
            return !fe || !a-- && !res;
          }, function() {
            initialize();
          });
        }
        if (l) {
          var isIE = that.fullScreen && data.full && data.full !== data.img && !self.$full && "stage" === object;
          if (!self.$img || isRefresh || isIE) {
            /** @type {!Image} */
            var img = new Image;
            var node = $(img);
            var that = node.data();
            self[isIE ? "$full" : "$img"] = node;
            /** @type {string} */
            var fifth = "stage" === object ? isIE ? "full" : "img" : "thumb";
            var name = data[fifth];
            var style = isIE ? null : data["stage" === object ? "thumb" : "img"];
            if ("navThumb" === object && (l = self.$wrap), !name) {
              return void init();
            }
            if ($.Fotorama.cache[name]) {
              !function func() {
                if ("error" === $.Fotorama.cache[name]) {
                  init();
                } else {
                  if ("loaded" === $.Fotorama.cache[name]) {
                    setTimeout(func, 0);
                  } else {
                    setTimeout(func, 100);
                  }
                }
              }();
            } else {
              /** @type {string} */
              $.Fotorama.cache[name] = "*";
              node.on("load", func).on("error", init);
            }
            /** @type {string} */
            self.state = "";
            img.src = name;
          }
        }
      });
    }
    /**
     * @param {?} elem
     * @return {undefined}
     */
    function link(elem) {
      benchSection.append(ViewSpinner.spin().el).appendTo(elem);
    }
    /**
     * @return {undefined}
     */
    function abort() {
      benchSection.detach();
      if (ViewSpinner) {
        ViewSpinner.stop();
      }
    }
    /**
     * @return {undefined}
     */
    function call() {
      var prev = p[i];
      if (prev && !prev.data().state) {
        link(prev);
        prev.on("f:load f:error", function() {
          prev.off("f:load f:error");
          abort();
        });
      }
    }
    /**
     * @param {!HTMLElement} type
     * @return {undefined}
     */
    function get(type) {
      define(type, runTest);
      support(type, function() {
        setTimeout(function() {
          format(input);
        }, 0);
        create({
          time : w,
          guessIndex : $(this).data().eq,
          minMax : values
        });
      });
    }
    /**
     * @param {!Object} name
     * @param {string} value
     * @return {undefined}
     */
    function test(name, value) {
      find(name, value, function(a, canCreateDiscussions, data, f, action, options) {
        if (!f) {
          f = data[action] = wrapper[action].clone();
          options = f.data();
          /** @type {!Object} */
          options.data = data;
          var z = f[0];
          if ("stage" === value) {
            if (data.html) {
              $('<div class="' + SourceCodeToggleHTML + '"></div>').append(data._html ? $(data.html).removeAttr("id").html(data._html) : data.html).appendTo(f);
            }
            if (data.caption) {
              $(parse(widgetElId, parse(s, data.caption))).appendTo(f);
            }
            if (data.video) {
              f.addClass(htmlarea).append(cmd_arg_element.clone());
            }
            support(z, function() {
              setTimeout(function() {
                format(content);
              }, 0);
              f({
                index : options.eq,
                user : true
              });
            });
            a = a.add(f);
          } else {
            if ("navDot" === value) {
              get(z);
              res = res.add(f);
            } else {
              if ("navThumb" === value) {
                get(z);
                options.$wrap = f.children(":first");
                e = e.add(f);
                if (data.video) {
                  options.$wrap.append(cmd_arg_element.clone());
                }
              }
            }
          }
        }
      });
    }
    /**
     * @param {number} options
     * @param {!Window} name
     * @param {string} val
     * @param {string} opts
     * @return {?}
     */
    function format(options, name, val, opts) {
      return options && options.length && start(options, name, val, opts);
    }
    /**
     * @param {!Array} a
     * @return {undefined}
     */
    function initialize(a) {
      find(a, "stage", function(a, val, opts, output, canCreateDiscussions, r) {
        if (output) {
          var a = parseInt(val);
          var un = opts.fit || options.fit;
          var stdout = opts.position || options.position;
          r.eq = a;
          results[i][a] = output.css($.extend({
            left : err ? 0 : resolve(val, o.w, options.margin, result)
          }, err && next(0)));
          if (getClass(output[0])) {
            output.appendTo(elem);
            log(opts.$video);
          }
          format(r.$img, o, un, stdout);
          format(r.$full, o, un, stdout);
        }
      });
    }
    /**
     * @param {?} left
     * @param {boolean} top
     * @return {undefined}
     */
    function fn(left, top) {
      if ("thumbs" === threshold && !isNaN(left)) {
        /** @type {number} */
        var vbMinX = -left;
        var end = -left + o.nw;
        e.each(function() {
          var editingEl = $(this);
          var node = editingEl.data();
          var page = node.eq;
          /**
           * @return {?}
           */
          var f = function() {
            return {
              h : n,
              w : node.w
            };
          };
          var s = f();
          var local_opts = params[page] || {};
          var target = local_opts.thumbfit || options.thumbfit;
          var value = local_opts.thumbposition || options.thumbposition;
          s.w = node.w;
          if (!(node.l + node.w < vbMinX || node.l > end || format(node.$img, s, target, value))) {
            if (top) {
              callback([page], "navThumb", f, target, value);
            }
          }
        });
      }
    }
    /**
     * @param {!Array} config
     * @param {?} svg
     * @param {string} name
     * @return {undefined}
     */
    function init(config, svg, name) {
      if (!init[name]) {
        var isReplayingSong = "nav" === name && isNewStateNearStart;
        /** @type {number} */
        var param = 0;
        svg.append(config.filter(function() {
          var a;
          var changes = $(this);
          var node = changes.data();
          /** @type {number} */
          var index = 0;
          var length = params.length;
          for (; length > index; index++) {
            if (node.data === params[index]) {
              /** @type {boolean} */
              a = true;
              /** @type {number} */
              node.eq = index;
              break;
            }
          }
          return a || changes.remove() && false;
        }).sort(function(galleryitem, bitHtmlElement) {
          return $(galleryitem).data().eq - $(bitHtmlElement).data().eq;
        }).each(function() {
          if (isReplayingSong) {
            var gridDiv = $(this);
            var out = gridDiv.data();
            var s = Math.round(n * out.data.thumbratio) || min;
            out.l = param;
            out.w = s;
            gridDiv.css({
              width : s
            });
            param = param + (s + options.thumbmargin);
          }
        }));
        /** @type {boolean} */
        init[name] = true;
      }
    }
    /**
     * @param {number} prefixed
     * @return {?}
     */
    function remove(prefixed) {
      return prefixed - currentTickPosition > o.w / 3;
    }
    /**
     * @param {number} min
     * @return {?}
     */
    function html(min) {
      return !(match || value + min && value - count + min || prev);
    }
    /**
     * @return {undefined}
     */
    function forEach() {
      var value = html(0);
      var a = html(1);
      body.toggleClass(statement, value).attr(extend(value));
      container.toggleClass(statement, a).attr(extend(a));
    }
    /**
     * @return {undefined}
     */
    function reset() {
      if (config.ok) {
        config.prevent = {
          "<" : html(0),
          ">" : html(1)
        };
      }
    }
    /**
     * @param {!Object} s
     * @return {?}
     */
    function trim(s) {
      var i;
      var d;
      var a = s.data();
      return isNewStateNearStart ? (i = a.l, d = a.w) : (i = s.position().left, d = s.width()), {
        c : i + d / 2,
        min : -i + 10 * options.thumbmargin,
        max : -i + o.w - d - 10 * options.thumbmargin
      };
    }
    /**
     * @param {number} count
     * @return {undefined}
     */
    function pick(count) {
      var player = p[j].data();
      callback(thisResponse, {
        time : 1.2 * count,
        pos : player.l,
        width : player.w - 2 * options.thumbborderwidth
      });
    }
    /**
     * @param {!Object} opts
     * @return {undefined}
     */
    function create(opts) {
      var key = params[opts.guessIndex][j];
      if (key) {
        /** @type {boolean} */
        var m = values.min !== values.max;
        var bounds = opts.minMax || m && trim(p[j]);
        var name = m && (opts.keep && create.l ? create.l : log((opts.coo || o.nw / 2) - trim(key).c, bounds.min, bounds.max));
        var value = m && log(name, values.min, values.max);
        /** @type {number} */
        var BOUNCE_BACK = 1.1 * opts.time;
        callback(element, {
          time : BOUNCE_BACK,
          pos : value || 0,
          onEnd : function() {
            fn(value, true);
          }
        });
        done(input, map(value, values.min, values.max));
        create.l = name;
      }
    }
    /**
     * @return {undefined}
     */
    function attachTouchEvents() {
      push(j);
      window[j].push(p[j].addClass(image));
    }
    /**
     * @param {string} x
     * @return {undefined}
     */
    function push(x) {
      var tileArr = window[x];
      for (; tileArr.length;) {
        tileArr.shift().removeClass(image);
      }
    }
    /**
     * @param {string} id
     * @return {undefined}
     */
    function css(id) {
      var d = results[id];
      $.each(items, function(a, t) {
        delete d[parseInt(t)];
      });
      $.each(d, function(checkname, tomove) {
        delete d[checkname];
        tomove.detach();
      });
    }
    /**
     * @param {boolean} for_sure
     * @return {undefined}
     */
    function finish(for_sure) {
      result = x = value;
      var current = p[i];
      if (current) {
        push(i);
        window[i].push(current.addClass(image));
        if (!for_sure) {
          that.show.onEnd(true);
        }
        cb(elem, 0, true);
        css(i);
        initialize(items);
        animate();
        draw();
      }
    }
    /**
     * @param {!Object} options
     * @param {!Array} replacements
     * @return {undefined}
     */
    function merge(options, replacements) {
      if (options) {
        $.each(replacements, function(b, defaultOptions) {
          if (defaultOptions) {
            $.extend(defaultOptions, {
              width : options.width || defaultOptions.width,
              height : options.height,
              minwidth : options.minwidth,
              maxwidth : options.maxwidth,
              minheight : options.minheight,
              maxheight : options.maxheight,
              ratio : getType(options.ratio)
            });
          }
        });
      }
    }
    /**
     * @param {string} key
     * @param {?} res
     * @return {undefined}
     */
    function cb(key, res) {
      $el.trigger(className + ":" + key, [that, res]);
    }
    /**
     * @return {undefined}
     */
    function close() {
      clearTimeout(request.t);
      /** @type {number} */
      fe = 1;
      if (options.stopautoplayontouch) {
        that.stopAutoplay();
      } else {
        /** @type {boolean} */
        filename = true;
      }
    }
    /**
     * @return {undefined}
     */
    function request() {
      if (fe) {
        if (!options.stopautoplayontouch) {
          error();
          start();
        }
        /** @type {number} */
        request.t = setTimeout(function() {
          /** @type {number} */
          fe = 0;
        }, time + delta);
      }
    }
    /**
     * @return {undefined}
     */
    function error() {
      /** @type {boolean} */
      filename = !(!prev && !stats);
    }
    /**
     * @return {?}
     */
    function start() {
      if (clearTimeout(start.t), test.stop(start.w), !options.autoplay || filename) {
        return void(that.autoplay && (that.autoplay = false, cb("stopautoplay")));
      }
      if (!that.autoplay) {
        /** @type {boolean} */
        that.autoplay = true;
        cb("startautoplay");
      }
      var type = value;
      var e = p[i].data();
      start.w = test(function() {
        return e.state || type !== value;
      }, function() {
        /** @type {number} */
        start.t = setTimeout(function() {
          if (!filename && type === value) {
            var type = text;
            var e = params[type][i].data();
            start.w = test(function() {
              return e.state || type !== text;
            }, function() {
              if (!(filename || type !== text)) {
                that.show(match ? now(!dir) : text);
              }
            });
          }
        }, options.autoplay);
      });
    }
    /**
     * @return {undefined}
     */
    function show() {
      if (that.fullScreen) {
        /** @type {boolean} */
        that.fullScreen = false;
        if (ok) {
          data.cancel(el);
        }
        nav_target.removeClass(container);
        box.removeClass(container);
        $el.removeClass(button).insertAfter($newHeader);
        o = $.extend({}, opts);
        log(prev, true, true);
        emit("x", false);
        that.resize();
        callback(items, "stage");
        format($window, balancer, name2);
        cb("fullscreenexit");
      }
    }
    /**
     * @param {!Object} _
     * @param {string} val
     * @return {undefined}
     */
    function done(_, val) {
      if (exists) {
        _.removeClass(center + " " + depth);
        if (val && !prev) {
          _.addClass(val.replace(/^|\s/g, " " + tableName + "--"));
        }
      }
    }
    /**
     * @param {boolean} next
     * @param {boolean} data
     * @param {boolean} showToast
     * @return {undefined}
     */
    function log(next, data, showToast) {
      if (data) {
        wrapper.removeClass(CSS_RESIZE);
        /** @type {boolean} */
        prev = false;
        _init();
      }
      if (next && next !== prev) {
        next.remove();
        cb("unloadvideo");
      }
      if (showToast) {
        error();
        start();
      }
    }
    /**
     * @param {boolean} name
     * @return {undefined}
     */
    function hasClass(name) {
      wrapper.toggleClass(DISABLED_STATE, name);
    }
    /**
     * @param {!Object} a
     * @return {undefined}
     */
    function s(a) {
      if (!obj.flow) {
        var obj = a ? a.pageX : s.x;
        var value = obj && !html(remove(obj)) && options.click;
        if (s.p !== value && content.toggleClass(classNames, value)) {
          s.p = value;
          s.x = obj;
        }
      }
    }
    /**
     * @param {!Object} name
     * @return {undefined}
     */
    function f(name) {
      clearTimeout(f.t);
      if (options.clicktransition && options.clicktransition !== options.transition) {
        setTimeout(function() {
          var transitions = options.transition;
          that.setOptions({
            transition : options.clicktransition
          });
          undefined = transitions;
          /** @type {number} */
          f.t = setTimeout(function() {
            that.show(name);
          }, 10);
        }, 0);
      } else {
        that.show(name);
      }
    }
    /**
     * @param {!Event} event
     * @param {?} callback
     * @return {undefined}
     */
    function onClick(event, callback) {
      var e = event.target;
      var control = $(e);
      if (control.hasClass(url)) {
        that.playVideo();
      } else {
        if (e === node) {
          that.toggleFullScreen();
        } else {
          if (prev) {
            if (e === parent) {
              log(prev, true, true);
            }
          } else {
            if (callback) {
              hasClass();
            } else {
              if (options.click) {
                f({
                  index : event.shiftKey || now(remove(event._x)),
                  slow : event.altKey,
                  user : true
                });
              }
            }
          }
        }
      }
    }
    /**
     * @param {string} name
     * @param {boolean} value
     * @return {undefined}
     */
    function emit(name, value) {
      obj[name] = values[name] = value;
    }
    /**
     * @param {!Event} e
     * @return {undefined}
     */
    function runTest(e) {
      var eq = $(this).data().eq;
      f({
        index : eq,
        slow : e.altKey,
        user : true,
        coo : e._x - input.offset().left
      });
    }
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    function on(event) {
      f({
        index : app.index(this) ? ">" : "<",
        slow : event.altKey,
        user : true
      });
    }
    /**
     * @param {!HTMLElement} transform
     * @return {undefined}
     */
    function save(transform) {
      support(transform, function() {
        setTimeout(function() {
          format(content);
        }, 0);
        hasClass(false);
      });
    }
    /**
     * @return {undefined}
     */
    function set() {
      if (next(), render(), !set.i) {
        /** @type {boolean} */
        set.i = true;
        var type = options.startindex;
        if (type || options.hash && obj.hash) {
          b = get(type || obj.hash.replace(/^#/, ""), params, 0 === that.index || type, type);
        }
        value = result = x = val = b = zF(b) || 0;
      }
      if (count) {
        if (logger()) {
          return;
        }
        if (prev) {
          log(prev, true);
        }
        /** @type {!Array} */
        items = [];
        css(i);
        /** @type {boolean} */
        set.ok = true;
        that.show({
          index : value,
          time : 0
        });
        that.resize();
      } else {
        that.destroy();
      }
    }
    /**
     * @return {?}
     */
    function logger() {
      return !logger.f === dir ? (logger.f = dir, value = count - 1 - value, that.reverse(), true) : void 0;
    }
    /**
     * @return {undefined}
     */
    function refresh() {
      if (!refresh.ok) {
        /** @type {boolean} */
        refresh.ok = true;
        cb("ready");
      }
    }
    box = $("html");
    nav_target = $("body");
    var params;
    var count;
    var message;
    var ViewSpinner;
    var prev;
    var p;
    var items;
    var result;
    var x;
    var val;
    var label;
    var title;
    var text;
    var b;
    var match;
    var threshold;
    var isNewStateNearStart;
    var Pd;
    var object;
    var matchesSelector;
    var err;
    var min;
    var n;
    var w;
    var undefined;
    var exists;
    var dir;
    var action;
    var typeB;
    var name2;
    var balancer;
    var sum;
    var filename;
    var stats;
    var opts;
    var fe;
    var alreadyMarked;
    var j;
    var that = this;
    var _stagger = $.now();
    /** @type {string} */
    var staggerClassName = className + _stagger;
    var el = $el[0];
    /** @type {number} */
    var num = 1;
    var component = $el.data();
    var child = $("<style></style>");
    var $newHeader = $(parse(idSelector));
    var wrapper = $(parse(date));
    var content = $(parse(_)).appendTo(wrapper);
    var elem = (content[0], $(parse(uiMessageId)).appendTo(content));
    var a = $();
    var body = $(parse(prefix + " " + name + property));
    var container = $(parse(prefix + " " + line + property));
    var app = body.add(container).appendTo(content);
    var target = $(parse(selected));
    var input = $(parse(item)).appendTo(target);
    var element = $(parse(method)).appendTo(input);
    var res = $();
    var e = $();
    var thisResponse = (elem.data(), element.data(), $(parse(size)).appendTo(element));
    var dom = $(parse(selector + property));
    var node = dom[0];
    var cmd_arg_element = $(parse(url));
    var parentNode = $(parse(response)).appendTo(content);
    var parent = parentNode[0];
    var benchSection = $(parse(handlerKey));
    /** @type {boolean} */
    var value = false;
    var lastQueryOptions = {};
    var o = {};
    var obj = {};
    var config = {};
    var values = {};
    var ref = {};
    var window = {};
    var results = {};
    /** @type {number} */
    var currentTickPosition = 0;
    /** @type {!Array} */
    var T = [];
    wrapper[i] = $(parse(apiCallRaw));
    wrapper[k] = $(parse(offlineforum + " " + forumFolderPath + property, parse(width)));
    wrapper[key] = $(parse(offlineforum + " " + uniqueness + property, parse(roleName)));
    /** @type {!Array} */
    window[i] = [];
    /** @type {!Array} */
    window[k] = [];
    /** @type {!Array} */
    window[key] = [];
    results[i] = {};
    wrapper.addClass(disable ? STATEDISABLED : DEFAULT).toggleClass(DISABLED_STATE, !options.controlsonstart);
    component.fotorama = this;
    /**
     * @param {number} callback
     * @return {?}
     */
    that.startAutoplay = function(callback) {
      return that.autoplay ? this : (filename = stats = false, extend(callback || options.autoplay), start(), this);
    };
    /**
     * @return {?}
     */
    that.stopAutoplay = function() {
      return that.autoplay && (filename = stats = true, start()), this;
    };
    /**
     * @param {!Object} data
     * @return {?}
     */
    that.show = function(data) {
      var b;
      if ("object" != typeof data) {
        /** @type {!Object} */
        b = data;
        data = {};
      } else {
        b = data.index;
      }
      b = ">" === b ? x + 1 : "<" === b ? x - 1 : "<<" === b ? 0 : ">>" === b ? count - 1 : b;
      b = isNaN(b) ? get(b, params, true) : b;
      b = "undefined" == typeof b ? value || 0 : b;
      that.activeIndex = value = zF(b);
      label = clone(value);
      title = capitalize(value);
      text = parseInt(value + (dir ? -1 : 1));
      /** @type {!Array} */
      items = [value, label, title];
      x = match ? b : value;
      /** @type {number} */
      var c = Math.abs(val - x);
      var delay = setTimeout(data.time, function() {
        return Math.min(w * (1 + (c - 1) / 12), 2 * w);
      });
      var stripeTokenId = data.overPos;
      if (data.slow) {
        /** @type {number} */
        delay = delay * 10;
      }
      var t = p;
      that.activeFrame = p = params[value];
      /** @type {boolean} */
      var keep = t === p && !data.user;
      log(prev, p.i !== params[parseInt(result)].i);
      test(items, "stage");
      initialize(res ? [x] : [x, clone(x), capitalize(x)]);
      emit("go", true);
      if (!keep) {
        cb("show", {
          user : data.user,
          time : delay
        });
      }
      /** @type {boolean} */
      filename = true;
      /** @type {function(string): ?} */
      var handler = that.show.onEnd = function(cancelled) {
        if (!handler.ok) {
          if (handler.ok = true, cancelled || finish(true), keep || cb("showend", {
            user : data.user
          }), !cancelled && undefined && undefined !== options.transition) {
            return that.setOptions({
              transition : undefined
            }), void(undefined = false);
          }
          call();
          callback(items, "stage");
          emit("go", false);
          reset();
          s();
          error();
          start();
        }
      };
      if (err) {
        var protocol = p[i];
        var hashB = value !== val ? params[val][i] : null;
        check(protocol, hashB, a, {
          time : delay,
          method : options.transition,
          onEnd : handler
        }, T);
      } else {
        callback(elem, {
          pos : -resolve(x, o.w, options.margin, result),
          overPos : stripeTokenId,
          time : delay,
          onEnd : handler
        });
      }
      if (forEach(), threshold) {
        attachTouchEvents();
        var source = resolve(value + log(x - val, -1, 1));
        create({
          time : delay,
          coo : source !== value && data.coo,
          guessIndex : "undefined" != typeof data.coo ? source : value,
          keep : keep
        });
        if (isNewStateNearStart) {
          pick(delay);
        }
      }
      return sum = "undefined" != typeof val && val !== value, val = value, options.hash && sum && !that.eq && _appendQueryParam(p.id || value + 1), this;
    };
    /**
     * @return {?}
     */
    that.requestFullScreen = function() {
      return object && !that.fullScreen && (name2 = $window.scrollTop(), balancer = $window.scrollLeft(), format($window), emit("x", true), opts = $.extend({}, o), $el.addClass(button).appendTo(nav_target.addClass(container)), box.addClass(container), log(prev, true, true), that.fullScreen = true, matchesSelector && data.request(el), that.resize(), callback(items, "stage"), call(), cb("fullscreenenter")), this;
    };
    /**
     * @return {?}
     */
    that.cancelFullScreen = function() {
      return matchesSelector && data.is() ? data.cancel(document) : show(), this;
    };
    /**
     * @return {?}
     */
    that.toggleFullScreen = function() {
      return that[(that.fullScreen ? "cancel" : "request") + "FullScreen"]();
    };
    bind(document, data.event, function() {
      if (!(!params || data.is() || prev)) {
        show();
      }
    });
    /**
     * @param {!Object} p1
     * @return {?}
     */
    that.resize = function(p1) {
      if (!params) {
        return this;
      }
      var delay = arguments[1] || 0;
      var root = arguments[2];
      merge(that.fullScreen ? {
        width : "100%",
        maxwidth : null,
        minwidth : null,
        height : "100%",
        maxheight : null,
        minheight : null
      } : render(p1), [o, root || that.fullScreen || options]);
      var x = o.width;
      var e = o.height;
      var r = o.ratio;
      /** @type {number} */
      var path = $window.height() - (threshold ? input.height() : 0);
      return isNumber(x) && (wrapper.addClass(fixedClass).css({
        width : x,
        minWidth : o.minwidth || 0,
        maxWidth : o.maxwidth || 959595
      }), x = o.W = o.w = wrapper.width(), o.nw = threshold && fn(options.navwidth, x) || x, options.glimpse && (o.w -= Math.round(2 * (fn(options.glimpse, x) || 0))), elem.css({
        width : o.w,
        marginLeft : (o.W - o.w) / 2
      }), e = fn(e, path), e = e || r && x / r, e && (x = Math.round(x), e = o.h = Math.round(log(e, fn(o.minheight, path), fn(o.maxheight, path))), content.stop().animate({
        width : x,
        height : e
      }, delay, function() {
        wrapper.removeClass(fixedClass);
      }), finish(), threshold && (input.stop().animate({
        width : o.nw
      }, delay), create({
        guessIndex : value,
        time : delay,
        keep : true
      }), isNewStateNearStart && init.nav && pick(delay)), typeB = root || true, refresh())), currentTickPosition = content.offset().left, this;
    };
    /**
     * @param {!Object} params
     * @return {?}
     */
    that.setOptions = function(params) {
      return $.extend(options, params), set(), this;
    };
    /**
     * @return {?}
     */
    that.shuffle = function() {
      return params && create(params) && set(), this;
    };
    /**
     * @return {?}
     */
    that.destroy = function() {
      return that.cancelFullScreen(), that.stopAutoplay(), params = that.data = null, destroy(), items = [], css(i), set.ok = false, this;
    };
    /**
     * @return {?}
     */
    that.playVideo = function() {
      var opts = p;
      var options = opts.video;
      var propValue = value;
      return "object" == typeof options && opts.videoReady && (matchesSelector && that.fullScreen && that.cancelFullScreen(), test(function() {
        return !data.is() || propValue !== value;
      }, function() {
        if (propValue === value) {
          opts.$video = opts.$video || $($.Fotorama.jst.video(options));
          opts.$video.appendTo(opts[i]);
          wrapper.addClass(CSS_RESIZE);
          prev = opts.$video;
          _init();
          app.blur();
          dom.blur();
          cb("loadvideo");
        }
      })), this;
    };
    /**
     * @return {?}
     */
    that.stopVideo = function() {
      return log(prev, true, true), this;
    };
    content.on("mousemove", s);
    obj = addHandler(elem, {
      onStart : close,
      onMove : function(name, data) {
        done(content, data.edge);
      },
      onTouchEnd : request,
      onEnd : function(self) {
        done(content);
        var callback = (chart && !alreadyMarked || self.touch) && options.arrows && "always" !== options.arrows;
        if (self.moved || callback && self.pos !== self.newPos && !self.control) {
          var ret = debug(self.newPos, o.w, options.margin, result);
          that.show({
            index : ret,
            time : err ? w : self.time,
            overPos : self.overPos,
            user : true
          });
        } else {
          if (!(self.aborted || self.control)) {
            onClick(self.startEvent, callback);
          }
        }
      },
      timeLow : 1,
      timeHigh : 1,
      friction : 2,
      select : "." + falseySection + ", ." + falseySection + " *",
      $wrap : content
    });
    values = addHandler(element, {
      onStart : close,
      onMove : function(name, data) {
        done(input, data.edge);
      },
      onTouchEnd : request,
      onEnd : function(options) {
        /**
         * @return {undefined}
         */
        function finalize() {
          create.l = options.newPos;
          error();
          start();
          fn(options.newPos, true);
        }
        if (options.moved) {
          if (options.pos !== options.newPos) {
            /** @type {boolean} */
            filename = true;
            callback(element, {
              time : options.time,
              pos : options.newPos,
              overPos : options.overPos,
              onEnd : finalize
            });
            fn(options.newPos);
            if (exists) {
              done(input, map(options.newPos, values.min, values.max));
            }
          } else {
            finalize();
          }
        } else {
          var that = options.$target.closest("." + offlineforum, element)[0];
          if (that) {
            runTest.call(that, options.startEvent);
          }
        }
      },
      timeLow : .5,
      timeHigh : 2,
      friction : 5,
      $wrap : input
    });
    config = handler(content, {
      shift : true,
      onEnd : function(event, a) {
        close();
        request();
        that.show({
          index : a,
          slow : event.altKey
        });
      }
    });
    ref = handler(input, {
      onEnd : function(b, result) {
        close();
        request();
        var val = cb(element) + .25 * result;
        element.css(func(log(val, values.min, values.max)));
        if (exists) {
          done(input, map(val, values.min, values.max));
        }
        ref.prevent = {
          "<" : val >= values.max,
          ">" : val <= values.min
        };
        clearTimeout(ref.t);
        /** @type {number} */
        ref.t = setTimeout(function() {
          create.l = val;
          fn(val, true);
        }, delta);
        fn(val);
      }
    });
    wrapper.hover(function() {
      setTimeout(function() {
        if (!fe) {
          hasClass(!(alreadyMarked = true));
        }
      }, 0);
    }, function() {
      if (alreadyMarked) {
        hasClass(!(alreadyMarked = false));
      }
    });
    exports(app, function(load) {
      trigger(load);
      on.call(this, load);
    }, {
      onStart : function() {
        close();
        /** @type {boolean} */
        obj.control = true;
      },
      onTouchEnd : request
    });
    app.each(function() {
      define(this, function(sender) {
        on.call(this, sender);
      });
      save(this);
    });
    define(node, that.toggleFullScreen);
    save(node);
    $.each("load push pop shift unshift reverse sort splice".split(" "), function(a, key) {
      /**
       * @return {?}
       */
      that[key] = function() {
        return params = params || [], "load" !== key ? Array.prototype[key].apply(params, arguments) : arguments[0] && "object" == typeof arguments[0] && arguments[0].length && (params = getData(arguments[0])), set(), that;
      };
    });
    set();
  };
  /**
   * @param {!Object} option
   * @return {?}
   */
  $.fn.fotorama = function(option) {
    return this.each(function() {
      var uboard = this;
      var $t = $(this);
      var options = $t.data();
      var g = options.fotorama;
      if (g) {
        g.setOptions(option, true);
      } else {
        test(function() {
          return !coordOnBoard(uboard);
        }, function() {
          options.urtext = $t.html();
          new $.Fotorama($t, $.extend({}, defaultOptions, window.fotoramaDefaults, option, options));
        });
      }
    });
  };
  /** @type {!Array} */
  $.Fotorama.instances = [];
  $.Fotorama.cache = {};
  $.Fotorama.measures = {};
  $ = $ || {};
  $.Fotorama = $.Fotorama || {};
  $.Fotorama.jst = $.Fotorama.jst || {};
  /**
   * @param {!Object} v
   * @return {?}
   */
  $.Fotorama.jst.style = function(v) {
    {
      var sValue;
      /** @type {string} */
      var pix_color = "";
      masterConfigTemplateSetting.escape;
    }
    return pix_color = pix_color + (".fotorama" + (null == (sValue = v.s) ? "" : sValue) + " .fotorama__nav--thumbs .fotorama__nav__frame{\npadding:" + (null == (sValue = v.m) ? "" : sValue) + "px;\nheight:" + (null == (sValue = v.h) ? "" : sValue) + "px}\n.fotorama" + (null == (sValue = v.s) ? "" : sValue) + " .fotorama__thumb-border{\nheight:" + (null == (sValue = v.h - v.b * (v.q ? 0 : 2)) ? "" : sValue) + "px;\nborder-width:" + (null == (sValue = v.b) ? "" : sValue) + "px;\nmargin-top:" + (null == 
    (sValue = v.m) ? "" : sValue) + "px}");
  };
  /**
   * @param {!Object} options
   * @return {?}
   */
  $.Fotorama.jst.video = function(options) {
    /**
     * @return {undefined}
     */
    function remove() {
      output = output + __j.call(arguments, "");
    }
    /** @type {string} */
    var output = "";
    /** @type {function(this:(IArrayLike<?>|string), *=): string} */
    var __j = (masterConfigTemplateSetting.escape, Array.prototype.join);
    return output = output + '<div class="fotorama__video"><iframe src="', remove(("youtube" == options.type ? options.p + "youtube.com/embed/" + options.id + "?autoplay=1" : "vimeo" == options.type ? options.p + "player.vimeo.com/video/" + options.id + "?autoplay=1&badge=0" : options.id) + (options.s && "custom" != options.type ? "&" + options.s : "")), output = output + '" frameborder="0" allowfullscreen></iframe></div>\n';
  };
  $(function() {
    $("." + className + ':not([data-auto="false"])').fotorama();
  });
}(window, document, location, "undefined" != typeof jQuery && jQuery);