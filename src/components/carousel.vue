<template>
  <div class="container-swiper">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide class="swiperSlide">
          <div class="banner home-box"><img src="../assets/img/banner1.png">
          </div>
        </swiper-slide>
        <swiper-slide  class="swiperSlide">
          <div class="banner home-box"><img src="../assets/img/banner2.png">
          </div>
        </swiper-slide>
        <swiper-slide  class="swiperSlide">
        <div class="banner home-box"><img src="../assets/img/banner3.png">
        </div>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev"  slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import { swiper, swiperSlide } from "vue-awesome-swiper"
    export default {
      name: "carousel",
      components: {
        swiper,
        swiperSlide
      },
      data() {
          return {
            swiperOption: {
              pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true
              },
              autoplay: {
                delay: 2500,
                disableOnInteraction: false
              },
              loop: true,
              navigation: {
          　　　　nextEl: '.swiper-button-next',
          　　　　prevEl: '.swiper-button-prev'
          　　}
            }
          };
      },
      computed: {
        swiper() {
          return this.$refs.mySwiper.swiper
        }
      },
      mounted() {
        console.log("this is current swiper instance object", this.swiper);
        this.swiper.slideTo(3,1000,false)
      }
    }
</script>

<style scoped>
.container-swiper{margin:0px}
  img {
    width: 100%;
    height: 499px;
    border-radius: 5px;
  }
  .banner {
    position: relative;
    height: 499px;
    width:100%
  }
  .home-box {
    overflow: hidden;
    position: relative;
    z-index: 0;
    margin-top: 10px;
    box-sizing: border-box;
    border-radius: 8px;
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
    width:100%
  }
  .swiper-container,.swiperSlide {width: 100% !important;}
</style>
