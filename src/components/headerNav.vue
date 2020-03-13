<template>
	<el-row class="container">
		<el-col :span="6" class="header">
			<div class="header-logo">
			 <img src="../assets/images/InsightZen-Logo.png" height="32px;"><span class="main-title">{{$t('language.dashborad')}}</span>
			</div>
		</el-col>
		<el-col :span="18" class="header">
		  <el-row>
			 <el-col :span="20">
				<div class="nael-right">
					<ul class="nael-list">
						<li>
						<router-link to="./index" exact tag="li" activeClass="active">
							<a>{{$t('menu.home')}}</a>
						</router-link>
						</li>
						<li>
							<router-link to="/organization" exact tag="li" activeClass="active">
										<a>{{$t('menu.orgmanage')}}</a>
										</router-link>
						</li>
						<li>
							<router-link to="/user" exact tag="li" activeClass="active">
										<a>{{$t('menu.accountmanage')}}</a>
										</router-link>
						</li>
					</ul>
				</div>
			 </el-col>
			 <!-- <el-col :span="4">
				<div class="btn-login">
						<router-link to="/login">Logout</router-link>
				</div>
 			</el-col> -->
			<el-col :span="4" class="userinfo">
					<!-- <el-row>
						<span>
							<el-button @click.native.prevent="btnVoucher"  class="voucher">{{$t('loginpage.vouchercodes')}}</el-button>
						</span>
					</el-row>  :data="langData"-->
					<el-dropdown trigger="hover" >
							<span class="el-dropdown-link" style="display: inline-flex;align-items: baseline;"> 
								<img  height="12px"  class="imgswitch" :src="imgurl" />
								<!--src="./../assets/images/english.png" :src="getThumb?enlogourl:chlogourl" :src="$t('homecontent.enlogourl')"-->
								<span >{{$t('language.name')}}</span><img src="../assets/images/up.png" height="10px;" width="15px">
							</span>
							<el-dropdown-menu slot="dropdown" class="drp-show" @click.native="changeLangEvent">
							<el-dropdown-item>zh</el-dropdown-item>
							<el-dropdown-item>en</el-dropdown-item>
						  </el-dropdown-menu>
					</el-dropdown>
						
					<el-dropdown trigger="hover" class="el-dropdown-item"> 
						<span class="el-dropdown-link userinfo-down" style="display: inline-flex;"> 
								<img src="./../assets/images/userlogin.png"  height="35px" style="margin-top:20px"/>
								<span style="margin-top:-15px">	{{sysUserName}}</span>
								<img  src="../assets/images/up.png" height="10px;" width="15px" style="margin-top: 35px;">
						</span>
						<el-dropdown-menu slot="dropdown" class="drp-show">
							<!-- <el-dropdown-item>我的消息</el-dropdown-item>
							<el-dropdown-item>设置</el-dropdown-item> -->
							<el-dropdown-item divided @click.native="logout">{{$t("commonoperation.logout")}}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
			  </el-col>
			</el-row>
		</el-col>
		<el-col :span="24" class="main">
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	// import Pagination from '@/components/Pagination'
	export default {
		components: {
		  // Pagination
		},
		data() {
			return {
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				imgurl:require('./../assets/images/english.png'),
				showFormVisible: false, //控制编辑页面显示与隐藏
				listData:[],
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
				},
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			// 分页插件事件
			callFather(parm) {
			this.formInline.page = parm.currentPage
			this.formInline.limit = parm.pageSize
			this.getdata(this.formInline)
			},
			btnVoucher(){
				this.showFormVisible=true;
			},
			changeLangEvent() {
				if (this.lang === "zh") {
					this.lang = "en";
					this.$i18n.locale = this.lang; //关键语句
					this.imgurl=require('./../assets/images/english.png');
				} else {
					this.lang = "zh";
					this.$i18n.locale = this.lang; //关键语句
					this.imgurl=require('./../assets/images/chinaflag.png');
				}
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});

			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},
			handleCurrentChange(val) {
			this.currentPage = val;
			console.log(`crrent: ${val}`);
		   },
			// 关闭编辑、增加弹出框
			closeDialog() {
				this.showFormVisible = false
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user[0].name || '';
				this.sysUserAvatar = user.avatar || '';
			}
		   this.listData=[
			  {
              Code: "test",
              Status: 1,
              Send: true,
            },
		   ]
		
		}
	}

</script>

<style scoped lang="scss">
#app{ font-family: Arial, Helvetica, sans-serif;}
.main-title{text-align: left;}
.container {
		background: #F9F9F9;
		position: absolute;
		width: 100%;
		}
.container .header {
			height: 110px;
			line-height: 110px;
			background: #153a8b;
			border-bottom: 2px solid #e2dede;
			color:#666;
      
      }
.container .header .header-logo	span{font-weight: bold;font-size: 24px;margin-left:30px;color:#fff}
.container .header .header-logo		img{float: left;margin: 40px 0px 0px 50px;}
			
.container .header	.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				display: inline-flex;}
.container .header	.userinfo   .userinfo-down{
					font-size:14px;padding-top: 15px;
				}
.container .header	.userinfo 	.el-dropdown-link{
					img{margin:0px 3px}
					// span{margin:0px 3px}
				}
.container .header	.userinfo 	.el-dropdown-link span{color:#fff}
.container .header	.userinfo .userinfo-inner {
					cursor: pointer;
					color:#666}
.container .header	.userinfo .userinfo-inner img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
.container .header	.userinfo .userinfo-inner   span{font-weight: bold;font-size:24px;margin-left:20px;color:rgb(240, 233, 233)}

.header .nael-right{    margin: 0 auto;
    display: table;}
.header .nael-right .nael-list{
  margin-top:0px;
}
.header .nael-right .nael-list li{
  float: left;
  list-style:none;
  }
.header .nael-right  .nael-list a{
    font-size: 18px;
    padding: 15px;
    color: #fff;
    text-decoration: none;
}
.header .nael-right .nael-list a:hover{
   	color: #2aa9de;
    background: #fff;
    padding:13px  15px;
    border-bottom:3px solid #2aa9de
}
.header .nael-right .btn-login{
  margin: 30px 30px 0px 0px;
  font-size: 16px;color: #fff
}
.header .nael-right .btn-login a{color: #fff}
</style>