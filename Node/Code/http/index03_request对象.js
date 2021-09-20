const http = require('http');

const Server = new http.Server((req, res)=>{
    res.end("Server");
})
Server.listen(()=>{
    console.log('Server 启动~~');
})
