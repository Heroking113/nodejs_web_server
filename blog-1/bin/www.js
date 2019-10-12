//该文件为一些业务代码
//const _ = require('lodash')

const http = require('http')

const PORT = 8008
const serverHandle = require('../app')

const server = http.createServer(serverHandle)
server.listen(PORT)