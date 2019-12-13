<template>
  <div>
    <h1>{{ titleMsg }}</h1>
    <el-form ref="datas" :model="datas" :rules="rules">
     <el-form-item label="">
        <el-input v-model="datas.addr" placeholder="请输入合约名称" class='inputClass' @input="change()">
          <template slot="prepend">合约名称</template>
        </el-input>
     </el-form-item>
   <div>
    <el-button type="primary" @click="cilckLogin()">确定</el-button>
  </div>
  </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        titleMsg: '合约部署',
        rules: {
            addr: [
                { required: true, message: "合约名称不能为空", trigger: "blur"}
            ]
        },
        datas: {}
      }
    },
    methods: {
      cilckLogin: function() {
        var that = this
        var data = {
          contractName: this.datas.addr,
        };
	console.log(data)
        this.$axios.request({
          url:'http://localhost:3000/deploy',
          method: 'POST',
          data: JSON.stringify(data),
          responseType: 'json',
        }).then(function(response){
          alert('Deploy successfully...')
          console.log(response.data)
        })
      },
      change:function() {
        this.$forceUpdate()
      },
    }
  }
  </script>
  
  <style scoped>
  .inputClass{
    width:450px
  }
  h1 {
    font-weight: normal;
  }
  </style>
