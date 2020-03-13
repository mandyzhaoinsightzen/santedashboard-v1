<template>
  <div class="container">
    <div class="main">
      <h3>{{$t('menu.orgmanage')}}</h3>
      <!-- 搜索筛选 -->
      <el-form :inline="true" :model="formInline" class="search">
        <el-form-item>
          <el-input v-model="formInline.name" :placeholder="$t('datatable.name')" class="wdh-search"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="orgSearch"
            class="btnstyle marginRight10"
          >{{$t("operation.search")}}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleEdit()" class="btnstyle">{{$t("operation.new")}}</el-button>
        </el-form-item>
      </el-form>
      <!--列表-->
      <el-table
        :data="orgData"
        highlight-current-row
        v-loading="loading"
        border
        element-loading-text="loading"
        class="userTable"
      >
        <el-table-column align="center" sortable prop="code" :label="$t('datatable.code')" width="150"></el-table-column>
        <el-table-column align="center" sortable prop="name" :label="$t('datatable.organizationname')" width="250"></el-table-column>
        <el-table-column align="center" sortable prop="type" :label="$t('datatable.type')"  width="200"></el-table-column>
        <el-table-column align="center" sortable prop="address" :label="$t('datatable.address')" width="250"></el-table-column>
        <el-table-column align="center" sortable prop="phone_no" :label="$t('datatable.phoneno')" width="200"></el-table-column>
        <el-table-column align="center" sortable prop="created_on" :label="$t('datatable.createdate')" width="200" :formatter="formatDate"></el-table-column>
        
        <!-- <el-table-column align="center" sortable prop="is_active" label="状态" min-width="150">
          <template slot-scope="scope">
            <div
              :style="{'color':scope.row.is_active==true? '#00C922':'#FF4646'}"
            >{{ scope.row.is_activeSt }}</div>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('datatable.operation')" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" class="btnstyle">{{$t("datatable.operation")}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <Pagination v-bind:child-msg="pageparm" @callFather="callFather" class="pagtn"></Pagination>
      <!-- 编辑界面 -->
      <el-dialog
        :title="isAdd==true?$t('datatable.createorg'):$t('datatable.editorg')" 
        :visible.sync="editFormVisible"
        width="30%"
      >
        <el-form
          label-width="80px"
          ref="editForm"
          :model="editForm"
          :rules="rules"
          style="margin-left:30px;" @click="closeDialog('edit')"
        >
          <el-form-item :label="$t('datatable.organization')" :prop="$t('datatable.organization')">
            <el-input
              v-model="editForm.name"
              :placeholder="$t('datatable.organization')"
              width="80%"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('datatable.type')" :prop="$t('datatable.type')">
             <el-select v-model="editForm.type" :placeholder="$t('datatable.type')">
                    <el-option  v-for="item in orgTypeData"  :key="item.id" :label="item.name"  :value="item.id" >
                    </el-option>
             </el-select>
          </el-form-item>
          <el-form-item :label="$t('datatable.address')" :prop="$t('datatable.address')">
            <el-input
              v-model="editForm.address"
              :placeholder="$t('datatable.address')"
              width="80%"
            ></el-input>
          </el-form-item>
           <el-form-item :label="$t('datatable.phoneno')" :prop="$t('datatable.phoneno')">
            <el-input
              v-model="editForm.phone_no"
              :placeholder="$t('datatable.phoneno')"
              width="80%"  
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button  @click="closeDialog()">{{$t("operation.cancel")}}</el-button>
          <el-button
            type="primary"
            :loading="loading"
            class="title btnstyle"
            @click="submitForm('editForm')"
          >{{$t("operation.save")}}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 导入请求方法
import {
  orgType,
  orgList,
  orgAdd,
  orgEdit,
  // orgDelete
} from '../api/api'
import Pagination from "../components/Pagination";
export default {
  data() {
    return {
      orgData:[],
      orgTypeData:[],
      isAdd:true,
      typeName:'',
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      title: "New Organization",
      editFormVisible: false, //控制编辑页面显示与隐藏
      // 编辑与添加
      editForm: {
        id:"",
        name: "",
        type: "",
        address: "",
        phone_no: ""
      },
      // rules表单验证
      rules: {
        name: [
          {
            required: true,
            message: "name is required!",
            trigger: "blur",
          }
        ],
         type: [
          {
            required: true,
            message: "type is required!",
            trigger: "blur",
          }
        ],
        // phone_no:[{
        //     required: false,
        //     message: "wrong number!",
        //     trigger: "blur",
        //     pattern:/^[1-9]\d{6}/
        // }]
      },
      // 请求数据参数
      formInline: {
        // current_page: 1,
        page_size: 10,
        page:1,
        name: "",
      },
      //组织数据
      orgData: [],
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    };
  },
  // 注册组件
  components: {
    Pagination
  },

  /**
   * 数据发生改变
   */
  watch: {},

  /**
   * 创建完毕
   */
  created() {
    this.getOrgType();
    this.getdata(this.formInline);
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    change(e) {
      this.$forceUpdate();
    },
    getOrgType() {
        orgType().then(res => {
          if (res.length > 0) {
            this.orgTypeData=res;
          }
        })
    },
    formatDate(row, column) {
        // 获取单元格数据
        let data = row[column.property]
        if(data == null) {
          return null
        }
        let dt = new Date(data)
        return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
    },
    // 获取数据方法
    getdata(parameter) {
      this.loading = true;
      let dataList = [];
        orgList(parameter).then(res => {
          this.loading = false;
          //  var datas=res;
          //   datas.forEach(function(data, index) {
          //   const arr = {
          //     "name": data.name,
          //     // "is_activeSt": data.is_active==true?"正常":"失效",
          //     "type": data.type,
          //     "address": data.address,
          //     "phone_no": data.phone_no
          //   }
          //   dataList.push(arr);
          //  });
            this.orgData =res.results;
            // 分页赋值
            this.pageparm.currentPage = this.formInline.page;
            this.pageparm.pageSize = this.formInline.page_size;
            this.pageparm.total = res.results.count;
        
          //else if (res.code==2002){
          //       //跳转到登录
          //       this.$store.commit('logout', 'false')
          //       this.$router.push({ path: '/login' })
          //       this.$message({
          //            type: 'info',
          //            message: "登录超时,请重新登录"
          //           })
            // }
            // else{
            //     this.$message({
            //         type: 'info',
            //         message: res.msg
            //     })
            // }
      }).catch(error=>{
                       debugger;
                         this.$message({
          							 message: error,
          							type: 'error'
                       });
           });
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.current_page = parm.currentPage;
      this.formInline.page_size = parm.pageSize;
      this.getdata(this.formInline);
    },
    //搜索事件
    orgSearch() {
      debugger;
      this.formInline.page = 1;
      this.getdata(this.formInline);
    },
    // 修改type
    editType: function(index, row) {
      this.loading = true;
      let parm = {
        username: "",
        is_active: ""
      };
      parm.username = row.username;
      let active = row.is_activeSt;
      if (active == "失效") {
        parm.is_active = "true";
      } else {
        parm.is_active = "false";
      }
      // 修改状态
      //   userLock(parm).then(res => {
      //     this.loading = false
      //     if (res.code == 200) {
      //       this.$message({
      //         type: 'success',
      //         message: '状态修改成功'
      //       })
      //       this.getdata(this.formInline)
      //     } else if (res.code==2002){
      //           //跳转到登录
      //           this.$store.commit('logout', 'false')
      //           this.$router.push({ path: '/login' })
      //           this.$message({
      //                type: 'info',
      //                message: "登录超时,请重新登录"
      //               })
      //       }else{
      //           this.$message({
      //               type: 'info',
      //               message: res.msg
      //           })
      //       }
      //   })
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      if (row != undefined && row != "undefined") {
        this.title = "Update Organization";
        this.isAdd=false;
        this.editForm.id=row.id;
        this.editForm.name = row.name;
        this.editForm.type = row.type;
        this.editForm.address = row.address;
        this.editForm.phone_no = row.phone_no;
      } else {
        this.title = "Create Organization";
        this.isAdd=true;
        this.editForm.name = "";
        this.editForm.type = "";
        this.editForm.address = "";
        this.editForm.phone_no = "";
      }
    },
    // 编辑、添加提交方法
    submitForm(editData) {
      debugger;
      let type=this.editForm.type;
            if(type==1){
              this.typeName="head";
            }
            else if(type==2){
              this.typeName="clinic";
            }
            else if(type==3){
              this.typeName="company";
            }else{
              this.typeName=this.editForm.type;
            }
           let params={
            id:this.editForm.id,
            name: this.editForm.name,
            type: this.typeName,
            address: this.editForm.address,
            phone_no: this.editForm.phone_no,
          }
      this.$refs[editData].validate(valid => {
        if (valid) {
         if (this.isAdd) {
          orgAdd(params).then(res => {
            // if(res.status=="fail"){
            //   if(res.code==2011){
            //      this.$message({
          	// 				message: "wrong phone number!",
          	// 				type: 'error'
            //         });
            //   }else{
            //      this.$message({
          	// 				message: "failure!",
          	// 				type: 'error'
            //         });
            //   }
            // }else{
              this.editFormVisible = false
              this.loading = false
              this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: 'success!'
                })
            // }
            }).catch(error=>{
               this.$message({
          					message: "failure!",
          					type: 'error'
                    });
           });
          }else{
             orgEdit(params).then(res => {
                this.editFormVisible = false
                this.loading = false
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: 'success!'
                })
            }).catch(error=>{
               this.$message({
          					message: "failure!",
          					type: 'error'
                    });
           });
          }
        }
      })
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      this.editFormVisible = false;
    },
    // 删除组织
    deleteOrg(index, row) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 删除
       orgDelete(row.id).then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '用户已删除!'
                })
                this.getdata(this.formInline)
              }else if (res.code==2002){
                //跳转到登录
                this.$store.commit('logout', 'false')
                this.$router.push({ path: '/login' })
                this.$message({
                    type: 'info',
                    message: "登录超时,请重新登录"
                        })
              }else{
                  this.$message({
                      type: 'info',
                      message: res.msg
                  })
              }
            })
      });
    },
  }
};
</script>

<style scoped>
.container {
  overflow: hidden;
  margin: 0 auto;
  width: 80%;
  display: block;
  background: #fff;
}
.main{
    position: inherit;
    padding-top: 10%;
}
.search{
  text-align: left;
}
.el-form-item .el-select{
    width: 80%;
  }
 .el-form-item .el-input{
   width: 80%;
 }
.main h3{text-align:left;margin: 20px 0px 50px 0px;}
.btnstyle {
  background: #004B87;
  color: white;
}
.wdh-search{min-width:250px;}
.marginRight10 {
  margin-right: 10px;
}
.pagtn {
  text-align: right;
  padding-right: 10%;
}
.userTable {
  border-radius: 10px 10px 0px 0px;
  width: 100%;
}
</style>

 