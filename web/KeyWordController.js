const url = require("url");
const KeyWordDao = require("../dao/KeyWordDao");
const { writeResult } = require("../util/RespUtil");
let path = new Map();



path.set("/queryKeyWord", queryKeyWord)
function queryKeyWord(request, response) {
    let params = url.parse(request.url, true).query;
    KeyWordDao.queryKeyWordBlog(params.keyWord, parseInt(params.page), parseInt(params.pageSize), res => {
        res = res.map(item => {
            item.tags = item.tags.split(",")
            return item;
        })
        response.writeHead(200);
        response.write(writeResult("success", "查询成功", res));
        response.end();
    })

}
module.exports.path = path;