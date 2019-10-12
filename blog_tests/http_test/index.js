const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res)=>{
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const query = querystring.parse(url.split('?')[1])

    //设置返回格式为 JSON
    res.setHeader('Content-type', 'application/json')

    //返回的数据
    const backData = {
        method,
        url,
        path, 
        query
    }

    //返回
    if(method === 'GET'){
        res.end(
            JSON.stringify(backData)
        )
    }
    if(method==='POST'){
        let postData = ''
        req.on('data', chunk=>{
            postData+=chunk.toString()
        })
        req.on('end', ()=>{
            backData.postData = postData
            //返回
            res.end(
                JSON.stringify(backData)
            )
        })
    }
})


 /*
//处理post请求
const server = http.createServer((req, res) =>{
    if(req.method === 'POST'){
        //req数据格式
        const path = req.url.split('?')[0]
        console.log('req content-type:', req.headers['content-type'])
        //接收数据
        let postData = ''
        req.on('data', chunk =>{
            postData += chunk.toString()
        })
        //接收完成
        req.on('end', ()=>{
            console.log('postData: ', postData)
            res.end(path) //返回路由
        })
    }
})
 */
/*
//处理get请求
const querystring = require('querystring')

const server = http.createServer((req, res) =>{
   // console.log(req.method) //GET
    const url = req.url
    //console.log('url:', url)
    req.query = querystring.parse(url.split('?')[1])
    //console.log('query:', req.query)
    res.end(JSON.stringify(req.query))
})
*/


server.listen(8000)
console.log('监听成功！')