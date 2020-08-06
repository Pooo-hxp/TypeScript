<template>
    <div>
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

</style>