<template>
  <div>
    <div class="title">{{ activeIndex === '1' ? "销售额" : "用户" }}排名</div>
    <div class="item" v-for="(item, index) in userData" :key="item.no">
      <div class="no" :class="index < 3 && 'active'">{{ item.no }}</div>
      <div class="name">{{ item.name }}</div>
      <div class="count">{{ item.count }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RightView",
  props: ["activeIndex"],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      orderRank: (state) => state.echarts.echartsData.orderRank,
      userRank: (state) => state.echarts.echartsData.userRank,
    }),
    userData() {
      return this.activeIndex === "1" ? this.orderRank : this.userRank;
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 50px;
}
.item {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin: 10px 0;
  .no {
    width: 20px;
    height: 20px;
    // background-color: #000;
    // color: white;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    margin-right: 10px;
    &.active {
      background-color: #000;
      color: white;
    }
  }
  .name {
    width: 100px;
  }
}
</style>