
> > `
> >
> > > > > ## 关于Vue 3.0
#### 前言：
 * 正式版：`Vue`团队于2020.09.18日发布3.0正式版
 * 前置条件：`Vue`虽然保留了大量的2.0版本`api`,但由于是使用`TypeScript`重构，所以想要学习3.0起码要掌握`TS`的基础使用

  **Vue3.0中的六大亮点**

  |  序号 |  特性   |  解析   |               
  | :--------- | :---------| :------------| 
  | 1 |   `Performance `    |  性能上比Vue2.0快1.3~2倍|     
  | 2 |   `Tree shaking support `|   按需编译，体积更加轻量化  |                      
  | 3 |   `Composition API`    |  组合API，可参考`React hooks`理解|     
  | 4 | `Better TypeScript support`|对 Ts 提供了更好的支持 | 
  | 5 | `Custom Renderer API`|暴露了自定义渲染API | 
  | 6 | `Fragment,Teleport(Protal),Suspense`|更先进的组件 | 

注：具体可以参考`github`中`Vue3.0`的相关源文件`https://github.com/vuejs/vue-next/tree/master/packages`
***
   ###  Vue3.0是基于什么优化，如何做到更轻量，更快的？
* 一 、diff 算法优化  
    + Vue 2中的虚拟Dom是全量比较
    + Vue 3新增静态标记（PatchFlag）
    + 在与数据变化后，与上次虚拟DOM节点比较时，只比较带有PatchFlag标记的节点
    + 并且可以从flag信息中得知具体需要比较的内容。
> 静态标记就是非全量比较，只会比较那些被标记的变量，比较的数量大大减少因此提升性能
>> 这让我想到了JS垃圾回收机制里的标记清除，ORZ 感觉熟悉，但回收机是全标记只是清除具有离开环境的标记变量而已）
>>> **内存垃圾回收机制在我去年的博文中 https://www.xipengheng.cn/?p=321**
比如下面这个示例
```javascript
    <div>
        <a>土豆哇~ </a>
        <p>静态文本</p>
        <p>{{msg}}</p>
    </div>
 //------------在下方编译中可以清晰看到标记--------------------
```
```javascript
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("a", null, " 土豆哇~ "),
    _createVNode("p", null, "静态文本"),
    _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* text文本在这里标记为1 */)
  ]))
}
//编译网址--->  https://vue-next-template-explorer.netlify.app/
```
- 由以上可得知：
    + 在vue2.0中对于数据变化后重新渲染的DOM树，会与上次渲染的DOM树逐个比较节点
    + 在vue3.0的diff中，创建虚拟DOM时，会根据该DOM是否会变化而添加静态标记，数据更新需要生成新的虚拟DOM时，只会与上次渲染的且被标记的节点比较。
    + 不同的动态变化类型，为了便于区分，标记的数值也不同
    + 因此在vue3.0中比较次数更少，效率更高，速度更快。
#### **示例**
```JavaScript
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("a", { id: _ctx.Poo }, " 土豆哇~ ", 8 /* PROPS */, ["id"]),
    _createVNode("p", { class: _ctx.style }, " 静态文本", 2 /* CLASS */),
    _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}
```
#### **标记查询列表**
```javascript
  TEXT = 1,// --取值是1---表示具有动态textContent的元素
  CLASS = 1 << 1,  // --取值是2---表示有动态Class的元素
  STYLE = 1 << 2,  // --取值是4---表示动态样式（静态如style="color: pink"，也会提升至动态）
  PROPS = 1 << 3,  // --取值是8--- 表示具有非类/样式动态道具的元素。
  FULL_PROPS = 1 << 4,  // --取值是16---表示带有动态键的道具的元素，与上面三种相斥
  HYDRATE_EVENTS = 1 << 5,  // --取值是32---表示带有事件监听器的元素
  STABLE_FRAGMENT = 1 << 6,   // --取值是64---表示其子顺序不变，不会改变自顺序的片段。 
  KEYED_FRAGMENT = 1 << 7, // --取值是128---表示带有键控或部分键控子元素的片段。
  UNKEYED_FRAGMENT = 1 << 8, // --取值是256---子节点无key绑定的片段（fragment）
  NEED_PATCH = 1 << 9,   // --取值是512---表示只需要非属性补丁的元素，例如ref或hooks
  DYNAMIC_SLOTS = 1 << 10,  // --取值是1024---表示具有动态插槽的元素
```
* 二 、hoistStatic  静态提升
    + vue2.0中，在更新时，元素即使没有变化，也会重新创建进行渲染
    + vue3.0中，不参与更新的元素；会静态提升，只创建一次下次渲染直接复用。
    + 因此在vue3.0中复用更多，创建次数更少，速度更快。见下方示例：
```javascript
    <div>
        <a>土豆哇~ </a>
        <p>静态文本</p>
        <p>{{msg}}</p>
        <a href='https://vue-next-template-explorer.netlify.app/'>vue3.0编译地址</a>
    </div>
```
```javascript
    /**
     * 在下方编译中(在options中勾选hoistStatic)进行静态提升,
     * 可以清晰看到不更新元素未参与重新创建
    */
const _hoisted_1 = /*#__PURE__*/_createVNode("a", null, "土豆哇~ ", -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _hoisted_1,
    _createVNode("p", { style: _ctx.myStyle }, "静态文本", 4 /* STYLE */),
    _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */),
    _createVNode("a", {
      style: _ctx.myStyle,
      href: "https://vue-next-template-explorer.netlify.app/"
    }, "vue3.0编译地址", 4 /* STYLE */)
  ]))
}
}
```        
* 三、cachehandlers 事件侦听缓存
    + onClick默认视为动态绑定，因此会追踪它的变化
    + 事件绑定的函数为同一个，因此不追踪它的变化，直接缓存后进行复用
    + 同样的，我在编译中进行演示
```javascript
    <div>
        <button @click='Pooo'>按钮</button>
    </div>
```
```javascript
    /**
     * 开启事件侦听缓存前：
     * 下方为常规编译后，可以看到静态标记为8
     * 既然有静态标记，那么它就会进行比较
    */
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("button", { onClick: _ctx.Pooo }, "按钮", 8 /* PROPS */, ["onClick"])
  ]))
}
```
#### **然后我在options中打开事件侦听缓存（cachehandlers）**
```javascript
/**
 * 可以发现打开侦听缓存后，没有静态标记
 * 在diff算法中，没有静态标记的是不会进行比较和进行追踪的
*/
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("button", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.Pooo(...args)))
    }, "按钮")
  ]))
}
```
#### **使用vue3.0提供的Vite快速创建项目**
  - Vite是Vue作者开发的一款意图取代webpack的工具
  - 原理是利用ES6的import发送请求加载文件的特性，进而拦截，然后做预编译，省去webpack冗长的打包
  - 使用步骤
    + 安装Vite命令： npm install -g create-vite-app
    + 创建Vue3项目： create-vite-app PoooName
    + 安装依赖：cd PoooName / npm install / npm run dev
    + Vue3.0中兼容2.0的写法，具体代码在此文件同级的PoooName项目文件中
  ```

  ```
  1. 
  2. 
- 
   > 
    - 
    -  
   > 


    | | | 
   > 
  - 

  - **注：**
   > 。


   > 
### 总结
> **以上内容是本人通过视频学习李南江老师的讲解，加上自己的理解进行总结而出。**

-  
-  