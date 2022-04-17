<template>
  <div class="course-info-container">
    <van-nav-bar title="批量点评 " left-text="返回" left-arrow  right-text="提交" @click-left="ToBack">
    </van-nav-bar>
    <div class="swipe-wrap">
      <van-dropdown-menu>
        <van-dropdown-item title="学生列表" ref="item" color="#92bcdd">
          <div class="StudentList">
            <div class="StudentContainer" v-for="item in studentList" :key="item.id" >
              {{ item.sname }}
              <van-icon name="clear" size="15" color="#1989fa" class="delete" @click.stop="removeStudent(item.id)"/>
            </div>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
      <van-dialog v-model:show="showAddEvaluation" title="添加评语" :beforeClose="addEvaluation" show-cancel-button confirmButtonText="添加">
        <van-cell-group inset>
          <!-- 输入任意文本 -->
          <van-field v-model="itemText" label="评语模板" placeholder="请输入"/>
          <van-radio-group v-model="evaluationType" direction="horizontal" style="justify-content: space-around; margin:20px 0px 20px 0px">
            <van-radio name="1">奖励</van-radio>
            <van-radio name="2">惩罚</van-radio>
          </van-radio-group>
        </van-cell-group>
      </van-dialog>
      <van-tabs v-model:active="active" color="#92bcdd" @click-tab="testChart">
        <van-tab title="评价">
          <div class="student-wrap" style="padding-bottom: 100px">
            <van-cell center title="学科选择" >
              <template #right-icon>
                <van-popover v-model:show="showPopover" :actions="actions" @select="onSelect" >
                  <template #reference>
                    <van-cell is-link arrow-direction="down" size="large" >{{selectSubject}}</van-cell>
                  </template>
                </van-popover>
              </template>
            </van-cell>
            <div class="student-list-wrap">
              <van-checkbox-group v-model="checked" ref="checkboxGroup">
                <van-cell-group >

                  <van-cell class="student-item-wrap"
                            center
                            v-for="(item, index) in evaluationList"
                            :key="item.id"
                           >
                    <template #icon>
                      <van-checkbox
                        shape="square"
                        :name="item.id"
                        :ref="el => checkboxRefs[index] = el"
                        @click="toggle(index)"
                      />
                    </template>
                    <template #value>
                      <p style="margin-left: 10px">{{ item.text }}</p>
                    </template>
                    <template #right-icon>
                      <van-popover
                        v-model:show="item.showScore"
                        :actions="ScoreActions"
                        @select="ScoreSelect($event, item)"
                        >
                        <template #reference>
                          <van-cell is-link arrow-direction="down" size="large" >{{ item.type }}{{item.score}}分</van-cell>
                        </template>
                      </van-popover>
                    </template>
                  </van-cell>

                </van-cell-group>
              </van-checkbox-group>
            </div>
            <van-sticky :offset-bottom="15" position="bottom">
              <div class="many-comment">
                <van-button type="primary" block class="many-comment-btn" @click="showAddEvaluation = true">自定义</van-button>
              </div>
            </van-sticky>
          </div>
        </van-tab>
        <van-tab title="特殊奖惩">
          <div class="student-wrap">
            <van-cell center title="特别奖励" ></van-cell>
            <div class="AwardList">
              <van-radio-group v-model="chosenAwardId">
                <van-cell-group >
                  <van-cell class="AwardItem"
                            center
                            v-for="item in AwardList"
                            :key="item.id"
                            @click="chosenAwardId=item.id">
                    <template #right-icon>
                      <van-radio
                        shape="square"
                        :name="item.id"
                        @click="chosenAwardId=item.id"
                      />
                    </template>
                    <template #title>
                      <p style="margin-left: 10px">{{ item.text }}</p>
                    </template>
                  </van-cell>

                </van-cell-group>
              </van-radio-group>
            </div>
          </div>
          <van-cell-group inset style="border: 1px black solid; margin-top: 15px">
            <van-field
              v-model="AwardInfo"
              rows="2"
              autosize
              label="理由"
              type="textarea"
              maxlength="50"
              placeholder="请输入理由"
              show-word-limit
            />
          </van-cell-group>
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"/>
          <van-cell center title="特别惩罚" ></van-cell>
          <div class="AwardList">
            <van-radio-group v-model="chosenPunishId">
              <van-cell-group >
                <van-cell class="AwardItem"
                          center
                          v-for="item in PunishList"
                          :key="item.id"
                          @click="chosenPunishId=item.id">
                  <template #right-icon>
                    <van-radio
                      shape="square"
                      :name="item.id"
                      @click="chosenPunishId=item.id"
                    />
                  </template>
                  <template #title>
                    <p style="margin-left: 10px">{{ item.text }}</p>
                  </template>
                </van-cell>

              </van-cell-group>
            </van-radio-group>
          </div>
          <van-cell-group inset style="border: 1px black solid; margin-top: 15px; margin-bottom: 35px">
            <van-field
              v-model="PunishInfo"
              rows="2"
              autosize
              label="理由"
              type="textarea"
              maxlength="50"
              placeholder="请输入理由"
              show-word-limit
            />
          </van-cell-group>
        </van-tab>
        <van-tab title="历史评价" v-if="showHistory">
          <div id="chart" ref="main">

          </div>
          <div>
            <van-cell-group >
              <van-cell style="display:flex; align-items: center"
                        v-for="(item, index) in historyList"
                        :key="index">
                <template #icon>
                  <van-image  width="80px" height="80px" round :src="require('../../assets/head-img.jpeg')" class="teacher_icon" />
                </template>
                <template #value>
                  <div class="student-info-wrap">
                    <div style="margin-left: 20px">
                      <span class="name">{{item.text}}</span>
                    </div>
                    <div class="historyText">
                      <span class="score">由{{item.tname}}</span>
                      <br>
                      <span class="time">由{{item.date}}点评</span>
                    </div>
                  </div>
                </template>
                <template #right-icon>
                  <div>+{{item.score}}分</div>
                </template>
              </van-cell>

            </van-cell-group>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeUpdate, reactive, nextTick, onBeforeMount } from 'vue'
