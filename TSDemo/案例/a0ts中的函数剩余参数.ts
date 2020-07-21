/**
 * 剩余参数
 * function add(形参1:类型,形参2:类型,...形参3:类型[]):vodi{
 * console.log(a+b+...)
 * }
 * (剩余参数只能定义一个)
 * (剩余参数只能定义数组)
 * (剩余参数只能写在形参列表的最后)
 */
function add(name:string,city:string,...type:string[]):string{
    return `我是${name},我想去${city},想玩${type}`
}
console.log(add('土豆','郑州','划船','钓鱼'));