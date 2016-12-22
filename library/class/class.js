(function (global) {
	'use strict';

	Class.extend = extend;
	global.Class = Class;

	//private

	function Class() { }

	function extend(proto) {
		var Super = this,
			Sub = createConstructor(Object.assign(Object.create(Super.prototype), proto));

		Sub.extend = extend;
		return Sub;
	}

	function createConstructor(proto) {
		var C = function () { };

		C.prototype = proto;
		C.prototype.constructor = C;

		return C;
	}

} (window));
