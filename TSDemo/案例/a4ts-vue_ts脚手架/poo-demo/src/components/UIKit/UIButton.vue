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
    @Emit('click') private emitClickEvent(){

    }
    // //二者效果相同
    private onClickBtn(){
        this.emitClickEvent()
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