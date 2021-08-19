const fs = require("fs");

let globalConfig = {};

let conf = fs.readFileSync("./server.conf");

let configArr = conf.toString().split("\n");

configArr.forEach(item => {
    let sp = item.split("=");
    globalConfig[sp[0].trim()] = sp[1].trim();
});

module.exports = globalConfig;
