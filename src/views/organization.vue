<template>
  <div class="container">
    <div class="main">
      <h3>机构管理</h3>
      <!-- 搜索筛选 -->
      <el-form :inline="true" :model="formInline" class="user-search">
        <el-form-item label="机构名称:">
          <el-input v-model="formInline.name" placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="search"
            class="btnstyle marginRight10"
          >查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleEdit()" class="btnstyle">新增</el-button>
        </el-form-item>
      </el-form>
      <!--列表-->
      <el-table
        @selection-change="selectChange"
        :data="userData"
        highlight-current-row
        v-loading="loading"
        border
        element-loading-text="拼命加载中"
        class="userTable"
      >
        <el-table-column align="center" sortable prop="username" label="用户名" width="300"></el-table-column>
        <el-table-column align="center" sortable prop="role" label="角色" width="250"></el-table-column>
        <el-table-column align="center" sortable prop="c_time" label="时间" width="300"></el-table-column>
        <!-- <el-table-column align="center" sortable prop="is_active" label="状态" min-width="150">
          <template slot-scope="scope">
            <div
              :style="{'color':scope.row.is_active==true? '#00C922':'#FF4646'}"
            >{{ scope.row.is_activeSt }}</div>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" min-width="150" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_active==true?nshow:fshow"
              active-color="#5AA3E6"
              inactive-color="#CECECE"
              @change="editType(scope.$index, scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <Pagination v-bind:child-msg="pageparm" @callFather="callFather" class="pagtn"></Pagination>
      <!-- 编辑界面 -->
      <el-dialog
        :title="title"
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
          <el-form-item label="机构名称" prop="name">
            <el-input
              v-model="editForm.userName"
              placeholder="请输入机构名称"
              width="80%"
            ></el-input>
          </el-form-item>
          <el-form-item label="机构类型" prop="type">
             <el-select v-model="editForm.type" placeholder="请选择">
                    <el-option  v-for="item in orgData"  :key="item.id" :label="item.name"  :value="item.id" >
                    </el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="Address" prop="name">
            <el-input
              v-model="editForm.address"
              placeholder="address"
              width="80%"
            ></el-input>
          </el-form-item>
           <el-form-item label="phone" prop="name">
            <el-input
              v-model="editForm.phone"
              placeholder="phone"
              width="80%"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button  @click="closeDialog()">取消</el-button>
          <el-button
            type="primary"
            :loading="loading"
            class="title btnstyle"
            @click="submitForm('editForm')"
          >保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 导入请求方法
