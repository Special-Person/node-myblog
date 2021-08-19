const url = require("url");
const captcha = require("svg-captcha");


const CommentDao = require("../dao/CommentDao");
const {writeResult} = require("../util/RespUtil");
const {getTime} = require("../util/TimeUtil");


let path = new Map();

path.set("/addComment", addComment);

function addComment(request, response) {

    let data = "";
    request.on("data", res => {
        data += res;
    });

    request.on("end", res => {
        data = JSON.parse(decodeURI(data));
        CommentDao.insertComment(data.blog_id, data.parent, data.username, data.comments, data.email, getTime(), getTime(), data.parentName, res => {
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.write(writeResult("success", "评论成功", null));
            response.end();
        });
    });
}


path.set("/queryRandomCode", queryRandomCode);

function queryRandomCode(request, response) {
    // 验证码生成
    let img = captcha.create({fontSize: 40, width: 100, height: 34});

    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.write(writeResult("success", "查询成功", img));
    response.end();
}

path.set("/queryCommentsByBlodId", queryCommentsByBlodId);

function queryCommentsByBlodId(request, response) {
    let params = url.parse(request.url, true).query;

    CommentDao.queryCommentsByBlodId(params.blog_id, parseInt(params.page), parseInt(params.pageSize), res => {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.write(writeResult("success", "查询成功", res));
        response.end();
    });
}

path.set("/queryCommentsCountByBlodId", queryCommentsCountByBlodId);

function queryCommentsCountByBlodId(request, response) {
    let params = url.parse(request.url, true).query;
    CommentDao.queryCommentsCountByBlodId(parseInt(params.blog_id), res => {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.write(writeResult("success", "查询成功", res[0]));
        response.end();
    });

}

path.set("/queryNewComments", queryNewComments);

function queryNewComments(request, response) {
    CommentDao.queryNewComments(res => {
        res = res.map(item => {
            return {
                id: item.id,
                blog_id: item.blog_id,
                comments: item.comments,
                username: item.username,
                ctime: item.ctime
            };
        });

        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.write(writeResult("success", "查询成功", res));
        response.end();
    });
}

module.exports.path = path;
