<template>
  <div class="leftContainer">
    <v-chart :options="getOptions()" autoresize></v-chart>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LeftView",
  props: ["activeIndex"],
  methods: {
    getOptions() {
      let {
        activeIndex,
        orderFullYearAxis,
        userFullYearAxis,
        orderFullYear,
        userFullYear,
      } = this;
      return {
        title: {
          text: activeIndex === "1" ? "销售趋势" : "用户趋势",
          textStyle: {
            // color: "red",
            fontSize: 14,
          },
          left: "3%",
          top: "5%",
        },
        // grid: {
        //   left: 0,
        //   right: 0,
        //   top: 0,
        //   bottom: 0,
        // },
        xAxis: {
          data: activeIndex === "1" ? orderFullYearAxis : userFullYearAxis,
          axisTick: {
            alignWithLabel: true, //刻度线是否和label标题对齐,
            //刻度线是否和柱对齐
          },
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        tooltip: {},
        series: {
          name: activeIndex === "1" ? "销售额" : "用户量",
          type: "bar",
          barWidth: "40%",
          data: activeIndex === "1" ? orderFullYear : userFullYear,
        },
      };
    },
  },
  computed: {
    ...mapState({
      orderFullYearAxis: (state) => state.echarts.echartsData.orderFullYearAxis,
      orderFullYear: (state) => state.echarts.echartsData.orderFullYear,
      userFullYearAxis: (state) => state.echarts.echartsData.userFullYearAxis,
      userFullYear: (state) => state.echarts.echartsData.userFullYear,
    }),
  },
};
</script>

<style lang='scss' scoped>
.leftContainer {
  width: 100%;
  height: 350px;
}
</style>