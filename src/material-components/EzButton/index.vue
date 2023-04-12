<template>
  <div>
    <button>{{ propValue }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // name: "EzButton",
  props: {
    propValue: {
      type: String,
      value: ""
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
