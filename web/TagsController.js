const url = require("url");
const {writeResult} = require("../util/RespUtil");
const {getTime} = require("../util/TimeUtil");
const TagsDao = require("../dao/TagsDao");
const {queryBlog} = require("../dao/BlogDao");

let path = new Map();

path.set("/queryAllTag", queryAllTag);

function queryAllTag(request, response) {
    TagsDao.queryAllTag(res => {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.write(writeResult("success", "查询成功", res));
        response.end();
    });
}

path.set("/queryTagByTags", queryTagByTags);

function queryTagByTags(request, response) {
    let params = url.parse(request.url, true).query;
    TagsDao.queryTagByTags(params.tag, result => {
        let tag_id = result[0].id;
        queryTagIdByBlog({
            tag_id,
            page: parseInt(params.page),
            pageSize: parseInt(params.pageSize)
        }, request, response);
    });
}

function queryTagIdByBlog(options, request, response) {
    TagsDao.queryTagIdByBlog(parseInt(options.tag_id), parseInt(options.page), parseInt(options.pageSize), result => {
        let resultArr = [];
        result.forEach(item => {
            resultArr.push(new Promise((resolve, reject) => {
                queryBlog(item.blog_id, res => {
                    resolve(res);
                });
            }));
        });

        Promise.all(resultArr).then(res => {
            res = res.flat(1).map(item => {
                item.tags = item.tags.split(",");
                return item;
            });

            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.write(writeResult("success", "查询成功", res));
            response.end();
        });
    });
}

module.exports.path = path;
