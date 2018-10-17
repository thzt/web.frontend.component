// 一个具有多个抽屉的柜子Cabinet
// drawer抽屉里按顺序保存gadget小玩意
class Cabinet {
    constructor() {
        this._cache = new Map;
    }

    // 向drawer抽屉中，放入gadget小玩意
    put({ drawer, gadget }) {
        // 如果还没有这个抽屉
        // 就新建一个抽屉，然后把gadget小玩意放进去
        if (!this._cache.has(drawer)) {
            this._cache.set(drawer, [gadget]);
            return;
        }

        // 否则就打开drawer抽屉，按顺序放入gadget小玩意
        this._cache.get(drawer).push(gadget);
    }

    // 获取所有的drawer抽屉
    getDrawerList() {
        return Array.from(this._cache.keys());
    }

    // 是否已有drawer抽屉
    hasDrawer({ drawer }) {
        return this._cache.has(drawer);
    }

    // 获取给定抽屉里的所有小玩意
    getGadgetListFromDrawer({ drawer }) {
        return this._cache.get(drawer);
    }
}

module.exports = Cabinet;
