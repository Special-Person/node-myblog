const MyConnect = require("./BaseDao");

module.exports.insertTag = (tag, ctime, utime, success) => {
    MyConnect(
        "insert into tags (`tag`, `ctime`, `utime`) values (?, ?, ?)",
        [tag, ctime, utime],
        success
    );
};


module.exports.queryTag = (tag, success) => {
    MyConnect(
        "select * from tags where tag = ?",
        [tag],
        success
    );
};

module.exports.queryAllTag = (success) => {
    MyConnect(
        "select * from tags order by ctime desc",
        [],
        success
    );
};

module.exports.queryTagIdByBlog = (tag_id, page, pageSize, success) => {
    MyConnect(
        "select * from tag_blog_mapping where tag_id = ? order by ctime desc limit ?, ?",
        [tag_id, page * pageSize, pageSize],
        success
    );
};

module.exports.queryTagByTags = (tag, success) => {
    MyConnect(
        "select * from tags where tag = ?",
        [tag],
        success
    );
};
