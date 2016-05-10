var fs = require('fs');
var path = require('path');

var exports = module.exports = {};

exports.getFolders = function(dir) {
    return fs.readdirSync(dir)
    .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

exports.getComponentName = function(file) {
    var fileNameArray = file.history[0]
    .split('/').pop()
    .split('.'); // split ending
    fileNameArray.pop(); // remove ending
    return fileNameArray.join('.');
}