const findAllFiles = require('./index');

findAllFiles('/Users/thzt/Book', (_, files) => {
    console.log(JSON.stringify(files, null, 4));
});