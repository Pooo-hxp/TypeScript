/**
 * 数组声明有两种方式
 * 第一种：let 数组名：Array<类型>=[值1，值2，值3]
 * 第二种：let 数组名：类型[]=[值1，值2，值3]
 * 数组中值的类型必须符合指定的类型
 */
let arr1:Array<string>=['1','2','3'];
let arr2:Number[]=[1,2,3,4]
/**
 * 元组：规定元素的数量、和每个元素的类型
 * let 元组名：[类型a,类型b,类型c]=[值a,值b,值c]
 */
let arr3:[number,string,boolean]=[13,'土豆',true]