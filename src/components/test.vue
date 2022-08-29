<template>
  <div>
    <div>{{count}}</div>
    <n-button @click="hanldeClick">按钮</n-button>
  </div>
</template>

<script setup lang="ts">
let count = ref<number>(0);

const hanldeClick = () => {
  count.value++;
}

</script>

<style scoped>

</style>