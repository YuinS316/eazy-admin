<script setup lang="ts">
import { Chart } from "@antv/g2";
import { ChartCfg } from "@antv/g2/lib/interface";
const title = ref("图表组件，采用antv/g2");

function useChart(config: ChartCfg) {
  const data = ref<any[]>([]);

  const chartRef = ref<Chart>();

  onMounted(() => {
    chartRef.value = new Chart({
      ...config
    });

    chartRef.value.data(data.value);

    // Step 3: 创建图形语法，绘制柱状图
    chartRef.value.interval().position("genre*sold");

    chartRef.value.render();
  });

  type UpdateDataFn = (chart: typeof chartRef, newData: typeof data) => void;

  function updateData(fn?: UpdateDataFn) {
    if (!fn) {
      chartRef.value?.changeData(data.value);
    } else {
      fn(chartRef, data);
    }
  }

  return {
    data,
    chartRef,
    updateData
  };
}

const { chartRef, data, updateData } = useChart({
  container: "chart",
  width: 600,
  height: 300,
  autoFit: true,
  padding: [20, 20, 95, 80]
});

data.value = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 115 },
  { genre: "Action", sold: 120 },
  { genre: "Shooter", sold: 350 },
  { genre: "Other", sold: 150 }
];

onMounted(() => {
  setTimeout(() => {
    data.value.push({
      genre: "Other1",
      sold: 120
    });
    updateData();
  }, 3000);
});
</script>

<template>
  <div>
    <n-card :title="title" size="small" hoverable segmented>
      <a
        href="https://g2.antv.vision/zh/docs/api/general/chart"
        target="_blank"
      >
        antv/g2 官网
      </a>
      <p>推荐的理由：配置起来比较简单</p>
      <div id="chart"></div>
    </n-card>
  </div>
</template>

<style scoped></style>
