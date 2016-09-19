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

	var _jsonPathFinder = __webpack_require__(5);

	var _jsonPathFinder2 = _interopRequireDefault(_jsonPathFinder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var data1 = {
	    list: [{
	        x: 2
	    }, {
	        a: [[], []]
	    }, {
	        a: [[], { b: 1 }]
	    }, {
	        a: [[], { x: 2, y: 3 }]
	    }]
	};
	console.warn(JSON.stringify(_jsonPathFinder2.default.find.call(data1, 'list[*].a[1].*'), null, 4));

	var data2 = [1, 2];
	data2.test = 3;
	console.info(JSON.stringify(_jsonPathFinder2.default.find.call(data2, '[*]'), null, 4));
	console.info(JSON.stringify(_jsonPathFinder2.default.find.call(data2, '.*'), null, 4));

	var data3 = { a: 1, b: 2 };
	console.log(JSON.stringify(_jsonPathFinder2.default.find.call(data3, '[*]'), null, 4));
	console.log(JSON.stringify(_jsonPathFinder2.default.find.call(data3, '.*'), null, 4));

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _handleProp = __webpack_require__(6);

	var _handleProp2 = _interopRequireDefault(_handleProp);

	var _handleWildcard = __webpack_require__(8);

	var _handleWildcard2 = _interopRequireDefault(_handleWildcard);

	var _convertBracketToDot = __webpack_require__(9);

	var _convertBracketToDot2 = _interopRequireDefault(_convertBracketToDot);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// path: list[*].a[1][*]
	var find = function find(path) {
	    var data = this,
	        dotPath = (0, _convertBracketToDot2.default)(path),
	        propList = dotPath.split('.'),
	        current = [{
	        path: '',
	        value: data,
	        found: true
	    }];

	    propList.forEach(function (prop) {
	        if (prop === '*' || prop === '**') {
	            current = (0, _handleWildcard2.default)(current, prop);
	            return;
	        }

	        current = (0, _handleProp2.default)(current, prop);
	    });

	    return current;
	};

	var jsonPathFinder = {
	    find: find
	};

	exports.default = jsonPathFinder;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createPath = __webpack_require__(7);

	var _createPath2 = _interopRequireDefault(_createPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var handleProp = function handleProp(current, prop) {
	    var result = [];

	    current.forEach(function (item) {
	        var path = (0, _createPath2.default)(item.path, prop);

	        if (item.value == null || !item.value.hasOwnProperty(prop)) {
	            result.push({
	                path: path,
	                found: false
	            });
	            return;
	        }

	        result.push({
	            path: path,
	            value: item.value[prop],
	            found: true
	        });
	    });

	    return result;
	};

	exports.default = handleProp;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var createPath = function createPath(path, prop) {
	    if (/^\d+$/.test(prop)) {
	        return path + '[' + prop + ']';
	    }

	    if (path === '') {
	        if (prop === '*') {
	            return '*';
	        }

	        if (prop === '**') {
	            return '[*]';
	        }

	        return prop;
	    }

	    if (prop === '*') {
	        return path + '.*';
	    }

	    if (prop === '**') {
	        return path + '[*]';
	    }

	    return path + '.' + prop;
	};

	exports.default = createPath;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createPath = __webpack_require__(7);

	var _createPath2 = _interopRequireDefault(_createPath);

	var _isArray = __webpack_require__(10);

	var _isArray2 = _interopRequireDefault(_isArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var handleWildcard = function handleWildcard(current, prop) {
	    var result = [];

	    current.forEach(function (item) {
	        if (item.value == null) {
	            result.push(getUnfoundResult(item.path, prop));
	            return;
	        }

	        if ((0, _isArray2.default)(item.value) && prop === '**') {
	            result = result.concat(getArrayResult(item.value, item.path, prop));
	            return;
	        }

	        result = result.concat(getObjectResult(item.value, item.path, prop));
	    });

	    return result;
	};

	var getUnfoundResult = function getUnfoundResult(path, prop) {
	    return {
	        path: (0, _createPath2.default)(path, prop),
	        found: false
	    };
	};

	var getArrayResult = function getArrayResult(arr, path, prop) {
	    if (arr.length === 0) {
	        return [getUnfoundResult(path, prop)];
	    }

	    return arr.map(function (ele, index) {
	        return {
	            path: (0, _createPath2.default)(path, index),
	            value: ele,
	            found: true
	        };
	    });
	};

	var getObjectResult = function getObjectResult(obj, path, prop) {
	    var keys = Object.keys(obj);

	    if (keys.length === 0) {
	        return [getUnfoundResult(path, prop)];
	    }

	    return keys.map(function (key) {
	        return {
	            path: (0, _createPath2.default)(path, key),
	            value: obj[key],
	            found: true
	        };
	    });
	};

	exports.default = handleWildcard;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// *[*].a['b'][1].d["e"] -> *.**.a.b.1.d.e
	var convertBracketToDot = function convertBracketToDot(prop) {
	    return prop.replace(/\[\*\]/g, '.**').replace(/\[(\d+)\]/g, '.$1').replace(/\['(.+?)'\]/g, '.$1').replace(/\["(.+?)"\]/g, '.$1').replace(/^([.])/, '');
	};

	exports.default = convertBracketToDot;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isArray = function isArray(x) {
	  return Object.prototype.toString.call(x) === '[object Array]';
	};

	exports.default = isArray;

/***/ }
/******/ ]);