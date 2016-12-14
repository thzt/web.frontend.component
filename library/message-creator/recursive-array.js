import findMatches from '../find-matches/index';
import viewModelTool from '../view-model-tool/index';

import keyValuePairs from './key-value-pairs';

// items=[xxx]
const pattern = /^([^=]+)=\[(.+)\]$/;
const isRecursiveArray = str => pattern.test(str);

/*
    str: items=[x.y=[v.a=error1|v.b=error2]]
    arr: [1,2]
*/
const recursiveParseToArray = (str, arr) => {
    let match = pattern.exec(str);

    if (match == null) {
        return keyValuePairs.create(str);
    }

    let index = arr.shift(),

        /*
            prop: items
            nestedStr: xxx
        */
        [_, prop, nestedStr] = match,
        obj = recursiveParseToArray(nestedStr, arr),
        result = [];

    result[index] = obj;
    return viewModelTool.collect([{
        prop,
        value: result
    }]);
};

const messageCreator = {
    isRecursiveArray,
    create: recursiveParseToArray
};