const http=require('http');
// 创建web服务器
const server= http.createServer((req,res)=>{
    res.end("Hell");
})
// 不传则是默认值
server.listen(8888,'0.0.0.0',()=>{
    console.log('启动服务器');
})