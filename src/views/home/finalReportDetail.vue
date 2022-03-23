<template>
  <div class="final-report-detail-container">
    <van-nav-bar title="期末报告" left-text="返回" left-arrow @click-left="ToBack">
    </van-nav-bar>
    <div class="student-base-info-wrap">
      <div class="title-list-wrap">
        <van-icon name="stop" color="#1989fa"/>
        <span class='title'>学生基本信息</span>
      </div>
      <van-cell class="info-wrap">
        <template #icon>
          <van-image  width="30px" height="30px" round :src="require('../../assets/head-img.jpeg')" class="studednt-img" />
        </template>
        <template #title>
          <div class="name-number">
            <span class="name">{{studentInfo.sname}} </span>
            <span class="number"> {{studentInfo.sid}}</span>
          </div>
          <div class="grade-class">
            <span>{{studentInfo.grade}} {{studentInfo.class}}</span>
          </div>
        </template>
        <template #value>
          <div class="score">92.5</div>
          <div class="zhzp">综合总评</div>
        </template>
      </van-cell>
    </div>
    <div class="develop-trend">
      <div class="title-list-wrap">
        <van-icon name="stop" color="#1989fa"/>
        <span class='title'>成长趋势</span>
      </div>
      <div class="develop-trend-img">
        <van-image width="250px" :src="require('../../assets/develop-trend.png')"  />
      </div>
    </div>
    <div class="term-attendance-wrap">
      <div class="title-list-wrap">
        <van-icon name="stop" color="#1989fa"/>
        <span class='title'>学期考勤</span>
      </div>
      <div class="info-wrap">
        <div class="left-wrap">
          <div class="actual-days"><span class="text">实际出勤天数 </span><span class="number">92</span><span class="text"> 天</span></div>
          <div class="days-list">
            <span class="text">缺勤次数 </span><span class="number"> 0</span><span class="text"> 天</span>
            <span class="right-text">病假次数 </span><span class="number"> 0</span><span class="text"> 天</span>
          </div>
          <div class="days-list">
            <span class="text">旷课次数 </span><span class="number"> 0</span><span class="text"> 天</span>
            <span class="right-text">事假次数 </span><span class="number"> 0</span><span class="text"> 天</span>
          </div>
        </div>
        <div class="right-wrap">
          <van-image width="100px" :src="require('../../assets/100.png')"  />
        </div>
      </div>
    </div>
    <div class="reward-detail-wrap">
      <div class="title-list-wrap">
        <van-icon name="stop" color="#1989fa"/>
        <span class='title'>获奖详情</span>
      </div>
      <div class="info-wrap">
        <table class="table-list" cellspacing="0">
          <tr>
            <th class="number">1</th>
            <th class="detail">2021.12.31 获得2021届三号学生</th>
          </tr>
          <tr>
            <th class="number">2</th>
            <th class="detail">2021.12.31 获得2021届三号学生</th>
          </tr>
          <tr>
            <th class="number">3</th>
            <th class="detail">2021.12.31 获得2021届三号学生</th>
          </tr>
        </table>
      </div>
    </div>
    <div class="good-wrap">
      <div class="title-list-wrap">
        <van-icon name="stop" color="#1989fa"/>
        <span class='title'>表扬</span>
      </div>
      <div class="info-list-wrap">
        <div class="item-wrap"
          v-for="(item, index) in goodList"
          :key="index" >
          <div class="left">
            <van-image  width="30px" height="30px" round :src="require('../../assets/head-img.jpeg')" class="studednt-img" />
          </div>
          <div class="mid" >
            <div class="good-title">
              <span class="name">{{item.title}}</span>
            </div>
            <div class="teacher">
              由{{item.teacher}}
            </div>
            <div class="time">
              在{{item.time}}点评
            </div>
          </div>
          <div class="right">
            <div class="score">+1</div>
            <div class="fen">分</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bad-wrap">
      <div class="title-list-wrap">
        <van-icon name="stop" color="#1989fa"/>
        <span class='title'>待改进</span>
      </div>
      <div class="info-list-wrap">
        <div class="item-wrap"
          v-for="(item, index) in badList"
          :key="index" >
          <div class="left">
            <van-image  width="30px" height="30px" round :src="require('../../assets/head-img.jpeg')" class="studednt-img" />
          </div>
          <div class="mid" >
            <div class="good-title">
              <span class="name">{{item.title}}</span>
            </div>
            <div class="teacher">
              由{{item.teacher}}
            </div>
            <div class="time">
              在{{item.time}}点评
            </div>
          </div>
          <div class="right">
            <div class="score">-1</div>
            <div class="fen">分</div>
          </div>
        </div>
      </div>
    </div>
    <div class="subject-comment">
      <div class="title-list-wrap">
        <van-icon name="stop" color="#1989fa"/>
        <span class='title'>学科素质评价</span>
      </div>
      <div class="info-wrap">
        <table class="table-list" cellspacing="0">
        <tr class="table-title"><td>学科</td><td>平时</td><td>期末</td></tr>
        <tr class="detail"><td class="subject">语文</td><td>A</td><td>B</td></tr>
        <tr class="detail"><td class="subject">数学</td><td>A</td><td>C</td></tr>
        <tr class="detail"><td class="subject">英语</td><td>A</td><td>C</td></tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from 'vue'
