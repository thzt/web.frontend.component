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

	var _statemonad = __webpack_require__(2);

	var _transition = __webpack_require__(3);

	// https://wiki.haskell.org/State_Monad
	// http://www.jianshu.com/p/1b0775fe3cf8

	console.warn(JSON.stringify((0, _statemonad.runState)((0, _statemonad.returnState)('a'))(1))); //{"state":1,"value":"a"}

	console.warn(JSON.stringify((0, _statemonad.evalState)((0, _statemonad.returnState)('a'))(1))); //"a"

	console.warn(JSON.stringify((0, _statemonad.execState)((0, _statemonad.returnState)('a'))(1))); //1

	console.warn(JSON.stringify((0, _statemonad.runState)(_transition.get)(1))); //{"state":1,"value":1}

	console.warn(JSON.stringify((0, _statemonad.runState)((0, _transition.put)(5))(1))); //{"state":5,"value":null}

	console.warn(JSON.stringify((0, _statemonad.runState)((0, _transition.modify)(function (x) {
	    return x + 1;
	}))(1))); //{"state":2,"value":null}

	console.warn(JSON.stringify((0, _statemonad.runState)((0, _transition.gets)(function (x) {
	    return x + 1;
	}))(1))); //{"state":1,"value":2}

	console.warn(JSON.stringify((0, _statemonad.runState)((0, _statemonad.bindState)((0, _transition.put)(5), function (_) {
	    return (0, _statemonad.returnState)('a');
	}))(1))); //{"state":5,"value":"a"}

	console.warn(JSON.stringify((0, _statemonad.runState)((0, _statemonad.bindState)(_transition.get, function (x) {
	    return (0, _statemonad.bindState)((0, _transition.put)(x + 1), function (_) {
	        return (0, _statemonad.returnState)(x);
	    });
	}))(1))); //{"state":2,"value":1}

	console.warn(JSON.stringify((0, _statemonad.runState)((0, _statemonad.bindState)(_transition.get, function (x) {
	    return (0, _statemonad.bindState)((0, _transition.put)(x - 1), function (_) {
	        return _transition.get;
	    });
	}))(1))); //{"state":0,"value":0}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// type
	var State = function State(field) {
	    return {
	        field: field //field::state=>{state,value}
	    };
	};
	var runState = function runState(stateMonad) {
	    return stateMonad.field;
	};

	// monad
	var returnState = function returnState(value) {
	    return State(function (state) {
	        return { state: state, value: value };
	    });
	};
	var bindState = function bindState(stateMonad, valueToStateMonad) {
	    return State(function (oldState) {
	        var _runState = runState(stateMonad)(oldState);

	        var state = _runState.state;
	        var value = _runState.value;

	        return runState(valueToStateMonad(value))(state);
	    });
	};

	// extra
	var evalState = function evalState(stateMonad) {
	    return function (state) {
	        return runState(stateMonad)(state).value;
	    };
	};
	var execState = function execState(stateMonad) {
	    return function (state) {
	        return runState(stateMonad)(state).state;
	    };
	};

	exports.State = State;
	exports.runState = runState;
	exports.returnState = returnState;
	exports.bindState = bindState;
	exports.evalState = evalState;
	exports.execState = execState;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.gets = exports.modify = exports.put = exports.get = undefined;

	var _statemonad = __webpack_require__(2);

	// create a stateMonad
	var get = (0, _statemonad.State)(function (state) {
	    return { state: state, value: state };
	});

	// put the value to the state, leave the value with null
	var put = function put(value) {
	    return (0, _statemonad.State)(function (state) {
	        return { state: value, value: null };
	    });
	};

	// put the transformed value to the state, leave the value with null
	var modify = function modify(f) {
	    return (0, _statemonad.bindState)(get, function (value) {
	        return put(f(value));
	    });
	};

	// transform the value, leave the state unchanged
	var gets = function gets(f) {
	    return (0, _statemonad.bindState)(get, function (value) {
	        return (0, _statemonad.returnState)(f(value));
	    });
	};

	exports.get = get;
	exports.put = put;
	exports.modify = modify;
	exports.gets = gets;

/***/ }
/******/ ]);