<template>
  <div class="login-main">
    <div class="login-title">
      <img src="../assets/images/InsightZen-Logo.png" width="133px;" />
      <header class="layui-elip">{{$t('language.dashborad')}}</header>
    </div>
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h2>{{$t('loginpage.welcome')}}</h2>
      <h4>{{$t('loginpage.logincontinue')}}</h4>
      <el-form-item prop="account">
        <div class="form-dis">{{$t('loginpage.account')}}</div>
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" class="input-vl"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <div class="form-dis">{{$t('loginpage.password')}}</div>
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off" class="input-vl"></el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
      <el-form-item class="login-el-btn">
        <el-button
          type="primary"
          @click.native.prevent="handleSubmit2"
          :loading="logining"
          class="login-btn"
        >{{$t('loginpage.login')}}</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
    <div class="footer">
      <span>{{$t('loginpage.copyright')}}</span>
      <div class="language-switch">
        <el-dropdown
          trigger="hover"
          class="el-dropdown-item"
          style="padding: 10px 0px 30px 0px;color: white;"
        >
          <span class="el-dropdown-link" style="display: inline-flex;align-items: baseline;">
            <img height="12px" class="imgswitch" :src="imgurl" />
            <span>{{$t('language.name')}}</span>
            <img src="../assets/images/arrow1.png" height="10px;" width="15px" />
          </span>
          <el-dropdown-menu slot="dropdown" class="drp-show" @click.native="changeLangEvent">
            <el-dropdown-item>zh</el-dropdown-item>
            <el-dropdown-item>en</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { verifyLogin } from "../api/api";
export default {
  data() {
    return {
      logining: false,
      imgurl: require("./../assets/images/english.png"),
      ruleForm2: {
        account: "user",
        password: "User2019"
      },
      userInfo: [
        {
          account: "user",
          password: "User2019"
        }
      ],
      rules2: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      }
      // checked: true
    };
  },
  methods: {
    changeLangEvent() {
      if (this.lang === "zh") {
        this.lang = "en";
        this.$i18n.locale = this.lang; //关键语句
        debugger;
        this.imgurl = require("./../assets/images/english.png");
      } else {
        this.lang = "zh";
        this.$i18n.locale = this.lang; //关键语句
        this.imgurl = require("./../assets/images/chinaflag.png");
      }
    },
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          //           var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.password };
          //            verifyLogin(loginParams).then(data => {
          //              if(data.msg=="login success"){
          //              this.logining = true;
          //              var user=[{name: this.ruleForm2.account,password: this.ruleForm2.password}];
          //              sessionStorage.setItem('user', JSON.stringify(user));
          //              this.$router.push({ path: '/Index' });
          //              }else{
          //              this.logining = false;
          //              this.$message({
          //							message: '登录失败，请重新登录！',
          //							type: 'error'
          //            });
          //              }
          //            });
          sessionStorage.setItem("user", JSON.stringify(this.userInfo));
          setTimeout(() => {
            this.$router.push({ name: "index" });
          }, 1000);
        } else {
          console.log("登录失败!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-main {
  position: absolute;
  background: #153a8b;
  width: 100%;
  height: 100%;
  min-height: 768px;
  header {
    line-height: 45px;
    font-size: 24px;
    font-weight: 100;
    color: white;
    text-align: center;
  }
}

.login-container {
  border-radius: 5px;
  background-clip: padding-box;
  margin: 0 auto;
  height: 32rem;
  width: 30rem;
  position: relative;
  top: 28%;
  padding: 50px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  h2 {
    font-size: 2.5em;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    text-align: center;
    margin: 0px;
  }
  h4 {
    font-size: 1em;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    color: rgb(155, 155, 155);
    font-weight: normal;
  }
  .form-dis {
    color: #000;
    font-weight: bold;
    text-align: left;
  }
  .input-vl {
    width: 100%;
    height: 45px;
    border-radius: 5px;
  }
}

.login-title {
  position: absolute;
  vertical-align: middle;
  top: 13%;
  text-align: center;
  line-height: 20px;
  width: 100%;
}
.login-title img {
  width: 10rem;
}
.login-el-btn {
  width: 100%;
  text-align: center;
  .login-btn {
    display: inline-block;
    height: 45px;
    line-height: 45px;
    padding: 0 100px;
    background-color: #153a8b;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-top: 20px;
    filter: alpha(opacity=90);
    border-radius: 20px;
    width: 100%;
  }
}

.footer {
  bottom: 0px;
  position: absolute;
  vertical-align: middle;
  text-align: center;
  font-size: 12px;
  color: white;
  width: 100%;
}
</style>
