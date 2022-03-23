<template>
  <div class="final-report-container">
    <van-nav-bar title="期末报告" left-text="返回" left-arrow @click-left="ToBack">
    </van-nav-bar>
    <div class="info-list-wrap">
      <van-cell-group >
        <van-cell class="student-item-wrap"
          v-for="(item, index) in studentList"
          :key="index" @click="toReportDetail">
          <template #icon>
            <van-image  width="30px" height="30px" round :src="require('../../assets/head-img.jpeg')" class="studednt-img" />
          </template>
          <template #title>
            <div class="student-info-wrap">
              <span class="name">{{item.sname}}</span>
              <span class="number"> {{item.sid}}</span>
            </div>
          </template>
          <!-- <template #value>
            <div class='text-exam'>待考评</div>
          </template> -->
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
// import { ref } from 'vue'
import { NavBar, Toast, Grid, GridItem, Icon, Image, Button, Tab, Tabs, Search, Checkbox, Cell, CellGroup, Popover, ActionSheet, DropdownMenu, DropdownItem } from 'vant'
export default {
  name: 'FinalreportIndex',
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
    return {
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
  },
  methods: {
    toReportDetail () {
      this.$router.push({
        name: 'finalReportDetailIndex'
      })
    }
  }
}
</script>

<style lang="less">
.final-report-container{
  background-color: white;
  .info-list-wrap{
    .student-info-wrap{
      margin-left: 10px;
      align-self: center;
    }
  }
}
</style>
