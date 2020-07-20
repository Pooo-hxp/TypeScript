"use strict";
/**
 * 函数形参
 * function 函数名(形参1:类型，形参2:类型):返回值类型{
 * }
 * let 变量名:变量类型=函数名(实参1，实参2)
 * 特点：实参和形参类型要一致
 *       实参和形参数量要一致
*/
function sayHi() {
    return 'Hi~ potato ';
}
var text = sayHi();
console.log(text);
//形参
function jump(city) {
    console.log("\u6211\u5728" + city);
}
//实参传递,如果传递数字就会报错，因此有利于函数类型检查
jump('郑州');
// jump('郑州','杭州') 报错，应有一个参数，但获得两个
