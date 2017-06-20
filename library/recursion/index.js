const recursion = (p0, fn) => fn(p0, p1 => recursion(p1, fn));

export default recursion;