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
    - 该文件源码45行如下:
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
### Node概念
- node中模块分为两类
    - 核心模块：Node提供的模块
        - 核心模块在Node源代码编译中，编译进二进制文件中，Node进程启动时被直接加载进内存，所有它的加载速度啥最快的
    - 文件模块：用户编写的模块
        - 文件件模块啥在运行时动态加载，需要完整的路径分析，文件定位，编译执行，因此它的速度相比核心模块较慢。
#### Node中的 require 处理
##### Node与前端浏览器的缓存比较
- 浏览器：会缓存静态脚本以提高性能（浏览器仅缓存文件）
- Node：对引入得模块都会缓存，不过缓存的是编译和执行之后的对象
- Tips：在Node中，无论核心模块还是文件模块，                                                          
    - 相同点：require( ) 方法都相同模块的二次加载，一律采用缓存优先
    - 不同点：核心模块的缓存检查必定先于文件模块的缓存检查
##### 模块标识符分析
- 模块标识符类型
    - 核心模块，如：`https、fs、path`这种
        - 它的优先级仅次缓存加载，上文已知Node源代码编译中已经编译成二进制代码，因此它加载最快。
        - Tips：`若把自定义模块，更改模块标识为核心模块（其实它正常应是自定义模块），它也不会加载成功`
    - 路径文件模块
        - 相对路径，如：`.或..`这种
        - 绝对路径，如：`/` 这种
            - 分析文件模块时：require( ) 方法会将路径转为真实路径，以此为索引，将编译后的结果放入缓存，便于提高二次加载的速度
            - 虽然文件模块告知Node文件确切的位置，提高查找速度，但其加载速度还是慢于核心模块
    - 非路径的文件模块，如：`connect`自定义模块这种
        - 它指的是`非核心模块/路径文件模块`以外的特殊文件模块
        - 形式：可能是包或者一个文件 
        - 查找：由于具有不确定性所以它的查找最费时最慢
##### 文件定位
- Node对于文件拓展的自动补足
    - CommonJS模块规范允许标识符中不包含文件拓展名，此时Node会按`.js/.json/.node`次序依次尝试
- 引起性能问题
    - Node进行文件拓展时，调用fs模块同步阻塞样判定文件是否存在
    - 因为Node是单线程的缘故，因此这种方式不利于优化
- 性能优化
    - 若是`.node/.json文件`，在传递给require( ) 时带上拓展名
    - 同步配合缓存，也可以大幅度缓解Node单线程中阻塞调用的缺陷
##### 目录分析和包
- 分析标识符过程中，require( ) 分析拓展名后未查找到相应文件，但得到一个目录
- 这种情况也很常见，此时Node会将其当作一个包来处理
- 处理流程
    1. 获取当前目录时，先在当前目录下查找 **package.json**
        - 通过`JSON.parse( )` 解析出包描述对象，取出main属性指定的文件名进行定位
        - 若这个文件名缺少拓展名，则进入拓展名分析步骤，（按`.js/.json/.node`依次尝试）
    2. `main`属性指定文件名错误或无package.json文件，Node会默认index为文件名，进入拓展名分析步骤
    3. 若目录分析未成功定位任何文件，则进入下一模块路径查找
    4. 模块路径完全遍历，未找到人和目标文件，则抛出失败异常
#### Node中的 模板编译
- 编译和执行是引入文件模板的最后阶段
- 文件定位以后，Node会新建模块对象，依据路径进行载入编译
    - `.js文件`：通过fs模块同步读取文件后编译执行
    - `.node文件`：它是C/C++编写的拓展文件，需通过`dlopen( )`方法加载最后编译生成的文件
    - `.json文件`：通过fs模块同步读取后，利用`JSON.parse( )`解析，然后返回结果
    - `其余拓展文件`:被当作JS文件载入
    - Tips：所有编译成功的模块，都会将其`文件路径当作索引` `缓存在module.cache上`，提高二次引用速度
#### Node中的 核心模块
> 前面提到Node核心模块在编译成可执行文件过程时就被编译成了二进制文件
- 核心模块其实分为两部分
    - C/C++编写部分：存放在Node项目的src目录下
    - JavaScript编写部分：存放在Node项目的lib目录下
#### JavaScript核心模块编译过程
- 编译所有C/C++文件前，编译程序会将JavaScript模板文件编译为C/C++代码
    - Node采用`V8附带的js2c.py工具`，将所以内置JS代码（src/node.js&lib/*.js）转化为C++中的数组
- JavaScript代码以字符串形式存储在node命名空间中（不可直接执行）
    - 启动node进程时，它被直接加载进内存
    - JavaScript核心模块经历表舒服分析直接定位至内存中（比普通文件查找快很多）
### Node中的异步I/O
> 前端编程也算GUI编程的一种，其中充斥的各种Ajax和时间，这些都是典型的异步应用场景
- 在绝大多数高级编程语言中，异步并不多见，形成的原因是程序员不适合通过异步进行程序设计
- PHP最更体现这点，它对调用层屏蔽了异步，并且不提供多线程，所以`PHP从头到脚都是同步阻塞的方式执行的`
    - 优点：利于程序员顺序编写业务逻辑
    - 缺点：复杂网络应用中，阻塞导致它无法更好的并发
- `Node是首个，将异步作为主要编程方式和设计理念的高级编程语言或运行平台`
#### Nginx
##### Nginx 概念
- Nginx是与Noded的事件驱动、异步I/O设计理念相近的产品
- Nginx采用纯C语言进行编写，性能十分优异
##### Nginx与Node差异
- Nginx具备面向客户端管理连接的强大能力
    - 但Nginx背后仍限制于各种同步方式的编程语言
- Node是全方位的
    - Node可作为服务器去处理客户端大量的并发请求
    - Node也可做为客户端向网络中各应用进行并发请求
###### 为什么要异步I/O
- 浏览器中JavaScript都是在单线程上执行，且与UI渲染共用线程
- 所以JavaScript执行时，UI渲染和响应是停滞的
- 因此前端异步可以消除UI阻塞的现象，且第一个资源获取不会影响第二个，可享受并发带来的优势
#### Node中的异步编程
##### 高阶函数
- 是可以把函数作为参数，或将函数作为返回值的函数
- 例如 数组的`sort()` 方法
```javascript
var points = [1,27,415,8,441];
points.sort(function(a,b) {
    return a - b
})
```
- 通过改动`sort()`方法的参数，可与决定不同的排序方式，可以看出高阶函数的灵活性
- 结合Node提供的最基本的事件模块，事件的处理方式正是基于高阶函数的特性完成的
- 高阶函数在JavaScript中很多：`forEach()、map()、reduce()、filter()、every()、some()`
##### 偏函数用法
- 指的是创建一个调用另外一个部分参数或变量已经预置的函数————的函数（我也看不懂）
```javascript
var toString = Object.prototype.toString;
var isString = function(obj) {
    return toString.call(obj) == '[object String]';
}
var isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
}
```