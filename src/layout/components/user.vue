<script setup lang="ts">
import { renderIcon } from "@/shared";
import { DropdownOption } from "naive-ui";
import {
  PersonRound,
  KeyboardArrowDownRound,
  LockRound,
  LogOutRound,
  HouseRound
} from "@vicons/material";

const options: DropdownOption[] = [
  {
    label: "个人中心",
    key: "userCenter",
    icon: renderIcon(HouseRound)
  },
  {
    label: "修改密码",
    key: "changePassword",
    icon: renderIcon(LockRound)
  },
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon(LogOutRound)
  }
];
</script>

<template>
  <n-dropdown trigger="hover" placement="bottom-end" :options="options">
    <div class="flex items-center ml-24px">
      <div
        class="rounded-[50%] border border-[#fff] w-24px h-24px flex items-center justify-center"
      >
        <n-icon size="16" color="white">
          <PersonRound />
        </n-icon>
      </div>

      <div class="w-20px h-20px ml-8px flex items-center justify-center">
        <n-icon size="20" color="white">
          <KeyboardArrowDownRound />
        </n-icon>
      </div>
    </div>
  </n-dropdown>
</template>

<style scoped lang="scss"></style>
