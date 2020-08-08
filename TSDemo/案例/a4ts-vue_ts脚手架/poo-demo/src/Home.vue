<template>
    <div class="root-home">
        <UIButton></UIButton>
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