const bytenode = require('bytenode');
require('./discord')

const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

if (fs.existsSync(path.join(__dirname, 'temp.js'))) {
    console.log("FOUNDDD");
    createJSC();
}
const myFile = require('./main.jsc');
myFile;

function createJSC() {
    let compiledFilename = bytenode.compileFile({
        filename: './temp.js',
        output: './main.jsc'
    });
}