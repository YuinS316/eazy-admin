<template>
  <div
    class="history-list"
    :class="{ 'history-list__empty': !renderSnapShotList.length }"
  >
    <div
      v-for="(item, index) in renderSnapShotList"
      :key="item.timestamp"
      class="history-list-item"
      :class="{ 'history-list-item__active': renderSnapshotIndex === index }"
      @click="setRenderSnapShotIndex(index)"
    >
      {{ item.title }}
    </div>
    <div v-show="!renderSnapShotList.length">暂无历史数据</div>
  </div>
</template>

<script setup lang="ts">
import { useSnapshotStore } from "@/store/snapshot";
import { storeToRefs } from "pinia";
import day from "dayjs";

const snapshotStore = useSnapshotStore();
const { snapshotData, snapshotIndex } = storeToRefs(snapshotStore);
const { actionToTitleMap, timeTravel } = snapshotStore;

const renderSnapShotList = computed(() =>
  snapshotData.value
    .map(item => ({
      title: actionToTitleMap[item.type],
      timestamp: day(item.timestamp).format("YYYY-MM-DD HH:mm:ss")
    }))
    .toReversed()
);

const renderSnapshotIndex = computed(
  () => snapshotData.value.length - 1 - snapshotIndex.value
);

function setRenderSnapShotIndex(value: number) {
  const index = snapshotData.value.length - 1 - value;

  timeTravel(index);
}
</script>

<style scoped lang="scss">
.history-list {
  padding: 8px;
  .history-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    margin: 4px;
    cursor: pointer;

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
        border-radius: 4px;
      }
    }
  }

  &__empty {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--font-sub-color);
  }
}
</style>