// import {
//   userList,
//   getRoleListName,
//   userSave,
//   userLock
// } from '../../api/system'
import Pagination from "../components/Pagination";
export default {
  data() {
    return {
      orgData:[{id:"1",name:"Clinic"},{id:"0",name:"admin"}],
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      title: "Add User",
      editFormVisible: false, //控制编辑页面显示与隐藏
      // 编辑与添加
      editForm: {
        userName: "",
        roleId: "",
        pwd: "",
        isActive: ""
      },
      // 选择数据
      selectdata: [],
      // rules表单验证
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          }
        ],
      },
      // 请求数据参数
      formInline: {
        current_page: 1,
        page_size: 10,
        name: "",
      },
      //用户数据
      userData: [],
      roleData: [],
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: "",
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
    this.getRoleType();
    this.getdata(this.formInline);
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    change(e) {
      this.$forceUpdate();
    },
    getRoleType() {
      //   getRoleListName().then(res => {
      //     if (res.code == '200') {
      //       this.roleData=res.role_list;
      //     }else if (res.code==2002){
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
    // 获取数据方法

    getdata(parameter) {
      this.loading = true;
      let userDataList = [];
      // 获取用户列表
      //   userList(parameter).then(res => {
      //     this.loading = false
      //     if (res.code == 200) {
      //       var datas=res.data.page_data;
      //       datas.forEach(function(data, index) {
      //       const userArr = {
      //         "c_time": data.c_time,
      //         "is_activeSt": data.is_active==true?"正常":"失效",
      //         "is_active": data.is_active,
      //          "role": data.role,
      //          "username": data.username
      //       }
      //       userDataList.push(userArr);
      //      });
      //       this.userData =userDataList;
      //       // 分页赋值
      //       this.pageparm.currentPage = this.formInline.current_page;
      //       this.pageparm.pageSize = this.formInline.page_size;
      //       this.pageparm.total = res.data.total;
      //     }else if (res.code==2002){
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
      // })
      let userArr = [
        {
          c_time: "",
          is_activeSt:"正常",
          is_active: true,
          role: 2,
          username: "test"
        }
      ];
      this.userData = userArr;
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.current_page = parm.currentPage;
      this.formInline.page_size = parm.pageSize;
      this.getdata(this.formInline);
    },
    //搜索事件
    search() {
      this.formInline.current_page = 1;
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
        this.title = "修改用户";
        this.editForm.userName = row.userName;
        this.editForm.pwd = row.password;
        this.editForm.roleId = row.roleId;
        this.editForm.isActive = row.isActive;
      } else {
        this.title = "添加用户";
        this.editForm.userName = "";
        this.editForm.pwd = "";
        this.editForm.roleId = "";
        this.editForm.isActive = "";
      }
    },
    // 编辑、添加提交方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          var params = {
            username: this.editForm.userName,
            password: this.editForm.pwd,
            role: this.editForm.roleId,
            is_active: this.editForm.isActive
          };
          // 请求方法
          //   userSave(params)
          //     .then(res => {
          //       this.editFormVisible = false
          //       this.loading = false
          //       if (res.code==200) {
          //         this.getdata(this.formInline)
          //         this.$message({
          //           type: 'success',
          //           message: '保存成功！'
          //         })
          //       } else if (res.code==2002){
          //         //跳转到登录
          //         this.$store.commit('logout', 'false')
          //         this.$router.push({ path: '/login' })
          //         this.$message({
          //             type: 'info',
          //             message: "登录超时,请重新登录"
          //             })
          //       }else{
          //           this.$message({
          //               type: 'info',
          //               message: res.msg
          //           })
          //       }
          //     })
        }
      });
    },
    handleClick(data, checked, node) {
      if (checked) {
        this.$refs.tree.setCheckedNodes([]);
        this.$refs.tree.setCheckedNodes([data]);
        this.unitparm.deptId = data.id;
        this.unitparm.deptName = data.name;
        //交叉点击节点
      } else {
      }
    },
    // 选择复选框事件
    selectChange(val) {
      this.selectdata = val;
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      this.editFormVisible = false;
    },
    // 删除用户
    deleteUser(index, row) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 删除
        //   userDelete(row.id)
        //     .then(res => {
        //       if (res.success) {
        //         this.$message({
        //           type: 'success',
        //           message: '用户已删除!'
        //         })
        //         this.getdata(this.formInline)
        //       }else if (res.code==2002){
        //         //跳转到登录
        //         this.$store.commit('logout', 'false')
        //         this.$router.push({ path: '/login' })
        //         this.$message({
        //             type: 'info',
        //             message: "登录超时,请重新登录"
        //                 })
        //       }else{
        //           this.$message({
        //               type: 'info',
        //               message: res.msg
        //           })
        //       }
        //     })
      });
    },
    // 重置密码
    resetpwd(index, row) {
      this.resetpsd.userId = row.userId;
      this.$confirm("确定要重置密码吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        userPwd(this.resetpsd).then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: "重置密码成功！"
            });
            this.getdata(this.formInline);
          } else if (res.code == 2002) {
            //跳转到登录
            this.$store.commit("logout", "false");
            this.$router.push({ path: "/login" });
            this.$message({
              type: "info",
              message: "登录超时,请重新登录"
            });
          } else {
            this.$message({
              type: "info",
              message: res.msg
            });
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  margin: 0 auto;
  width: 80%;
  display: block;
  background: #fff;
}
.main{
    position: inherit;
    padding-top: 10%;
}
.main h3{text-align:left;margin: 20px 0px 50px 0px;}
.btnstyle {
  background: #5aa3e6;
  color: white;
}
.el-form-item .el-select {
  width: 80%;
}
.el-form-item .el-input {
  width: 80%;
}
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

 