/**
 * 表示取值可以为多种类型中的任意一种
 * 使用场景：不知道用户输入的值或者函数的返回值具体是什么类型
 */
function anyFun(){
    return '4'
}
let anyType:number|string=anyFun()