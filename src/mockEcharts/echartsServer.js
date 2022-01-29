import Mock from "mockjs"
import data from "./data.json"

Mock.mock('/mock/echartsData', {
  status: 2100,
  data
})