<template>
  <div class="detail-index-wrap">
    <van-nav-bar title="三年级 1班 语文" left-text="返回" left-arrow>
    </van-nav-bar>
    <div class="pie">
        <div id="pie1">
            <div id="main1" style="float:left;width:100%;height: 500px">22</div>
        </div>
        <div id="pie2">
            <div id="main2" style="float:left;width:100%;height: 120px"></div>
        </div>
    </div>

  </div>
</template>

<script>
import { Image, Button, Icon, Grid, GridItem, Popover, NavBar, Cell, CellGroup } from 'vant'
// import * as echarts from 'echarts'
const echarts = require('echarts/lib/echarts')
// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'DetailInfoIndex',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Popover.name]: Popover,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data () {
    return {
      classList: [
        {
          id: 1,
          name: '三年级1班',
          score: '92.6'
        }, {
          id: 2,
          name: '三年级1班',
          score: '92.6'
        }, {
          id: 3,
          name: '三年级1班',
          score: '92.6'
        }, {
          id: 4,
          name: '三年级1班',
          score: '92.6'
        }
      ],
      opinionData1: [
        {
          name: '邮件营销',
          value: '335'
        }, {
          name: '邮件营销',
          value: '335'
        }
      ]
    }
  },
  created () {
    var a
    const url = this.axios.urls.SYSTEM_tongjibaobiao_list2
    this.axios.post(url, {}).then((response) => {
      console.log(response)
      console.log(response.data.data)
      a = response.data.data
      this.opinionData1 = a
      this.initData()
    }).catch(function (error) {
      console.log(error)
    })
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main1'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        title: {
          text: '公司经济组成形式', // 主标题
          subtext: '科比金融贷款公司', // 副标题
          x: 'center'// x轴方向对齐方式
        },
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)'
        // },
        // legend: {
        //   orient: 'vertical',
        //   bottom: 'bottom',
        //   data: ['用户总资金', '公司总资金', '公司总借款', '用户总还款', '用户总投资']
        // },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      })
    }
  }
}

</script>

<style lang="less">
.detail-index-wrap{
  background-color: white;
}
</style>
