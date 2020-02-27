<template>
  <div id="app">
     <router-view/>
  </div>
</template>
<script>

export default {
  name: 'App',
    components:{
   
  }
}
</script>
<style>
#app {
  font-family: 'Source Han Sans CN';
  background: #F3F3F3;
  /*对字体进行抗锯齿渲染*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
