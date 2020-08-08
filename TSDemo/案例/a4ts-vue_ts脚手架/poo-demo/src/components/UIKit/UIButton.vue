<template>
    <button class="ui-btn">
        Button
    </button>
</template>


<script lang="ts">
import{Component,Vue}from 'vue-property-decorator';

@Component
export default class UIButton extends Vue{

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