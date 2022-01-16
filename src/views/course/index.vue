<template>
  <div class="course-container">
    <van-nav-bar title="听课评课" >
    </van-nav-bar>
    <div class="nav-bar-card-wrap">
      <van-grid direction="horizontal" :column-num="2">
        <van-grid-item to="/">
          <template #icon>
            <van-icon name="play-circle" size="40" color="#9ec9e9"/>
          </template>
          <template #text>
            <div class="bar-card-text-wrap">
              <div class="title">开始评课</div>
              <div class="intro">一键进入评课</div>
            </div>
          </template>
        </van-grid-item>
        <van-grid-item icon="play-circle" >
          <template #icon>
            <van-icon name="play-circle" size="40" color="#9ec9e9" />
          </template>
          <template #text>
            <div class="bar-card-text-wrap">
              <div class="title">邀请评课</div>
              <div class="intro">邀请老师听课</div>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="swip-wrap">
      <van-tabs v-model:active="active" color="#92bcdd">
        <van-tab title="我评的课">
          <div class="my-comment-wrap">
            <div class="course-item-wrap"
              v-for="(item, index) in courseList"
              :key="index">
              <div class="title1">{{item.name}} {{item.day}} {{item.specific}}</div>
              <div class="title2">{{item.day}} {{item.week}} {{item.specific}}</div>
              <div class="title3">授课老师: {{item.teacher}}</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="我讲的课">
            <div class="my-course-wrap">
              <div class="course-item-wrap"
                v-for="(item, index) in myCourseList"
                :key="index">
                <div class="my-course-left-wrap">
                  <div class="title1">{{item.name}}</div>
                  <div class="title2">{{item.day}} {{item.week}} {{item.specific}}</div>
                  <div class="title3">邀请: {{item.invite}}人 评课：{{item.comment}}人</div>
                </div>
                <div class="my-course-right-wrap">
                  <div class="score-number">{{item.score}}</div>
                  <div class="score-text">分数</div>
                </div>
              </div>
            </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { NavBar, Grid, GridItem, Icon, Image, Button, Tab, Tabs } from 'vant'
import { ref } from 'vue'
export default {
  name: 'CourseIndex',
  components: {
    [NavBar.name]: NavBar,
    [Grid.name]: Grid,
    [Image.name]: Image,
    [Button.name]: Button,
    [GridItem.name]: GridItem,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  setup () {
    const active = ref(0)
    return { active }
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
          name: '一年级语文',
          specific: '第一节课',
          day: '12月21日',
          week: '周二',
          teacher: '李某某'
        }, {
          id: 2,
          name: '一年级语文',
          specific: '第一节课',
          day: '12月21日',
          week: '周二',
          teacher: '李某某'
        }, {
          id: 3,
          name: '一年级语文',
          specific: '第一节课',
          day: '12月21日',
          week: '周二',
          teacher: '李某某'
        }
      ],
      myCourseList: [
        {
          id: 1,
          name: '邮票中的数学',
          specific: '第一节课',
          day: '2021年12月21日',
          week: '周二',
          teacher: '李某某',
          score: '87.98',
          invite: '9',
          comment: '6'
        }, {
          id: 2,
          name: '邮票中的数学',
          specific: '第一节课',
          day: '2021年12月21日',
          week: '周二',
          teacher: '李某某',
          score: '87.98',
          invite: '9',
          comment: '6'
        }, {
          id: 3,
          name: '邮票中的数学',
          specific: '第一节课',
          day: '2021年12月21日',
          week: '周二',
          teacher: '李某某',
          score: '87.98',
          invite: '9',
          comment: '6'
        }
      ]
    }
  }
}
</script>

<style lang="less">
.course-container{
  .nav-bar-card-wrap{
    .van-grid-item__content--horizontal {
      flex-direction: row;
      border-radius: 20px;
      margin: 5px 5px;
      margin-top: 10px;
      padding: 5px 0px;
    }
    .bar-card-text-wrap{
      margin: 5px;
      .title{
        font-size: 17px;
      }
      .intro{
        font-size: 11px;
        color: rgba(105, 105, 105, 0.534);
      }
    }
  }
  .swip-wrap{
    margin-top: 20px;
    .my-comment-wrap{
      .course-item-wrap{
        background-color: white;
        border-bottom: 1px solid rgba(0, 0, 0, 0.137);
        padding: 10px 18px;
        .title1{
          font-size: 15px;
        }
        .title2{
          font-size: 12px;
          color:rgba(82, 82, 82, 0.582)
        }
        .title3{
          font-size: 12px;
          color:rgba(82, 82, 82, 0.582)
        }
      }
    }
    .my-course-wrap{
      .course-item-wrap{
        display: flex;
        background-color: white;
        border-bottom: 1px solid rgba(0, 0, 0, 0.137);
        padding: 10px 18px;
        .my-course-left-wrap{
          flex:1;
          .title1{
            font-size: 15px;
          }
          .title2{
          font-size: 12px;
          color:rgba(82, 82, 82, 0.582)
          }
          .title3{
            font-size: 12px;
            color:rgba(82, 82, 82, 0.582)
          }
        }
        .my-course-right-wrap{
          margin-left: auto;
          align-self: center;
          text-align: center;
          .score-number{
            font-size: 17px;
            color: rgb(70, 84, 158);
            font-weight: 400;
          }
          .score-text{
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