import { NavBar, Toast, Grid, GridItem, Icon, DropdownMenu, DropdownItem, Image, Button, Tab, Tabs, Search, Checkbox, CheckboxGroup, Cell, CellGroup, Popover, ActionSheet, Sticky, Dialog, Field, Radio, RadioGroup, Divider } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import * as echarts from 'echarts'
export default {
  name: 'CourseInfoIndex',
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
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popover.name]: Popover,
    [ActionSheet.name]: ActionSheet,
    [Sticky.name]: Sticky,
    [Dialog.name]: Dialog,
    [Field.name]: Field,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Divider.name]: Divider,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    'van-dialog': Dialog.Component
  },
  setup () {
    const testChart = ({ title }) => {
      if (title === '历史评价') {
        nextTick(() => {
          const myChart = echarts.init(document.getElementById('chart'))
          // 绘制图表
          myChart.setOption({
            color: ['#91cc75', '#ee6666', '#ffdc60'],
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              // itemWidth: 30,
              // itemHeight: 20,
              top: '15%',
              left: '50%'
              // itemGap: 15,
              // textStyle: {
              //   fontSize: 15
              // }
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                right: '50%',
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
                    fontSize: '10',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [
                  { value: 1048, name: '表扬分' },
                  { value: 735, name: '待改进' },
                  { value: 580, name: '文字点评' }
                ]
              }
            ]
          })
        })
      }
      // const test = document.getElementById('chart')
      // console.log('@@@', test)
    }

    const router = useRouter()
    const route = useRoute()
    const showAddEvaluation = ref(false)
    const itemText = ref('')
    const evaluationType = ref('1')
    const checkedAll = ref(false) // 批量选择
    const checked = ref([])
    const checkboxRefs = ref([])
    const toggle = (index) => {
      checkboxRefs.value[index].toggle()
      console.log(index)
    }
    onBeforeUpdate(() => {
      checkboxRefs.value = []
    })
    const checkboxGroup = ref(null)
    const checkAll = () => {
      if (checkedAll.value !== false) {
        checkboxGroup.value.toggleAll(true)
      } else {
        checkboxGroup.value.toggleAll()
      }
    }
    const historyList = reactive([
      { id: '1', tname: '哈哈哈老师', text: '遵守纪律', date: '2021.12.20 - 11:30', score: 1 },
      { id: '2', tname: '哈哈哈老师', text: '遵守纪律', date: '2021.12.20 - 11:30', score: 2 },
      { id: '3', tname: '哈哈哈老师', text: '遵守纪律', date: '2021.12.20 - 11:30', score: 3 },
      { id: '4', tname: '哈哈哈老师', text: '遵守纪律', date: '2021.12.20 - 11:30', score: 4 },
      { id: '5', tname: '哈哈哈老师', text: '遵守纪律', date: '2021.12.20 - 11:30', score: 5 }
    ])

    const evaluationList = reactive([
      { id: '1', text: '家庭（课堂）作业获得A+', score: 1, type: '+', showScore: false },
      { id: '2', text: '课堂小测试获得A+', score: 1, type: '+', showScore: false },
      { id: '3', text: '课堂上认真倾听，积极发言', score: 1, type: '+', showScore: false },
      { id: '4', text: '作业有进步', score: 1, type: '+', showScore: false },
      { id: '5', text: '上课表现有进步', score: 1, type: '+', showScore: false },
      { id: '6', text: '单元综合练习优秀', score: 1, type: '+', showScore: false },
      { id: '7', text: '家庭作业质量差', score: 1, type: '-', showScore: false },
      { id: '8', text: '书写马虎', score: 1, type: '-', showScore: false },
      { id: '9', text: '课堂不够专注', score: 1, type: '-', showScore: false }
    ])
    const ScoreActions = [
      { text: '1' },
      { text: '5' },
      { text: '10' }
    ]
    const ScoreSelect = (action, item) => {
      item.score = action.text
    }
    const selectSubject = ref('综合素质')
    const showPopover = ref(false)
    const actions = [
      { text: '综合素质' },
      { text: '语文' },
      { text: '数学' },
      { text: '英语' }
    ]
    const onSelect = (action) => {
      selectSubject.value = action.text
      // console.log(action.text)
    }
    const chosenAwardId = ref('')
    const AwardList = ref([
      {
        id: '1',
        text: '蓝紫色的蝴蝶（人文：英语、语文）'
      },
      {
        id: '2',
        text: '黄色的蝴蝶（健康：体育）'
      },
      {
        id: '3',
        text: '黄色的蝴蝶（健康：体育）'
      },
      {
        id: '4',
        text: '黄色的蝴蝶（健康：体育）'
      },
      {
        id: '5',
        text: '黄色的蝴蝶（健康：体育）'
      },
      {
        id: '6',
        text: '黄色的蝴蝶（健康：体育）'
      },
      {
        id: '7',
        text: '黄色的蝴蝶（健康：体育）'
      },
      {
        id: '8',
        text: '黄色的蝴蝶（健康：体育）'
      },
      {
        id: '9',
        text: '黄色的蝴蝶（健康：体育）'
      }
    ])
    const AwardInfo = ref('')
    const chosenPunishId = ref('')
    const PunishList = ref([
      {
        id: '1',
        text: '科学毛毛虫（数学、科学、信息技术）'
      },
      {
        id: '2',
        text: '人文毛毛虫（语文、英语）'
      },
      {
        id: '3',
        text: '健康毛毛虫（体育）'
      },
      {
        id: '4',
        text: '健康毛毛虫（体育）'
      },
      {
        id: '5',
        text: '健康毛毛虫（体育）'
      },
      {
        id: '6',
        text: '健康毛毛虫（体育）'
      },
      {
        id: '7',
        text: '健康毛毛虫（体育）'
      },
      {
        id: '8',
        text: '健康毛毛虫（体育）'
      },
      {
        id: '9',
        text: '健康毛毛虫（体育）'
      }
    ])
    const PunishInfo = ref('')
    const addEvaluation = (action) => {
      let t = '+'
      if (evaluationType.value !== '1') {
        t = '-'
      }
      if (action === 'confirm') {
        const Evaluation = {
          id: evaluationList.length,
          text: itemText.value,
          score: 1,
          type: t,
          showScore: false
        }
        evaluationList.push(Evaluation)
        itemText.value = ''
        showAddEvaluation.value = false
      } else {
        console.log('cancel')
        showAddEvaluation.value = false
      }
    }
    const studentList = reactive([])
    const showHistory = ref(false)

    const queryStudents = reactive([])
    const into = () => {
      const data = JSON.parse(route.query.evaluations)
      data.forEach((item) => {
        studentList.push(item)
      })
      console.log('%%%', studentList.length)
      if (studentList.length === 1) {
        showHistory.value = true
        console.log('@@@1')
      } else {
        console.log('@@@n')
      }
    }
    const removeStudent = (id) => {
      for (let i = 0; i < studentList.length; i++) {
        if (studentList[i].id === id) {
          studentList.splice(i, 1)
        }
      }
      console.log(studentList)
    }
    const ToBack = () => {
      router.back()
    }
    onBeforeMount(() => {
      into()
    })

    return {
      testChart,
      route,
      router,
      evaluationType,
      itemText,
      showAddEvaluation,
      addEvaluation,
      toggle,
      checked,
      checkboxRefs,
      checkedAll,
      checkAll,
      checkboxGroup,
      actions,
      onSelect,
      showPopover,
      selectSubject,
      evaluationList,
      ScoreActions,
      ScoreSelect,
      AwardList,
      chosenAwardId,
      AwardInfo,
      PunishList,
      chosenPunishId,
      PunishInfo,
      queryStudents,
      showHistory,
      studentList,
      historyList,
      removeStudent,
      ToBack
    }
  }
}
</script>
<style>
  .StudentList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }
  .StudentContainer{
    margin: 5px;
    text-align: center;
    line-height: 35px;
    background-color: white;
    height:35px;
    width: 75px;
    border-radius: 10px;
    font-size: 50%;
    border: #e9e9e9 1px solid;
  }
  .StudentContainer:hover{
    border: #1890FF 1px solid;
  }
  .StudentContainer:hover .delete{
    opacity: 1;
  }
  .delete{
    position: absolute;
    margin-top: 3px;
    margin-left: 0px;
    opacity: 0;
  }
  #chart{
    border: gray 1px solid;
    height: 150px;
    width: 95%;
    margin: 0 auto;
    background-color: white;
    border-radius: 10px;
  }
  .teacher_icon{
  }
  .historyText{
    font-size: 10px;
    margin-left: 10px;
    color: #a8a8a8;
  }
