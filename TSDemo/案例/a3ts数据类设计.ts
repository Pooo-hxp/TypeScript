/**
 * 
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
class DataHelper{
    dataKey:string;
    primaryKey:string;
    constructor(dataKey:string,primarKey:string) {
        this.dataKey=dataKey;
        this.primaryKey=primarKey;
    }
    readData():any{
        /**
         * 1.读取本地数据（根据dataKey）
         * 2.将读取的json数组字符串转化成数组对象
         * 3.返回数组对象
         */
        let strData:string|null=localStorage.getItem(this.dataKey);
        let arrData:any=[];
        if(strData!=null)
        arrData=JSON.parse(strData)
        return arrData;
    }
}
    //调用
    let dh=new DataHelper('plData','id');