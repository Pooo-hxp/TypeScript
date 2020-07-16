"use strict";
/**
 * 枚举声明语法
 * enum 枚举名{
 *      枚举项1=枚举值1，
 *      枚举项2=枚举值2
 * }
 * 注意：
 *    枚举项一般是英文和数字
 *    枚举值用整型数字
 */
var langtype;
(function (langtype) {
    langtype[langtype["javascript"] = 1] = "javascript";
    langtype[langtype["typescript"] = 2] = "typescript";
    langtype[langtype["es6"] = 3] = "es6";
})(langtype || (langtype = {}));
