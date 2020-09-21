<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{users}}
      <i class="el-icon-setting el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>我的</el-dropdown-item>
      <el-dropdown-item>切换用户</el-dropdown-item>
      <el-dropdown-item @click="signOut">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.state.user.username;
    },
  },
  methods: {
    signOut() {
      console.log("1");
      // this.$store.commit('signOut');
    },
  },
};
</script>

<style lang="less" scoped>
.el-dropdown {
  display: inline;
  margin-right: 20px;
  b {
    margin-right: 5px;
  }
}
</style>