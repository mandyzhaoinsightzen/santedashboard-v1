<template>
    <div class="index">
        <div class="container" >  
          <!--轮播图-->
          <carousel></carousel>
          <div class="main">
           <div class="main-center">
                <v-col span="16">
               <div class="information">
                 <v-col span="11">
                   <div class="info-title">
                     <span></span><h2>信息咨询</h2>
                   </div>
                 </v-col>
                 <v-col span="13">
                   <div class="info-tab">
                    <router-link to="/" class="margin-left10">信息咨询</router-link>
                    <span></span>
                    <router-link to="/"  class="margin-left10 margin-right30">公示公告</router-link>
                  </div>
                 </v-col>
               </div>
               <div class="info-content">

               </div>
               <div class="info-title">
                     <span></span><h2>报名入口</h2>
               </div>
               <div class="sign-up">
                 
               </div>
            </v-col>
            <v-col span="8">
              <div class="search">
                 <div class="info-title">
                     <span></span><h2>考生服务</h2>
                 </div>
                 <div class="info-phone">
                     <img src="../assets/img/phone.png"/><h3>咨询电话</h3><span>400-6780-0000</span>
                 </div>
                   <hr>
                  <div class="lgn-access">
                    <div class="info-title">
                     <img src="../assets/img/teacher.png"/><h3>快捷登录</h3>
                    </div>
                    <v-form direction="horizontal" :model="loginForm" :rules="loginRules" ref="customRuleForm" class="login-form">
                      <v-form-item label="账号" :label-col="labelCol" :wrapper-col="wrapperCol" prop="pass" has-feedback>
                          <v-input type="text" size="large" v-model="loginForm.code"></v-input>
                      </v-form-item>
                      <v-form-item label="密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="checkPass" has-feedback>
                          <v-input type="password" size="large" v-model="loginForm.password"></v-input>
                      </v-form-item>
                      <v-form-item :wrapper-col="{offset:6, span: 14 }">
                          <v-button type="primary" class="btn" style="margin-right:10px" @click.prevent="submitForm('loginForm')">提交</v-button>
                          <v-button type="ghost" class="btn-reset" @click.prevent="resetForm('loginForm')">重置</v-button>
                      </v-form-item>
                    </v-form>
                    <hr>
                    <div class="info-title">
                      <img src="../assets/img/teacher.png"/><h3>培训进度查询</h3>
                    </div>
                    <v-form>
                      <v-form-item :wrapper-col="{span:16,offset:6}" style="margin-top:24px">
                          <v-button type="primary"   class="btn" >查询进度</v-button>
                      </v-form-item>
                    </v-form>
                  </div> 
                   
              </div>
            </v-col>
          </div>
          <div class="introduce">
             <v-col span="8" class="threepart margin-right50">
               <div class="title">
                 <img src="../assets/img/training.png"/><h2>培训介绍</h2>
               </div>
                <hr>
               <article>
                 时代匠人是一家致力于为中国医美行业提供更系统，更前沿，更细致 的培训机构。特设微整形、整形、双 眼皮、半永久、手术类、注射类、美 牙，皮肤管理等培训课程。
               </article>
                <router-link to="./" class="more">详情<img src="../assets/img/more.png"/></router-link>
             </v-col>
             <v-col span="8" class="threepart margin-right50">
                <div class="title">
                 <img src="../assets/img/course.png"/><h2>课程介绍</h2>
                </div>
                 <hr>
                <article>
                  半永久进修班(韩国)基础mts皮肤管理，最新的韩国纹绣技术，淘汰已经过时的 老式纹眉。
                </article>
                <router-link to="./" class="more">详情<img src="../assets/img/more.png"/></router-link>
             </v-col>
             <v-col span="8" class="threepart">
                <div class="title">
                 <img src="../assets/img/teacher.png"/><h2>名师团队</h2>
                </div>
                <hr>
                <article>
                  学校老师均拥有多年教学和临床经验，为了保证教学质量，老师均会定期 去韩国、泰国等地进修更新更高端的技术。
                </article>
                <router-link to="./" class="more">详情<img src="../assets/img/more.png"/></router-link>
             </v-col>
          </div>
          </div>
        </div>
    </div>
