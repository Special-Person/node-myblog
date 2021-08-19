const EveryDayDao = require("../dao/EveryDayDao");
const {writeResult} = require("../util/RespUtil");
const {getTime} = require("../util/TimeUtil");
let path = new Map();


path.set("/editEveryDay", editEveryDay);

function editEveryDay(request, response) {

    var currentData = "";
    request.on("data", function (data) {
        currentData += data;
    });

    request.on("end", data => {
        EveryDayDao.insertEveryDay(currentData.trim(), getTime(), res => {
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.write(writeResult("success", "添加成功", null));
            response.end();
        });
    });
}

path.set("/queryEveryDay", queryEveryDay);

function queryEveryDay(request, response) {
    EveryDayDao.queryEveryDay(res => {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.write(writeResult("success", "查询成功", res));
        response.end();
    });
}

module.exports.path = path;
