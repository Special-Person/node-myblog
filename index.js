const Express = require("express");
const globalConfig = require("./config");
const loader = require("./loader");

const app = new Express();

// 所有的post请求
let postArr = [
    "/editEveryDay",
    "/editBlog",
    "/addComment"
];
postArr.forEach(item => app.post(item, loader.get(item)));

// 所有的get请求
let getArr = [
    "/queryEveryDay",
    "/queryBlogByPage",
    "/queryBlogPageTotalCount",
    "/queryBlog",
    "/queryRandomCode",
    "/queryCommentsByBlodId",
    "/queryCommentsCountByBlodId",
    "/queryAllBlog",
    "/queryAllTag",
    "/queryTagByTags",
    "/addViews", // 添加浏览次数
    "/queryHotBlog",
    "/queryNewComments",
    "/queryKeyWord"
];
getArr.forEach(item => app.get(item, loader.get(item)));

app.listen(globalConfig.port);
