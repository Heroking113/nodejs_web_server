const mysql = require('mysql')

//创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'qinbingqing010103',
    port: '3306',
    database: 'myblog'
})

//开始连接
con.connect()

//执行sql语句
const sql = 'select * from blogs;'
// const sql = `update users set realname='李四' where username='lisi';`
// const sql = `insert into blogs(title, content, createtime, author) values('标题C', '内容C', 1570264784189, 'lisi');`

con.query(sql, (err, result) => {
    if(err){
        console.error(err)
    }
    console.log(result)
})

//关闭连接
con.end()