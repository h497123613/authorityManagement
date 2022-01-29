<template>
  <div>
    <PublicCard title="交易用户数" :count="orderUser | numberFormat">
      <template #main>
        <v-chart autoresize :options="getOptions()"></v-chart>
      </template>
      <template #bottom>
        <span class="leftText">退货率</span>
        <span>{{returnRate}}%</span>
      </template>
    </PublicCard>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:"TradeUser",
  computed:{
    ...mapState({
      orderUser:state => state.echarts.echartsData.orderUser,
      returnRate:state => state.echarts.echartsData.returnRate,
      orderUserTrend:state => state.echarts.echartsData.orderUserTrend,
      orderUserTrendAxis:state => state.echarts.echartsData.orderUserTrendAxis
    })
  },
  methods:{
    getOptions(){
      return {
        title:{},
        grid:{
          left:0,
          right:0,
          bottom:0,
          top:0
        },
        xAxis:{
          data: this.orderUserTrendAxis || [],
          show: false
        },
        yAxis:{
          show: false
        },
        tooltip:{
          trigger: "axis"
        },
        series:{
          type:'bar',
          data: this.orderUserTrend || [],
          barWidth: "50%",
          // itemStyle:{
          //   color: "green"
          // }
        },
        color:"green"
      }
    }
  }
}
</script>

<style>

</style>