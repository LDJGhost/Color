<template>
  <div class="template-container">
    <van-nav-bar title="创建课程" left-text="返回" left-arrow  right-text="切换课程" @click-left="ToBack">
    </van-nav-bar>
  </div>
</template>

<script>
import { Picker, Cell, CellGroup, NavBar, Field, Popup, Button } from 'vant'
// import { ref } from 'vue'
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
    return {
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
  .create-course-container{

  }
</style>
