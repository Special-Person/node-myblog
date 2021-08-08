const MyConnect = require("./BaseDao");

module.exports.insertBlog = (title, content, tags, views, ctime, utime, success) => {
    MyConnect(
        "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?)",
        [title, content, tags, views, ctime, utime],
        success
    )
}

module.exports.queryBlogByPage = (page, pageSize, success) => {
    MyConnect(
        "select * from blog order by id desc limit ?, ?",
        [page * pageSize, pageSize],
        success
    )
};

module.exports.queryBlogPageTotalCount = (success) => {
    MyConnect(
        "select count(1) as count from blog",
        [],
        success
    )
}

module.exports.queryBlog = (id, success) => {
    MyConnect(
        "select * from blog where id = ?",
        [id],
        success
    )
}


module.exports.queryAllBlog = (success) => {
    MyConnect(
        "select * from blog order by ctime desc",
        [],
        success
    )
}

module.exports.addViews = (id, success) => {
    MyConnect(
        "update blog set views = views + 1 where id = ?",
        [id],
        success
    )
}


module.exports.queryHotBlog = (success) => {
    MyConnect(
        "select * from blog order by views desc limit 0, 10",
        [],
        success
    )
}