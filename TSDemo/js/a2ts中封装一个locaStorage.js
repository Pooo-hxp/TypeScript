"use strict";
/**
 * localStorage用于在浏览器端持久化保存键值对数据
 * 特点：大小限制5MB
 *       受同源访问限制，不允许跨域访问
 *       浏览器设置隐私模式下无法使用
 *       《只能存放字符串》---JSON.parse转化下就好了
 * localStorage基本语法
 *    localStorage.setItem('key',value)//存放键值对数据
 *    localStorage.getItem('key')      //根据KEY查询对应的value值，无则返回null
 *    localStorage.removeItem('key')   //根据KEY删除对应的键值对
 *    localStorage.clear('key')   //清空所有键值对数据
 */
//--这里是伪代码----
var btnAdd = document.querySelector("");
var btnGet = document.querySelector("");
btnAdd.onclick = function () {
    var dog = {
        name: '花花',
        age: 3,
        gender: '公'
    };
    //先将对象转化为JSON字符串，然后保存
    var strJson = JSON.stringify(dog);
    //保存字符串到本地localStorage
    localStorage.setItem('myDog', strJson);
    console.log('这里是保存对象操作~');
};
btnGet.onclick = function () {
    //取出json字符串,string|null是两种类型都接受
    var strJson = localStorage.getItem('myDog');
    //将json字符串转化为JSON对象
    var objJson = JSON.parse(strJson);
    //无论strJson是什么类型，都转化为string类型
};
