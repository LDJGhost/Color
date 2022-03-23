<template>
  <div class="exam-approve-container">
    <van-nav-bar title="审批" left-text="返回" left-arrow @click-left="ToBack">
    </van-nav-bar>
    <div class="swipe-wrap">
      <van-tabs v-model:active="active" color="#92bcdd" >
        <van-tab title="待审批">
          <div class="info-list-wrap">
            <div class="item-wrap"
              v-for="(item, index) in waitList"
              :key="index" @click="toDetail" >
              <div class="left">
                <van-image  width="30px" height="30px" round :src="require('../../assets/head-img.jpeg')" class="studednt-img" />
              </div>
              <div class="mid" >
                <div class="name">
                  <span>{{item.sname}}</span>
                </div>
                <div class="subject-score">
                  申报科目 {{item.subject}}&#12288;申报分数 {{item.score}}
                </div>
                <div class="reason">
                  申报原因 {{item.reason}}
                </div>
              </div>
              <div class="right">
                <div class="state">待审批</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已审批">
          <div class="info-list-wrap">
            <div class="item-wrap"
              v-for="(item, index) in waitList"
              :key="index"
              >
              <div class="left">
                <van-image  width="30px" height="30px" round :src="require('../../assets/head-img.jpeg')" class="studednt-img" />
              </div>
              <div class="mid" >
                <div class="name">
                  <span>{{item.sname}}</span>
                </div>
                <div class="subject-score">
                  申报科目 {{item.subject}}&#12288;申报分数 {{item.score}}
                </div>
                <div class="reason">
                  申报原因 {{item.reason}}
                </div>
              </div>
              <div class="right">
                <div class="state">同意</div>
              </div>
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
  name: 'ExamApproveIndex',
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
  methods: {
    toDetail () {
      this.$router.push({
        name: 'examApproveDetailIndex'
      })
    }
  },
  data () {
    return {
      waitList: [
        {
          id: 1,
          sname: '李嘉粤',
          subject: '语文',
          score: '10分',
          reason: '小组作业加分'
        },
        {
          id: 2,
          sname: '李嘉粤',
          subject: '语文',
          score: '10分',
          reason: '小组作业加分'
        },
        {
          id: 2,
          sname: '李嘉粤',
          subject: '语文',
          score: '10分',
          reason: '小组作业加分'
        },
        {
          id: 2,
          sname: '李嘉粤',
          subject: '语文',
          score: '10分',
          reason: '小组作业加分'
        },
        {
          id: 2,
          sname: '李嘉粤',
          subject: '语文',
          score: '10分',
          reason: '小组作业加分'
        }

      ]
    }
  }
}
</script>

<style lang="less">
.exam-approve-container{
  background-color: white;
    margin-bottom: 5px;
    padding: 6px 0;
    .info-list-wrap{
      padding: 5px 10px;
      .item-wrap{
        display: flex;
        align-self: center;
        padding:10px;
        .left{
          align-self: center;
          align-items: center;
        }
        .mid{
          .name{
            font-size: 14px;
            margin-left: 10px;
            font-weight: 400;
          }
          .subject-score{
            font-size: 9px;
            margin-left: 10px;
            color: rgba(0, 0, 0, 0.336);
          }
          .reason{
            font-size: 8px;
            margin-left: 10px;
            color: rgba(0, 0, 0, 0.336);
          }
        }
        .right{
          margin-left: auto;
          display: flex;
          align-self: center;
          .state{
            font-size: 13px;
            margin-left: 3px;
            color: #1989fa;
          }
        }
      }
    }
}
</style>
