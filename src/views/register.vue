<template>
<div class="register">
  <div  class="container" >
    <h2>新用户注册</h2>
    <v-form direction="horizontal" :model="regisiterForm" :rules="regisiterRules" ref="regisiterRuleForm" >
        <v-form-item label="用户名" :label-col="labelCol" prop="userName" placeholder="请输入手机号或邮箱" :wrapper-col="wrapperCol">
            <v-input type="text" size="large" v-model="regisiterForm.userName"></v-input>
        </v-form-item>
        <v-form-item label="密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="pass" >
            <v-input type="password" size="large" v-model="regisiterForm.pass"></v-input>
        </v-form-item>
        <v-form-item label="确认密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="checkPass">
            <v-input type="password" size="large" v-model="regisiterForm.checkPass"></v-input>
        </v-form-item>
        <v-form-item label="昵称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="age" >
            <v-input size="large" v-model="regisiterForm.age"></v-input>
        </v-form-item>
        <v-form-item label="验证码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="age" >
             <v-input type="text" v-model="regisiterForm.code" auto-complete="off" placeholder="图形验证码" @keyup.enter.native="submitForm('regisiterForm')"></v-input>
        </v-form-item>
        <v-form-item class="check-radio" >
              <v-radio v-model="radio" label="second">我已阅读并同意《用户协议》和《隐私保护声明》</v-radio>
        </v-form-item>
        <v-form-item :wrapper-col="{offset:4, span: 16 }">
             <v-button type="primary" size="large"   @click="submitForm('registerForm')" >注册</v-button>
            <v-button type="ghost" size="large"  @click.prevent="resetForm('registerForm')"  class="marginLeft10">重置</v-button>
        </v-form-item>
    </v-form>
   </div>
  </div>
</template>
<script>
import { login} from '../../api/api'
export default {
    name: 'register',
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.regisiterForm.checkPass !== '') {
                    this.$refs.regisiterRuleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.regisiterForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            regisiterForm: {
                pass: '',
                checkPass: '',
                age: ''
            },
            regisiterRules: {
                pass: [{
                        required: true,
                        message: '请输入密码'
                    },
                    {
                        validator: validatePass
                    }
                ],
                checkPass: [{
                        required: true,
                        message: '请再次输入密码'
                    },
                    {
                        validator: validatePass2
                    }
                ],
               code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
            },
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            }
        } 
    },
   // 创建完毕状态(里面是操作)
   mounted() {
    // 获取图形验证码
    this.getCode()
  },
    methods: {
      getCode() {
        
        },
     submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
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
.register{text-align: center;    margin: 3% 0px;width:100%;}
.container{
    height:520px;
    width: 450px;
    padding: 3% 0%;
    border: 1px solid #dadada;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    background: linear-gradient(#fff,#f5f5f5);
    margin: 0 auto;
}
.container h2{margin-bottom:20px;text-align: center;}
.container .check-radio{text-align: center;font-weight: bold}
.marginLeft10{margin-left:10px;}
</style>