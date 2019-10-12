//该文件为一些配置代码，并不是业务代码
const querystring = require('querystring')
const {get, set} = require('./src/db/redis')
const { access } = require('./src/utils/log')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

//获取 cookie 的过期时间
const getCookieExpires=()=>{
    const d = new Date()
    d.setTime(d.getTime()+(24*60*60*1000))
    return d.toGMTString()
}

//session 数据
const SESSION_DATA = {}

//处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json;charset=UTF-8') {
            resolve({})
            return
        }
        let postData = ''

        //以流的方式读取，一点点读过来
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    
    //记录access log
    access(`${req.method}  --  ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    //设置返回格式 JSON
    res.setHeader('content-type', 'application/json')

    //获取url和path
    const url = req.url
    req.path = url.split('?')[0]

    //解析query
    req.query = querystring.parse(url.split('?')[1])

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''  //k1=v1;k2=v2

    cookieStr.split(':').forEach(item => {
        if(!item){
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key]=val
    });

    //解析 session
    let needSetCookie = false
    let userId = req.cookie.userid
    if(userId){
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {}
        }
    }else{
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]
    getPostData(req).then(postData => {
        req.body = postData
        set("username", req.body.username)
        //处理blog路由
        //对比
        /*
        const blogData = handleBlogRouter(req, res)
        if (blogData) {
            res.end(
                JSON.stringify(blogData)
            )
            return
        }
        */
        const blogResult = handleBlogRouter(req, res)
        if(blogResult){
            blogResult.then(blogData=>{
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }

                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
       
        //处理user路由
        // 对比
        /*
        const userData = handleUserRouter(req, res)
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
            return
        }
        */
       const userResult = handleUserRouter(req, res)
       if(userResult){
           userResult.then(userData=>{
            if(needSetCookie){
                res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }
               res.end(
                   JSON.stringify(userData)
               )
           })
           return
       }
        //未命中路由，返回404
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write('404 not found\n')
        res.end()
    })
}

module.exports = serverHandle

//process.env.NODE_ENV