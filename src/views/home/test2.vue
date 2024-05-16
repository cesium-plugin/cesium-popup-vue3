<template>
  <div class="test">
    <div>
      我是测试弹窗vue3
    </div>
    <div>
      这里写入弹窗内容:id={{ props.id }}
    </div>

    <div @click="click">
      关闭
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['id', 'close'])
function click() {
  if (props.close)
    props.close()
}
</script>

<style lang="scss">
.test {
  position: relative;
  width: 100%;
  height: 100%;
  color: rgb(156 7 7 / 74%);
  background-color: #fff;
}

.test::after {
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -10px;
  border: solid transparent;
  border-width: 10px;
  border-top-color: #fff;
  width: 0;
  height: 0;
  content: " ";
}
</style>
