const MyConnect = require("./BaseDao");

module.exports.insertComment = (blog_id, parent, username, comments, email, ctime, utime, parentName, success) => {
    MyConnect(
        "insert into comments (`blog_id`, `parent`, `username`, `comments`, `email`, `ctime`, `utime`, `parent_name`) values (?, ?, ?, ?, ?, ?, ?, ?)",
        [blog_id, parent, username, comments, email, ctime, utime, parentName],
        success
    )
}


module.exports.queryCommentsByBlodId = (blog_id, page, pageSize, success) => {
    MyConnect(
        "select * from comments where blog_id = ? order by ctime desc limit ?, ?",
        [blog_id, page * pageSize, pageSize],
        success
    )
}

module.exports.queryCommentsCountByBlodId = (blogId, success) => {
    MyConnect(
        "select count(1) as count from comments where blog_id = ?",
        [blogId],
        success
    )
}

module.exports.queryNewComments = success => {
    MyConnect(
        "select * from comments order by id desc limit 0, 10",
        [],
        success
    )
}