</style>

<style lang="less">
.AwardList{
  height: 200px;
  overflow: auto;
}
.AwardItem{
  font-size: 10px;
  height: 30px;
}
.course-info-container{
  background-color: white;
  .van-tabs--line .van-tabs__wrap {
    width: 100%!important;
  }
  .more-icon-popover .van-popover__wrapper  {
    top: 47px;
    right: 0;
    background-color: white;
    padding: 5px 9px;
    position: absolute;
    z-index: 3;
  }
  .funnel-content-wrap{
    font-size:15px;
    .van-action-sheet__content {
      margin-left: 16px;
    }
    .van-checkbox {
      margin: 10px;
    }
    .sure-btn{
      border-radius: 20px;
      margin-top: 20px;
      margin-bottom: 30px;
      width: 95%;
    }
  }
  .student-wrap{
    .many-comment{
      display: flex;
      padding: 0 20px;
      .many-comment-btn{
        border-radius: 20px;
        z-index: 2;
      }
    }
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
    .van-checkbox {
      display: flex;
      align-items: center;
      margin-left: auto;
    }
    .van-tabs--line .van-tabs__wrap {
      height: var(--van-tabs-line-height);
      width: 100%;
    }
    .van-cell__value {
      display: flex;
    }
    .student-list-wrap{
      .student-item-wrap{
        display: flex;
        .studednt-img{
          align-self: center;
        }
        .student-info-wrap{
          margin-left: 10px;
          .student-name-wrap{
            .name{
              font-size: 15px;
              font-weight: 300;
            }
            .number{
              font-size: 10px;
            }
          }
          .student-score-wrap{
            font-size: 10px;
            .score{
              padding: 0 5px;
              color: rgb(102, 156, 206);
            }
            .time{
              color: red;
              padding: 0 5px;
            }
          }
        }
      }
    }
  }
  .notice-wrap{
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
    .notice-list-wrap{
      .notice-item-wrap{
        .top-notice-wrap{
          display: flex;
          padding: 5px 10px;
          .notice-img{
            margin: 5px 0 ;
          }
          .notice-info-wrap{
            margin-left: 10px;
            align-self: center;
            .notice-name-wrap{
              font-size: 15px;
            }
            .notice-time-wrap{
              font-size: 10px;
              color:rgba(39, 39, 39, 0.418)
            }
          }
          .delete-btn{
            font-size: 12px;
            color: rgb(59, 100, 175);
            margin-left: auto;
            align-self: center;
          }
        }
        .notice-content{
          font-size: 9px;
          padding: 0 10px;
          padding-bottom: 10px;
        }
      }
    }
  }
}
</style>
