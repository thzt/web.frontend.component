// a['b'][1].d["e"] -> a.b.1.d.e
const convertBracketToDot = prop =>
    prop.replace(/\[(\d+)\]/g, '.$1')
        .replace(/\['(.+?)'\]/g, '.$1')
        .replace(/\["(.+?)"\]/g, '.$1')
        .replace(/^([.])/, '');

export default convertBracketToDot;