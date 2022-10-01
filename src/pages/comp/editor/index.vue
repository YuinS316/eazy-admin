<script setup lang="ts">
const text = ref("### hello md editor!");
</script>

<template>
  <div>
    <v-md-editor v-model="text" height="400px"></v-md-editor>
  </div>
</template>

<style scoped></style>
