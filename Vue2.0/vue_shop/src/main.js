// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
//全局样式表
import '@/assets/css/global.css';
// 三方资源，阿里矢量库
import '@/assets/fonts/iconfont.css';
// 三方树形控件
import TreeTable from 'vue-table-with-tree-grid'
//引用axios用于数据交互
import axios from 'axios';
// 配置请求默认地址
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/';
// 为保证有权限访问部分接口，需要在axios请求头中添加Authorization字段
axios.interceptors.request.use(config=>{
  config.headers.Authorization=window.sessionStorage.getItem('token');
  //-语法规则，必须 return config 
  return config
})
Vue.prototype.$http=axios;
// elementUI 资源
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);
Vue.config.productionTip = false;
Vue.component('tree-table',TreeTable)
Vue.filter('dataFormat',function(orgVal){
  function checkLen(num){
    return num>9?num:'0'+num;
  }
  const formatDate= new Date(orgVal)
  const y=formatDate.getFullYear();
  const m=checkLen(formatDate.getMonth()+1);
  const d=checkLen(formatDate.getDate());
  const hh=checkLen(formatDate.getHours());
  const mm=checkLen(formatDate.getMinutes());
  const ss=checkLen(formatDate.getSeconds());
  return `${y}-${m}-${d}-${hh}:${mm}:${ss}`
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
