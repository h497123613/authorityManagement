<template>
  <div>
    <PublicCard title="今日销售额" :count="30346799 | moneyFormat">
      <template #main>
        <div class="main">
          <div class="top">
            <span>日同比</span>
            <span class="count">{{salesGrowthLastDay}}</span>
            <div :class="salesGrowthLastDay > 0 ?'up':'down'"></div>
          </div>
          <div class="bottom">
            <span>月同比</span>
            <span class="count">{{salesGrowthLastMonth}}</span>
            <div :class="salesGrowthLastMonth > 0 ?'up':'down'"></div>
          </div>
        </div>
      </template>
      <template #bottom>
        <span class="leftText">昨日销售额</span>
        <span>{{salesLastDay | moneyFormat}}</span>
      </template>
    </PublicCard>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TodaySale",
  computed: {
    ...mapState({
      salesToday: (state) => state.echarts.echartsData.salesToday,
      salesLastDay: (state) => state.echarts.echartsData.salesLastDay,
      salesGrowthLastDay: (state) =>
        state.echarts.echartsData.salesGrowthLastDay,
      salesGrowthLastMonth: (state) =>
        state.echarts.echartsData.salesGrowthLastMonth,
    }),
  },
};
</script>

<style lang="scss" scoped>
.main{
  width: 100%;
  height: 50px;
  font-size: 12px;
  font-weight: bold;
  color: #666;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .top,.bottom{
    display: flex;
    align-items: center;
  }
  .count{
    margin: 0 5px;
  }
  // .down{
  //   transform: translateY(25%);
  //   border: 5px solid green;
  //   border-left-color: transparent;
  //   border-right-color: transparent;
  //   border-bottom-color: transparent;
  // }
  // .up{
  //   transform: translateY(-25%);
  //   border: 5px solid red;
  //   border-left-color: transparent;
  //   border-right-color: transparent;
  //   border-top-color: transparent;
  // }
}

</style>