<script setup lang="ts">
import { isEmptyAfterTrim } from "@/shared/validate";
import { FormRules, FormItemRule } from "naive-ui";
import SvgIcon from "@/components/SvgIcon/index.vue";

const formRef = ref(null);
const formValue = ref({
  account: "",
  password: ""
});
const rules: FormRules = {
  account: {
    required: true,
    trigger: "blur",
    validator: (rule: FormItemRule, value: string) => {
      if (isEmptyAfterTrim(value)) {
        return new Error("请输入账号");
      }
      return true;
    }
  },
  password: {
    required: true,
    trigger: "blur",
    validator: (rule: FormItemRule, value: string) => {
      if (isEmptyAfterTrim(value)) {
        return new Error("请输入密码");
      }
      return true;
    }
  }
};
</script>

<template>
  <div class="bg px-36px py-16px">
    <div class="col-span-2">
      <h1 class="text-white">Eazy Admin</h1>
    </div>

    <div class="self-center">
      <SvgIcon name="BrainStorm" class="!w-400px h-250px" />
      <div class="text-white text-2xl mt-16px ml-8px">
        简易的开箱即用的中后台管理系统
      </div>
    </div>

    <div class="bg-box">
      <div class="font-semibold text-24px mb-16px text-white">登录</div>
      <n-form
        ref="formRef"
        :model="formValue"
        :show-label="false"
        :rules="rules"
      >
        <n-form-item label="账号" path="account">
          <n-input v-model:value="formValue.account" placeholder="请输入账号" />
        </n-form-item>

        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="formValue.password"
            placeholder="请输入密码"
          />
        </n-form-item>
      </n-form>

      <div class="flex justify-end mb-12px">
        还没有账号？ <span class="text-primary cursor-pointer">去注册</span>
      </div>

      <n-button class="w-full" type="primary">登录</n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  @apply fixed w-full h-full;
  @apply grid grid-rows-[80px_1fr_80px] grid-cols-2;
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);

  .bg-box {
    @apply rounded-8px p-16px w-full max-w-400px bg-[rgba(255,255,255,0.2)] backdrop-blur-8px shadow;
    @apply self-center justify-self-center;
  }
}
</style>
