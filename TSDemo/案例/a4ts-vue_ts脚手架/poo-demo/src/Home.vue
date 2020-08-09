<template>
    <div class="root-home">
        <!-- 这里如果在UIButton中填写内容，那么就会覆盖子组件中的默认值 -->
        <UIButton @click="onClick"></UIButton>
    </div>
</template>


<script lang="ts">
import{Component,Vue}from 'vue-property-decorator';
import UIButton from '@/components/UIKit/UIButton.vue'
@Component({
    components:{
        UIButton,
    }
})
export default class Home extends Vue{
    //private 定义私有方法
    private onClick(event:MouseEvent){
        //拿到UIButton传递过来的参数
        console.log(event);
    }

}
</script>


<style lang="stylus" scope>
.root-home
   width 480px
   height 160px
   display flex
   justify-content center
   align-items center
</style>