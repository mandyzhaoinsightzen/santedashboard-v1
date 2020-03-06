<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar query-conditions">
			 <el-col :span="4">
                <h4 class="title-size">{{$t("homecontent.allpatients")}}</h4>
            </el-col >
			 <el-col :span="20">
				 	<el-form class="search-form" id="core-search-form" :inline="true" :model="filters">  
				  <el-form-item>
					  <el-input  type="text"  v-model="filters.name"  class="search-input" id="core-search-form-input"
									   :placeholder="$t('patienttable.searchbtemail')" autocomplete="off" value=""></el-input>
				</el-form-item>
				 <el-form-item>
					<el-button type="primary" v-on:click="getDrugInfo" class="btn-search">{{$t("commonoperation.search")}}</el-button>
				</el-form-item>
								<!-- <a class="searchImg" ><img src="../assets/images/search.png" width="15px" id="imgSearch" ></a> -->
				</el-form>
			</el-col> 
			
		</el-col>

		<!--列表-->
		<el-table :data="drugData"  class="com-table" :header-cell-style="tableHeaderColor" :inline="true"  :model="formInline">
            <el-table-column prop="nickname"  :label="$t('patienttable.nickname')"  width="180" class="table-head-cell" >
            </el-table-column>
			<el-table-column  prop="email"  :label="$t('patienttable.email')" >
            </el-table-column>
            <el-table-column prop="age"  :label="$t('patienttable.age')"  width="180">
            </el-table-column>
			<el-table-column  prop="gender" :label="$t('patienttable.gender')">
            </el-table-column>
             <el-table-column  prop="assessments" :label="$t('patienttable.assessments')">
            </el-table-column>
             <el-table-column  prop="stressassessments" :label="$t('patienttable.stressassessments')">
            </el-table-column>
             <el-table-column  prop="healthrisk" :label="$t('patienttable.healthrisk')">
            </el-table-column>
             <el-table-column  prop="stressrisk" :label="$t('patienttable.stressrisk')">
            </el-table-column>
      </el-table>
	  <el-col :span="24" class="toolbar" style="background:#F9F9F9;">
			<!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination> -->
		</el-col>
	</section>
</template>

<script>
	import util from '../common/js/util'
	//import NProgress from 'nprogress'
	// import {getDrugList} from '../api/api';
	// import Pagination from '@/components/Pagination'
	export default {
		name:"patientList",
		  // 注册组件
		components: {
		  // Pagination
		},
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				drugData:[],
				total: 0,
				page: 1,
				listLoading: false,
				currentPage: 4,
				sels: [],//列表选中列
				editLoading: false,
				addLoading: false,
				   formInline: {
					page: 1,
					limit: 10,
					varLable: '',
					varName: '',
				},
				// 分页参数
				pageparm: {
					currentPage: 1,
					pageSize: 10,
					total: 10
				}
			}
		},
		  /**
		 * 创建完毕
		 */
		created() {
			// this.getdata(this.formInline)
		},
		methods: {
			    // 获取公司列表
    getdata(parameter) {
      this.loading = true
      // 模拟数据
      let res = {
        code: 0,
        msg: null,
        count: 5,
        data: [
          {
            age: 56,
            editUser: null,
            addTime: 1521062371000,
            editTime: 1526700200000,
            deptId: 2,
            deptName: '上海分公司',
            deptNo: '1',
            parentId: 1
          },
          {
            age: 43,
            editUser: null,
            addTime: 1521063247000,
            editTime: 1526652291000,
            deptId: 3,
            deptName: '上海测试',
            deptNo: '02',
            parentId: 1
          },
          {
            age: 34,
            editUser: null,
            addTime: 1526349555000,
            editTime: 1526349565000,
            deptId: 12,
            deptName: '1',
            deptNo: '11',
            parentId: 1
          },
          {
            age: 76,
            editUser: null,
            addTime: 1526373178000,
            editTime: 1526373178000,
            deptId: 13,
            deptName: '5',
            deptNo: '5',
            parentId: 1
          },
          {
            age: 67,
            editUser: null,
            addTime: 1526453107000,
            editTime: 1526453107000,
            deptId: 17,
            deptName: 'v',
            deptNo: 'v',
            parentId: 1
          }
        ]
      }
      this.loading = false
      this.listData = res.data
      // 分页赋值
      this.pageparm.currentPage = this.formInline.page
      this.pageparm.pageSize = this.formInline.limit
      this.pageparm.total = res.count
      // 模拟数据结束

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      // deptList(parameter)
      //   .then(res => {
      //     this.loading = false
      //     if (res.success == false) {
      //       this.$message({
      //         type: 'info',
      //         message: res.msg
      //       })
      //     } else {
      //       this.listData = res.data
      //       // 分页赋值
      //       this.pageparm.currentPage = this.formInline.page
      //       this.pageparm.pageSize = this.formInline.limit
      //       this.pageparm.total = res.count
      //     }
      //   })
      //   .catch(err => {
      //     this.loading = false
      //     this.$message.error('菜单加载失败，请稍后再试！')
      //   })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
		// 更改表头样式
		tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
		if (rowIndex === 0) {
			return 'border-bottom: 1px solid #ebeef5;background: #3D57AA;border: 1px solid #fff;color: white;font-weight: normal;'
		}
		},
		handleSizeChange(val) {
        console.log(`total ${val} `);
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			console.log(`crrent: ${val}`);
		},
		//获取药品列表
		getDrugInfo: function(){
			var name=this.filters.name;
			getDrugList(name).then((res) => { 
				this.drugData = res.data.data;
				});
       },
		mounted() {
			this.getDrugInfo();
		}
	}
}
</script>
<style scoped lang="scss">
.query-conditions{
	text-align:right;
	background: #F9F9F9;
	margin: 0px;
}
.search-form{line-height: 40px;}
.search-input {
    text-indent: 8px;
    font-weight: 600;
    border-radius: 2px;
	width:270px;
	// height:25px  !important;
}
.searchImg{z-index: 100;
    position: relative;
    margin-right: -30px;}
 .title-size {
    font-size: 24px;
    font-weight: bold;
    color: rgb(74, 74, 74);
    margin: 0px;
	text-align:left;
	margin-left:10px;
  }
  .btn-search{background: #3D57AA}
.table-head-cell{
	border-bottom: 1px solid #ebeef5;
    background: #3D57AA;
    border: 1px solid #fff;
    color: white;
    font-weight: normal;}
	.com-table{height:400px;width:100%}
</style>