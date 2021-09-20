#### Http模块
- 协助工具
    - `npm install -g nodemon`
    - 检测是否安装成功 `nodemon --version`
        - tips:如果安装成功，但是版本号不显示且nodemon命令提示无法加载/禁止运行脚本
        - 解决方案，更改策略
            - 管理员身份打开`powerShell`
            - 输入命令`set-ExecutionPolicy RemoteSigned`回车再选A
    - 作用：协助监听启动服务器对应的文件是否发生变化，变化时会自动重启服务器进行更新
    - 使用：变更文件执行由node app.js---> nodemon app.js