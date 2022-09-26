<script setup lang="ts">
import draggable from "vuedraggable";
const list = ref([
  {
    id: 0,
    title: "html"
  },
  {
    id: 1,
    title: "css"
  },
  {
    id: 2,
    title: "js"
  },
  {
    id: 3,
    title: "vue"
  }
]);

const dragOptions = computed(() => ({
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "ghost"
}));

const title = ref("拖拽组件，采用vue-draggable");
</script>

<template>
  <div>
    <n-card :title="title" size="small" hoverable segmented>
      <draggable v-model="list" v-bind="dragOptions" class="" item-key="title">
        <template #item="{ element }">
          <div class="cursor-move border border-[#e0e0e0] px-4px py-6px">
            {{ element.title }}
          </div>
        </template>
      </draggable>
    </n-card>
  </div>
</template>

<style scoped></style>
