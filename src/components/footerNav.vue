<template>
    <div class="footer" id="footer">
      <div class="container">
        <!-- <div class="siteinfo">
          <img src="../assets/img/qrcode.png">
        </div> -->
        <hr>
        <div class="copyright">
          <h4>Copyright©2020 All rights reserved</h4>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "footerNav",
      data () {
          return {
            visible: false
          }
      }
    }
</script>

<style scoped>
  .footer {
  width: 100%;
  display: block;
}
  .footer .container {
    width: 80%;margin:0 auto;
  }
  .footer .container .siteinfo {
    height: 160px;
    display: block;
    background:#fff;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
  }
 .footer  hr{
     color:#e6e6e6;margin: 0 auto;opacity: 0.5;width:95%;
  }
  .footer .copyright {
    color: #434d55;
    font-size: 14px;
    padding: 15px 0px;
    background:#fff;
    text-align: center;
    font-weight: 400;
  }
</style>
