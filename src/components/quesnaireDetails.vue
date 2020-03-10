<template>
  <div>
   <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" 
  :visible.sync="quesnaireVisible" title="个人问卷详情" width="55%" >
        <h3></h3>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name:'quesnaireDetails',
   data() {
    return {
        quesnaireVisible:false
    }
   }
}
</script>
