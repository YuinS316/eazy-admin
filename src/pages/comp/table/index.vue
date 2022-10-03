<script setup lang="ts">
import { getTable } from "@/api/mock/table";
import { VxeGridProps } from "vxe-table";

type GridData = {
  name: string;
  sex: string;
  address: string;
};

const title = ref("表格组件，采用开源的vxe-table");

const gridOptions = reactive<VxeGridProps<GridData>>({
  loading: false,
  height: 300,
  columns: [
    { type: "seq", width: 50 },
    {
      field: "name",
      title: "名字",
      showOverflow: true
    },
    {
      field: "sex",
      title: "性别",
      slots: { default: "sex" }
    },
    {
      field: "address",
      title: "地址"
    }
  ],
  data: []
});

async function fetchData() {
  try {
    gridOptions.loading = true;
    const res = await getTable();
    setTimeout(() => {
      gridOptions.data = res.data;
      gridOptions.loading = false;
    }, 3000);
  } catch (error) {
    console.log("error--", error);
    gridOptions.loading = false;
  } finally {
  }
}

onMounted(async () => {
  fetchData();
});
</script>

<template>
  <div>
    <n-card :title="title" size="small" hoverable segmented>
      <a href="https://vxetable.cn/v4/#/table/grid/basic" target="_blank">
        vxe-table 官网
      </a>
      <p>
        推荐的理由： vxe-grid
        组件可以通过配置的形式来编写table，并提供了具名插槽
        供你做自定义。另外通过配置还可以开启单元格编辑，合并单元格，对行/列等样式做修改，十分的方便。
      </p>
      <vxe-grid v-bind="gridOptions">
        <template #sex="{ row }">
          <div>这是插槽 --- {{ row.sex }}</div>
        </template>
      </vxe-grid>
    </n-card>
  </div>
</template>

<style scoped></style>
