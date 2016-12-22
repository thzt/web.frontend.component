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

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// base class

	var Base = function (_Extender) {
	    _inherits(Base, _Extender);

	    function Base() {
	        _classCallCheck(this, Base);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Base).apply(this, arguments));
	    }

	    return Base;
	}(_index2.default);

	console.assert(!Base.hasOwnProperty('extend'));
	Base.extend({
	    staticMethodBase: function staticMethodBase() {
	        console.log('in the staticMethodBase');
	    }
	});

	var base = new Base();

	console.assert(!base.hasOwnProperty('extend'));
	base.extend({
	    instanceMethodBase: function instanceMethodBase() {
	        console.log('in the instanceMethodBase');
	    }
	});

	Base.staticMethodBase();
	base.instanceMethodBase();

	// sub class

	var Sub = function (_Base) {
	    _inherits(Sub, _Base);

	    function Sub() {
	        _classCallCheck(this, Sub);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Sub).call(this));

	        _this2.constructor = Sub;
	        return _this2;
	    }

	    return Sub;
	}(Base);

	Sub.prototype = base;
	console.assert(base.constructor === Base);
	console.assert(new Sub().constructor === Sub);

	console.assert(!Sub.hasOwnProperty('extend'));
	Sub.extend({
	    staticMethodSub: function staticMethodSub() {
	        console.log('in the staticMethodSub');
	    }
	});

	var sub = new Sub();

	console.assert(!sub.hasOwnProperty('extend'));
	sub.extend({
	    instanceMethodSub: function instanceMethodSub() {
	        console.log('in the instanceMethodSub');
	    }
	});

	Sub.staticMethodSub();
	sub.instanceMethodSub();

	Sub.staticMethodBase();
	sub.instanceMethodBase();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Extender = function Extender() {
	    _classCallCheck(this, Extender);
	};

	function extend(material) {
	    var repository = this;

	    Object.assign(repository, material);
	    return this;
	}

	Object.assign(Extender, { extend: extend });
	Object.assign(Extender.prototype, { extend: extend });

	exports.default = Extender;

/***/ }
/******/ ])
});
;