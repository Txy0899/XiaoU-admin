<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">管理员列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.router == '/user/add'">用户添加</el-breadcrumb-item>
      <el-breadcrumb-item v-else-if="this.router == '/user/edit'">用户修改</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="所属角色" prop="roleid">
        <el-select v-model="ruleForm.roleid" placeholder="请选择">
          <el-option
            v-for="item in menuList"
            :label="item.rolename"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          v-if="this.router == '/user/add'"
          @click="submitForm('ruleForm')"
        >添加</el-button>
        <el-button
          type="primary"
          v-else-if="this.router == '/user/edit'"
          @click="editForm('ruleForm')"
        >修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      router: "",
      menuList: [],
      ruleForm: {
        roleid: "",
        username: "",
        password: "",
        status: true,
      },
      rules: {
        roleid: [{ required: true, message: "请选择角色", trigger: "change" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          this.$http.post("/useradd", this.ruleForm).then((res) => {
            console.log(res);
            if (res.data.code == "200") {
              this.$message({
                message: "添加成功",
                type: "success",
              });
            }
          });
        } else {
          this.$message.error("添加失败!");
          return false;
        }
      });
    },
    editForm(formName) {
      this.$http
        .post("/useredit", {
          uid: this.$route.query.id,
          ...this.ruleForm,
          status: this.ruleForm.status ? 1 : 2,
        })
        .then((res) => {
          if (res.data.code == "200") {
            this.$router.back();
          } else {
            this.$message.error("修改失败!");
            return false;
          }
        });
    },
  },
  mounted() {
    this.$http.get("/rolelist").then((res) => {
      this.menuList = res.data.list;
    });
    this.router = this.$route.path;
    console.log(this.$route);
    if (this.$route.path == "/user/edit") {
      this.$http.get("/userinfo", { uid: this.$route.query.id }).then((res) => {
        console.log(res.data);
        res.data.list.status = res.data.list.status == "1" ? true : false;
        this.ruleForm = res.data.list;
        this.ruleForm.password = "";
      });
    }
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.demo-ruleForm {
  width: 50%;
}
</style>