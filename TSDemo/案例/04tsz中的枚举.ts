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
enum langtype {
    javascript = 1,
    typescript = 2,
    es6 = 3
}
//也可以使用默认枚举值,枚举值默认从0开始
enum langtype {
    html5,
    css3,
    vue,
}
//实际问题解决如 声明性别枚举
enum gender {
    boy = 0,
    girl = 1,
    unkonw = 2,
}
//如何使用？
//创建一个用户性别变量
let userSex: gender = gender.boy;
//进行判定
userSex == gender.boy ? console.log('男生') : console.log('非男生');