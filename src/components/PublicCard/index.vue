<template>
  <el-card>
    <!-- 头部,主要写标题和数字 -->
    <div class="header">
      <div class="title">{{title}}</div>
      <div class="count">{{count}}</div>
    </div>
    <!-- 后期专门用来画图 -->
    <div class="main">
      <slot name="main"></slot>
    </div>
    <!-- 分割线 -->
    <div class="line"></div>
    <!-- 底部的文字 -->
    <div class="bottom">
      <slot name="bottom">测试</slot>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "PublicCard",
  props:['title','count']
};
</script>

<style lang="scss" scoped>
.title{
  font-size: 12px;
  color: #aaa;
}
.count{
  font-size: 24px;
  letter-spacing: 1px;
}
.main{
  height: 50px;
  width: 100%;
}
.line{
  height:2px;
  background-color: #aaa;
  margin: 10px 0;
}
.bottom{
  font-size: 12px;
  color: #aaa;
}
</style>
