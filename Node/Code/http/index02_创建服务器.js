const http = require('http');
const Server1 = http.createServer((req, res)=>{
    res.end("Server1");
})
Server1.listen(8001,()=>{
    console.log('Server1 启动~~');
})

const Server2 = http.createServer((req, res)=>{
    res.end("Server2");
})
Server2.listen(8002,()=>{
    console.log('Server2 启动~~');
})

// 本质上这种方法和上方是一致的
const Server3 = new http.Server((req, res)=>{
    res.end("Server3");
})
Server3.listen(()=>{
    console.log('');
    console.log('Server3 启动~~');
})
