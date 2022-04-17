<template>
  <div class="course-info-container">
    <van-nav-bar title="英语社" left-text="返回" left-arrow @click-left="ToBack">
    </van-nav-bar>
    <div class="swipe-wrap">
      <van-tabs v-model:active="ActiveIndex" color="#92bcdd" >
        <!--排序面板-->
        <van-action-sheet v-model:show="showFunnel" title="排序" class="funnel-content-wrap">
          <van-radio-group v-model="checkedFunnel">
            <van-radio name="a" style="margin-bottom: 20px">按分数升序</van-radio>
            <van-radio name="b" style="margin-bottom: 20px">按分数降序</van-radio>
            <van-radio name="c" style="margin-bottom: 20px">按姓名首字母</van-radio>
            <van-radio name="d" style="margin-bottom: 20px">按学号</van-radio>
          </van-radio-group>
          <van-button type="primary" block class="sure-btn" @click="SortList">确定</van-button>
        </van-action-sheet>
        <!--添加学生Dialog-->
        <van-dialog v-model:show="showAddStudent" title="添加学生" :beforeClose="addStudent" show-cancel-button confirmButtonText="添加">
          <van-cell-group inset>
            <!-- 输入任意文本 -->
            <van-field v-model="studentName" label="学生名称" placeholder="请输入"/>
            <!-- 允许输入数字，调起带符号的纯数字键盘 -->
            <van-field v-model="studentNumber" type="number" label="学号" placeholder="请输入"/>
            <!-- 输入密码 -->
            <van-field v-model="studentIdentify" type="number" label="身份证后六位" placeholder="请输入"/>
          </van-cell-group>
        </van-dialog>
        <van-dialog v-model:show="showAddGroup" title="添加社团" :beforeClose="addGroup" show-cancel-button confirmButtonText="添加">
          <van-cell-group inset>
            <!-- 输入任意文本 -->
            <van-field v-model="groupName" label="小组名称" placeholder="请输入"/>
            <van-field v-model="groupSlogan" label="slogan" placeholder="请输入"/>
            <van-cell title="添加小组成员"  is-link value="请输入" to=""/>
          </van-cell-group>
        </van-dialog>
        <van-tab title="成员">
          <div class="student-wrap">
            <van-search
              v-model="value"
              show-action
              placeholder="请输入搜索关键词"
              @search="onSearch"
              class="search-bar-wrap">
              <template #action>
                <div class='search-bar-icon-wrap'>
                  <van-icon size="22" :name="require('../../assets/funnel.png')" class="funnel-icon" @click="showFunnel = true" />
                  <van-popover v-model:show="showPopoverAdd" placement="bottom-end" :actions="actionsAdd" @select="addFill"  >
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
            <van-cell title="批量点评" >
              <template #value>
                <van-checkbox v-model="isStudentCheckAll" shape="square" class='select-all-box' @click="studentCheckAll"></van-checkbox>
              </template>
            </van-cell>
            <div class="student-list-wrap">
              <van-checkbox-group v-model="studentChecked" ref="studentGroup">
                <van-cell-group >
                  <van-cell class="student-item-wrap"
                            v-for="(item, index) in studentList"
                            :key="index">
                    <template #icon>
                      <van-image  width="30px" height="30px" round :src="require('../../assets/head-img.jpeg')" class="studednt-img" />
                    </template>
                    <template #title>
                      <div class="student-info-wrap">
                        <div class="student-name-wrap">
                          <span class="name">{{item.sname}}</span>
                          <span class="number">{{item.snumber}}</span>
                        </div>
                        <div class="student-score-wrap">
                          <span class="student-score-title">得分</span>
                          <span class="score">{{item.score}}</span>
                          <span class="time">{{item.time}}</span>
                        </div>
                      </div>
                    </template>
                    <template #value>
                      <van-checkbox
                        shape="square"
                        :name="index"
                        :ref="el => checkboxRefs[index] = el"
                        @click.stop="toggle(index)"
                      />
                    </template>
                  </van-cell>

                </van-cell-group>
              </van-checkbox-group>
            </div>
            <van-sticky :offset-bottom="15" position="bottom">
              <div class="many-comment">
                <van-button type="primary" block class="many-comment-btn" @click="enterEvaluation">批量点评</van-button>
              </div>
            </van-sticky>
          </div>
        </van-tab>
        <van-tab title="小组">
          <div class="student-wrap">
            <van-search
              v-model="value"
              show-action
              placeholder="请输入搜索关键词"
              @search="onSearch"
              class="search-bar-wrap">
              <template #action>
                <div class='search-bar-icon-wrap'>
                  <van-icon size="22" :name="require('../../assets/funnel.png')" class="funnel-icon" @click="showFunnel = true"/>
                  <van-icon size="25" :name="require('../../assets/add-fill.png')" class="add-fill-icon" @click="showAddGroup = true"  />
                </div>
              </template>
              <template #right-icon>
                <div @click="onClickButton">搜索</div>
              </template>
            </van-search>
            <van-cell title="批量点评" >
              <template #value>
                <van-checkbox v-model="isGroupCheckAll" shape="square" class='select-all-box' @click="groupCheckAll"></van-checkbox>
              </template>
            </van-cell>
            <div class="student-list-wrap">
              <van-checkbox-group v-model="groupChecked" ref="groupGroup">
                <van-cell-group >
                  <van-cell class="student-item-wrap"
                            v-for="(item, index) in groupList"
                            :key="index" >
                    <template #icon>
                      <van-image  width="30px" height="30px" round :src="require('../../assets/head-img.jpeg')" class="studednt-img" />
                    </template>
                    <template #title>
                      <div class="student-info-wrap">
                        <div class="student-name-wrap">
                          <span class="name">{{item.name}}</span>
                          <span class="sum">人数{{item.students.length}}</span>
                        </div>
                        <div class="student-score-wrap">
                          <span class="student-score-title">总得分</span>
                          <span class="score">{{item.TotalScore}}</span>
                          <span>| </span>
                          <span>本周得分</span>
                          <span class="score">{{item.score}}</span>
                        </div>
                        <div class="student-score-wrap">
                          <span class="student-score-title">{{item.detail}}</span>
                        </div>
                      </div>
                    </template>
                    <template #value>
                      <van-checkbox shape="square" :name="index"
                                    :ref="el => checkboxRefs[index] = el"
                                    @click.stop
                      ></van-checkbox>
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>
            </div>
            <van-sticky :offset-bottom="15" position="bottom">
              <div class="many-comment">
                <van-button type="primary" block class="many-comment-btn" @click="enterEvaluation">批量点评</van-button>
              </div>
            </van-sticky>
          </div>
        </van-tab>
        <van-tab title="通知">
          <div class="notice-wrap">
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
                  <van-popover v-model:show="showPopoverAdd" placement="bottom-end" :actions="actionsAdd" @select="addFill"  >
                    <template #reference>
                      <van-icon size="25" :name="require('../../assets/add-fill.png')" class="add-fill-icon" />
                    </template>
                  </van-popover>
                </div>
              </template>
              <template #right-icon>
                <div @click="onClickButton">搜索</div>
              </template>
            </van-search>
            <div class="notice-list-wrap">
              <div class="notice-item-wrap"
                   v-for="(item, index) in noticeList"
                   :key="index" >
                <div class="top-notice-wrap">
                  <van-image  width="30px" height="30px" round :src="require('../../assets/head-img.jpeg')" class="notice-img" />
                  <div class="notice-info-wrap">
                    <div class="notice-name-wrap">{{item.name}}</div>
                    <div class="notice-time-wrap">{{item.time}}</div>
                  </div>
                  <div class="delete-btn">删除</div>
                </div>
                <div class="notice-content">{{item.content}}</div>
              </div>
            </div>
          </div>
        </van-tab>
        <!-- <van-icon size="25" :name="require('../../assets/add-fill.png')" class="add-icon"   /> -->
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, onBeforeUpdate, reactive } from 'vue'
import { NavBar, Toast, Grid, GridItem, Icon, Image, Button, Tab, Tabs, Search, Checkbox, CheckboxGroup, Cell, CellGroup, Popover, ActionSheet, Sticky, Dialog, Field, RadioGroup, Radio } from 'vant'

