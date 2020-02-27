<template>
  <div id="app">
     <div v-if="$route.meta.keepAlive">
        <headerNav ></headerNav>
        <router-view></router-view>
       </div>
     <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import headerNav  from "@/components/headerNav";
import footerNav from "@/components/footerNav"
export default {
  name: 'App',
    components:{
    headerNav,footerNav
  }
}
</script>
<style>
#app {
  font-family: 'Source Han Sans CN';
  /*对字体进行抗锯齿渲染*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
