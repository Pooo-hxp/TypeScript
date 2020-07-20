"use strict";
/**
 * any 代表任意类型，一般在获取DOM的时候使用
 * （在使用第三方代码库时，不确定返回什么类型的 ，此时也可以使用any类型）
 */
var anyDom = document.getElementById('anyone');
/**
 * void 代表没有类型，一般用在无返回值的函数
 * 在TS中，要对有返回值的函数进行返回值类型声明
 */
function sayHi() {
    return 'Hi~ potato';
}
function sayHi2() {
    console.log('我没有返回值');
}
/**
 * never 代表永不存在的值的类型，常用异常返回或无限循环返回类型
 * （never类型是TS中的底部类型，never类型是任何类型的子类型，
 *  因此never类型值可以赋值给任何类型）
 */
function whil() {
    while (true) {
        console.log('无限执行我,才可以类型声明为never');
    }
}
var x = whil();
var y = whil();
var z = whil();
