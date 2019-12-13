<template>
  <div class="hello">
  <img src="../assets/FISCO_BCOS_Logo.jpg" width="300px" >
    <h1>{{ msg }}</h1>
    <h3>实现金融供应链的合约部署、用户注册上链、转账、账单转移、融资、还款等操作</h3>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '欢迎使用基于FISCO-BCOS开发的供应链金融平台'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  margin-top:20px;
}
h1, h3 {
  font-weight: normal;
}
</style>
