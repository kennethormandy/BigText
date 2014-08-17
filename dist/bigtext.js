/*! BigText - v0.1.7a - 2014-08-17
 * https://github.com/kennethormandy/bigtext
 * Copyright © 2014 Zach Leatherman (@zachleat)
 * Copyright © 2014 Kenneth Ormandy (@kennethormandy)
 *  License */

(function(window, $) {
  'use strict';

  // var $$ = function(selector) {
  //   return document.querySelectorAll(selector);
  // };

  var counter = 0,
    headCache = document.getElementsByTagName('head')[0],
    oldBigText = window.BigText,
    oldjQueryMethod = $.fn.bigtext,
    BigText = {
      DEBUG_MODE: false,
      DEFAULT_MIN_FONT_SIZE_PX: null,
      DEFAULT_MAX_FONT_SIZE_PX: 528,
      GLOBAL_STYLE_ID: 'bigtext-style',
      STYLE_ID: 'bigtext-id',
      LINE_CLASS_PREFIX: 'bigtext-line',
      EXEMPT_CLASS: 'bigtext-exempt',
      noConflict: function(restore)
      {
        if(restore) {
          $.fn.bigtext = oldjQueryMethod;
          window.BigText = oldBigText;
        }
        return BigText;
      },
      test: {
        wholeNumberFontSizeOnly: function() {
          if( !( 'getComputedStyle' in window ) || document.body == null ) {
            return true;
          }
          // Test if whole number font-sizes are supported or not
          var test = document.createElement('div');
          test.style.postion = 'absolute';
          test.style.fontSize = '14.1px';
          document.body.appendChild(test);
          var computedStyle = window.getComputedStyle( test, null );
          document.body.removeChild(test);
          if( computedStyle ) {
            return computedStyle.getPropertyValue( 'font-size' ) === '14px';
          }
          return true;
        }
      },
      supports: {
        wholeNumberFontSizeOnly: undefined
      },
      init: function() {
        if( BigText.supports.wholeNumberFontSizeOnly === undefined ) {
          BigText.supports.wholeNumberFontSizeOnly = BigText.test.wholeNumberFontSizeOnly();
        }

        if(!document.getElementById(BigText.GLOBAL_STYLE_ID)) {
          headCache.appendChild(BigText.generateStyleTag(BigText.GLOBAL_STYLE_ID, [
            '.bigtext * { white-space: nowrap; }',
            '.bigtext > * { display: block; }',
            '.bigtext .' + BigText.EXEMPT_CLASS + ', .bigtext .' + BigText.EXEMPT_CLASS + ' * { white-space: normal; }'
          ]));
        }
      },
      bindResize: function(eventName, resizeFunction) {
        if(typeof window.Cowboy === 'undefined' || typeof window.Cowboy.throttle === 'undefined') {
          if(!window.onresize) {
            // This doesn’t work yet :(
            console.log(eventName);
            // window.onresize = debounce(resizeFunction, 100);
            // window.removeEventListener(eventName, resizeFunction);
          }
          window.removeEventListener(eventName);
          window.addEventListener(eventName, debounce(resizeFunction, 100));
        } else {
          // https://github.com/cowboy/jquery-throttle-debounce
          window.addEventListener(eventName);
          window.removeEventListener(eventName, window.Cowboy.throttle(100, resizeFunction));
        }
      },
      getStyleId: function(id)
      {
        return BigText.STYLE_ID + '-' + id;
      },
      generateStyleTag: function(id, css)
      {
        var styleEl = document.createElement('style');
        styleEl.innerHTML = css.join('\n');
        styleEl.setAttribute('id', id);
        return styleEl;
      },
      clearCss: function(id)
      {
        var styleId = BigText.getStyleId(id);
        var styleEl = document.getElementById(styleId);
        // document.getElementById(styleId).parentNode.removeChild(el);
        $(styleEl).remove(); // Not done
        // styleEl.parentNode.removeChild(styleEl);
      },
      generateCss: function(id, linesFontSizes, lineWordSpacings, minFontSizes)
      {
        var css = [];

        BigText.clearCss(id);

        for(var j=0, k=linesFontSizes.length; j<k; j++) {
          css.push('#' + id + ' .' + BigText.LINE_CLASS_PREFIX + j + ' {' +
            (minFontSizes[j] ? ' white-space: normal;' : '') +
            (linesFontSizes[j] ? ' font-size: ' + linesFontSizes[j] + 'px;' : '') +
            (lineWordSpacings[j] ? ' word-spacing: ' + lineWordSpacings[j] + 'px;' : '') +
            '}');
        }


        return BigText.generateStyleTag(BigText.getStyleId(id), css);
      },
      jQueryMethod: function(options)
      {
        BigText.init();

        options = extend({
          minfontsize: BigText.DEFAULT_MIN_FONT_SIZE_PX,
          maxfontsize: BigText.DEFAULT_MAX_FONT_SIZE_PX,
          childSelector: '',
          resize: true // Temp, correct default is true
        }, options || {});

        forEach(this, function(self)
        {
          var selfStyle = getComputedStyle(self);
          var maxWidth = parseInt(selfStyle.getPropertyValue('width'), 10);
          var id = self.getAttribute('id');
          var children = options.childSelector ? self.querySelectorAll( options.childSelector ) : self.children;

          addClass(self, 'bigtext');

          if(!id) {
            id = 'bigtext-id' + (counter++);
            self.setAttribute('id', id);
          }

          if(options.resize) {
            BigText.bindResize('resize.bigtext-event-' + id, function()
            {
              // TODO only call this if the width has changed.
              BigText.jQueryMethod.call($('#' + id), options);
            });
          }

          BigText.clearCss(id);

          forEach(children, function(child, lineNumber){
            // Remove existing line classes.
            addClass(child, child.className.replace(new RegExp('\\b' + BigText.LINE_CLASS_PREFIX + '\\d+\\b'), '') + BigText.LINE_CLASS_PREFIX + lineNumber);
          });

          var sizes = calculateSizes(self, children, maxWidth, options.maxfontsize, options.minfontsize);
          headCache.appendChild(BigText.generateCss(id, sizes.fontSizes, sizes.wordSpacings, sizes.minFontSizes));
        });

        // console.log(this);
        // return trigger(this, 'bigtext:complete');
        return;
      }
    };

  // function trigger(el, name) {
  //   var evt;
  //   if (typeof CustomEvent !== 'function') {
  //     evt = document.createEvent('HTMLEvents');
  //     evt.initEvent(name, true, false);
  //   } else {
  //     evt = new CustomEvent(name);
  //   }
  //   el.dispatchEvent(evt);
  //   return;
  // }

  function forEach(el, fn) {
    Array.prototype.forEach.call(el, fn);
  }

  function getComputedStyle(el, pseudo) {
    pseudo = pseudo || null;
    if (!BigText.supports.wholeNumberFontSizeOnly) {
      return window.getComputedStyle(el, pseudo);
    }
  }

  function addClass(el, className) {
    if (el.classList) {
      return el.classList.add(className);
    } else {
      return el.className += ' ' + className;
    }
  }

  function hasClass(el, className) {
    if (el.classList) {
      el.classList.contains(className);
    } else {
      new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  }

  function debounce(fn, delay)
  {
    var timer = null;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

  function extend(out)
  {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i]) {
        continue;
      }
      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          out[key] = arguments[i][key];
        }
      }
    }
    return out;
  }


  function testLineDimensions(line, maxWidth, property, size, interval, units, previousWidth)
  {
    var width;
    var currentStyle = getComputedStyle(line);
    previousWidth = typeof previousWidth === 'number' ? previousWidth : 0;
    line.style[property] = size + units;

    width = parseInt(currentStyle.getPropertyValue('width'), 10);


    if(width >= maxWidth) {
      line.style[property] = '';

      if(width === maxWidth) {
        return {
          match: 'exact',
          size: parseFloat((parseFloat(size) - 0.1).toFixed(3))
        };
      }

      // Since this is an estimate, we calculate how far over the width we went with the new value.
      // If this is word-spacing (our last resort guess) and the over is less than the under, we keep the higher value.
      // Otherwise, we revert to the underestimate.
      var under = maxWidth - previousWidth,
        over = width - maxWidth;

      return {
        match: 'estimate',
        size: parseFloat((parseFloat(size) - (property === 'word-spacing' && previousWidth && ( over < under ) ? 0 : interval)).toFixed(3))
      };
    }

    return width;
  }

  function calculateSizes(t, children, maxWidth, maxFontSize, minFontSize)
  {
    var c = t.cloneNode(true);
    var tStyles = getComputedStyle(t);
    //     fontFamily: $t.css('font-family'),
    //     textTransform: $t.css('text-transform'),
    //     wordSpacing: $t.css('word-spacing'),
    //     letterSpacing: $t.css('letter-spacing'),
    //     position: 'absolute',
    //     left: BigText.DEBUG_MODE ? 0 : -9999,
    //     top: BigText.DEBUG_MODE ? 0 : -9999
    //   });

    addClass(c, 'bigtext-cloned');

    c.style.fontFamily = tStyles.getPropertyValue('font-family');
    c.style.textTransform = tStyles.getPropertyValue('text-transform');
    c.style.wordSpacing = tStyles.getPropertyValue('word-spacing');
    c.style.letterSpacing = tStyles.getPropertyValue('letter-spacing');
    c.style.position = 'absolute';
    c.style.left = BigText.DEBUG_MODE ? 0 : -9999;
    c.style.top = BigText.DEBUG_MODE ? 0 : -9999;

    document.body.appendChild(c);
    console.log(c);

    // font-size isn't the only thing we can modify, we can also mess with:
    // word-spacing and letter-spacing. WebKit does not respect subpixel
    // letter-spacing, word-spacing, or font-size.
    // TODO try -webkit-transform: scale() as a workaround.
    var fontSizes = [],
      wordSpacings = [],
      minFontSizes = [],
      ratios = [];

    forEach(children, function(line) {
      // TODO replace 8, 4 with a proportional size to the calculated font-size.
      var intervals = BigText.supports.wholeNumberFontSizeOnly ? [8, 4, 1] : [8, 4, 1, 0.1];
      var lineMax;
      var newFontSize;

      line.style.float = 'left';

      if(hasClass(line, BigText.EXEMPT_CLASS)) {
        fontSizes.push(null);
        ratios.push(null);
        minFontSizes.push(false);
        return;
      }

      // TODO we can cache this ratio?
      var autoGuessSubtraction = 32; // font size in px
      var currentStyle = getComputedStyle(line);
      var currentFontSize = parseFloat(currentStyle.getPropertyValue('font-size'));
      var ratio = ( parseInt(currentStyle.getPropertyValue('width'), 10) / currentFontSize ).toFixed(6);

      newFontSize = parseInt( maxWidth / ratio, 10 ) - autoGuessSubtraction;

      outer: for(var m=0, n=intervals.length; m<n; m++) {
        inner: for(var j=1, k=10; j<=k; j++) {
          if(newFontSize + j*intervals[m] > maxFontSize) {
            newFontSize = maxFontSize;
            break outer;
          }

          lineMax = testLineDimensions(line, maxWidth, 'fontSize', newFontSize + j*intervals[m], intervals[m], 'px', lineMax);
          if(typeof lineMax !== 'number') {
            newFontSize = lineMax.size;

            if(lineMax.match === 'exact') {
              break outer;
            }
            break inner;
          }
        }
      }

      ratios.push(maxWidth / newFontSize);

      if(newFontSize > maxFontSize) {
        fontSizes.push(maxFontSize);
        minFontSizes.push(false);
      } else if(!!minFontSize && newFontSize < minFontSize) {
        fontSizes.push(minFontSize);
        minFontSizes.push(true);
      } else {
        fontSizes.push(newFontSize);
        minFontSizes.push(false);
      }
    });

    forEach(children, function(line, lineNumber) {
      var wordSpacing = 0;
      var interval = 1;
      var maxWordSpacing;

      if(hasClass(line, BigText.EXEMPT_CLASS)) {
        wordSpacings.push(null);
        return;
      }

      // must re-use font-size, even though it was removed above.
      line.style.fontSize = fontSizes[lineNumber] + 'px';

      for(var m=1, n=3; m<n; m+=interval) {
        maxWordSpacing = testLineDimensions(line, maxWidth, 'wordSpacing', m, interval, 'px', maxWordSpacing);
        if(typeof maxWordSpacing !== 'number') {
          wordSpacing = maxWordSpacing.size;
          break;
        }
      }

      line.style.fontSize = '';
      wordSpacings.push(wordSpacing);

    });

    // No sure if this needs to be its own
    // forEach or can exist in one previous
    forEach(children, function(child) {
      child.removeAttribute('style');
    });

    if( !BigText.DEBUG_MODE ) {
      $(c).remove();
      // c.parentNode.removeChild(c);
    } else {
      c.style.backgroundColor = 'rgba(255,255,255,.4)';
    }

    return {
      fontSizes: fontSizes,
      wordSpacings: wordSpacings,
      ratios: ratios,
      minFontSizes: minFontSizes
    };
  }

  $.fn.bigtext = BigText.jQueryMethod;
  window.BigText = BigText;

})(this, jQuery);
