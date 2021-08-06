const MyConnect = require("./BaseDao");


module.exports.insertTagBlogMapping = (tagId, blogId, ctime, utime, success) => {
    MyConnect(
        "insert into tag_blog_mapping (`tag_id`,`blog_id`, `ctime`, `utime`) values (?, ?, ?, ?)",
        [tagId, blogId, ctime, utime],
        success
    )
};
