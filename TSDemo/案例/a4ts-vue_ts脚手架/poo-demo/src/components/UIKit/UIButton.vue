<template>
  <!-- 使用v-on="$listeners" 监听事件也可以 -->
  <button
    class="ui-btn"
    @click="onClickBtn"
    :class="{
          'ui-btn-tile':tile,
          'ui-btn-rounded':rounded,
          'ui-btn-circle':circle,

          'ui-btn-large':large,
          'ui-btn-xlarge':xlarge,
          'ui-btn-small':small,
          'ui-btn-xsmall':xsmall,

          'ui-btn-disabled':disabled,
          }"
    :style="`
          --color-tint:${TintColor}
    `"
  >
    <!-- 

    -->
    <!-- 动态绑定class，这个对象如果是true则添加这个类，反之则反 -->
    <slot>Button</slot>
    <!-- 为了灵活更换这里的内容，用插槽改变文本 -->
    <!-- 默认值为Button，如果home中定义内容，则以home为主 -->
  </button>
</template>


<script lang="ts">
//Emit ---导入包中的一个函数装饰器
//Prop ---导入包中的一个熟悉装饰器
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

@Component
export default class UIButton extends Vue {
  //a、如果home中引用这个组件，使用了large，那么它就是true反之则反
  @Prop(Boolean) private large: boolean | undefined;
  @Prop(Boolean) private xlarge: boolean | undefined;
  @Prop(Boolean) private small: boolean | undefined;
  @Prop(Boolean) private xsmall: boolean | undefined;

  // 按钮的圆角
  @Prop(Boolean) private tile: boolean | undefined;
  @Prop(Boolean) private rounded: boolean | undefined;
  @Prop(Boolean) private circle: boolean | undefined;

  // 按钮禁用属性
  @Prop(Boolean) private disabled: boolean | undefined;

  // 按钮颜色
  @Prop(String) private color: string | undefined;


  // 3、在UIButton内部调用emitClickEvent函数，就会向外界发送click事件
  @Emit("click") private emitClickEvent(event: MouseEvent) {
    //4、声名发送的参数
    //5、这样在外界（home.vue）中就可以处理这些参数了
  }
  //计算属性
  private get TintColor(){
    return   this.color?this.color:'#2D8CF0'
  }
  private onClickBtn(event: MouseEvent) {
    //1、点击页面中button触发下方这个事件，这个事件又会向外界发送click事件
    this.emitClickEvent(event);
    //2.把当前的点击事件传递过去
  }
  private mounted() {
    console.log(this.large);
  }
}
</script>

// 为了避免大量重复样式的编写，引入样式函数写法resize()作用如下
//    .ui-btn-xlarge
//     min-width 92px
//     height 52px
//     padding 0 23px
//     font-size 1rem
// &为副选择器，ui-btn为公共样式 
<style lang="stylus" scope>
resize(minWidth, height, padding, fontSizem) {
  min-width: minWidth;
  height: height;
  padding: 0 padding;
  font-size: fontSize;

  &.ui-btn-rounded, &.ui-btn-circle {
    border-radius: (@height / 2);
  }

  &.ui-btn-circle {
    width: @height;
    min-width: 0;
    pading: 0;
  }
}

.ui-btn {
  resize(64px, 36px, 16px, 0.875rem);
  border: 0 solid black;
  border-radius: 4px;
  color: pink;
  background-color: var(--color-tint);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  letter-spacing: 0.09em;
  outline: none;
//   提升亮度
  &:hover{
      filter  brightness(120%)
  }

  &.ui-btn-xsmall {
    resize(36px, 20px, 9px, 0.625rem);
  }

  &.ui-btn-small {
    resize(50px, 28px, 12px, 0.75rem);
  }

  &.ui-btn-large {
    resize(78px, 44px, 19px, 0.875rem);
  }

  &.ui-btn-xlarge {
    resize(92px, 52px, 23px, 0.1rem);
  }

  &.ui-btn-tile {
    border-radius: 0;
  }

  &.ui-btn-disabled {
    background-color: gray;
    color: #C5C8CE;
    cursor: not-allowed;
  }
}
</style>
