<template>
  <div class="course-info-container">
    <van-nav-bar title="三年级 1班 语文 " left-text="返回" left-arrow  right-text="切换课程">
    </van-nav-bar>
    <van-tabs v-model:active="active" color="#92bcdd">
      <van-tab title="学生">内容 1</van-tab>
      <van-tab title="小组">内容 2</van-tab>
      <van-tab title="成绩">内容 3</van-tab>
      <van-tab title="通知">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Grid, GridItem, Icon, Image, Button, Tab, Tabs } from 'vant'
export default {
  name: 'CourseInfoIndex',
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
  },
  data () {
    return {
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
      ]
    }
  }
}
</script>

<style lang="less">
.course-info-container{
}
</style>