import { NavBar, Toast, Grid, GridItem, Icon, Image, Button, Tab, Tabs, Search, Checkbox, Cell, CellGroup, Popover, ActionSheet, DropdownMenu, DropdownItem } from 'vant'
export default {
  name: 'FinalReportDetailIndex',
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
      studentInfo:
        {
          id: 1,
          sname: '李嘉粤',
          sid: '1801050068',
          grade: '三年级',
          class: '1班'
        },
      goodList: [
        { id: 1, title: '遵守纪律', teacher: 'mon老师', time: '2021.12.20 12:34:23' },
        { id: 2, title: '遵守纪律', teacher: 'mon老师', time: '2021.12.20 12:34:23' },
        { id: 3, title: '遵守纪律', teacher: 'mon老师', time: '2021.12.20 12:34:23' }
      ],
      badList: [
        { id: 1, title: '迟到', teacher: 'mon老师', time: '2021.12.20 12:34:23' },
        { id: 2, title: '早退', teacher: 'mon老师', time: '2021.12.20 12:34:23' },
        { id: 3, title: '缺勤', teacher: 'mon老师', time: '2021.12.20 12:34:23' }
      ]
    }
  },
  methods: {
    toReportDetail () {
      this.$router.push({
        name: 'finalReportDetail'
      })
    }
  }
}
</script>

<style lang="less">
.final-report-detail-container{
  .title-list-wrap{
      font-size: 16px;
      font-weight: 500;
      padding: 4px 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.13);
    }
  .student-base-info-wrap{
    background-color: white;
    margin-bottom: 5px;
    .info-wrap{
      .name-number{
        margin-left: 10px;
        align-self: center;
        .name{
          font-size: 14px;
        }
        .number{
          font-size: 13px;
          color: rgba(0, 0, 0, 0.507);
        }
      }
      .grade-class{
        margin-left: 10px;
      }
      .score{
        font-size: 20px;
        font-weight: 500;
        color: #1989fa;
      }
      .zhzp{
        font-size: 12px;
      }
    }
  }
  .develop-trend{
    background-color: white;
    margin-bottom: 5px;
    padding: 6px 0;
    .develop-trend-img{
      text-align: center;
      padding: 5px;
    }
  }
  .term-attendance-wrap{
    background-color: white;
    margin-bottom: 5px;
    padding: 6px 0;
    .info-wrap{
      display: flex;
      .left-wrap{
        padding: 4px 10px;
        .actual-days{
          .text{
            font-size: 15px;
          }
          .number{
            font-size: 20px;
            font-weight: 400;
            color: #1989fa;
          }
        }
        .days-list{
          .text{
            font-size: 11px;
          }
          .right-text{
            font-size: 11px;
            margin-left: 18px;
          }
          .number{
            font-size: 13px;
            font-weight: 400;
            color: #1989fa;
          }
        }
      }
      .right-wrap{
        text-align: center;
        padding: 5px;
        margin-left: auto;
      }
    }
  }
  .reward-detail-wrap{
    background-color: white;
    margin-bottom: 5px;
    padding: 6px 0;
    .info-wrap{
      padding: 6px 0;
      table,table tr th, table tr td { border:1px solid #5555553d; }
      .table-list{
        width: 100%;
        .number{
          font-size: 19px;
          padding: 10px 5px;
          color: rgba(0, 0, 0, 0.466);
        }
        .detail{
          font-size: 13px;
          padding: 10px 5px;
           color: rgba(0, 0, 0, 0.466);
        }
      }
    }
  }
  .good-wrap, .bad-wrap{
    background-color: white;
    margin-bottom: 5px;
    padding: 6px 0;
    .info-list-wrap{
      .item-wrap{
        display: flex;
        align-self: center;
        padding:10px;
        .left{
          align-self: center;
          align-items: center;
        }
        .mid{
          .good-title{
            font-size: 14px;
            margin-left: 10px;
            font-weight: 400;
          }
          .teacher{
            font-size: 9px;
            margin-left: 10px;
            color: rgba(0, 0, 0, 0.336);
          }
          .time{
            font-size: 8px;
            margin-left: 10px;
            color: rgba(0, 0, 0, 0.336);
          }
        }
        .right{
          margin-left: auto;
          display: flex;
          align-self: center;
          .score{
            font-size: 15px;
            color: red;
          }
          .fen{
            font-size: 13px;
            margin-left: 3px;
          }
        }
      }
    }
  }
  .subject-comment{
    padding: 6px 0;
    background-color: white;
    margin-bottom: 5px;
    table,table tr th, table tr td { border:1px solid #5555553d; }
    .info-wrap{
      padding: 5px 10px;
    }
    .table-list{
      width: 100%;
      text-align: center;
      .table-title{
      background-color: #8eafd1;
      font-size: 11px;
      font-weight: 400;
      }
      .detail{
        font-size: 11px;
        color: rgba(0, 0, 0, 0.623);
      }
    }
  }
}
</style>
