const MyConnect = require("./BaseDao");


module.exports.insertEveryDay = (content, ctime, success) => {
    MyConnect(
        "insert into every_day (`content`, `ctime`) values (?, ?)",
        [content, ctime],
        success
    )
};

module.exports.queryEveryDay = success => {
    MyConnect(
        "select * from every_day order by id desc limit 1",
        [],
        success
    )
};