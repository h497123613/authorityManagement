import requestEcharts from '@/utils/requestEcharts'

const reqEchartsData = ()=>{
  return requestEcharts.get("/echartsData")
}

export default reqEchartsData