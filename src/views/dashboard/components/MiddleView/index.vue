<template>
  <div class="middleContainer">
    <el-card>
      <div class="header">
        <div class="menu">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>
        </div>
        <div class="radio">
          <el-radio-group v-model="radio1">
            <el-radio-button label="今日"></el-radio-button>
            <el-radio-button label="本周"></el-radio-button>
            <el-radio-button label="本月"></el-radio-button>
            <el-radio-button label="今年"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="dateTime">
          <el-date-picker
            v-model="dates"
            type="daterange"
            align="right"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="line"></div>
      <div class="main">
        <el-row :gutter="10">
          <el-col :span="18">
            <LeftView :activeIndex="activeIndex"></LeftView>
          </el-col>
          <el-col :span="6">
            <RightView :activeIndex="activeIndex"></RightView>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import LeftView from "./components/LeftView"
import RightView from "./components/RightView"
export default {
  name: "MiddleView",
  components:{
    LeftView,RightView
  },
  data() {
    return {
      activeIndex: "1",
      radio1: "本周",
      dates: [], //
      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            },
          },
          {
            text: "今年至今",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },//只有快捷日期有该属性
    };
  },
  methods: {
    //menu点击切换
    handleSelect(val) {
      this.activeIndex = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.middleContainer {
  margin-top: 20px;
  .header{
    display: flex;
    align-items: center;
    .menu{
      flex: 1;
      .el-menu.el-menu--horizontal{
        border: none;
      }
    }
    .radio{
      margin-right: 20px;
    }
  }
  .line{
    height: 1px;
    background-color: #aaa;
  }
  .main{
    height: 350px;

  }
  ::v-deep.el-card__body{
    padding: 0 10px;
  }
}
</style>