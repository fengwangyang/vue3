<template>
  <div id="app">
    <el-container style="height:100%;border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
     <el-menu
      default-active="/"
      @select="select"
      class="el-menu-vertical-demo">
      <el-menu-item index="/">
        <span slot="title">linux主机连接管理</span>
      </el-menu-item>
      <el-menu-item index="/installProgram">
        <span slot="title">安装程序管理</span>
      </el-menu-item>
      <el-menu-item index="/installConfig">
        <span slot="title">安装程序配置管</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-main>
      <router-view ></router-view>
    </el-main>
    </el-container>
  </div>
</template>

<script>


export default {
  name: 'app',
  data(){
    return{
      data:[{
        id:1,
        childern:[{
          id:2
        }]
      }]
    }
  },
  methods:{
    select(val){ // 选择菜单
      this.$router.push(val);
    }
  }
}
</script>

<style lang='scss'>
html,body{
  padding:0;
  margin:0;
  height:100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height:100%;
}
</style>
