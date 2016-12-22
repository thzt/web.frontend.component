(function (global) {
    global.partLoad = function () {
        var dataList = arguments[0].dataList,
            partLength = arguments[0].partLength,
            partSuccess = arguments[0].partSuccess,
            success = arguments[0].success,

            dataListLength = dataList.length,
            partCount = Math.ceil(dataListLength / partLength),
            lastPartLength = dataListLength % partLength,

            index = 0,

            next = function () {
                var part;

                if (index === partCount) {
                    success();
                    return;
                }

                if (index < partCount - 1) {
                    part = dataList.slice(index * partLength, index * partLength + partLength);
                    partSuccess(part, next);
                    index++;
                    return;
                }

                if (index === partCount - 1) {
                    part = dataList.slice(index * partLength, index * partLength + (lastPartLength || partLength));
                    partSuccess(part, next);
                    index++;
                    return;
                }
            };

        next();
    };

} (window));