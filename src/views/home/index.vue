<template>
  <div class="home-container">
    <div class="top-info-wrap">
      <div class="left-wrap">
        <div class="left-top-wrap">
          <div class="hello">你好！</div>
          <div class="day">今天是{{info.day}}</div>
          <van-image width="30px" height="30px" round :src="require('../../assets/sun.png')" class="sun-img" />
        </div>
        <div class="name">{{info.name}}老师</div>
      </div>
      <van-icon size="60" :name="require('../../assets/head-img.jpeg')" badge="3" class="head-img" />
    </div>
    <div class="state-info-wrap">
      <div class="state-item-wrap" @click="toCourseList" >
        <van-icon size="25" :name="require('../../assets/home-course.png')" class="home-course-img" />
        <div class='state-name'>课程</div>
        <div class='state-number'>12</div>
      </div>
      <div class="state-item-wrap">
        <van-icon size="25" :name="require('../../assets/home-act.png')" class="home-course-img" />
        <div class='state-name'>社团</div>
        <div class='state-number'>4</div>
      </div>
      <div class="state-item-wrap" @click="toExamAprove">
        <van-icon size="25" :name="require('../../assets/home-check.png')" class="home-course-img" />
        <div class='state-name'>审核</div>
        <div class='state-number'>3</div>
      </div>
    </div>
    <div class="select-add-wrap">
      <van-popover v-model:show="showPopover" placement="bottom-end" :actions="actions" @select="addSelect">
        <template #reference>
          <van-icon size="25" :name="require('../../assets/add-icon.png')" class="add-icon"   />
        </template>
      </van-popover>
    </div>
    <div class="card-wrap">
      <div class="title-wrap">
        <van-cell value="更多" is-link :icon="require('../../assets/circle.png')" size="15" >
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
    <div class="card-wrap">
      <div class="title-wrap">
        <van-cell value="更多" is-link :icon="require('../../assets/circle.png')" size="15" >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="course-title">社团</span>
            <span class="course-eng">Association</span>
          </template>
        </van-cell>
      </div>
      <div class="card-list-wrap">
          <div class="card-item-wrap"
            v-for="(item, index) in associationList"
            :key="index" >
            <router-link :to="{name:'associationInfo',params:{id:item.code}}" >
            <van-image :src="item.img" class="card-img" />
            <div class="info-wrap">
              <van-icon size="25" :name="require('../../assets//add-icon.png')" class="info-type-icon"   />
              <span class="grade">{{item.name}}</span>
            </div>
            </router-link>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Image, Button, Icon, Grid, GridItem, Popover, Toast, Cell, CellGroup } from 'vant'

export default {
  name: 'HomeIndex',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Popover.name]: Popover,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup

  },
  data () {
    return {
      info: {
        day: '星期五',
        name: 'Eva'
      },
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
        }
      ],
      associationList: [
        {
          id: 1,
          img: 'http://qiniu.fmg.net.cn/picture-1642130954000',
          code: '#123',
          name: '英语社'
        }, {
          id: 2,
          img: 'http://qiniu.fmg.net.cn/picture-1642130954000',
          code: '#123',
          name: '数学社'
        }
      ]
    }
  },
  setup () {
    const showPopover = ref(false)
    // 通过 actions 属性来定义菜单选项
    const actions = [
      { text: '创建课程', id: '1' },
      { text: '创建社团', id: '2' }
    ]
    return {
      actions,
      showPopover
    }
  },
  methods: {
    toExamAprove () {
      this.$router.push({
        name: 'examApproveIndex'
      })
    },
    toCourseList () {
      this.$router.push({
        name: 'courseListIndex'
      })
    },
    addSelect (actions) {
      if (actions.id === '1') {
        this.$router.push({
          name: 'createCourseIndex'
        })
      }
      if (actions.id === '2') {
        this.$router.push({
          name: 'createAssociationIndex'
        })
      }
    }
  }
}
</script>

<style lang="less">
.home-container{
  padding-bottom: 50px;
  .top-info-wrap{
    display: flex;
    padding: 10px 15px;
    padding-top: 25px;
    background-color: rgba(234, 244, 253, 1);
    .left-wrap{
      text-align: left;
      .left-top-wrap{
        display: inline-flex;
        align-items: center;
        .hello{
          font-weight: 650;
          font-size: 25px;
          color: #AAAAAA;
        }
        .day{
          font-weight: 650;
          font-size: 25px;
          color: rgba(0, 0, 0, 0.8);
        }
      }
      .name{
        font-size: 25px;
        font-weight: 700;
        color: #7F7F7F;
      }
    }
    .head-img{
      margin-left: auto;
      .van-icon__image {
        border-radius: 99px;
        border: 3px solid #9ec9e9;
      }
      .van-badge--top-right {
        top: 5px;
        right: 5px;
      }
    }
  }
  .state-info-wrap{
    display: flex;
    padding:0px 22px;
    padding-bottom: 20px;
    background-color: rgba(234, 244, 253, 1);
    justify-content: space-around;
    .state-item-wrap{
      display: inline-flex;
      background-color: #cde6f8;
      border-radius: 30px;
      padding: 5px 10px;
      flex-wrap:wrap;
      .home-course-img{
        margin-right: 5px;
      }
      .state-name{
        align-self: center;
        flex:1;
        font-size: 15px;
      }
      .state-number{
        align-self: center;
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
  .select-add-wrap{
    padding: 5px 15px;
    background-color: #92bcdd;
    display: flex;
    .add-icon{
      align-self: center;
      margin-left: auto;
    }
    .van-popover__wrapper {
      display: inline-block;
      margin-left: auto;
    }
    .van-cell__left-icon {
    align-self: center;
    }
  }
  .card-wrap{
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
      display: inline-flex;
      justify-content: space-around;
      padding:5px 5px;
      background-color: white;
      margin-bottom: 10px;
      .card-item-wrap{
        background-color: #cde6f8;
        border-radius: 20px;
        padding: 5px 5px;
        margin: 5px 5px;
        box-shadow: #7f7f7f60 1px 1px 5px;
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
