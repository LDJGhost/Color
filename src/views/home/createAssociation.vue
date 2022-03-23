<template>
  <div class="create-association-container">
    <van-nav-bar title="创建社团" left-text="返回" left-arrow  @click-left="ToBack">
    </van-nav-bar>
    <van-field
      v-model="valueGrade"
      label="社团名称"
      placeholder="最多输入16个字符"
    />
    <van-field
      v-model="valueSubject"
      is-link
      readonly
      label="学科"
      placeholder="请选择"
      @click="showPickerSubject = true"
    />
    <van-field
      v-model="valueSubject"
      is-link
      readonly
      label="添加组员"
      placeholder="请选择"
      @click="showPickerSubject = true"
    />
    <van-popup v-model:show="showPickerGrade" round position="bottom">
      <van-picker
        :columns="gradeList"
        @cancel="showPickerGrade = false"
        @confirm="onConfirmGrade"
      />
    </van-popup>
    <van-popup v-model:show="showPickerClass" round position="bottom">
      <van-picker
        :columns="classList"
        @cancel="showPickerClass = false"
        @confirm="onConfirmClass"
      />
    </van-popup>
    <van-popup v-model:show="showPickerSubject" round position="bottom">
      <van-picker
        :columns="subjectList"
        @cancel="showPickerSubject = false"
        @confirm="onConfirmSubject"
      />
    </van-popup>
    <div class="btn-wrap">
      <van-button round type="primary" class="create-btn" to="home">创建</van-button>
    </div>
  </div>
</template>

<script>
import { Picker, Cell, CellGroup, NavBar, Field, Popup, Button } from 'vant'
import { ref } from 'vue'
export default {
  name: 'createAssociationIndex',
  components: {
    [Picker.name]: Picker,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Button.name]: Button
  },
  setup () {
    const gradeList = ['一年级', '二年级', '三年级', '四年级', '五年级']
    const classList = ['1班', '2班', '3班', ' 4班', '5班']
    const subjectList = ['数学', '语文', '英语', '政治', '体育']
    const valueGrade = ref('')
    const valueSubject = ref('')
    const valueClass = ref('')
    const showPickerGrade = ref(false)
    const showPickerClass = ref(false)
    const showPickerSubject = ref(false)
    const onConfirmGrade = (value) => {
      console.log(value)
      valueGrade.value = value
      showPickerGrade.value = false
    }
    const onConfirmClass = (value) => {
      valueClass.value = value
      showPickerClass.value = false
    }
    const onConfirmSubject = (value) => {
      valueSubject.value = value
      showPickerSubject.value = false
    }
    return {
      gradeList,
      classList,
      subjectList,
      valueGrade,
      valueClass,
      valueSubject,
      showPickerGrade,
      showPickerClass,
      showPickerSubject,
      onConfirmGrade,
      onConfirmClass,
      onConfirmSubject
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
  .create-association-container{
    .btn-wrap{
      padding: 0px 20px;
      text-align: center;
      margin-top: 40px;
      .create-btn{
        width: 140px;
      }
    }
  }
</style>
