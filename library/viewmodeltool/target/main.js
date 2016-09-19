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

	var _viewmodeltool = __webpack_require__(2);

	var users = [{
	    name: 'Jhon',
	    parents: ['Tom', 'Jerry']
	}];

	var value = _viewmodeltool.focus.call(users, '[0].parents[1]');
	console.log(value);

	// ----

	var collected = (0, _viewmodeltool.collect)([{
	    prop: '[0].name',
	    value: 'Jhon'
	}, {
	    prop: '[0].parents[0]',
	    value: 'Tom'
	}, {
	    prop: '[0].parents[1]',
	    value: 'Jerry'
	}]);

	console.log(JSON.stringify(collected, null, 4));

	// ----

	var data = {
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

	var result = _viewmodeltool.find.call(data, 'list[*].a[1].*');

	console.log(JSON.stringify(result, null, 4));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.find = exports.collect = exports.focus = undefined;

	var _focus = __webpack_require__(3);

	var _focus2 = _interopRequireDefault(_focus);

	var _collect = __webpack_require__(4);

	var _collect2 = _interopRequireDefault(_collect);

	var _find = __webpack_require__(5);

	var _find2 = _interopRequireDefault(_find);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.focus = _focus2.default;
	exports.collect = _collect2.default;
	exports.find = _find2.default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _convertbrackettodot = __webpack_require__(6);

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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _isnumber = __webpack_require__(7);

	var _isnumber2 = _interopRequireDefault(_isnumber);

	var _convertbrackettodot = __webpack_require__(6);

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
	        collecting = (0, _isnumber2.default)(headProp) ? [] : {};

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

	            if ((0, _isnumber2.default)(propList[index + 1])) {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _isarray = __webpack_require__(8);

	var _isarray2 = _interopRequireDefault(_isarray);

	var _convertbrackettodot = __webpack_require__(6);

	var _convertbrackettodot2 = _interopRequireDefault(_convertbrackettodot);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// path: list[*].a[1][*]
	var find = function find(path) {
	    var data = this,
	        dotPath = (0, _convertbrackettodot2.default)(path),
	        propList = dotPath.split('.'),
	        current = [{
	        path: '',
	        value: data,
	        found: true
	    }];

	    propList.forEach(function (prop) {
	        if (prop === '*' || prop === '**') {
	            current = handleWildcard(current, prop);
	            return;
	        }

	        current = handleProp(current, prop);
	    });

	    return current;
	};

	var handleWildcard = function handleWildcard(current, prop) {
	    var result = [];

	    current.forEach(function (item) {
	        if (item.value == null) {
	            result.push({
	                path: createPath(item.path, prop),
	                found: false
	            });
	            return;
	        }

	        if (prop === '*') {
	            var keys = Object.keys(item.value);
	            if (keys.length === 0) {
	                result.push({
	                    path: createPath(item.path, prop),
	                    found: false
	                });
	                return;
	            }

	            result = result.concat(keys.map(function (key) {
	                return {
	                    path: createPath(item.path, key),
	                    value: item.value[key],
	                    found: true
	                };
	            }));
	            return;
	        }

	        if (item.value.length === 0) {
	            result.push({
	                path: createPath(item.path, prop),
	                found: false
	            });
	            return;
	        }

	        result = result.concat(item.value.map(function (ele, index) {
	            return {
	                path: createPath(item.path, index),
	                value: ele,
	                found: true
	            };
	        }));
	    });

	    return result;
	};

	var handleProp = function handleProp(current, prop) {
	    var result = [];

	    current.forEach(function (item) {
	        var path = createPath(item.path, prop);

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

	exports.default = find;

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isNumber = function isNumber(x) {
	  return Object.prototype.toString.call(x) === '[object Number]';
	};

	exports.default = isNumber;

/***/ },
/* 8 */
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