<script setup lang="ts">
import {
  useDialog,
  useLoadingBar,
  useMessage,
  useNotification
} from "naive-ui";

const loadingBar = useLoadingBar();
const message = useMessage();
const notifiication = useNotification();
const dialog = useDialog();

window.$message = message;
window.$notification = notifiication;
window.$loadingBar = loadingBar;
window.$dialog = dialog;
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
