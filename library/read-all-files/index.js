const fs = require('fs');
const path = require('path');

const asyncForEach = require('async-for-each');

const getAllFiles = (dir, callback) => {
    const allFiles = [];

    fs.readdir(dir, (_, files) => {
        if (files.length === 0) {
            callback(true, allFiles);
            return;
        }

        asyncForEach(files, (file, next) => {
            const absolutePath = path.join(dir, file);

            fs.stat(absolutePath, (_, stats) => {
                const isFile = stats.isFile();

                if (isFile) {
                    allFiles.push(absolutePath);
                    next();
                    return;
                }

                getAllFiles(absolutePath, (_, subFiles) => {
                    subFiles.forEach(file => allFiles.push(file));
                    next();
                });
            });
        }, success => {
            callback(true, allFiles);
        });
    });
};

module.exports = getAllFiles;