<template>
  <div class="comment-course-container">
    <van-nav-bar title="开始评课" left-text="返回" left-arrow right-text="提交" @click-left="ToBack">
    </van-nav-bar>
    <van-cell>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">听课地点</span>
      </template>
      <template #value>
        <van-checkbox-group v-model="checkedPlace" direction="horizontal">
          <van-checkbox name="a">校内</van-checkbox>
          <van-checkbox name="b">校外</van-checkbox>
        </van-checkbox-group>
      </template>
    </van-cell>
    <van-cell is-link>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">听课地点</span>
      </template>
    </van-cell>
    <van-cell title="选择授课日期" :value="date" @click="showCalendar = true" is-link/>
    <van-calendar v-model:show="showCalendar" @confirm="onConfirmCalendar" />
    <van-cell
      title="听课时间"
      placeholder="请选择"
      is-link
      readonly
      @click="showPickerTime = true"
    >
      <template #value>
        <span class="custom-title">{{valueTime}}</span>
      </template>
    </van-cell>
    <van-popup v-model:show="showPickerTime" round position="bottom">
      <van-picker
        :columns="timeList"
        @cancel="showPickerTime = false"
        @confirm="onConfirmTime"
      />
    </van-popup>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Field, Button, Picker, Checkbox, CheckboxGroup, Popup, NavBar, Cell, CellGroup, Calendar } from 'vant'
export default {
  name: 'commentCourseIndex',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Calendar.name]: Calendar

  },
  setup () {
    const checkedPlace = ref([])
    const date = ref('')
    const showCalendar = ref(false)
    const formatDate = (date) => `${date.getYear() + 1900}年${date.getMonth() + 1}月${date.getDate()}日`
    const onConfirmCalendar = (value) => {
      showCalendar.value = false
      date.value = formatDate(value)
    }
    const timeList = ['第一节', '第二节', '第三节', '第四节', '第五节']
    const showPickerTime = ref(false)
    const valueTime = ref('')
    const onConfirmTime = (value) => {
      valueTime.value = value
      showPickerTime.value = false
    }
    return {
      checkedPlace,
      date,
      showCalendar,
      onConfirmCalendar,
      timeList,
      valueTime,
      showPickerTime,
      onConfirmTime
    }
  },
  methods: {
    ToBack () {
      history.back()
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
.comment-course-container{

}
</style>
