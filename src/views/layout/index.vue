<template>
  <div class="layout-container">
    <router-view />

    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route >
      <van-tabbar-item to="/home">
        <span>教师课堂</span>
        <template #icon="props">
          <img :src="props.active ? require('../../assets/bar/home.png') : require('../../assets/bar/i-home.png')" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/discipline">
        <span>班风班纪</span>
        <template #icon="props">
          <img :src="props.active ? require('../../assets/bar/i-dis.png') : require('../../assets/bar/dis.png')" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/course">
        <span>听课评课</span>
        <template #icon="props">
          <img :src="props.active ? require('../../assets/bar/course.png') : require('../../assets/bar/i-course.png')" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? require('../../assets/bar/my.png') : require('../../assets/bar/i-my.png')" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
import { ref } from 'vue'

export default {
  setup () {
    const active = ref(0)
    return {
      active
    }
  },
  name: 'LayoutIndex',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [ref.name]: ref
  }
}
</script>

<style lang="less">
.layout-container{
  .van-tabbar-item--active {
      color: #9ec9e9;
  }
}
</style>