export default {
  name: 'associationInfo',
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
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    'van-dialog': Dialog.Component
  },
  setup () {
    // const pinyin = require('pinyin')
    const router = useRouter()
    // ------------------ 学生----------------------
    // 添加学生
    const addStudent = (action) => {
      if (action === 'confirm') {
        const Stu = {
          id: 10,
          sname: studentName.value,
          sid: studentNumber.value,
          score: '0',
          time: '0'
        }
        studentList.push(Stu)
        studentName.value = ''
        studentNumber.value = ''
        studentIdentify.value = ''
        showAddStudent.value = false
      } else {
        console.log('cancel')
        showAddStudent.value = false
      }
    }
    // 学生列表
    const studentList = reactive([
      {
        id: 1,
        sname: '阿一',
        sid: '1801050001',
        score: 10,
        time: '1'
      }, {
        id: 2,
        sname: '不二二',
        sid: '1801050003',
        score: 8,
        time: '1'
      }, {
        id: 3,
        sname: '陈三三三',
        sid: '1801050002',
        score: 6,
        time: '1'
      }, {
        id: 4,
        sname: '大四四四四',
        sid: '1801050007',
        score: 0,
        time: '1'
      }, {
        id: 5,
        sname: '阿李嘉粤',
        sid: '1801050006',
        score: 5,
        time: '1'
      }, {
        id: 6,
        sname: '李嘉粤',
        sid: '1801050005',
        score: 13,
        time: '1'
      }, {
        id: 7,
        sname: '李嘉粤',
        sid: '1801050004',
        score: 15,
        time: '1'
      }, {
        id: 8,
        sname: '李嘉粤',
        sid: '1801050008',
        score: 11,
        time: '1'
      }, {
        id: 9,
        sname: '李嘉粤',
        sid: '1801050009',
        score: 11,
        time: '1'
      }
    ])
    // 学生dialog
    const showAddStudent = ref(false)
    // 添加学生信息
    const studentName = ref('')
    const studentNumber = ref('')
    const studentIdentify = ref('')
    // 学生复选框
    const studentChecked = ref([])
    // 全选学生
    const studentGroup = ref(null)
    const isStudentCheckAll = ref(false)
    const studentCheckAll = () => {
      if (isStudentCheckAll.value !== false) {
        studentGroup.value.toggleAll(true)
      } else {
        studentGroup.value.toggleAll()
      }
    }

    // ------------------ 小组----------------------
    // 添加小组
    const addGroup = (action) => {
      if (action === 'confirm') {
        const Group = {
          id: 10,
          name: groupName.value,
          students: [],
          TotalScore: 0,
          score: 0,
          detail: groupSlogan.value
        }
        groupList.push(Group)
        groupName.value = ''
        groupSlogan.value = ''
        showAddGroup.value = false
      } else {
        console.log('cancel')
        showAddGroup.value = false
      }
    }
    // 社团列表
    const groupList = reactive([
      { id: 1, name: '火箭队', students: ['123', '123', '123'], TotalScore: 19, score: 4, detail: '好好学习,天天向上' },
      { id: 1, name: '火箭队', students: ['123', '123'], TotalScore: 19, score: 4, detail: '好好学习,天天向上' },
      { id: 1, name: '火箭队', students: [], TotalScore: 19, score: 4, detail: '好好学习,天天向上' },
      { id: 1, name: '火箭队', students: [], TotalScore: 19, score: 4, detail: '好好学习,天天向上' },
      { id: 1, name: '火箭队', students: [], TotalScore: 19, score: 4, detail: '好好学习,天天向上' }
    ])
    // 学生dialog
    const showAddGroup = ref(false)
    // 添加学生信息
    const groupName = ref('')
    const groupSlogan = ref('')
    // 学生复选框
    const groupChecked = ref([])
    // 全选学生
    const groupGroup = ref(null)
    const isGroupCheckAll = ref(false)
    const groupCheckAll = () => {
      console.log('gAll')
      if (isGroupCheckAll.value !== false) {
        groupGroup.value.toggleAll(true)
      } else {
        groupGroup.value.toggleAll()
      }
    }
    // ------------------全局复选框方法---------------------
    const checkboxRefs = ref([])
    const toggle = (index) => {
      checkboxRefs.value[index].toggle()
      console.log(index)
    }
    onBeforeUpdate(() => {
      checkboxRefs.value = []
    })
    // 进入批量选择页面
    const enterEvaluation = () => {
      const evaluations = []
      studentChecked.value.forEach((item) => {
        evaluations.push(studentList[item])
        console.log(studentList, studentList[item], item)
      })
      console.log(evaluations)
      router.push({
        name: 'associationEvaluation',
        query: {
          evaluations: JSON.stringify(evaluations)
        }
      })
    }

    const ActiveIndex = ref(0)
    const value = ref('')
    const onSearch = (val) => Toast(val)
    const onClickButton = () => Toast(value.value)
    const showFunnel = ref(false)
    const checkedFunnel = ref('')
    const SortList = () => {
      if (checkedFunnel.value === 'a') {
        console.log('a')
        studentList.sort(function (a, b) {
          return a.score - b.score
        })
      } else if (checkedFunnel.value === 'b') {
        console.log('b')
        studentList.sort(function (a, b) {
          return b.score - a.score
        })
      } else if (checkedFunnel.value === 'c') {
        console.log('c')
        studentList.sort(function (a, b) {
          return a.sname.localeCompare(b.sname, 'zh-CN')
        })
      } else if (checkedFunnel.value === 'd') {
        console.log('d')
        studentList.sort(function (a, b) {
          return a.sid - b.sid
        })
      }
      showFunnel.value = false
    }
    const showPopoverMore = ref(false)
    const showPopoverAdd = ref(false)
    // 通过 actions 属性来定义菜单选项
    const actionsMore = [
      { text: '评价统计', id: '1' },
      { text: '期末考评', id: '2' },
      { text: '期末报告', id: '3' }
    ]
    const actionsAdd = [
      { text: '添加学生', icon: 'add-o', id: '1' },
      { text: '批量导入', icon: 'upgrade', id: '2' }
    ]
    const onSelect = (action) => Toast(action.text)
    const addFill = (actionsAdd) => {
      if (actionsAdd.id === '1') {
        showAddStudent.value = true // 修改setup的值 要加上.value 踩坑了！！
      }
    }

    return {
      SortList,
      ActiveIndex,
      value,
      onSearch,
      showFunnel,
      onClickButton,
      toggle,
      groupChecked,
      checkboxRefs,
      actionsMore,
      actionsAdd,
      onSelect,
      showPopoverMore,
      showPopoverAdd,
      checkedFunnel,
      showAddStudent,
      studentName,
      studentNumber,
      studentIdentify,
      addFill,
      addStudent,
      studentList,
      isStudentCheckAll,
      studentChecked,
      studentCheckAll,
      studentGroup,
      addGroup,
      groupList,
      groupName,
      groupSlogan,
      showAddGroup,
      groupCheckAll,
      groupGroup,
      isGroupCheckAll,
      enterEvaluation
    }
  },
  methods: {
    selectMore (actionsMore) {
      console.log(this)
      console.log(actionsMore.text)
      if (actionsMore.id === '1') {
        this.$router.push({
          name: 'commentStatisticsIndex'
        })
      }
      if (actionsMore.id === '2') {
        this.$router.push({
          name: 'finalExamIndex'
        })
      }
      if (actionsMore.id === '3') {
        this.$router.push({
          name: 'finalReportIndex'
        })
      }
    },
    ToBack () {
      history.back()
    }
  },
  data () {
    return {
      noticeList: [
        {
          id: '123',
          name: 'kkk',
          time: '2021.12.31 16:35',
          content: '同学好：为了检验上一周的教学成果和同学们的掌握情况，拟于下周一进行阶段检测，望同学们做好准备！'
        }
      ]
    }
  }
}
</script>
<style>
  .sum{
    margin-left: 10px;
    color: #969696;
    font-size: 13px;
  }
</style>

<style lang="less">
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
      width: 80%;
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
</style >
