<template>
  <div ref="main" id="main" style="width: 600px;height:400px;"></div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted() {
    let myChart = echarts.init(this.$refs.main);
    let option = {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量", "价格"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
        {
          name: "价格",
          type: "bar",
          data: [44, 70, 28, 88, 53, 76],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>

<style lang="less" scoped>
</style>