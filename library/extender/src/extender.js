export default class Extender { }

function extend(material) {
    let repository = this;

    Object.assign(repository, material);
    return this;
}

Object.assign(Extender, { extend });
Object.assign(Extender.prototype, { extend });