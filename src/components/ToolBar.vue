<template>
  <div class="toolbar">
    <div>
      <n-button> {{ "<" }} </n-button>
      <n-button> {{ ">" }} </n-button>
      <n-button> 清空</n-button>
      <n-button> 预览 </n-button>
      <n-button> 保存 </n-button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$border-color: rgb(239, 239, 245);
.toolbar {
  height: 48px;
  display: flex;
  align-items: center;
  // justify-content: center;

  padding: 0 16px;
  border-bottom: 1px solid $border-color;
}
</style>