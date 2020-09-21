<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">角色列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.router == '/role/add'">角色添加</el-breadcrumb-item>
      <el-breadcrumb-item v-else-if="this.router == '/role/edit'">角色修改</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="ruleForm.rolename"></el-input>
      </el-form-item>

      <el-form-item label="角色权限" prop="menus">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[14]"
          :default-checked-keys="ruleForm.menus"
          :props="defaultProps"
          ref="mytree"
          check-strictly
        ></el-tree>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          v-if="this.router == '/role/add'"
          @click="submitForm('ruleForm')"
        >添加</el-button>
        <el-button
          type="primary"
          v-else-if="this.router == '/role/edit'"
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
        rolename: "",
        menus: [],
        status: true,
      },
      rules: {
        title: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
      },
      data: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          this.ruleForm.menus = this.$refs.mytree.getCheckedKeys();
          this.$http.post("/roleadd", this.ruleForm).then((res) => {
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
        .post("/roleedit", {
          id: this.$route.query.id,
          ...this.ruleForm,
          status: this.ruleForm.status ? 1 : 2,
          menus: this.$refs.mytree.getCheckedKeys(),
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
    check() {
      console.log();
    },
  },
  mounted() {
    this.$http.get("/menulist", { istree: true }).then((res) => {
      this.menuList = res.data.list;
      this.data = res.data.list;
    });
    this.router = this.$route.path;
    console.log(this.router);
    if (this.$route.path == "/role/edit") {
      this.$http.get("/roleinfo", { id: this.$route.query.id }).then((res) => {
        res.data.list.status = res.data.list.status == "1" ? true : false;

        res.data.list.menus = res.data.list.menus.split(",");
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