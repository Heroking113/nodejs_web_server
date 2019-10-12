/*
//引用其他文件的函数的法一：
//const {add, mul} = require('./a')

//引用其他文件的函数的法一：
const opts = require('./a')
const add = opts.add
const mul = opts.mul

const sum = add(1,3)
const rel = mul(2,4)

console.log(sum)
console.log(rel)
*/

const _ = require('lodash')

const arr = _.concat([1,2],3)
console.log("arr...", arr)