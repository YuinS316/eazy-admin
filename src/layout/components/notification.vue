<script setup lang="ts">
import { NotificationsNoneRound } from "@vicons/material";

enum NotificationStatus {
  UN_READ = 0,
  READ = 1
}

type NotificationType = {
  id: string | number;
  title: string;
  content: string;
  createdOn: string;
  createdBy: string;
  //  0: 未读, 1: 已读
  status: NotificationStatus;
};

const notifications: NotificationType[] = [
  {
    id: "0",
    title: "登录成功",
    content: "检测到您在中国地区登录",
    createdOn: "2022-09-13 20:22:41",
    createdBy: "系统",
    status: NotificationStatus.UN_READ
  },
  {
    id: "1",
    title: "测试信息",
    content:
      "这是一条很长很长这是一条很长很长这是一条很长很长这是一条很长很长这是一条很长很长这是一条很长很长这是一条很长很长的信息",
    createdOn: "2022-09-13 20:22:41",
    createdBy: "系统",
    status: NotificationStatus.READ
  }
];

const notificationUnReadLen = computed(
  () =>
    notifications.filter(i => i.status === NotificationStatus.UN_READ).length
);
</script>

<template>
  <n-popover style="width: 286px" :show-arrow="false">
    <template #trigger>
      <div class="flex items-center cursor-pointer">
        <div class="w-28px h-28px flex items-center justify-center">
          <n-icon size="20" color="white">
            <NotificationsNoneRound />
          </n-icon>
        </div>
        <n-badge :value="notificationUnReadLen" :max="99" :dot="true">
          <div class="text-white text-12px">消息</div>
        </n-badge>
      </div>
    </template>
    <div>
      <div
        class="text-14px font-semibold border-b border-b-[#e8e8e8] pb-8px px-8px"
      >
        消息通知
      </div>
      <div>
        <div
          v-for="(item, index) in notifications"
          :key="item.id"
          :class="[
            'cursor-pointer px-8px',
            'hover:bg-[#f7f7f7]',
            item.status === NotificationStatus.READ
              ? 'text-[rgba(1,5,23,.25)]'
              : '',
            index !== notifications.length - 1
              ? 'border-b border-b-[#f7f7f7] py-8px'
              : 'pt-8px'
          ]"
        >
          <div class="flex items-center justify-between">
            <div class="text-12px font-semibold">
              [{{ item.createdBy }}] {{ item.title }}
            </div>
            <div class="text-12px">{{ item.createdOn }}</div>
          </div>

          <div class="line-clamp-2 text-12px">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </n-popover>
</template>

<style scoped></style>
