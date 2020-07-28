"use strict";
/**
 * Author：Poo-hxp
* DataHelper类设计
* dataKey-localStroage的键
* primaryKey-数据项主键的名称
      
-------- ---------------
* constractor-构造函数
        * readData-读取本地数据，返回数组
        * addData-新增数据对象，返回自动生成的ID
        * saveData-存入本地数据
        * removeDataById-根据id删除数据对象，返回布尔值
-------------------------------
流程--->
        加载评论列表时->readData()方法
        新增评论->addData()方法
        删除评论->removeDataId()方法
 */
var DataHelper = /** @class */ (function () {
    function DataHelper(dataKey, primarKey) {
        this.dataKey = dataKey;
        this.primaryKey = primarKey;
    }
    DataHelper.prototype.readData = function () {
        /**
         * 1.读取本地数据（根据dataKey）
         * 2.将读取的json数组字符串转化成数组对象
         * 3.返回数组对象
         */
        var strData = localStorage.getItem(this.dataKey);
        var arrData = [];
        if (strData != null)
            arrData = JSON.parse(strData);
        return arrData;
    };
    DataHelper.prototype.saveData = function (arrData) {
        //将数组转成json字符串
        var str = JSON.stringify(arrData);
        localStorage.setItem(this.dataKey, str);
    };
    DataHelper.prototype.addData = function (conStr) {
        /** 思路
         * 读取localStorage数据，转成数组
         * 接收评论内容字符串
         * 将评论内容封装到对象，并生成id（知道生成）
         * 将评论对象加入数组
         * 将数组转成字符串，保存回localStorage
         * 细节：返回刚才生成的评论id
         */
        //--读取本地现有数据
        var arr = this.readData();
        //--创建一个评论对象，设置评论内容属性
        var obj = {
            content: conStr,
        };
        //自动生成主键值（id）
        var newId = arr.length > 0 ? arr[arr.length - 1][this.primaryKey] + 1 : 1;
        obj[this.primaryKey] = newId;
        //将添加了主键值的对象添加到数组
        arr.push(obj);
        //利用保存函数写入到localst
        this.saveData(arr);
        //返回新生成的id值
        return newId;
    };
    DataHelper.prototype.removeData = function (id) {
        /**  思路
         * 读取localStorage数组，转成数组
         * 找出数组中要删除的评论（如：id=7）
         * 调用数组splice方法删除找出的对象
         * 将数组转成字符串，保存回localStorage
         * 小细节：返回Boolean值表示删除结果
         */
        return false;
    };
    return DataHelper;
}());
