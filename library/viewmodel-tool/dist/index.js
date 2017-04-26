(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.viewModelTool = undefined;

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// other es6 module can use `import viewModelTool from '...'`
	exports.default = _index2.default;

	// this will import to window.viewModelTool

	exports.viewModelTool = _index2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _focus = __webpack_require__(2);

	var _focus2 = _interopRequireDefault(_focus);

	var _collect = __webpack_require__(4);

	var _collect2 = _interopRequireDefault(_collect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var viewModelTool = {
	    focus: _focus2.default,
	    collect: _collect2.default
	};

	exports.default = viewModelTool;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _convertbrackettodot = __webpack_require__(3);

	var _convertbrackettodot2 = _interopRequireDefault(_convertbrackettodot);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// prop: [1].a[2].b
	function focus(prop) {
	    var obj = this,
	        dotProp = (0, _convertbrackettodot2.default)(prop),
	        value = getDotPropValue(obj, dotProp);

	    return value;
	}

	var getDotPropValue = function getDotPropValue(obj, dotProperty) {
	    return dotProperty.split('.').reduce(function (memo, val) {
	        return memo == null ? null : memo[val];
	    }, obj);
	};

	exports.default = focus;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// a['b'][1].d["e"] -> a.b.1.d.e
	var convertBracketToDot = function convertBracketToDot(prop) {
	    return prop.replace(/\[(\d+)\]/g, '.$1').replace(/\['(.+?)'\]/g, '.$1').replace(/\["(.+?)"\]/g, '.$1').replace(/^([.])/, '');
	};

	exports.default = convertBracketToDot;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _isinteger = __webpack_require__(5);

	var _isinteger2 = _interopRequireDefault(_isinteger);

	var _convertbrackettodot = __webpack_require__(3);

	var _convertbrackettodot2 = _interopRequireDefault(_convertbrackettodot);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// propValueMaps: [{prop,value}]
	var collect = function collect(propValueMaps) {
	    if (propValueMaps.length === 0) {
	        return null;
	    }

	    //propValueMaps: [{prop:'[1].a[2].b',value:3}, ...]
	    //dotPropValueMaps: [{dotProp:'1.a.2.b',value:3}, ...]
	    var dotPropValueMaps = getDotPropValueMaps(propValueMaps);
	    return createObject(dotPropValueMaps);
	};

	var getDotPropValueMaps = function getDotPropValueMaps(propValueMaps) {
	    return propValueMaps.map(function (_ref) {
	        var prop = _ref.prop;
	        var value = _ref.value;
	        return {
	            dotProp: (0, _convertbrackettodot2.default)(prop),
	            value: value
	        };
	    });
	};

	var createObject = function createObject(dotPropValueMaps) {
	    var headMap = dotPropValueMaps[0],
	        headProp = headMap.dotProp.split('.')[0],
	        collecting = (0, _isinteger2.default)(headProp) ? [] : {};

	    dotPropValueMaps.forEach(function (_ref2) {
	        var dotProp = _ref2.dotProp;
	        var value = _ref2.value;

	        var propList = dotProp.split('.'),
	            current = collecting;

	        propList.forEach(function (prop, index) {
	            if (index === propList.length - 1) {
	                current[prop] = value;
	                return;
	            }

	            if (current[prop] != null) {
	                current = current[prop];
	                return;
	            }

	            if ((0, _isinteger2.default)(propList[index + 1])) {
	                current[prop] = [];
	                current = current[prop];
	                return;
	            }

	            current[prop] = {};
	            current = current[prop];
	        });
	    });

	    return collecting;
	};

	exports.default = collect;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var regexp = /^\d+$/;
	var isInteger = function isInteger(str) {
	  return regexp.test(str);
	};

	exports.default = isInteger;

/***/ }
/******/ ])
});
;