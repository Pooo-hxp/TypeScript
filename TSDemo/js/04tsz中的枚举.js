"use strict";
/**
 * 枚举声明语法
 * enumerate：列举
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
//也可以使用默认枚举值,枚举值默认从0开始
(function (langtype) {
    langtype[langtype["html5"] = 0] = "html5";
    langtype[langtype["css3"] = 1] = "css3";
    langtype[langtype["vue"] = 2] = "vue";
})(langtype || (langtype = {}));
//实际问题解决如 声明性别枚举
var gender;
(function (gender) {
    gender[gender["boy"] = 0] = "boy";
    gender[gender["girl"] = 1] = "girl";
    gender[gender["unkonw"] = 2] = "unkonw";
})(gender || (gender = {}));
//如何使用？
//创建一个用户性别变量
var userSex = gender.boy;
//进行判定
userSex == gender.boy ? console.log('男生') : console.log('非男生');
