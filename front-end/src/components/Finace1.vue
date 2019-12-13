<template>
   <div>
    <h1>{{ titleMsg }}</h1>
    <el-form ref="datas" :model="datas" :rules="rules">
     <el-form-item label="">
        <el-input v-model="datas.addr" placeholder="请输入用户的公钥" class='inputClass'  @input="change($event)">
          <template slot="prepend">用户的公钥</template>
        </el-input>
     </el-form-item>
     <el-form-item label="">
        <el-input v-model="datas.amount" placeholder="请输入融资金额" class='inputClass' @input="change($event)">
          <template slot="prepend">金额</template>
        </el-input>
     </el-form-item>
    <el-button type="primary" @click="cilckLogin()">融资</el-button>
  </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titleMsg: '融资',
      rules: {
        addr: [
            { required: true, message: "公钥不能为空", trigger: "blur"}
        ],
        amount: [
            { required: true, message: "金额不能为空", trigger: "blur"}
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
          userAddr: this.datas.addr,
          amount: this.datas.amount
        };
        console.log(data)
        this.$axios.request({
          url:'http://localhost:3000/finance',
          method: 'POST',
          data: JSON.stringify(data),
          responseType: 'json',
        }).then(function(response){
          alert('Finance successfully!')
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