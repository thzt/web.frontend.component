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

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var target = [{ a: 1, b: 2 }, ['333', { c: 4, d: 5 }, [6]]];

	var source = {
	    0: { a: 7, b: null },
	    1: [[8, 9], null, 10, [11]]
	};

	var result = (0, _index2.default)(target, source);
	console.warn(JSON.stringify(result, null, 4));

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/*
	    (target,source):(null,_)|(_,null) = _

	    (target,source):(string,string) = source
	    (target,source):(string,array) = source
	    (target,source):(string,object) = source

	    (target,source):(array,string) = target
	    (target,source):(array,array) = mergeArray
	    (target,source):(array,object) = mergeObject

	    (target,source):(object,string) = target
	    (target,source):(object,array) = mergeObject
	    (target,source):(object,object) = mergeObject
	*/

	var deepMerge = function deepMerge(target, source) {
	    if (target == null || source == null) {
	        return mergeNull(target, source);
	    }

	    if (isType(target, 'String')) {
	        return source;
	    }

	    if (isType(source, 'String')) {
	        return target;
	    }

	    if (isType(target, 'Array') && isType(source, 'Array')) {
	        return mergeArray(target, source);
	    }

	    return mergeObject(target, source);
	};

	var isType = function isType(x, type) {
	    return Object.prototype.toString.call(x) === '[object ' + type + ']';
	};

	var mergeArray = function mergeArray(target, source) {
	    var result = [],
	        length = Math.max(target.length, source.length);

	    for (var i = 0; i < length; i++) {
	        var mergedElement = deepMerge(target[i], source[i]);
	        result[i] = mergedElement;
	    }

	    return result;
	};

	var mergeObject = function mergeObject(target, source) {
	    var result = {},
	        unionKeys = union(Object.keys(target), Object.keys(source));

	    unionKeys.forEach(function (key) {
	        var mergedElement = deepMerge(target[key], source[key]);
	        result[key] = mergedElement;
	    });

	    return result;
	};

	var mergeNull = function mergeNull(target, source) {
	    return source == null ? target : source;
	};

	var union = function union(array1, array2) {
	    var hashtable = {};
	    array1.forEach(function (ele) {
	        return hashtable[ele] = true;
	    });
	    array2.forEach(function (ele) {
	        if (hashtable[ele]) {
	            return;
	        }

	        hashtable[ele] = true;
	    });

	    return Object.keys(hashtable);
	};

	exports.default = deepMerge;

/***/ }
/******/ ])
});
;