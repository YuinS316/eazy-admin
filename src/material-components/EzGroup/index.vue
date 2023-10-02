<template>
  <div class="ez-group">
    <component
      v-for="item in propValue"
      :is="item.component"
      :key="item.id"
      :id="'component_' + item.id"
      class="ez-component"
      :prop-value="item.propValue"
      :style="item.groupStyle"
    ></component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { ComponentData } from "@/types/typing";

export default defineComponent({
  // name: "EzGroup",
  props: {
    propValue: {
      type: Array as PropType<ComponentData[]>,
      value: []
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.ez-group {
  position: relative;

  width: 100%;
  height: 100%;

  .ez-component {
    position: absolute;
  }
}
</style>
