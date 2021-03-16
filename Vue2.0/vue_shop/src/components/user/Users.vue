<!-- 用户列表 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索用户功能 -->
      <el-row :gutter="30">
        <el-col :span="8">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表数据 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index" label=""></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态"
          >1111
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"> </el-switch>
          </template>
          <!-- <slotBtn :str="userList">
            <slot>
            </slot>
          </slotBtn> -->
        </el-table-column>
        <el-table-column prop="" label="操作" width="190">
          <template slot-scope="">
            <el-tooltip class="item" :enterable='false' effect="dark" content="修改" placement="top-start">
                <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip class="item" :enterable='false' effect="dark" content="删除" placement="top-start">
                <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
            </el-tooltip>
            <el-tooltip class="item" :enterable='false' effect="dark" content="分配角色" placement="top-start">
                  <el-button size="mini" hover='设置' type="warning" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="quertInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="quertInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
//-switch插槽，暂未使用
import slotBtn from "@/components/slot/switch_slot.vue";
export default {
  name: "users",
  data() {
    return {
      userList: [],
      quertInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      total: 10,
    };
  },
  components: {
    slotBtn,
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.quertInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.errto("获取用户列表数据失败");
      }
      // 用户数据和总数
      this.userList = res.data.users;
      this.total = res.data.total;
    },
    // 监听页数变化
    handleSizeChange(newSize){
      console.log(newSize);
    },
    // 监听页码变化
    handleCurrentChange(newPage){
      console.log('---');
      console.log(newPage);
    }
  },
  created() {
    this.getUserList();
  },
};
</script>
<style lang='less' scoped>
</style>