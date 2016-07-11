function Extender(constructor = Object) {
    let instance = this;

    // see below, about the constructor
    instance.constructor = constructor;
}

Extender.prototype.extend = function (material) {
    let repository = this;

    Object.assign(repository, material);
    return this;
};

export default Extender;

// -----------------------------------------------------

/* about the constructor

// instance.constructor is exactly instance.__proto__.constructor
function F() { }
console.assert((new F).constructor === F);
console.assert((new F).hasOwnProperty('constructor') === false);
console.assert(F.prototype.hasOwnProperty('constructor') === true);

// so if we change the prototype, we should also change the prototype's constructor.
function F(){}
F.prototype=new G;
F.prototype.constructor=F;

// if not, (new F).constructor===F.prototype.constructor===(new G).constructor===G.prototype.constructor===G;

*/