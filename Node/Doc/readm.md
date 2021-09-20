### Http模块
#### 协助工具
- `npm install -g nodemon`
- 检测是否安装成功 `nodemon --version`
    - tips:如果安装成功，但是版本号不显示且nodemon命令提示无法加载/禁止运行脚本
    - 解决方案，更改策略
        - 管理员身份打开`powerShell`
        - 输入命令`set-ExecutionPolicy RemoteSigned`回车再选A
- 作用：协助监听启动服务器对应的文件是否发生变化，变化时会自动重启服务器进行更新
- 使用：启动服务变更文件执行由node app.js---> nodemon app.js
#### 创建服务器的两种方式
- 下方两种方式本质上都是一样的
```javascript
    const http = require('http');
    const Server1 = http.createServer((req, res)=>{
        res.end("Server1");
    })
    Server1.listen(8001,()=>{
        console.log('Server1 启动~~');
    })
    // ----------第二种
    const Server2 = new http.Server((req, res)=>{
        res.end("Server2");
    })
    Server2.listen(8002,()=>{
        console.log('Server2 启动~~');
    })
```
- 原因
    - 引用的方法来源于node项目中`lib/http.js`
    - 查看该文件源码45行左右查看如下:
        - 说明`http.createServer`底层也是调用的`new Server`对象
```javascript
    function createServer(opts,requestListener){
        return new Server(opts,requestListener);
    }
```
##### `listen`函数的三个参数
    - 端口port:可以自定义，也可以使用系统分配的默认端口号
    - 主机名
        - localhost:通常解析成127.0.0.1
        - 127.0.0.1：回环地址，自己发送自己接收
        - 0.0.0.0：监听IPV4上地址，依据端口寻找不同的应用程序
    - 