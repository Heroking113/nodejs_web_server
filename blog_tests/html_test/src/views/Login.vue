<template>
  <el-card style="width:500px;">
    <el-form ref="LoginForm" :model="LoginForm" label-width="80px">
      <el-form-item label="账号: " prop="name" style="margin-right:42px;">
        <el-input v-model="LoginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码: " prop="password" style="margin-right:42px;">
        <el-input type="password" auto-complete="off" v-model="LoginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clickLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      LoginForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    clickLogin() {
      if(this.LoginForm.username && this.LoginForm.password){
        this.axios.post('/api/user/login', this.LoginForm).then(resp=>{
          console.log(resp.data);
        })
      }else{
        this.$message.warning("请填写完信息！");
      }
    }
  }
};
</script>
