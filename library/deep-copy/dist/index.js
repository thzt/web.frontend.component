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

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _index2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var isType = function isType(x, type) {
	    return Object.prototype.toString.call(x) === '[object ' + type + ']';
	};

	var deepCopy = function deepCopy(source) {
	    if (isType(source, 'Array')) {
	        return deepCopyArray(source);
	    }

	    if (isType(source, 'Object')) {
	        return deepCopyObject(source);
	    }

	    if (isType(source, 'String')) {
	        return source.toString();
	    }

	    if (isType(source, 'Number')) {
	        return +source;
	    }

	    return null;
	};

	var deepCopyArray = function deepCopyArray(array) {
	    return array.reduce(function (memo, element) {
	        memo.push(deepCopy(element));
	        return memo;
	    }, []);
	};

	var deepCopyObject = function deepCopyObject(object) {
	    return Object.keys(object).reduce(function (memo, key) {
	        memo[key] = deepCopy(object[key]);
	        return memo;
	    }, {});
	};

	exports.default = deepCopy;

/***/ }
/******/ ])
});
;