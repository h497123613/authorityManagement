<template>
  <div>
    <PublicCard title="今日订单" :count="orderToday | numberFormat">
      <template #main>
        <div class="main" ref="main"></div>
      </template>
      <template #bottom>
        <span class="leftText">昨日订单量</span>
        <span>{{ orderLastDay }}</span>
      </template>
    </PublicCard>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {throttle,debounce} from "lodash"
export default {
  name: "TodayOrder",
  computed: {
    ...mapState({
      orderToday: (state) => state.echarts.echartsData.orderToday,
      orderLastDay: (state) => state.echarts.echartsData.orderLastDay,
      orderTrend: (state) => state.echarts.echartsData.orderTrend,
      orderTrendAxis: (state) => state.echarts.echartsData.orderTrendAxis,
    }),
  },
  mounted() {
    //第一步:准备带宽高的容器
    //第二步:初始化一个echarts实例
    //第三部:通过charts实例调用setOption方法,传入配置对象
    this.chart = this.$echarts.init(this.$refs.main);
    this.chart.setOption(this.getOptions());

    //对浏览器窗口添加改变大小的事件监听
    window.addEventListener("resize",throttle(()=>{
      this.chart.resize()
    },100))
  },
  methods: {
    getOptions() {
      return {
        //标题
        // title: {
        //   //标题的文本
        //   text: "Thanks♪(･ω･)ﾉ",
        // },
        //网格,控制整个图表在容器中的大小
        //图表距离容器上下左右的边距
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        //x轴
        xAxis: {
          data: this.orderTrendAxis || [],
          show: false//隐藏坐标轴
        },
        //y轴
        yAxis: {
          show:false
        },
        //提示
        tooltip:{
          trigger: 'axis'
        },
        //系列(图的线line、柱状bar、饼pie)
        series: {
          type: "line",//图的类型
          data: this.orderTrend,//数据
          smooth:true,//线是否平滑
          areaStyle:{
            color:"hotpink"//区域颜色
          },
          lineStyle:{
            opacity: 0//去掉线
          },
          itemStyle:{
            opacity: 0//去掉折点,item项
          }
        }
      };
    },
  },
  watch:{
    orderToday:{
      handler(newVal,oldVal){
        this.chart.setOption(this.getOptions());
      },
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 50px;
}
</style>