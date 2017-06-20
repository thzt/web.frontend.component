const asyncRecursive = (p0, fn) => fn(p0, p1 => asyncRecursive(p1, fn));

export default asyncRecursive;