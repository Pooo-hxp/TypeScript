<template>
  <div class="root-home">
    <div class="btn-container">
      <UIButton
        @click="onClick"
        :xsmall="xsmall"
        :small="small"
        :xlarge="xlarge"
        :large="large"
      >Hello</UIButton>
      <!-- 这里如果在UIButton中填写内容，那么就会覆盖子组件中的默认值 -->
    </div>
    <div class="btn-group">
      <UIButton class="btn" @click="resize('xsmall')">超小</UIButton>
      <UIButton class="btn" @click="resize('small')">小的</UIButton>
      <UIButton class="btn" @click="resize('normal')">正常</UIButton>
      <UIButton class="btn" @click="resize('large')">大的</UIButton>
      <UIButton class="btn" @click="resize('xlarge')">超大</UIButton>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UIButton from "@/components/UIKit/UIButton.vue";
@Component({
  components: {
    UIButton,
  },
})
export default class Home extends Vue {
  //private 定义私有方法或属性
  private xsmall: boolean = false;
  private small: boolean = false;
  private normal: boolean = false;
  private large: boolean = false;
  private xlarge: boolean = false;

  private resize(name: string) {
    console.log(name);
    switch (name) {
      case "xsmall":
        this.xsmall = true;
        this.small = false;
        this.large = false;
        this.xlarge = false;
        break;
      case "small":
        this.xsmall = false;
        this.small = true;
        this.large = false;
        this.xlarge = false;
        break;
      case "normal":
        this.xsmall = false;
        this.small = false;
        this.large = false;
        this.xlarge = false;
        break;
      case "large":
        this.xsmall = false;
        this.small = false;
        this.large = true;
        this.xlarge = false;
        break;
      case "xlarge":
        this.xsmall = false;
        this.small = false;
        this.large = false;
        this.xlarge = true;;
        break;
    }
  }
  private onClick(event: MouseEvent) {
    //拿到UIButton传递过来的参数
    console.log(event);
  }
}
</script>


<style lang="stylus" scope>
.root-home 
    width: 480px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;

.btn 
    margin: 6px;

</style>