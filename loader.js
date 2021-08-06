const fs = require("fs");
const globalConfig = require("./config.js")

let controllerSet = [];
let pathMap = new Map();

// 读取所有的文件
let files = fs.readdirSync(globalConfig["web_path"]);

for (let i = 0; i < files.length; i++) {

    // 导入controller导出的path
    let temp = require(`./${globalConfig["web_path"]}/${files[i]}`);

    if (temp.path) {
        for (const [key, value] of temp.path) {
            // 排除重复的url 
            if (pathMap.get(key) === undefined) {
                pathMap.set(key, value)
            } else {
                throw new Error("url异常")
            }
        }

        // temp是controller里的path
        controllerSet.push(temp)
    }

}

module.exports = pathMap