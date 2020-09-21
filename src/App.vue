<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <Navbar />
      </el-aside>
      <el-container>
        <el-header>
          <Headers />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Headers from "@/components/Headers";
export default {

  name: "App",
  components: {
    Navbar,
    Headers,
  },
 
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app,
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: right;
  line-height: 60px;
}

.el-aside {
  background-color: rgb(84, 92, 100);
  color: #333;
  overflow: hidden;
}

.el-main {
  color: #333;
}
</style>
