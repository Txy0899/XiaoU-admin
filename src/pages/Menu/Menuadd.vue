<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">菜单列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.router == '/menu/add'">菜单添加</el-breadcrumb-item>
      <el-breadcrumb-item v-else-if="this.router == '/menu/edit'">菜单修改</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option v-for="item in menuList" :label="item.title" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="菜单图标" prop="icon" v-show="ruleForm.type == 1">
        <el-input v-model="ruleForm.icon"></el-input>
      </el-form-item>

      <el-form-item label="菜单路径" prop="url" v-show="ruleForm.type == 2">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          v-if="this.router == '/menu/add'"
          @click="submitForm('ruleForm')"
        >添加</el-button>
        <el-button
          type="primary"
          v-else-if="this.router == '/menu/edit'"
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
        title: "",
        pid: "",
        icon: "",
        type: "",
        url: "",
        status: true,
      },
      rules: {
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        pid: [{ required: true, message: "请选择活动区域", trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          this.$http.post("/menuadd", this.ruleForm).then((res) => {
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
        .post("/menuedit", {
          id: this.$route.query.id,
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
    this.$http.get("/menulist", { istree: true }).then((res) => {
      this.menuList = res.data.list;
    });
    this.router = this.$route.path;
    if (this.$route.path == "/menu/edit") {
      this.$http.get("/menuinfo", { id: this.$route.query.id }).then((res) => {
        console.log(res.data.list);
        res.data.list.status = res.data.list.status == "1" ? true : false;
        this.ruleForm = res.data.list;
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