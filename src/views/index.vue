<template>
<div>

    <router-view></router-view>
    <!-- <footerNav></footerNav> -->
</div>

</template>
<script>
// 导入组件

// import echarts from "echarts"
export default {
  name: 'index',
  data() {
    return {
      showtype: false
    }
  },
  // 注册组件
  components: {
     },
  methods: {
  },
  created() {
     // getDistrictData();
  },
 
}
</script>
<style scoped>

</style>

