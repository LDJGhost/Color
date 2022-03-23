<template>
  <div class="exam-approve-detail-container">
    <van-nav-bar title="审批详情" left-text="返回" left-arrow @click-left="ToBack">
    </van-nav-bar>
    <div class="item-wrap" >
      <div class="top">
        <div class="left"><van-image  width="50px" height="50px" round :src="require('../../assets/head-img.jpeg')" class="studednt-img" /></div>
        <div class="right">
          <div class="name">{{waitList.sname}}</div>
          <div class="name">{{waitList.sid}}</div>
        </div>
      </div>
      <div class="mid" >
        <div class="subject-score">
          申报科目  {{waitList.subject}}&#12288;&#12288;&#12288;&#12288;申报分数  {{waitList.score}}
        </div>
        <div class="reason">
          申报原因  {{waitList.reason}}
        </div>
      </div>
              <!-- <div class="right">
                <div class="state">待审批</div>
              </div>
            </div> -->
    </div>
    <div class="extra-file">附件</div>
    <div class="btn-wrap">
      <van-button round type="primary" class="submit">同意</van-button>
      <van-button round type="primary" class="refuse">拒绝</van-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { NavBar, Toast, Grid, GridItem, Icon, Image, Button, Tab, Tabs, Search, Checkbox, Cell, CellGroup, Popover, ActionSheet, DropdownMenu, DropdownItem } from 'vant'
export default {
  name: 'ExamApproveDetailIndex',
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
      waitList: {
        id: 1,
        sname: '李嘉粤',
        subject: '语文',
        score: '10分',
        sid: '1801050068',
        reason: '小组作业加分'
      }
    }
  }
}
</script>

<style lang="less">
.exam-approve-detail-container{
  background-color: white;
    margin-bottom: 5px;
    padding: 6px 0;
      .item-wrap{
        align-self: center;
        padding:20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.13);
        .top{
          align-self: center;
          display: flex;
          .right{
            display: block;
            margin-left: 10px;
            .name{
              font-size: 14px;
            }
          }
        }
        .mid{
          margin-top: 5px;
          .subject-score{
            font-size: 12px;
            color: rgba(0, 0, 0, 0.671);
          }
          .reason{
            font-size: 12px;
            color: rgba(0, 0, 0, 0.671);
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
      .extra-file{
        font-size: 13px;
        padding:20px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.13);
      }
      .btn-wrap{
        display: flex;
        padding: 20px 20px;
        text-align: center;
        .submit{
          flex:1;
          margin: 0 10px;
        }
        .refuse{
          flex:1;
          margin: 0 10px;
        }
      }
}
</style>
