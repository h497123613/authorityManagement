import * as echarts from "echarts"
//使用echarts5版本会报以下警告
// import * as echarts from 'echarts/lib/echarts'
import VueEcharts from "vue-echarts"//插件,但是暴露出来的是一个组件
import Vue from 'vue'

Vue.prototype.$echarts = echarts
Vue.component('v-chart',VueEcharts)

