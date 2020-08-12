<template>
  <div class="root-home">
    <div class="btn-container">
      <UIButton
        @click="onClick"
        :tile="tile"
        :rounded="rounded"
        :xsmall="xsmall"
        :small="small"
        :xlarge="xlarge"
        :large="large"
        :circle="circle"
        :disabled="disabled"
      >a</UIButton>
      <!-- 这里如果在UIButton中填写内容，那么就会覆盖子组件中的默认值 -->
    </div><br><br>
    <div class="btn-group">
      <UIButton class="btn" @click="changeDisabled()">禁用</UIButton>
    </div>
    <div class="btn-group">
      <UIButton class="btn" @click="changeRadius('tile')">矩形</UIButton>
      <UIButton class="btn" @click="changeRadius('normal')">正常</UIButton>
      <UIButton class="btn" @click="changeRadius('rounded')">半圆</UIButton>
      <UIButton class="btn" @click="changeRadius('circle')">圆形</UIButton>
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
  private tile: boolean = false;
  private rounded: boolean = false;
  private circle: boolean = false;

  private xsmall: boolean = false;
  private small: boolean = false;
  private normal: boolean = false;
  private large: boolean = false;
  private xlarge: boolean = false;

  private disabled: boolean = false;

  private changeDisabled(name: string) {
    this.disabled = !this.disabled;
  }

  private changeRadius(name: string) {
    switch (name) {
      case "tile":
        this.tile = true;
        this.rounded = false;
        this.circle = false;
        break;
      case "normal":
        this.tile = false;
        this.rounded = false;
        this.circle = false;
        break;
      case "rounded":
        this.rounded = true;
        this.tile = false;
        this.circle = false;
        break;
      case "circle":
        this.circle = true;
        this.tile = false;
        this.rounded = false;
        break;
    }
  }
  private resize(name: string) {
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
        this.xlarge = true;
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
.root-home {
  width: 480px;
  height: 160px;
}

.btn {
  margin: 16px;
}
</style>