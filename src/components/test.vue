<template>
  <div>
    <div>{{count}}</div>
    <n-button @click="hanldeClick">按钮</n-button>

    <div>{{props.arr}}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  arr: {
    type: Array<string>,
    default: ["aaa"]
  }
})

let count = ref<number>(0);

const hanldeClick = () => {
  count.value++;
}

</script>

<style scoped>

</style>