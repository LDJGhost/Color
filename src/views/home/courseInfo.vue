<template>
  <div class="course-info-container">
    <van-nav-bar title="三年级 1班 语文 " left-text="返回" left-arrow  right-text="切换课程" @click-left="ToBack">
    </van-nav-bar>
    <div class="swipe-wrap">
      <div class="more-icon-popover">
        <van-popover v-model:show="showPopoverMore" placement="bottom-end" :actions="actionsMore" @select="selectMore" class="more-icon-popover"  >
          <template #reference>
            <van-icon size="25" :name="require('../../assets/more.png')"  />
          </template>
        </van-popover>
      </div>
      <van-tabs v-model:active="active" color="#92bcdd" >
      <!--排序面板-->
        <van-action-sheet v-model:show="showFunnel" title="排序" class="funnel-content-wrap">
          <van-checkbox-group v-model="checkedFunnel">
            <van-checkbox name="a">按分数顺序</van-checkbox>
            <van-checkbox name="b">按分数倒序</van-checkbox>
            <van-checkbox name="c">按姓名首字母</van-checkbox>
            <van-checkbox name="d">按学号</van-checkbox>
          </van-checkbox-group>
          <van-button type="primary" block class="sure-btn" @click="showFunnel = false">确定</van-button>
        </van-action-sheet>
      <!--添加学生Dialog-->
        <van-dialog v-model:show="showAddStudent" title="添加学生" :beforeClose="addStudent" show-cancel-button confirmButtonText="添加">
          <van-cell-group inset>
            <!-- 输入任意文本 -->
            <van-field v-model="studentName" label="学生名称" />
            <!-- 允许输入数字，调起带符号的纯数字键盘 -->
            <van-field v-model="studentNumber" type="number" label="学号" />
            <!-- 输入密码 -->
            <van-field v-model="studentIdentify" type="number" label="身份证后六位" />
          </van-cell-group>
        </van-dialog>
        <van-dialog v-model:show="showAddGroup" title="添加社团" :beforeClose="addGroup" show-cancel-button confirmButtonText="添加">
          <van-cell-group inset>
            <!-- 输入任意文本 -->
            <van-field v-model="groupName" label="小组名称" />
            <!-- 允许输入数字，调起带符号的纯数字键盘 -->
            <van-field v-model="groupSlogan" label="slogan" />
            <!-- 输入密码 -->
            <div></div>
          </van-cell-group>
        </van-dialog>
      <van-tab title="学生">
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
                <van-popover v-model:show="showPopoverAdd" placement="bottom-end" :actions="actionsAdd" @select="addFill">
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
              <van-checkbox v-model="checkedAll" shape="square" class='select-all-box'></van-checkbox>
            </template>
          </van-cell>
          <div class="student-list-wrap">
            <van-checkbox-group v-model="groupChecked">
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
      <van-tab title="成绩">
        <div class="student-wrap">
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
              <van-checkbox v-model="checkedAll" shape="square" class='select-all-box'></van-checkbox>
            </template>
          </van-cell>
          <div class="student-list-wrap">
            <van-checkbox-group v-model="gradeChecked">
              <van-cell-group >
                <van-cell class="student-item-wrap"
                v-for="(item, index) in scoreList"
                :key="index" >
                  <template #icon>
                    <van-image  width="30px" height="30px" round :src="require('../../assets/head-img.jpeg')" class="studednt-img" />
                  </template>
                  <template #title>
                    <div class="student-info-wrap">
                      <div class="student-name-wrap">
                        <span class="name">{{item.name}}</span>
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
               <van-button type="primary" block class="many-comment-btn">批量点评</van-button>
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
import { NavBar, Toast, Grid, GridItem, Icon, Image, Button, Tab, Tabs, Search, Checkbox, CheckboxGroup, Cell, CellGroup, Popover, ActionSheet, Sticky, Dialog, Field } from 'vant'
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
    'van-dialog': Dialog.Component
  },
  setup () {
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
        sname: '一',
        sid: '1801050068',
        score: '10',
        time: '1'
      }, {
        id: 2,
        sname: '二二',
        sid: '1801050068',
        score: '10',
        time: '1'
      }, {
        id: 3,
        sname: '三三三',
        sid: '1801050068',
        score: '10',
        time: '1'
      }, {
        id: 4,
        sname: '四四四四',
        sid: '1801050068',
        score: '10',
        time: '1'
      }, {
        id: 5,
        sname: '李嘉粤',
        sid: '1801050068',
        score: '10',
        time: '1'
      }, {
        id: 6,
        sname: '李嘉粤',
        sid: '1801050068',
        score: '10',
        time: '1'
      }, {
        id: 7,
        sname: '李嘉粤',
        sid: '1801050068',
        score: '10',
        time: '1'
      }, {
        id: 8,
        sname: '李嘉粤',
        sid: '1801050068',
        score: '10',
        time: '1'
      }, {
        id: 9,
        sname: '李嘉粤',
        sid: '1801050068',
        score: '10',
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
      { id: 1, name: '火箭队', detail: '111222333' },
      { id: 1, name: '火箭队', detail: '111222333' },
      { id: 1, name: '火箭队', detail: '111222333' },
      { id: 1, name: '火箭队', detail: '111222333' },
      { id: 1, name: '火箭队', detail: '111222333' }
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

    const value = ref('')
    const onSearch = (val) => Toast(val)
    const onClickButton = () => Toast(value.value)
    const showFunnel = ref(false)
    const checkedFunnel = ref([])
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
      courseList: [
        {
          id: 1,
          name: '一年级语文',
          specific: '第一节课',
          day: '12月21日',
          week: '周二',
          teacher: '李某某'
        }, {
          id: 2,
          name: '一年级语文',
          specific: '第一节课',
          day: '12月21日',
          week: '周二',
          teacher: '李某某'
        }, {
          id: 3,
          name: '一年级语文',
          specific: '第一节课',
          day: '12月21日',
          week: '周二',
          teacher: '李某某'
        }
      ],
      scoreList: [
        { id: 1, name: '三年级一班 语文', detail: '第二周' },
        { id: 1, name: '三年级一班 语文', detail: '第二周' },
        { id: 1, name: '三年级一班 语文', detail: '第二周' },
        { id: 1, name: '三年级一班 语文', detail: '第二周' },
        { id: 1, name: '三年级一班 语文', detail: '第二周' },
        { id: 1, name: '三年级一班 语文', detail: '第二周' },
        { id: 1, name: '三年级一班 语文', detail: '第二周' },
        { id: 1, name: '三年级一班 语文', detail: '第二周' }
      ],
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

<style lang="less">
.course-info-container{
  background-color: white;
  .van-tabs--line .van-tabs__wrap {
    width: 90%;
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
