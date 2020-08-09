<template>
<!-- 使用v-on="$listeners" 监听事件也可以 -->
    <button class="ui-btn" @click="onClickBtn">
        Button
    </button>
</template>


<script lang="ts">
//Emit ---导入包中的一个装饰器
import{Component,Vue ,Emit}from 'vue-property-decorator';

@Component
export default class UIButton extends Vue{
    // 3、在UIButton内部调用emitClickEvent函数，就会向外界发送click事件
    @Emit('click') private emitClickEvent(event:MouseEvent){
        //4、声名发送的参数
        //5、这样在外界（home.vue）中就可以处理这些参数了
    }
    private onClickBtn(event:MouseEvent){
        //1、点击页面中button触发下方这个事件，这个事件又会向外界发送click事件
        this.emitClickEvent(event)
        //2.把当前的点击事件传递过去
    }
}
</script>


<style lang="stylus" scope>
.ui-btn
    min-width 64px
    height 36px
    padding 0 16px
    border 0 solid black
    border-radius 4px
    color pink 
    background-color #2D8CF0
    font-size 0.875rem
    font-weight 500
    cursor pointer
    user-select none
    letter-spacing 0.09em // 字符间距
    outline none
</style>