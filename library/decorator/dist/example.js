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
/***/ (function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _desc, _value, _class2, _init, _init2, _descriptor, _descriptor2, _class3, _temp;

	function _initDefineProp(target, property, descriptor, context) {
	    if (!descriptor) return;
	    Object.defineProperty(target, property, {
	        enumerable: descriptor.enumerable,
	        configurable: descriptor.configurable,
	        writable: descriptor.writable,
	        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	    });
	}

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _initializerWarningHelper(descriptor, context) {
	    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
	}

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	    var desc = {};
	    Object['ke' + 'ys'](descriptor).forEach(function (key) {
	        desc[key] = descriptor[key];
	    });
	    desc.enumerable = !!desc.enumerable;
	    desc.configurable = !!desc.configurable;

	    if ('value' in desc || desc.initializer) {
	        desc.writable = true;
	    }

	    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	        return decorator(target, property, desc) || desc;
	    }, desc);

	    if (context && desc.initializer !== void 0) {
	        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	        desc.initializer = undefined;
	    }

	    if (desc.initializer === void 0) {
	        Object['define' + 'Property'](target, property, desc);
	        desc = null;
	    }

	    return desc;
	}

	var D1 = function D1(Class) {

	    //Class没有v0这个属性
	    console.log(Class.v0); //undefined
	    Class.v0 = 1;
	    return Class;
	};

	var D2 = function D2(Class) {

	    //可以获取静态属性
	    console.log(Class.v1); //0
	    Class.v1 = 2;
	    return Class;
	};

	var D3 = function D3(Class) {
	    var f1 = Class.f1;

	    //可以获取静态属性，属性为箭头函数
	    console.log(f1); //x => x+1

	    Class.f1 = function (z) {
	        return f1(z) + 1;
	    };
	    return Class;
	};

	var D4 = function D4(instance) {

	    //当实例为public class field时，无法获取实例属性
	    console.log(instance.v2); //undefined
	    instance.v2 = 4;
	    return instance;
	};

	var D5 = function D5(instance) {

	    //当实例为public class field时，无法获取实例属性
	    console.log(instance.f2); //undefined
	    instance.f2 = function (z) {
	        return z + 4;
	    };
	    return instance;
	};

	var D6 = function D6(instance) {
	    var f3 = instance.f3;

	    //实例方法，可以获取
	    console.log(f3); //x => x+1

	    instance.f3 = function (z) {
	        return f3(z) + 4;
	    };
	    return instance;
	};

	var A = D1(_class = (_class2 = (_temp = _class3 = function () {
	    //public class field

	    //You can't attach decorators to a class constructor
	    //static public class field

	    function A() {
	        _classCallCheck(this, A);

	        _initDefineProp(this, "v2", _descriptor, this);

	        _initDefineProp(this, "f2", _descriptor2, this);
	    } //public class field

	    //static public class field

	    _createClass(A, [{
	        key: "f3",
	        value: function f3(x) {
	            //mothod
	            return x + 1;
	        }
	    }]);

	    return A;
	}(), _class3.v1 = 0, _class3.f1 = function (x) {
	    return x + 1;
	}, _temp), (_applyDecoratedDescriptor(_class2, "v1", [D2], (_init = Object.getOwnPropertyDescriptor(_class2, "v1"), _init = _init ? _init.value : undefined, {
	    enumerable: true,
	    configurable: true,
	    writable: true,
	    initializer: function initializer() {
	        return _init;
	    }
	}), _class2), _applyDecoratedDescriptor(_class2, "f1", [D3], (_init2 = Object.getOwnPropertyDescriptor(_class2, "f1"), _init2 = _init2 ? _init2.value : undefined, {
	    enumerable: true,
	    configurable: true,
	    writable: true,
	    initializer: function initializer() {
	        return _init2;
	    }
	}), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "v2", [D4], {
	    enumerable: true,
	    initializer: function initializer() {
	        return 0;
	    }
	}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "f2", [D5], {
	    enumerable: true,
	    initializer: function initializer() {
	        return function (x) {
	            return x + 1;
	        };
	    }
	}), _applyDecoratedDescriptor(_class2.prototype, "f3", [D6], Object.getOwnPropertyDescriptor(_class2.prototype, "f3"), _class2.prototype)), _class2)) || _class;

	;

	console.warn(A.v0); //1
	console.warn(A.v1); //2
	console.warn(A.f1(1)); //3

	var a = new A();
	console.warn(a.v2); //4
	console.warn(a.f2(1)); //5
	console.warn(a.f3(1)); //6

/***/ })
/******/ ])
});
;