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
        <el-input v-model="datas.address" placeholder="请输入用户单位的真实方位(地址)" class='inputClass' @input="change($event)">
          <template slot="prepend">真实地址(方位)</template>
        </el-input>
     </el-form-item>
     <el-form-item label="">
        <el-input v-model="datas.nature" placeholder="请输入用户单位的性质(银行或其他)" class='inputClass' @input="change($event)">
          <template slot="prepend">性质</template>
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
      titleMsg: '注册用户',
      rules: {
        addr: [
            { required: true, message: "用户公钥不能为空", trigger: "blur"}
        ],
        address: [
            { required: true, message: "用户单位地址不能为空", trigger: "blur"}
        ],
        nature: [
            { required: true, message: "用户单位性质不能为空", trigger: "blur"}
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
          to: this.datas.addr,
          company_address: this.datas.address,
          company_nature: this.datas.nature
        };
        console.log(data)
        this.$axios.request({
          url:'http://localhost:3000/register',
          method: 'POST',
          data: JSON.stringify(data),
          responseType: 'json',
        }).then(function(response){
          alert('Register successfully!')
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