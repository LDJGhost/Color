<template>
  <div class="comment-statistics-container">
    <van-nav-bar title="评价统计" left-text="返回" left-arrow >
    </van-nav-bar>
    <div class="swipe-wrap">
      <van-tabs v-model:active="active" color="#92bcdd" >
      <van-tab title="科目统计">
        <div class="kemu-wrap">
          <div class="search-list-wrap">
            <div class="kemu-title">科目统计</div>
            <van-search
            v-model="value"
            show-action
            @search="onSearch"
            action-text=""
            class="search-bar-wrap"
            >
              <template #action>
                <div @click="onClickButton">搜索</div>
              </template>
            </van-search>
          </div>
          <div class="select-list-wrap">
            <van-dropdown-menu>
              <van-dropdown-item v-model="grade" :options="optionGrade" />
              <van-dropdown-item v-model="clas" :options="optionClass" />
              <van-dropdown-item v-model="week" :options="optionWeek" />
            </van-dropdown-menu>
            <van-popover v-model:show="showPopoverAdd" placement="bottom-end" :actions="actionsAdd" @select="onSelectMore"  >
              <template #reference>
                <van-icon size="25" :name="require('../../assets/add-fill.png')" class="add-fill-icon"   />
              </template>
            </van-popover>
          </div>
        </div>

      </van-tab>
      <van-tab title="班级统计">内容 2</van-tab>
      <van-tab title="素养统计">内容 3</van-tab>
      <van-tab title="历史评价">
      </van-tab>
      <!-- <van-icon size="25" :name="require('../../assets/add-fill.png')" class="add-icon"   /> -->
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { NavBar, Toast, Grid, GridItem, Icon, Image, Button, Tab, Tabs, Search, Checkbox, Cell, CellGroup, Popover, ActionSheet, DropdownMenu, DropdownItem } from 'vant'
export default {
  name: 'CommentStatisticsIndex',
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Grid.name]: Grid,
    [Image.name]: Image,
    [Button.name]: Button,
    [GridItem.name]: GridItem,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Search.name]: Search,
    [Checkbox.name]: Checkbox,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popover.name]: Popover,
    [ActionSheet.name]: ActionSheet,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem
  },
  setup () {
    const value = ref('')
    const onSearch = (val) => Toast(val)
    const onClickButton = () => Toast(value.value)

    const grade = ref(0)
    const clas = ref(0)
    const week = ref(0)
    const optionGrade = [
      { text: '年级', value: 0 },
      { text: '一年级', value: 1 },
      { text: '二年级', value: 2 }
    ]
    const optionClass = [
      { text: '班级', value: 0 },
      { text: '1班', value: 1 },
      { text: '2班', value: 2 }
    ]
    const optionWeek = [
      { text: '周次', value: 0 },
      { text: '第一周', value: 1 },
      { text: '第二周', value: 2 }
    ]
    const actionsAdd = [
      { text: '导入', icon: 'upgrade' },
      { text: '下载', icon: 'down' }
    ]
    const showPopoverAdd = ref(false)
    const onSelectMore = (actionsAdd) => Toast(actionsAdd.text)
    return {
      value,
      onSearch,
      onClickButton,
      grade,
      clas,
      week,
      optionGrade,
      optionClass,
      optionWeek,
      actionsAdd,
      showPopoverAdd,
      onSelectMore
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
.comment-statistics-container{
  background-color: white;
  .kemu-wrap{
    .search-list-wrap{
      display: flex;
      padding: 0 10px;
      .kemu-title{
        font-size: 14px;
        font-weight: 500;
        align-self: center;
        flex:1;
      }
      .search-bar-wrap{
        margin-left: auto;
        .search-bar-icon-wrap{
          width: 55px;
          display: flex;
          .funnel-icon{
            align-self: center;
          }
          .van-popover__wrapper {
            display: flex;
          }
          .add-fill-icon{
            align-self: center;
          }
        }
      }
    }
    .select-list-wrap{
      display: flex;
      padding: 5px 10px;
      .van-dropdown-menu {
        flex: 1;
      }
      .van-popover__wrapper {
        align-self: center;
        margin-left: 5px;
      }
    }
  }
}
</style>
