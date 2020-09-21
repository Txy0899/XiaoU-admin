<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/category' }">商品分类列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.router == '/category/add'">菜单添加</el-breadcrumb-item>
      <el-breadcrumb-item v-else-if="this.router == '/category/edit'">菜单修改</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option
            v-for="item in menuList"
            :label="item.catename"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="ruleForm.catename"></el-input>
      </el-form-item>

      <el-form-item label="图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-change="change"
          :auto-upload="false"
          :file-list="imgArr"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          v-if="this.router == '/category/add'"
          @click="submitForm('ruleForm')"
        >添加</el-button>
        <el-button
          type="primary"
          v-else-if="this.router == '/category/edit'"
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
      imgArr: [],
      ruleForm: {
        pid: "",
        catename: "",
        img: "",
        status: true,
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择分类", trigger: "change" }],
      },
    };
  },
  methods: {
    change(file, fileList) {
      this.ruleForm.img = file.raw;
      console.log(this.ruleForm.img);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          let form = new FormData();
          for (var key in this.ruleForm) {
            form.append(key, this.ruleForm[key]);
          }
          this.$http.post("/cateadd", form).then((res) => {
            if (res.data.code == "200") {
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
      let form = new FormData();
      console.log(this.ruleForm);

      this.ruleForm.status = this.ruleForm.status ? 1 : 2;
      for (var key in this.ruleForm) {
        form.append(key, this.ruleForm[key]);
        console.log(form);
      }
      form.append("id", this.$route.query.id);
      this.$http.post("/cateedit", form).then((res) => {
        console.log(res);
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
    this.$http.get("/catelist", { istree: true }).then((res) => {
      this.menuList = res.data.list;
    });
    this.router = this.$route.path;
    if (this.$route.path == "/category/edit") {
      this.$http.get("/cateinfo", { id: this.$route.query.id }).then((res) => {
        res.data.list.status = res.data.list.status == "1" ? true : false;
        this.ruleForm = res.data.list;
        this.imgArr.push({ url: "http://localhost:3000" + res.data.list.img });
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