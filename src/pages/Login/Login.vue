<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  methods: {
    login() {
      this.$http.post("/userlogin", this.ruleForm).then((res) => {
        console.log(res);
        if (res.data.code == "500") {
          this.$message.error(res.data.msg);
        } else if (res.data.code == "200") {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.$store.commit("setUser", res.data.list);
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>