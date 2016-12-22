// reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

const createCustomError = errorFunctionName => {
    function CustomError(message) {
        this.message = message;
        this.stack = new Error().stack;
    }
    CustomError.prototype = Object.create(Error.prototype);
    CustomError.prototype.constructor = CustomError;

    CustomError.prototype.name = errorFunctionName;
    CustomError.prototype.message = '';

    return CustomError;
};

export default createCustomError;