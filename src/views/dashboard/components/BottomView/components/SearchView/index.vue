<template>
  <div>
    <el-card>
      <div slot="header">关键词搜索</div>
      <div class="content">
        <div class="main">
          <el-row :gutter="10">
            <el-col :span="18">
              <div>
                <div class="title">搜索用户数</div>
                <div class="count">
                  {{ searchData.totalUserNum | numberFormat }}
                </div>
                <div class="view">
                  <v-chart :options="getOptions(1)"></v-chart>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <div class="title">搜索量</div>
                <div class="count">
                  {{ searchData.totalSearchNum | numberFormat }}
                </div>
                <div class="view">
                  <v-chart :options="getOptions(2)"></v-chart>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              
              type="index"
              label="排名"
              align="center"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="word"
              align="center"
              label="关键字"
              width="width"
            >
            </el-table-column>
            <el-table-column
              prop="count"
              align="center"
              label="搜索数量"
              width="width"
            >
            </el-table-column>
            <el-table-column
              prop="user"
              label="搜索用户数"
              align="center"
              width="width"
            >
            </el-table-column>
            <el-table-column
              prop="percent"
              align="center"
              label="搜索占比"
              width="width"
            >
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="page = $event"
            style="text-align: center; margin: 20px 0"
            :current-page="page"
            :page-size="limit"
            layout=" prev, pager, next,total"
            :total="searchWord.length"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SearchView",
  data() {
    return {
      page: 1,
      limit: 5,
    };
  },
  methods: {
    getOptions(num) {
      let { userNums, searchNums } = this.searchData;
      return {
        title: {},
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        xAxis: {
          show: false,
          data:this.searchWord || []
        },
        yAxis: {
          show: false,
        },
        series: {
          type: "line",
          data: num === "1" ? userNums : searchNums,
          itemStyle: {
            opacity: 0,
          },
          areaStyle: {
            color: "hotpink",
          },
          smooth: true,
        },
        tooltip: {
          trigger: "axis",
        },
        color: "skyblue",
      };
    },
  },
  computed: {
    ...mapState({
      searchWord: (state) => state.echarts.echartsData.searchWord || []
    }),
    searchData() {
      //需要的数据
      //x轴所需要的关键字组成的数组
      //series里面的data,也需要数组,(两种:用户数组成的数组,搜索量组成的数组)
      if (this.searchWord) {
        // x轴数据
        let keywords = this.searchWord.map((item) => item.word);
        // 用户数量图形series里面的data
        let userNums = this.searchWord.map((item) => item.user);
        // 搜索数量图形series里面的data
        let searchNums = this.searchWord.map((item) => item.count);
        //用户的总数
        let totalUserNum = userNums.reduce((p, c) => {
          p += c;
          return p;
        }, 0);
        //搜索的总数
        let totalSearchNum = searchNums.reduce((p, c) => {
          p += c;
          return p;
        }, 0);
        //表格数据
        //1.给searchWord里面的每个对象添加一个字段
        //2. 前端自己分页计算每页数据
        this.searchWord.forEach((item) => {
          item.percent = ((item.count * 100) / totalSearchNum).toFixed(2) + "%";
        });

        return {
          keywords,
          userNums,
          searchNums,
          totalUserNum,
          totalSearchNum,
        };
      } else {
        return {};
      }
    },
    //计算分页数据,让表格使用
    tableData() {
      console.log(this.searchWord)
      return this.searchWord.slice(
        (this.page - 1) * this.limit,
        this.page * this.limit
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  color: #aaa;
}
.count {
  font-size: 24px;
  letter-spacing: 1px;
}
.view {
  height: 50px;
  width: 100%;
}
.table{
  height: 350px;
}
</style>