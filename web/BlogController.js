const url = require("url");

const { writeResult } = require("../util/RespUtil");
const { getTime } = require("../util/TimeUtil");

const BlogDao = require("../dao/BlogDao");
const TagsDao = require("../dao/TagsDao");
const TagBlogMappingDao = require("../dao/TagBlogMappingDao");

let path = new Map();

path.set("/editBlog", editBlog);
function editBlog(request, response) {

    let params = url.parse(request.url, true).query;
    let title = params.title || "";
    let tags = params.tags && params.tags.replace(/ /g, "").replace(/，/g, ",");

    let currentData = ""
    request.on("data", function (data) {
        currentData += data;
    });

    request.on("end", (data) => {
        BlogDao.insertBlog(title, currentData, tags, 0, getTime(), getTime(), res => {

            response.writeHead(200);
            response.write(writeResult("success", "添加成功", null));
            response.end();

            let blogId = res.insertId;
            let tagList = tags.split(",");

            for (let i = 0; i < tagList.length; i++) {
                if (tagList[i] === "") continue;

                queryTag(tagList[i], blogId)
            }
        });
    });

    /**
     * 
     * @param {*} tag 
     * @param {*} blogId 
     */
    function queryTag(tag, blogId) {
        TagsDao.queryTag(tag, result => {
            if (result === null || result.length === 0) {
                insertTag(tag, blogId)
            } else {
                insertTagBlogMapping(result[0].id, blogId)
            }
        })
    }

    /**
     * 
     * @param {*} tag 
     * @param {*} blogId 
     */
    function insertTag(tag, blogId) {
        TagsDao.insertTag(tag, getTime(), getTime(), result => {
            insertTagBlogMapping(result.insertId, blogId)
        })
    }

    /**
     * 
     * @param {*} tagId 
     * @param {*} blogId 
     */
    function insertTagBlogMapping(tagId, blogId) {
        TagBlogMappingDao.insertTagBlogMapping(tagId, blogId, getTime(), getTime())
    }
}

path.set("/queryBlogByPage", queryBlogByPage);
function queryBlogByPage(request, response) {

    let params = url.parse(request.url, true).query;

    BlogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), result => {
        // 处理tags 返回
        result = result.map(item => {
            item.tags = item.tags.split(",")
            return item
        })

        response.writeHead(200);
        response.write(writeResult("success", "查询成功", result));
        response.end();
    })

}

path.set("/queryBlogPageTotalCount", queryBlogPageTotalCount);
function queryBlogPageTotalCount(request, response) {
    BlogDao.queryBlogPageTotalCount(result => {
        response.writeHead(200);
        response.write(writeResult("success", "查询成功", result[0].count));
        response.end();
    })
}

module.exports.path = path;