//实现五个接口
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

//统一的登录验证函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录!'))
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method //GET POST
    const id = req.query.id

    //获取博客列表 
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        if(req.query.isAdmin){
            const loginCheckResult = loginCheck(req)
            if(loginCheckResult){
                return loginCheckResult
            }
            author = req.session.username
        }

        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    //获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {        
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        //验证是否登录
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            //未登录
            return loginCheckResult
        }

        req.body.author = req.session.username
        const result = newBlog(req.session, req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })

    }

    //更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {        
        //验证是否登录
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            //未登录
            return loginCheckResult
        }

        const result = updateBlog(req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败！')
            }
        })
    }

    //删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        //验证是否登录
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            //未登录
            return loginCheckResult
        }

        const author = req.session.username
        const thisId = req.body.id
        const result = delBlog(thisId, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败！')
            }
        })
    }
}

module.exports = handleBlogRouter