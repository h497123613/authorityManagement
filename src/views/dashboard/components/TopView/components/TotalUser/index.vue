<template>
  <div>
    <PublicCard title="累计用户数" :count="usersTotal | numberFormat">
      <template #main>
        <v-chart autoresize :options="getOptions()"></v-chart>
      </template>
      <template #bottom>
        <div class="bottom">
          <div class="left">
            <span>日同比</span>
            <span class="count">{{ userGrowthLastDay }}%</span>
            <div class="down"></div>
          </div>
          <div class="right">
            <span>月同比</span>
            <span class="count">{{ userGrowthLastMonth }}%</span>
            <div class="up"></div>
          </div>
        </div>
      </template>
    </PublicCard>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TotalUser",
  computed: {
    ...mapState({
      usersTotal: (state) => state.echarts.echartsData.usersTotal,
      usersLastDay: (state) => state.echarts.echartsData.usersLastDay,
      usersLastMonth: (state) => state.echarts.echartsData.usersLastMonth,
      userGrowthLastDay: (state) => state.echarts.echartsData.userGrowthLastDay,
      userGrowthLastMonth: (state) =>
        state.echarts.echartsData.userGrowthLastMonth,
    }),
  },
  methods:{
    getOptions(){
      return {
        // title:{}
        grid:{
          left:0,
          right:0,
          top:0,
          bottom:0
        },
        xAxis:{
          type: "value",
          show: false,
          min: 0,
          max: this.usersTotal
        },
        yAxis:{
          type:"category",
          show:false
        },
        tooltip:{},
        series:{
          name:'月增长量',
          type:'bar',
          data: [this.usersTotal - this.usersLastDay],
          barWidth: "30%",
          showBackground: true,
          label:{
            show:true,
            formatter: "|",
            position: "right",
            distance: 60
          }
        },
        color:"hotpink"
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .bottom{
    display: flex;
    justify-content: space-between;
    .left,.right{
      display: flex;
      align-items: center;
      .count{
        margin: 0 5px;
      }
    }
  }
</style>