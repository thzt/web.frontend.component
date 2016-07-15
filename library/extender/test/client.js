import 'babel-polyfill';
import Extender from '../src/extender';

// base class

class Base extends Extender { }

console.assert(!Base.hasOwnProperty('extend'));

Base.extend({
    staticMethodBase() {
        console.log('in the staticMethodBase');
    }
});

let base = new Base;

console.assert(!base.hasOwnProperty('extend'));

base.extend({
    instanceMethodBase() {
        console.log('in the instanceMethodBase');
    }
});

Base.staticMethodBase();
base.instanceMethodBase();

// sub class

class Sub extends Base { }
Sub.prototype = base;

console.assert(!Sub.hasOwnProperty('extend'));

Sub.extend({
    staticMethodSub() {
        console.log('in the staticMethodSub');
    }
});

let sub = new Sub;

console.assert(!sub.hasOwnProperty('extend'));

sub.extend({
    instanceMethodSub() {
        console.log('in the instanceMethodSub');
    }
});

Sub.staticMethodSub();
sub.instanceMethodSub();

Sub.staticMethodBase();
sub.instanceMethodBase();