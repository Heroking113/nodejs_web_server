/*
1.基本上所有的文件操作都是异步的
2.IO操作的性能瓶颈：
    IO操作包括网络IO和文件IO
    
*/

const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// //读取文件内容
// fs.readFile(fileName, (err, data)=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     //data是二进制类型，需要转换为字符串
//     console.log(data.toString())
// })

// //写入文件
// const content = '写入的内容\n'
// const opt = {
//     flag: 'a' //追加写入.覆盖用'w'
// }
// fs.writeFile(fileName, content, opt, (err) => {
//     if (err) {
//         console.log(err)
//     }
// })

//判断是否存在
fs.exists(fileName, (exist)=>{
    console.log('exist:', exist)
})