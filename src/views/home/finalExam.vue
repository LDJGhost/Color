<template>
  <div class="final-exam-container">
    <van-nav-bar title="期末考评" left-text="返回" left-arrow @click-left="ToBack">
    </van-nav-bar>
    <div class="swipe-wrap">
      <van-tabs v-model:active="active" color="#92bcdd" >
        <van-tab title="待考评">
          <div class="no-exam-wrap">
            <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            class="search-bar-wrap"
            >
              <template #action>
                <div class='search-bar-icon-wrap'>
                  <van-icon size="22" :name="require('../../assets/funnel.png')" class="funnel-icon" @click="showFunnel = true" />
                  <van-popover v-model:show="showPopoverAdd" placement="bottom-end" :actions="actionsAdd" @select="onSelect"  >
                    <template #reference>
                      <van-icon size="25" :name="require('../../assets/add-fill.png')" class="add-fill-icon"   />
                    </template>
                  </van-popover>
                </div>
              </template>
              <template #right-icon>
                <div @click="onClickButton">搜索</div>
              </template>
            </van-search>
            <div class="info-list-wrap">
              <van-cell-group >
                <van-cell class="student-item-wrap"
                v-for="(item, index) in studentList"
                :key="index" >
                  <template #icon>
                    <van-image  width="30px" height="30px" round :src="require('../../assets/head-img.jpeg')" class="studednt-img" />
                  </template>
                  <template #title>
                    <div class="student-info-wrap">
                        <span class="name">{{item.sname}}</span>
                        <span class="number"> {{item.sid}}</span>
                    </div>
                  </template>
                  <template #value>
                    <div class='text-exam'>待考评</div>
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
          </div>
        </van-tab>
        <van-tab title="已考评">
           <div class="no-exam-wrap">
            <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            class="search-bar-wrap"
            >
              <template #action>
                <div class='search-bar-icon-wrap'>
                  <van-icon size="22" :name="require('../../assets/funnel.png')" class="funnel-icon" @click="showFunnel = true" />
                  <van-popover v-model:show="showPopoverAdd" placement="bottom-end" :actions="actionsAdd" @select="onSelect"  >
                    <template #reference>
                      <van-icon size="25" :name="require('../../assets/add-fill.png')" class="add-fill-icon"   />
                    </template>
                  </van-popover>
                </div>
              </template>
              <template #right-icon>
                <div @click="onClickButton">搜索</div>
              </template>
            </van-search>
            <div class="info-list-wrap">
              <van-cell-group >
                <van-cell class="student-item-wrap"
                v-for="(item, index) in studentList"
                :key="index" >
                  <template #icon>
                    <van-image  width="30px" height="30px" round :src="require('../../assets/head-img.jpeg')" class="studednt-img" />
                  </template>
                  <template #title>
                    <div class="student-info-wrap">
                        <span class="name">{{item.sname}}</span>
                        <span class="number"> {{item.sid}}</span>
                    </div>
                  </template>
                  <template #value>
                    <div class='text-exam'>已考评</div>
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { NavBar, Toast, Grid, GridItem, Icon, Image, Button, Tab, Tabs, Search, Checkbox, Cell, CellGroup, Popover, ActionSheet, DropdownMenu, DropdownItem } from 'vant'
export default {
  name: 'FinalExamIndex',
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
    const ToBack = () => history.back()
    const value = ref('')
    const onSearch = (val) => Toast(val)
    const onClickButton = () => Toast(value.value)
    const actionsAdd = [
      { text: '添加学生', icon: 'add-o' },
      { text: '批量导入', icon: 'upgrade' }
    ]
    const showPopoverAdd = ref(false)
    const onSelectMore = (actionsAdd) => Toast(actionsAdd.text)
    return {
      value,
      onSearch,
      onClickButton,
      actionsAdd,
      showPopoverAdd,
      onSelectMore,
      ToBack
    }
  },
  data () {
    return {
      studentList: [
        {
          id: 1,
          sname: '李嘉粤',
          sid: '1801050068',
          score: '10',
          time: '1'
        }, {
          id: 2,
          sname: '李嘉粤',
          sid: '1801050068',
          score: '10',
          time: '1'
        }, {
          id: 3,
          sname: '李嘉粤',
          sid: '1801050068',
          score: '10',
          time: '1'
        }, {
          id: 4,
          sname: '李嘉粤',
          sid: '1801050068',
          score: '10',
          time: '1'
        }, {
          id: 4,
          sname: '李嘉粤',
          sid: '1801050068',
          score: '10',
          time: '1'
        }, {
          id: 4,
          sname: '李嘉粤',
          sid: '1801050068',
          score: '10',
          time: '1'
        }, {
          id: 4,
          sname: '李嘉粤',
          sid: '1801050068',
          score: '10',
          time: '1'
        }, {
          id: 4,
          sname: '李嘉粤',
          sid: '1801050068',
          score: '10',
          time: '1'
        }, {
          id: 4,
          sname: '李嘉粤',
          sid: '1801050068',
          score: '10',
          time: '1'
        }

      ]
    }
  }
}
</script>

<style lang="less">
.final-exam-container{
  background-color: white;
  .no-exam-wrap{
    .search-bar-wrap{
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
      .van-field__body {
        flex: 1;
      }
    }
    .info-list-wrap{
      .student-info-wrap{
        margin-left: 10px;
        align-self: center;
      }
    }
  }
}
</style>
