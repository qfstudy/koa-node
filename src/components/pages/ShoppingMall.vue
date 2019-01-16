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
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data(){
      return {
        locationIcon: require('../../assets/images/location.png'),
        bannerPicArray:[
          // {imageUrl:'data:image/jpeg;base64,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'},
          // {imageUrl:'data:image/jpeg;base64,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'},
          // {imageUrl:'data:image/jpeg;base64,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'},
        ],
        category:[],
        adBarner:''
      }
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
  }
</style>