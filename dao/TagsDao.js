const MyConnect = require("./BaseDao");

module.exports.insertTag = (tag, ctime, utime, success) => {
    MyConnect(
        "insert into tags (`tag`, `ctime`, `utime`) values (?, ?, ?)",
        [tag, ctime, utime],
        success
    )
};


module.exports.queryTag = (tag, success) => {
    MyConnect(
        "select * from tags where tag = ?",
        [tag],
        success
    )
}