<template>
<div>
   <headerNav ></headerNav>
    <router-view></router-view>
    <!-- <footerNav></footerNav> -->
</div>

</template>
<script>
// 导入组件
import headerNav  from "@/components/headerNav";
import footerNav from "@/components/footerNav"
// import echarts from "echarts"
// import {getDistrictData} from '@/utils/util'
export default {
  name: 'index',
  data() {
    return {
      showtype: false
    }
  },
  // 注册组件
  components: {
     headerNav,footerNav  
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

