
<template>
  <div class="layout" id="home">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <Input
            class="seat"
            v-model="number"
            icon="ios-clock-outline"
            placeholder="学号后两位..."
            style="width: 200px;float:left"
          />
          <Button type="success" class="sele" @click="sele">检索</Button>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              <Tooltip content="邮件可能回复不及时，请谅解">
                <a href="mailto:hengxipeng@163.com">联系我</a>
              </Tooltip>
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-paper"></Icon>
              <a @click="showTable = true">发现Bug</a>
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
            <img :src="imgUrl" alt srcset />
          </div>
          <div>
            <Page
              :total="56"
              show-total
              :page-size="1"
              :current="defaultIndex"
              @on-change="change"
            />
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2016-2020 &copy; 土豆哥</Footer>
    </Layout>
    <Modal v-model="showTable" title="请描述您遭遇到的问题" footer-hide>
      <queTable @getStatus="getChild"></queTable>
    </Modal>
  </div>
</template>
<script>
import queTable from "./question";
export default {
  name: "home",
  components: {
    queTable
  },
  data() {
    return {
      number: "",
      defaultIndex: 1,
      showTable: false,
      imgUrl:'./static/39.jpg'
    };
  },
  mounted: {},
  methods: {
    getChild(res) {
      // 接收子组件传递状态
      this.showTable = Boolean(res);
    },
    sele() {
      // 检测输入是否合法
      let flag = parseInt(this.number);
      if (flag > 0 && flag <= 56 && !isNaN(this.number)) {
        this.defaultIndex = flag;
      this.$Message.success('搜寻成功，已切换')
      this.imgUrl=`./static/class/${flag}.jpg`;
      console.log(this.imgUrl);
        this.number = "";
      } else {
      this.$Message.error('当前输入不合法，已为您清除')
         this.number = "";
         }  
    },
    // 根据页码展示照片
    change(e){
      this.imgUrl=`./static/class/${e}.jpg`;

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

