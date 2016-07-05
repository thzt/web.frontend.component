/******/ (function(modules) { // webpackBootstrap
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fncreator = __webpack_require__(2);

	var _fncreator2 = _interopRequireDefault(_fncreator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// case 1
	var func1 = (0, _fncreator2.default)({
	    params: ['x', 'y'],
	    body: '\n        console.log(this,x,y);\n    '
	});

	func1(1, 2);

	// --------
	// case 2
	var func2 = (0, _fncreator2.default)({
	    params: ['x', 'y'],
	    body: '\n        console.log(this,x,y,a,b);\n    ',
	    identifiers: ['a', 'b'],
	    values: [3, 4]
	});

	var obj = new Date();

	func2.call(obj, 1, 2);

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = fnCreator;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function fnCreator(_ref) {
	    var params = _ref.params;
	    var body = _ref.body;
	    var _ref$identifiers = _ref.identifiers;
	    var identifiers = _ref$identifiers === undefined ? [] : _ref$identifiers;
	    var _ref$values = _ref.values;
	    var values = _ref$values === undefined ? [] : _ref$values;

	    return function () {
	        var fn = Function.apply(null, [].concat(_toConsumableArray(params), _toConsumableArray(identifiers), [body]));
	        return fn.apply(this, [].concat(Array.prototype.slice.call(arguments), _toConsumableArray(values)));
	    };
	}

/***/ }
/******/ ]);