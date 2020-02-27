<template>
  <div id="header">
    <div class="container">
      <v-col span="10">
        <div class="nav-left">
          <a href="javascript:;">
            <!-- <img src="../assets/img/logo.png" height="60px"> -->
            <h3 class="nav-logo"> 
              Sante Admin Portal
            </h3>
          </a>
        </div>
      </v-col>
      <v-col span="14">
       <div class="nav-right">
          <ul class="nav-list">
             <li>
               <router-link to="/index" exact tag="li" activeClass="active">
                <a>Home</a>
              </router-link>
             </li>
             <li>
                <router-link to="/organization" exact tag="li" activeClass="active">
						     <a>Org Manage</a>
					    	</router-link>
            </li>
             <li>
                <router-link to="/user" exact tag="li" activeClass="active">
						     <a>Accunt Manage</a>
						    </router-link>
             </li>
          </ul>
          <div class="btn-login">
             <router-link to="/login">Logout</router-link>
          </div>
         
            <!-- <ul class="nav-aside">
              <li class="nav-user" v-show="userShow">
              <router-link to="/account">个人中心</router-link>
                <div class="nav-user-wrapper">
                  <div class="nav-user-list">
                    <dl class="nav-user-avatar">
                      <dd><span class="ng-scope"></span></dd>
                      <dt class="ng-binding">{{  }}</dt>
                    </dl>
                    <ul>
                    <li  class="logout"><a href="javascript:;">退出</a></li>
                    </ul>
                  </div>
                </div>
              </li>
              <router-link to="/login" v-show="show">
                <button style="color: #d0d0d0 ">登录</button>
              </router-link>
			    	</ul> -->
       </div>
      </v-col>
     
    
    </div>
  </div>
</template>
<script>
export default {
  name:'headerNav',
  data(){
    return {
              userShow: false,
         }
  }
}
</script>
<style scoped>
#header{background: rgb(6, 41, 140);}
#header .container{width:80%;margin:0 auto;}

#header .nav-left{text-align: left;float: left; margin: 25px 0px 0px 30px;}
#header .nav-left h3{color:#fff;font-weight: bold;font-family: 'Microsoft YaHei';font-size:20px;line-height:26px;}
#header .nav-left a{display: inline-flex;text-decoration: none;}
#header .nav-right{float:right;display: flex;}
#header .nav-right .nav-list{
margin-right:45px;
}
#header .nav-right .nav-list li{
  float: left;
  list-style:none;
  }
#header .nav-right  .nav-list a{
    display: inline-block;
    font-size: 16px;
    padding: 30px 15px 20px 15px;
    color: #fff;
    text-decoration: none;
}
#header .nav-right .nav-list a:hover{
	color: #2aa9de;
  background: #fff;
  padding: 30px 15px 17px 15px;
  border-bottom:3px solid #2aa9de
}
#header .nav-right .btn-login{
  margin: 30px 30px 0px 0px;
  font-size: 16px;color: #fff
}
#header .nav-right .btn-login a,span{color: #fff}
</style>