</template>
<script>
import carousel from "@/components/carousel";
export default {
    name: 'index1',
    components:{carousel}, 
    data(){
     return{
            loginForm:{
              code:'',
              password:'',
            },
            labelCol: {  span: 6  },
            wrapperCol: { span: 14},
            loginRules:{
              code: [{ required: true, message: '请输入账号', trigger: 'blur' }],
              password:[{required:true,message:'请输入密码',trigger:'blur'}]
            }
          }
    },
    methods:{
      submitForm(formName){
           this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('登录成功!');
            } else {
                console.log('用户名或密码错误!');
                return false;
            }
            });
      },
      resetForm(formName) {
           this.$refs[formName].resetFields();
     }   
    }
}
</script>
<style scoped>
.index .container{ width: 80%; margin: 0 auto;padding-bottom: 10px;}
.index .container .main{display: block;width: 100%;margin-bottom:30px}
.index .container .main .main-center{width: 100%;}
.index .container .information{display: flex;}
.index .container  .info-title {display: flex;margin-top:35px;}
.index .container  .info-title span{float:left;width:7px;height:38px;background:rgba(0,158,236,1);border-radius:4px;margin: 0px 10px 0px 30px}
.index .container  .info-title  h2{float:left;font-size:30px;font-weight: bold;margin-top: -4px;}

.index .container .information .info-tab{margin-top:35px;float:right;display: inherit;}
.index .container .information .info-tab a{font-size: 16px;color:#707070;font-weight:400;}
.index .container .information .info-tab a:hover{color:#009EEC;}
.index .container .information .info-tab span{position: absolute;width:1px;height:19px;background:#ACACAC;margin: 2px}
.index .container .info-content{
  background: #fff;border-radius:10px;height:300px;margin-top:10px;
}
.index .container .sign-up{background: #fff;border-radius:10px;height:300px;margin-top:10px;}
.index .container .search{background: #fff;border-radius:10px;height:685px;margin:85px 0px 0px 20px;}
.index .container .search h2{text-align:left;;padding: 20px 0px;font-size:30px;font-weight: bold}
.index .container .search hr{width:90%;color:#ABABAB;margin: 0 auto;opacity: 0.5;}

.index .container .search .info-title{padding-top: 20px;align-items: center}
.index .container .search .info-phone {text-align:center;align-items: center;width: 100%;display: block;margin: 0px 0px 20px 0px;
line-height: 40px;}

.index .container .search .info-phone img{vertical-align: middle; display: inline-block;}
.index .container .search .info-phone h3{margin: 0px 10px;vertical-align: middle;display: inline-block;color:#009EEC;font-size:24px;font-weight: bold;}
.index .container .search .info-phone span{font-size: 16px;color:#666666;font-weight:bold;display:inline-block}
.index .container .search .lgn-access{text-align:center;}
.index .container .search .lgn-access .login-form{margin-bottom:45px;}
.index .container .search .lgn-access .info-title{margin:20px 0px 20px 30px}
.index .container .search .lgn-access .info-title img{margin-right:5px}
.index .container .search .lgn-access .info-title  h3{float:left;font-size:24px;font-weight: bold;}

.index .container .introduce{width: 100%;display: -webkit-box;}
.index .container .introduce .threepart{background: #fff;border-radius:10px; width: 31%;;margin-top:30px}
.index .container .introduce .threepart hr{width:90%;color:#CDCDCD;margin: 0 auto;opacity: 0.5}
.index .container .introduce .threepart .title{text-align: center;padding: 20px 0px;}
.index .container .introduce .threepart .title img{display: inline-block;vertical-align: middle;margin-right:10px}
.index .container .introduce .threepart .title  h2{display: inline-block;vertical-align: middle;font-size:26px;color:#666666;font-weight:bold;
}
.index .container .introduce .threepart article{font-size:18px;line-height: 30px;color: #707070;
    letter-spacing: 1px;text-indent: 30px;padding: 30px 30px 20px 30px;min-height:195px;}
.index .container .introduce .more{float: right;margin-right:45px;color:#009EEC;font-size:16px;
margin-bottom:20px;}
.index .container .introduce .more img{margin-left:5px}
.margin-left10{margin-left:10px}
.margin-right30{margin-right:30px}
.margin-right50{margin-right: 3.5%;}
.btn{background: #009EEC;box-shadow: 0px 3px 10px rgba(0,0,0,0.16);height: 35px;font-weight:400;
    border-radius: 5px;font-size:14px;}
.btn-reset{height: 35px;font-weight:400;border-radius: 5px;font-size:14px;}
</style>