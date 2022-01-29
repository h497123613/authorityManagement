import reqEchartsData from "@/api/echarts"
const state = {
  echartsData:{}
}

const mutations = {
  SET_ECHARTSDATA(state,payload){
    state.echartsData = payload
  }
}

const actions = {
  async getEchartsData(context){
    const result = await reqEchartsData()
    if(result.status === 2100){
      context.commit('SET_ECHARTSDATA',result.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
