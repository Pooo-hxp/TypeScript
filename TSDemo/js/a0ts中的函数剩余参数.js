"use strict";
/**
 * 剩余参数
 * function add(形参1:类型,形参2:类型,...形参3:类型[]):vodi{
 * console.log(a+b+...)
 * }
 * (剩余参数只能定义一个)
 * (剩余参数只能定义数组)
 * (剩余参数只能写在形参列表的最后)
 */
function add(name, city) {
    var type = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        type[_i - 2] = arguments[_i];
    }
    return "\u6211\u662F" + name + ",\u6211\u60F3\u53BB" + city + ",\u60F3\u73A9" + type;
}
console.log(add('土豆', '郑州', '划船', '钓鱼'));
