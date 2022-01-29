<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <div class="title">分类销售排行</div>
        <div class="radio">
          <el-radio-group size="mini" v-model="radio2">
            <el-radio-button label="品类"></el-radio-button>
            <el-radio-button label="商品"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="main">
        <v-chart :options="getOptions()" autoresize></v-chart>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RankView",
  data() {
    return {
      radio2: "品类", //收集label的值
    };
  },
  methods: {
    getOptions() {
      let { allDatas1Num, allDatas2Num, categoryData, goodsData } =
        this.useData;
      return {
        title: [
          {
            text: `${this.radio2}分布`,
            textStyle: {
              fontSize: 14,
            },
          },
          {
            text: "累计数量",
            subtext: this.radio2 === "品类" ? allDatas1Num : allDatas2Num, //子标题内容
            // textStyle//主标题样式
            subtextStyle: {
              //子标题样式
              fontSize: 28,
              color: "#000",
            },
            left: "32%",
            top: "34%",
            textAlign: "center",
          },
        ],
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            return `
            ${this.radio2}分布<br>
            ${params.marker}名称:${params.name.split("|")[0]}<br>
            ${params.marker}数量:${params.value}<br>
            ${params.marker}占比:${params.percent}%<br>
            `;
          },
        },
        //图例相关
        legend: {
          top: "50%",
          left: "75%",
          orient: "vertical",
        },
        series: [
          {
            // name: "Access From",
            type: "pie",
            //圆心坐标left top
            center: ["33%", "40%"],
            radius: ["30%", "43%"], //内外圆的半径
            avoidLabelOverlap: false, //是否启动标签防重叠
            //图形的文本
            label: {
              show: true,
              // position: "center",
              //规定图形文字显示的是什么,formatter可以是一个字符串,也可以是一个回调
              //回调中的参数可以获取到每一项的name和value
              formatter: (params) => {
                return params.name.split("|")[0];
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            //文字引导线
            labelLine: {
              show: true,
              // length引导线第一段长度
              // length2引导性第二段长度
              length: 5,
              length2: 5,
            },
            itemStyle:{
              borderColor:"white",
              borderWidth: 2
            },
            data: this.radio2 === "品类" ? categoryData : goodsData,
          },
        ],
      };
    },
  },
  computed: {
    ...mapState({
      saleRank: (state) => state.echarts.echartsData.saleRank
    }),
    useData() {
      if (this.saleRank) {
        let {
          category: { axisX: names1, data1: datas1 },
          goods: { axisX: names2, data1: datas2 },
        } = this.saleRank;
        // let names1 = this.saleRank?.category?.axisX || []
        // let datas1 = this.saleRank?.category?.data1 || []
        // let names2 = this.saleRank?.goods?.axisX || []
        // let datas2 = this.saleRank?.goods?.data1 || []
        
        //品牌的总数
        let allDatas1Num = datas1.reduce((p, c) => {
          p += c;
          return p;
        }, 0);
        //品类的对象整理
        let categoryData = names1.map((item, index) => ({
            name: item +"|" +((datas1[index] * 100) / allDatas1Num).toFixed(2) +"%",
            value: datas1[index],
        }));
        //商品的总数
        let allDatas2Num = datas2.reduce((p, c) => {
          p += c;
          return p;
        }, 0);
        //商品对象的整理
        let goodsData = names2.map((item, index) => ({
          name: item +"|"+((datas2[index] * 100) / allDatas2Num).toFixed(2)+"%",
          value: datas2[index],
        }));
        return {
          allDatas1Num,
          allDatas2Num,
          categoryData,
          goodsData,
        };
      }else{
        return {}
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.main {
  height: 434px;
}
::v-deep.el-card__header {
  padding: 11px 20px;
}
</style>