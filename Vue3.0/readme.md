
> > `
> >
> > > > > ## 关于Vue 3.0
#### 前言：
 * 正式版：`Vue`团队于2020.09.18日发布3.0正式版
 * 前置条件：`Vue`虽然保留了大量的2.0版本`api`,但由于是使用`TypeScript`重构，所以想要学习3.0起码要掌握`TS`的基础使用

  **Vue3.0中的六大亮点**

  |   |     |     |               
  | :--------- | :---------| :------------| ---------------------------: 
  | 1 |   `Performance `    |  性能上比Vue2.0快1.2~2倍|     
  | 2 |   `Tree shaking support `|   按需编译，体积更加的轻量  |                      
  | 3 |   `Composition API`    |  组合API，可参考`React hooks`理解|     
  | 4 | `Better TypeScript support`|对Ts提供了更好的支持 | 
  | 5 | `Custom Renderer API`|暴露了自定义渲染API | 
  | 6 | `Fragment,Teleport(Protal),Suspense`|更先进的组件 | 
注：具体可以参考`github`中`Vue3.0`的相关源文件`https://github.com/vuejs/vue-next/tree/master/packages`
***
   ###  Vue3.0是基于什么优化，如何做到更轻量，更快的？
- diff 算法优化  
    + Vue 2中的虚拟Dom是全量比较
    +Vue 3新增静态标记（PatchFlag）
>>> 静态标记就是非全量比较，只会比较那些被标记的变量，比较的数量大大减少因此提升性能
>>>>（这让我想到了JS垃圾回收机制里的标记清除，ORZ 感觉熟悉，但回收机是全标记只是清除具有离开环境的标记变量而已）
- https://vue-next-template-explorer.netlify.app/
> 
>>

```

```
         
*由以上可知：*。

>原理：
#### **栈**：
  >  
  >> 
  - 举个例子
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