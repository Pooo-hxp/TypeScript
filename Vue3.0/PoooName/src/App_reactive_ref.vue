<template>
  <div>
    <button @click="myFun" ref="btn">clickMe</button>
  </div>
</template>

<script>
function reactive(obj) {
  if (typeof obj === "object") {
    if (obj instanceof Array) {
      //当前参数为数组类型，则循环取出每一项
      obj.forEach((item, index) => {
        if (typeof item === "object") {
          //分析数组每一项，是对象则递归
          obj[index] = reactive(item);
        }
      });
    } else {
      // 当前参数是对象且不是数组，则取属性值并进行分析是否是多层对象
      for (let key in obj) {
        if (typeof obj[key] === "object") {
          obj[key] = reactive(item);
        }
      }
    }
  } else {
    console.log("当前传入为非对象参数");
  }
  //-正常情况下就进行 Proxy对象包装
  return new Proxy(obj, {
    get(obj, key) {
      return obj[key];
    },
    set(obj, key, value) {
      obj[key] = value;
      console.log("更新");
      return true;
    },
  });
}
</script>

