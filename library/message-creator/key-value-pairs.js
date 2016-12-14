import findMatches from '../find-matches/index';
import viewModelTool from '../view-model-tool/index';

/* 
    key-value-pairs: user.phone=xxx|user.mobile=yyy
    keys: user.phone|user.mobile
*/
const pattern = /([^|=]+)(?:=([^|]+))?(?=\|)?/g;
const isKeyValuePairs = str => pattern.test(str);

const create = str => {

    /*
        str: user.phone=xxx|user.mobile=yyy
        matches: [[user.phone=xxx,user.phone,xxx],[user.mobile=yyy,user.mobile,yyy]]

        str: user.phone|user.mobile
        matches: [[user.phone,user.phone,undefined],[user.mobile,user.mobile,undefined]]
    */
    let matches = findMatches(pattern, str);
    if (matches == null) {
        return null;
    }

    // collection: [{prop,value}]
    let collection = matches.map(match => ({
        prop: match[1],
        value: match[2] == null ? '' : match[2]
    }));

    return viewModelTool.collect(collection);
};

const keyValuePairs = {
    isKeyValuePairs,
    create
};

export default keyValuePairs;