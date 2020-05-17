
<template>
  <div class="layout" id="home">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <Input
            class="seat"
            v-model="number"
            icon="ios-clock-outline"
            placeholder="完整学号..."
            style="width: 200px;float:left"
          />
          <Button type="success" class="sele" @click="test">检索</Button>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              <Tooltip content="邮件可能回复不及时，请谅解">
                <a href="mailto:hengxipeng@163.com">联系我</a>
              </Tooltip>
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-paper"></Icon>
              <a @click="modal1 = true">有Bug？</a>
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-keypad"></Icon>
              <a href="https://github.com/Pooo-hxp/Graduate" target="_BLANK">源码</a>
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-analytics"></Icon>功能
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>郑州商学院</BreadcrumbItem>
          <BreadcrumbItem>信息与机电工程学院</BreadcrumbItem>
          <BreadcrumbItem>16计科二班</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div style="min-height: 200px">
            <img src="@/assets/hxp.jpg" alt srcset />
          </div>
          <div>
            <Page :total="56" show-total :page-size="1" />
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2016-2020 &copy; 土豆哥</Footer>
    </Layout>
    <Modal v-model="modal1" title="请输入您所遭遇到的问题" @on-ok="ok" @on-cancel="cancel" footer-hide>
      <tan></tan>
    </Modal>
  </div>
</template>
<script>
import tan from "./question";
export default {
  name: "home",
  components: {
    tan
  },
  data() {
    return {
      number: "",
      modal1: false
    };
  },
  methods: {
    ok() {
      this.$Message.info("问题提交成功");
    },
    cancel() {
      this.$Message.info("已取消，填写未保留");
    },
    test() {
      // 冒泡排序
      var me = [];
      for (var p = 0; p < 5; p++) {
        var meu = parseInt(prompt("輸入"));
        me.push(meu);
      }
      for (let i = 0; i < me.length - 1; i++) {
        //控制比较的次数
        for (var j = 0; j < me.length - 1 - i; j++) {
          if (me[j] > me[j + 1]) {
            [me[j], me[j + 1]] = [me[j + 1], me[j]];
          }
        }
      }
      console.log("排序后", me);
    }
  }
};
</script>
<style scoped>
img {
  width: 955px;
  height: 660px;
}
* {
  padding: 0;
  margin: 0;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  height: 900px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
  height: 100%;
}
.ivu-card {
  height: 730px;
}
/*  */
.seat {
  float: left;
  padding: 15px 0;
  margin-left: 40px;
  position: relative;
  cursor: pointer;
  z-index: 3;
  transition: all 0.2s ease-in-out;
}
.sele {
  float: left;
  margin-top: 15px;
  margin-left: 15px;
  font-weight: 400;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 5px 30px 6px;
  font-size: 12px;
  border-radius: 4px;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear, box-shadow 0.2s linear;
  color: #515a6e;
  color: #fff;
  background-color: #19be6b;
  border-color: #19be6b;
}
</style>

