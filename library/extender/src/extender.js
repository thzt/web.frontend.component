class Extender { }
Object.assign(Extender.prototype, {
    extend(material) {
        let repository = this;

        Object.assign(repository, material);
        return this;
    }
});

export default Extender;