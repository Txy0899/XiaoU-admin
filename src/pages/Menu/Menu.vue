<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 按钮 -->
    <el-button type="primary" @click="changeUrl">添加</el-button>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="菜单编号" width="180"></el-table-column>

      <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>

      <el-table-column prop="icon" label="菜单图标"></el-table-column>

      <el-table-column prop="url" label="菜单地址"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1">{{ scope.row.status | statusFormat }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.status | statusFormat }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.get("/menulist", { istree: true }).then((res) => {
        this.tableData = res.data.list;
      });
    },
    changeUrl() {
      this.$router.push("/menu/add");
    },
    handleEdit(index, row) {
      this.$router.push(`/menu/edit?id=${row.id}`);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.post("/menudelete", { id: row.id }).then((res) => {
            if (res.data.code == "200") {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.getList();
            } else {
              this.$message.error("删除失败,该分类下有子类!");
              return false;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>