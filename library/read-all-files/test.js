const readAllFiles = require('./index');

readAllFiles('/Users/thzt/Book', (_, files) => {
    console.log(JSON.stringify(files, null, 4));
});