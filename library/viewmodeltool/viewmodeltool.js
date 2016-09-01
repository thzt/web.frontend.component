(function (global) {

    // prop: [1].a[2].b
    function focus(prop) {
        let obj = this,
            dotProp = convertBracketToDot(prop),
            value = getDotPropValue(obj, dotProp);

        return value;
    }

    //convert bracket property to dot property
    //[1].a[2].b -> 1.a.2.b
    const convertBracketToDot = prop => prop.replace(/\[(\d+)\]/g, '.$1').replace(/^([.])/, '');

    const getDotPropValue = (obj, dotProperty) => dotProperty.split('.').reduce((memo, val) => memo[val], obj);

    // ---- ---- ---- ----

    // propValueMaps: [{prop,value}]
    const collect = propValueMaps => {
        if (propValueMaps.length === 0) {
            return null;
        }

        //propValueMaps: [{prop:'[1].a[2].b',value:3}, ...]		
        let dotPropValueMaps = getDotPropValueMaps(propValueMaps);
        return createObject(dotPropValueMaps);
    }

    const getDotPropValueMaps = propValueMaps => propValueMaps.map(({prop, value}) => ({
        dotProp: convertBracketToDot(prop),
        value: value
    }));

    const createObject = dotPropValueMaps => {
        let obj = isNumber(dotPropValueMaps[0].dotProp.split('.')[0])
            ? []
            : {};

        dotPropValueMaps.forEach(({dotProp, value}) => {
            let propList = dotProp.split('.'),
                current = obj;

            propList.forEach((prop, index) => {
                if (index === propList.length - 1) {
                    current[prop] = value;
                    return;
                }

                if (current[prop] != null) {
                    current = current[prop];
                    return;
                }

                if (isNumber(propList[index + 1])) {
                    current[prop] = [];
                    current = current[prop];
                    return;
                }

                current[prop] = {};
                current = current[prop];
            }, {});
        });

        return obj;
    }

    const isNumber = v => +v + '' === v;

    // ---- ---- ---- ----

    global.viewModelTool = {
        focus: focus,
        collect: collect
    };
} (window));
