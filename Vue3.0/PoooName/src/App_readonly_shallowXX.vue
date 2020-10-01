<template>
  <div>
    <button @click="myFun" ref="btn">clickMe</button>
  </div>
</template>

<script>

function shallowReadonly(obj) {
  return new Proxy(obj, {
    get(obj, key) {
      return obj[key];
    },
    set(obj, key, value) {
      // obj[key] = value;
      console.error(`${key}为只读，不可修改-`);
      return true;
    },
  });
}
let parse = {
  type: "fruit",
  suchAS: {
    name: "cucumber",
  },
};
let fakeShowRe=shallowReadonly(parse);
fakeShowRe.type='HAHA';// 此时修改不会生效
fakeShowRe.suchAS.name='HAHA';// 非首层修改会生效
//----readonly 的实现
function readonly(obj) {
  return new Proxy(obj, {
    get(obj, key) {
      return obj[key];
    },
    set(obj, key, value) {
      // obj[key] = value;
      console.error(`${key}为只读，不可修改-`);
    },
  });
}
let fakeReadonly=readonly(parse);
fakeShowRe.type='HAHA';// 此时修改不会生效
fakeShowRe.suchAS.name='HAHA';// 此时修改也不会生效
console.log(parse);
</script>

