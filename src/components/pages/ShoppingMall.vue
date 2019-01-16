<template>
  <div>
    <div class="search-bar">
      <van-row >
        <van-col span="3">
          <img :src="locationIcon" width="80%" class="location-icon"/>
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">
            查找
          </van-button>
        </van-col>
      </van-row>
    </div>
     <!--swiper area-->
    <div class="swiper-area">
        <van-swipe :autoplay="1000">
            <van-swipe-item v-for="( banner ,index) in bannerPicArray" :key="index">
              <img v-lazy="banner.image" width="100%"/>
            </van-swipe-item>
        </van-swipe>
    </div> 
    <!-- type bar -->
    <div class="type-bar"> 
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div> 
    <!-- adbanner -->
    <div>
      <img v-lazy="adBarner" width="100%">
    </div>
    <!-- recommend -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommentGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" alt="" width="80%">
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price}}(￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <floor-component :floorData="floor1"></floor-component>
    </div>
    
  </div>
</template>

<script>
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import axios from 'axios'
  import floorComponent from '../component/floorComponent'
  export default {
    data(){
      return {
        swiperOption:{
          slidesPerView:3
        },
        locationIcon: require('../../assets/images/location.png'),
        bannerPicArray:[],
        category:[],
        adBarner:'',
        recommentGoods:[],
        floor1:[],
        floor1_0:{},
        floor1_1:{},
        floor1_2:{}
      }
    },
    components:{
      swiper,
      swiperSlide,
      floorComponent
    },
    created(){
      axios({
        url:'https://www.easy-mock.com/mock/5c3f2248419c5d0de8845cc9/index',
        method:'get',
      })
      .then(response=>{
        console.log(response)
        if(response.status===200){
          this.category=response.data.data.category
          this.adBarner=response.data.data.advertesPicture.PICTURE_ADDRESS
          this.bannerPicArray=response.data.data.slides
          this.recommentGoods=response.data.data.recommend
          this.floor1=response.data.data.floor1
          this.floor1_0=this.floor1[0]
          this.floor1_1=this.floor1[1]
          this.floor1_2=this.floor1[2]
          
        }
      })
      .catch(error=>{
        console.log(error)
      })
    }
  }
</script>

<style scoped>
  .search-bar{
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
  }
  .search-input{
    width: 100%;
    height: 1.3rem;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid #fff !important;
    background-color: #e5017d;
    color: white;
  }
  .location-icon{
    padding-top: .2rem;
    padding-left: .3rem;
  }
  .swiper-area::after{
    content: '';
    clear:both;
    display: block;
  }
  .swiper-area,.swiper-area img{
    max-height: 8rem;
  }
  .type-bar{
    background-color: white;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .type-bar img{
    width: 90%;
    max-width: 4rem;
    max-height: 4rem;
  }
  .type-bar{
    padding: .3rem;
    font-size: 12px;
    text-align: center;
    flex:1;
  }
  .recommend-area{
      background-color: #fff;
      margin-top:.3rem;
  }
  .recommend-title{
      border-bottom:1px solid #eee;
      font-size:14px;
      padding:.2rem;
      color:#e5017d;
  }
  .recommend-body{
      border-bottom:1px solid #eee;
  }
  .recommend-item{
      width:99%;
      border-right:1px solid #eee;
      font-size:12px;
      text-align: center;
  }

  
</style>