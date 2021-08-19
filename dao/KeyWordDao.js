const MyConnect = require("./BaseDao");

module.exports.queryKeyWordBlog = (BlogKeyWord, page, pageSize, success) => {
    MyConnect(
        "select * from blog where content like '%" + BlogKeyWord + "%' limit ?, ?",
        [page * pageSize, pageSize],
        success
    );
};
