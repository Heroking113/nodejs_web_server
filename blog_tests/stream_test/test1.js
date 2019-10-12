// //标准输入输出
// process.stdin.pipe(process.stdout)



// //前后端传数据，“流”的特点
// const http = require('http')
// const fs = require('fs')
// const path = require('path')

// const fileName1 = path.resolve(__dirname, 'data1.txt')
// const server =  http.createServer((req, res)=>{
//     if(req.method === 'GET'){
//         const readStream = fs.createReadStream(fileName1)
//         readStream.pipe(res) 
//     }
// })
// server.listen(8000)



// //stream拷贝文件
// const fs = require('fs')
// const path = require('path')

// const fileName1 = path.resolve(__dirname, 'data1.txt')
// const fileName2 = path.resolve(__dirname, 'data2.txt')

// const readStream = fs.createReadStream(fileName1)
// const writeStream = fs.createWriteStream(fileName2)

// //一点点地读取文件
// readStream.on('data', chunk=>{
//     console.log(chunk.toString())
// })

// //通过pipe执行拷贝
// readStream.pipe(writeStream)

// //监听拷贝是否完成
// readStream.on('end',()=>{
//     console.log('Copy complete!')
// })