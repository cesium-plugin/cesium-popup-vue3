<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

onMounted(() => {

})
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
