<template>
<div class="login">
   <h2 >Sante Admin Portal</h2>
    <div  class="container">
      <h3>Sign in</h3>
      <v-form direction="horizontal" :model="loginForm" :rules="loginRules" ref="plLoginRules">
         <v-form-item label="account" :label-col="labelCol" prop="account" placeholder="account"
          :wrapper-col="wrapperCol">
            <v-input type="text" size="large" v-model="loginForm.userName" placeholder="account" ></v-input>
            </v-form-item>
            <v-form-item label="password" :label-col="labelCol"  prop="password" :wrapper-col="wrapperCol">
              <v-input type="password"  size="large" v-model="loginForm.code" placeholder="password" ></v-input>
            </v-form-item>
              <v-form-item :wrapper-col="{offset:4, span: 16 }">
                  <v-button type="primary" size="large"   @click="submitForm('loginForm')" >Sign in</v-button>
                <v-button type="ghost" size="large"  @click.prevent="resetForm('loginForm')"  class="marginLeft10">Reset</v-button>
            </v-form-item>
       </v-form>
      </div>
   </div>
</template>
<script type="text/ecmascript-6">
import { login,getCodeImg} from '../api/api'
export default {
    name: 'login',
    data() {
        return {
            loginForm: {
                account: '',
                password: '',
            },
            userInfo:[{
               account: 'user',
                password: 'user',}
            ],
            loginRules: {
              userName:[{
                    required:true,
                    message:'account',
              }],
              password: [
                  {required: true, message: 'account'},
                  {min: 5, max: 25, message: '长度在 5 到 25个字符'},
                  {pattern: /^(\w){5,25}$/, message: '只能输入5-25个字母、数字、下划线'}
                ],
            },
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            }
        } 
    },methods:{
      submitForm(formName) {
         localStorage.setItem('userInfo',this.userInfo )
          setTimeout(() => {
            this.$router.push({ name: 'index' })
          }, 1000)
            // this.$refs[formName].validate((valid) => {
            // if (valid) {
                
            // } else {
            //     console.log('error submit!!');
            //     return false;
            // }
            // });
        },
      resetForm(formName) {
              this.$refs[formName].resetFields();
          },
    }
  }
</script>
<style scoped>
.login{text-align: center;position: absolute;width:100%;min-height: 700px;}
.login h2{padding: 50px 0px;background: rgb(6, 41, 140);color:white;margin-bottom: 50px;}
.container{
    height:380px;
    width: 450px;
    padding: 3% 0%;
    border: 1px solid #dadada;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    background: linear-gradient(#fff,#f5f5f5);
    margin: 0 auto;
    /* box-shadow: 0 9px 30px -6px rgba(0,0,0,.2), 0 18px 20px -10px rgba(0,0,0,.04), 0 18px 20px -10px rgba(0,0,0,.04), 0 10px 20px -10px rgba(0,0,0,.04); */
}
.container h3{margin-bottom:20px}
.container p{margin:20px 18%;text-align: right;}
.marginLeft10{margin-left:10px;}

</style>