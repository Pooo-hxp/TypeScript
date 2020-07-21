/**
 * 可选参数：就是在形参后边添加问号‘？’
 * function 函数名(形参?:类型):返回值类型{
 *  }
 * 此时这里的实参可传可不传
 */
function anyPar(city?:string):void{
    console.log(`我想去${city}`); 
}
anyPar('郑州')
anyPar()
/**
 * 使用默认参数
 * function 函数名(形参1:类型,形参2:类型=默认值2):返回值类型{
 *  }
 */
function anyPar2(city:string,doSom?:string):void{
    console.log(`我想去${city}然后${doSom||'写代码'}`);
}
anyPar2('杭州')