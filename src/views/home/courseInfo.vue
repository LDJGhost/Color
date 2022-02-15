<template>
  <div class="course-info-container">
    <van-nav-bar title="三年级 1班 语文 " left-text="返回" left-arrow  right-text="切换课程">
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
      <van-tab title="学生">
        <div class="student-wrap">
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
          <van-cell title="批量点评" >
            <template #value>
              <van-checkbox v-model="checkedAll" shape="square" class='select-all-box'></van-checkbox>
            </template>
          </van-cell>
          <div class="student-list-wrap">
            <van-checkbox-group v-model="checked">
              <van-cell-group >
                <van-cell class="student-item-wrap"
                v-for="(item, index) in studentList"
                :key="index" >
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
                    <van-checkbox v-model="checked" shape="square" :name="item"
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
      <van-tab title="小组">内容 2</van-tab>
      <van-tab title="成绩">内容 3</van-tab>
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
import { ref, onBeforeUpdate } from 'vue'
import { NavBar, Toast, Grid, GridItem, Icon, Image, Button, Tab, Tabs, Search, Checkbox, Cell, CellGroup, Popover, ActionSheet, Sticky } from 'vant'
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
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popover.name]: Popover,
    [ActionSheet.name]: ActionSheet,
    [Sticky.name]: Sticky
  },
  setup () {
    const value = ref('')
    const onSearch = (val) => Toast(val)
    const onClickButton = () => Toast(value.value)
    const showFunnel = ref(false)
    const checkedAll = ref(true) // 批量选择
    const checked = ref([])
    const checkedFunnel = ref([])
    const checkboxRefs = ref([])
    const toggle = (index) => {
      checkboxRefs.value[index].toggle()
    }
    onBeforeUpdate(() => {
      checkboxRefs.value = []
    })

    const showPopoverMore = ref(false)
    const showPopoverAdd = ref(false)
    // 通过 actions 属性来定义菜单选项
    const actionsMore = [
      { text: '评价统计', id: '1' },
      { text: '期末考评', id: '2' },
      { text: '期末报告', id: '3' }
    ]
    const actionsAdd = [
      { text: '添加学生' },
      { text: '批量导入' }
    ]
    const onSelect = (action) => Toast(action.text)
    // selectMore(actionsMore) {
    // }
    return {
      value,
      onSearch,
      showFunnel,
      onClickButton,
      toggle,
      checked,
      checkboxRefs,
      checkedAll,
      actionsMore,
      actionsAdd,
      onSelect,
      showPopoverMore,
      showPopoverAdd,
      checkedFunnel
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
  .student-wrap{
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
</style>
