<template>
  <div class="sidebar">
    <div class="sidebar-left">
      <div
        v-for="item in renderList"
        :key="item.id"
        class="item"
        :class="{ item__active: item.isActive }"
        @click="handleChangeActiveRenderItem(item)"
      >
        <n-icon size="24" :component="item.icon"> </n-icon>

        <div class="item-font">{{ item.title }}</div>
      </div>
    </div>

    <div class="sidebar-right">
      <component :is="renderComponent"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ListCircleOutline, TimeOutline } from "@vicons/ionicons5";
import { Raw } from "vue";
import ComponentList from "./ComponentList.vue";
import HistoryList from "./HistoryList.vue";

type IdType = "material" | "history";

type RenderItem = {
  icon: Raw<typeof ListCircleOutline>;
  title: string;
  id: IdType;
  isActive: boolean;
};

const renderList = ref<RenderItem[]>([
  {
    icon: markRaw(ListCircleOutline),
    title: "物料",
    id: "material",
    isActive: true
  },
  {
    icon: markRaw(TimeOutline),
    title: "历史",
    id: "history",
    isActive: false
  }
]);

const renderComponentMap = {
  material: markRaw(ComponentList),
  history: markRaw(HistoryList)
};

const activeId = computed(
  () => renderList.value.filter(item => item.isActive)[0].id
);
const renderComponent = computed(() => renderComponentMap[activeId.value]);

function handleChangeActiveRenderItem(target: RenderItem) {
  const res = renderList.value.find(item => item === target);

  if (res) {
    renderList.value.forEach(item => {
      item.isActive = false;
    });
    res.isActive = true;
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  height: 100%;
}
.sidebar-left {
  width: 64px;
  height: 100%;
  background: var(--grey-color);
  padding: 8px;

  .item {
    padding: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
    cursor: pointer;

    &-font {
      font-size: 14px;
      line-height: 1;
      margin-top: 6px;
    }

    &__active {
      color: var(--primary-color);
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #51d6a9;
        opacity: 0.1;
        border-radius: 8px;
      }
    }
  }
}
.sidebar-right {
  flex: 1;
}
</style>
