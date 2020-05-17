<template>
  <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
    <FormItem
      v-for="(item, index) in formDynamic.items"
      v-if="item.status"
      :key="index"
      :label="'缺陷 ' + item.index"
      :prop="'items.' + index + '.value'"
      :rules="{required: true, message: '问题 ' + item.index +' 问题描述不可为空', trigger: 'blur'}"
    >
      <Row>
        <Col span="18">
          <Input type="text" v-model="item.value" placeholder="请输入问题..."></Input>
        </Col>
        <Col span="4" offset="1">
          <Button @click="handleRemove(index)">删除</Button>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Row>
        <Col span="12">
          <Button type="dashed" long @click="handleAdd" icon="md-add">再加一条</Button>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formDynamic')">提交</Button>
      <Button @click="handleReset('formDynamic')" style="margin-left: 8px">再想想</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      index: 1,
      formDynamic: {
        items: [
          {
            value: "",
            index: 1,
            status: 1
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleAdd() {
      this.index++;
      this.formDynamic.items.push({
        value: "",
        index: this.index,
        status: 1
      });
    },
    handleRemove(index) {
      this.formDynamic.items[index].status = 0;
    }
  }
};
</script>
