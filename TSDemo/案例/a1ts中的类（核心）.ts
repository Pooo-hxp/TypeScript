/**
 * JS中类的概念常规是使用构造函数来实现
 * function City(cName,attr){
 *          this.cName=cName;
 *          this.attr=attr;
 * }
 * //--这里为了节省内存空间，一般方法都在prototype上绑定，而非构造函数内部
 * City.prototype.someFun=function(){
 *  console.log(`我想去的城市是${this.cName},它${this.attr}`)
 * }
 * //---调用
 * let likeA=new City('绍兴','鲁迅故里，黄酒名满天下');
 * console.log(likeA.someFun()) //我想去的城市是绍兴,它鲁迅故里，黄酒名满天下
 */
//---TS中类的创建如下----
  class City{
      //成员变量定义在类中
      cname:string;
      types:number;
      constructor(cname:string,types:number){
          //构造函数中对数据进行赋值初始化
        this.cname=cname;
        this.types=types;
      }
      someFun(){
          console.log(`我最想去的城市是${this.cname},总共想去的城市有${this.types}种`);
      }
  }
  let c1=new City('杭州',4);
  console.log(c1.cname);
  c1.someFun();//调用方法
//我最想去的城市是杭州,总共想去的城市有4种



