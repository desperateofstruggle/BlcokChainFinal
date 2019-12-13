<template>
  <div id="app">
<el-menu
  :default-active="this.$route.path"
  :router="true"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
   <h1 id="headTitle">FISCO-BCOS供应链系统金融平台</h1>
   <el-menu-item index="/" >主页</el-menu-item>
   <el-menu-item index="/deploy">合约部署</el-menu-item>
   <el-menu-item index="/register">用户注册 </el-menu-item>
  <el-menu-item index="/issue">欠款账单上链 </el-menu-item>
  <el-menu-item index="/transfer">账单转让</el-menu-item>
  <el-menu-item index="/finace">银行融资</el-menu-item>
  <el-menu-item index="/settle">还款结算</el-menu-item>
</el-menu>

</el-row>
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
  
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#headTitle{
  line-height: 1.2;
  height: 36.8px;
  float: left;
  font-size: 30px;
  margin-block-start: 10px;
  margin-block-end: 10px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  color: #FFD04B;
  width: 500px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
body {
  margin: 0;
}
.log {
  height: 60px;
}
</style>
