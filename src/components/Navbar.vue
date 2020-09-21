<template>
  <el-col :span="24">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="0" :to="{ path: '/' }">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页&emsp;&emsp;</span>
      </el-menu-item>

      <el-submenu :index="item.id.toString()" v-for="item in NavList" :key="item.id">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          :index="item.id + '-' + items.id"
          v-for="items in item.children"
          :key="items.id"
        >
          <router-link :to="items.url" tag="div">{{ items.title }}</router-link>&emsp;
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      NavList: [],
    };
  },
  mounted() {
    this.$http.get("/menulist", { istree: true }).then((res) => {
      this.NavList = res.data.list;
    });
  },
};
</script>

<style lang="less" scoped>
</style>