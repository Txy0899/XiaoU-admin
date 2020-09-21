<template>
  <div class="spec">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">规格列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.router == '/specs/add'">规格添加</el-breadcrumb-item>
      <el-breadcrumb-item v-else-if="this.router == '/specs/edit'">规格修改</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="菜单名称" prop="specsname">
        <el-input v-model="ruleForm.specsname"></el-input>
      </el-form-item>

      <el-form-item v-for="(domain, index) in ruleForm.attrs" :label="'属性规格' + index" :key="index">
        <el-input v-model="domain.value"></el-input>
        <el-button @click="addDomain" v-if="index == 0">新增</el-button>
        <el-button @click.prevent="removeDomain(domain)" v-if="index != 0">删除</el-button>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          v-if="this.router == '/specs/add'"
          @click="submitForm('ruleForm')"
        >添加</el-button>
        <el-button
          type="primary"
          v-else-if="this.router == '/specs/edit'"
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
      dynamicValidateForm: {
        domains: [
          {
            value: "",
          },
        ],
      },
      router: "",
      menuList: [],
      ruleForm: {
        specsname: "",
        attrs: [
          {
            value: "",
          },
        ],
        status: true,
      },
      rules: {
        specsname: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    removeDomain(item) {
      var index = this.ruleForm.attrs.indexOf(item);
      if (index !== -1) {
        this.ruleForm.attrs.splice(index, 1);
      }
    },
    addDomain() {
      this.ruleForm.attrs.push({
        value: "",
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          let attrs = this.ruleForm.attrs
            .map((item) => {
              return item.value;
            })
            .join(",");
          this.$http
            .post("/specsadd", { ...this.ruleForm, attrs })
            .then((res) => {
              if (res.data.code == "200") {
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                this.$router.back();
              }
            });
        } else {
          this.$message.error("添加失败!");
          return false;
        }
      });
    },
    editForm(formName) {
      let attrs = this.ruleForm.attrs
        .map((item) => {
          return item.value;
        })
        .join(",");
      this.$http
        .post("/specsedit", {
          id: this.$route.query.id,
          ...this.ruleForm,
          attrs,
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
    if (this.$route.path == "/specs/edit") {
      this.$http.get("/specsinfo", { id: this.$route.query.id }).then((res) => {
        this.ruleForm.specsname = res.data.list[0].specsname;
        this.ruleForm.attrs = [];
        res.data.list[0].attrs.forEach((item) => {
          this.ruleForm.attrs.push({ value: item });
        });
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
  /deep/ .el-form-item__content {
    height: 40px;
    display: flex;
    align-items: center;
  }
}
</style>