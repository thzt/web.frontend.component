const isType = (x, type) => Object.prototype.toString.call(x) === `[object ${type}]`;

export default isType;