const env = process.env.NODE_ENV //开发环境不存储日志，直接打印；运行环境存储日志，不打印
const fs = require('fs')
const path = require('path')

//写日志
function writeLog(writeStream, log){
    writeStream.write(log+'\n')  //关键代码
}

//生成write stream
function createWriteStream(fileName){
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags:'a'
    })
    return writeStream
}

//写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log){
    // if(env === 'dev'){
    //     console.log(log)
    // }else if(env === 'production'){
    //     writeLog(accessWriteStream, log)
    // }
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}