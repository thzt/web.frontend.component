// https://wiki.haskell.org/State_Monad
// http://www.jianshu.com/p/1b0775fe3cf8

import {runState, returnState, bindState, evalState, execState} from '../src/statemonad';
import {get, put, modify, gets} from '../src/transition';

console.warn(JSON.stringify(
    runState(returnState('a'))(1)
));//{"state":1,"value":"a"}

console.warn(JSON.stringify(
    evalState(returnState('a'))(1)
));//"a"

console.warn(JSON.stringify(
    execState(returnState('a'))(1)
));//1

console.warn(JSON.stringify(
    runState(get)(1)
));//{"state":1,"value":1}

console.warn(JSON.stringify(
    runState(put(5))(1)
));//{"state":5,"value":null}

console.warn(JSON.stringify(
    runState(modify(x => x + 1))(1)
));//{"state":2,"value":null}

console.warn(JSON.stringify(
    runState(gets(x => x + 1))(1)
));//{"state":1,"value":2}

console.warn(JSON.stringify(
    runState(bindState(
        put(5),
        _ => returnState('a')
    ))(1)
));//{"state":5,"value":"a"}

console.warn(JSON.stringify(
    runState(bindState(
        get,
        x => bindState(
            put(x + 1),
            _ => returnState(x)
        )
    ))(1)
));//{"state":2,"value":1}

console.warn(JSON.stringify(
    runState(bindState(
        get,
        x => bindState(
            put(x - 1),
            _ => get
        )
    ))(1)
));//{"state":0,"value":0}