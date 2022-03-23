<template>
  <div class="course-list-container">
    <van-nav-bar title="课程列表" left-text="返回" left-arrow  @click-left="ToBack">
    </van-nav-bar>
    <div class="card-wrap">
      <div class="title-wrap">
        <van-cell :icon="require('../../assets/circle.png')" size="15" >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="course-title">课程</span>
            <span class="course-eng">Course</span>
          </template>
        </van-cell>
      </div>
      <div class="card-list-wrap">
        <div class="card-item-wrap"
          v-for="(item, index) in courseList"
          :key="index" >
          <router-link :to="{name:'courseInfoIndex', params:{id:item.code}}" >
          <van-image :src="item.img" class="card-img" />
            <div class="info-wrap">
              <van-icon size="25" :name="require('../../assets//add-icon.png')" class="info-type-icon"   />
              <span class="grade">{{item.grade}}</span>
              <span class="class">{{item.class}}</span>
              <span class="expert">{{item.expert}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Picker, Cell, CellGroup, NavBar, Field, Popup, Button, Image } from 'vant'
// import { ref } from 'vue'
export default {
  name: 'courseListIndex',
  components: {
    [Picker.name]: Picker,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Image.name]: Image
  },
  setup () {
    return {
    }
  },
  methods: {
    ToBack () {
      history.back()
    }
  },
  data () {
    return {
      courseList: [
        {
          id: 1,
          code: '#123',
          img: 'http://qiniu.fmg.net.cn/picture-1642130954000',
          grade: '三年级',
          class: '1班',
          expert: '语文'
        }, {
          id: 2,
          img: 'http://qiniu.fmg.net.cn/picture-1642130954000',
          code: '#123',
          grade: '三年级',
          class: '1班',
          expert: '语文'
        }, {
          id: 2,
          img: 'http://qiniu.fmg.net.cn/picture-1642130954000',
          code: '#123',
          grade: '三年级',
          class: '1班',
          expert: '语文'
        }, {
          id: 2,
          img: 'http://qiniu.fmg.net.cn/picture-1642130954000',
          code: '#123',
          grade: '三年级',
          class: '1班',
          expert: '语文'
        }, {
          id: 2,
          img: 'http://qiniu.fmg.net.cn/picture-1642130954000',
          code: '#123',
          grade: '三年级',
          class: '1班',
          expert: '语文'
        }
      ]
    }
  }
}
</script>

<style lang="less">
  .course-list-container{
    .card-wrap{
      background-color: white;
    .title-wrap{
      .course-title{
        font-size: 18px;
        margin-right: 8px;
        font-weight: 400px;
      }
      .course-eng{
        font-size: 15px;
      }
    }
    .card-list-wrap{
      // display: inline-flex;
      justify-content: space-around;
      padding:5px 5px;
      background-color: white;
      margin-bottom: 10px;
      margin-top: 10px;
      .card-item-wrap{
        background-color: #cde6f8;
        border-radius: 20px;
        padding: 5px 5px;
        margin: 5px 5px;
        width: 160px;
        box-shadow: #7f7f7f60 1px 1px 5px;
        float: left;
        .card-img{
          border-radius: 20px;
          .van-image__error, .van-image__img, .van-image__loading {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 20px;
          }
        }
        .info-wrap{
          display: flex;
          align-self: center;
          font-size: 14px;
          padding:6px 6px;
          color: white;
          background-color: #92bcdd;
          border-radius: 15px;
          .info-type-icon{
            align-self: center;
            margin-right: 1px;
            border-radius: 20px;
          }
          span{
              align-self: center;
              margin-left: 5px;
          }
        }
      }
    }
    }
  }
</style>
