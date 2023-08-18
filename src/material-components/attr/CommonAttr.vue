<template>
  <div>
    <n-collapse
      accordion
      :expanded-names="expandName"
      @update:expanded-names="handleChangeExpandName"
    >
      <n-collapse-item title="通用样式" name="commonStyle">
        <n-form>
          <n-form-item
            v-for="({ label, key, type }, index) in formRenderList"
            :key="index"
            :label="label"
          >
            <template v-if="currentComponent !== null">
              <n-color-picker
                v-if="type === 'color-picker'"
                v-model:value="currentComponent.style[key]"
                :actions="['confirm', 'clear']"
              ></n-color-picker>
              <n-input-number
                v-if="type === 'input-number'"
                v-model:value="currentComponent.style[key]"
                v-bind="otherProps(key)"
              ></n-input-number>
              <n-input
                v-if="type === 'input'"
                v-model:value="currentComponent.style[key]"
              ></n-input>
              <n-select
                v-if="type === 'select'"
                v-model:value="currentComponent.style[key]"
                :options="optionMap[key as keyof typeof optionMap]"
              ></n-select>
            </template>
          </n-form-item>
        </n-form>
      </n-collapse-item>
      <n-collapse-item title="静态类型" name="2">
        <div>Java</div>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "@/store/editor";
import { storeToRefs } from "pinia";
import { styleData, optionMap, formExtraProps } from "@/utils/attr";

const editorStore = useEditorStore();
const { componentData, currentComponent } = storeToRefs(editorStore);

//  手风琴展开
const expandName = ref("commonStyle");

const handleChangeExpandName = (expandNames: string[]) => {
  if (expandNames.length > 0) {
    expandName.value = expandNames[0];
  } else {
    expandName.value = "";
  }
};

//  初始化表单
const formRenderList = computed(() => {
  if (currentComponent.value) {
    const styleKeys = Object.keys(currentComponent.value.style);
    return styleData.filter(item => styleKeys.includes(item.key));
  }

  return [];
});

//  一些其他的限制属性
const otherProps = (key: string) => {
  //  @ts-ignore
  return formExtraProps[key] || {};
};
</script>

<style scoped lang="scss">
.n-collapse {
  padding: 0 16px;
}
.n-input-number {
  width: 100%;
}
</style>
