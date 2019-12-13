<template>
   <div>
    <h1>{{ titleMsg }}</h1>
    <el-form ref="datas" :model="datas" :rules="rules">
     <el-form-item label="">
        <el-input v-model="datas.addr" placeholder="请输入欠款人的公钥" class='inputClass'  @input="change($event)">
          <template slot="prepend">欠款人的公钥</template>
        </el-input>
     </el-form-item>
     <el-form-item label="">
        <el-input v-model="datas.address" placeholder="请输入中间人的公钥" class='inputClass' @input="change($event)">
          <template slot="prepend">中间人的公钥</template>
        </el-input>
     </el-form-item>
     <el-form-item label="">
        <el-input v-model="datas.to" placeholder="请输入收款人的公钥" class='inputClass' @input="change($event)">
          <template slot="prepend">收款人的公钥</template>
        </el-input>
     </el-form-item>
     <el-form-item label="">
        <el-input v-model="datas.nature" placeholder="请输入金额" class='inputClass' @input="change($event)">
          <template slot="prepend">金额</template>
        </el-input>
     </el-form-item>
     <el-form-item label="">
        <el-input v-model="datas.time" placeholder="请输入时间" class='inputClass' @input="change($event)">
          <template slot="prepend">时间</template>
        </el-input>
     </el-form-item>
    <el-button type="primary" @click="cilckLogin()">交易上链</el-button>
  </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titleMsg: '账单转移',
      rules: {
        addr: [
            { required: true, message: "欠款人公钥不能为空", trigger: "blur"}
        ],
        address: [
            { required: true, message: "中间人公钥不能为空", trigger: "blur"}
        ],
        to: [
            { required: true, message: "收款人公钥不能为空", trigger: "blur"}
        ],
        nature: [
            { required: true, message: "金额不能为空", trigger: "blur"}
        ],
        time: [
            { required: true, message: "还款金额不能为空", trigger: "blur"}
        ]
      },
      datas: {}
    }
  },
  methods:{
    change:function(e) {
      this.$forceUpdate()
    },
    cilckLogin: function() {
        var that = this
        var data = {
          from: this.datas.addr,
          mid: this.datas.address,
          to: this.datas.to,
          amount: this.datas.nature,
          time: this.datas.time
        };
        console.log(data)
        this.$axios.request({
          url:'http://localhost:3000/transfer',
          method: 'POST',
          data: JSON.stringify(data),
          responseType: 'json',
        }).then(function(response){
          alert('Transfer successfully!')
          console.log(response.data)
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inputClass{
  width:450px
}
h1 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>