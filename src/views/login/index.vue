<template>
  <div class="login-container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" class="app-nav-bar" />
    <div class='icon-wrap'>
      <van-image width="300"  :src="require('../../assets/LOGO.jpg')" id="login-logo" class="login-icon" />  <!--注意读取本地图片的写法-->
    </div>

    <van-cell-group inset>
      <van-field
        v-model="user.number"
        left-icon="user-o"
        placeholder="登录账号"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="music-o"
        placeholder="登录密码"
        />
    </van-cell-group>
    <div class="forget-code-wrap">
       <van-button plain type="primary" size="mini" class="forget-code">忘记密码</van-button>
    </div>
    <div class="login-btn-wrap">
      <van-button type="primary" block round class="login-btn">登录</van-button>
    </div>
  </div>
</template>

<script>
import { Image, NavBar, Field, CellGroup, Button } from 'vant'
import { ref } from 'vue'
export default {
  name: 'LoginIndex',
  components: {
    [Image.name]: Image,
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button
  },
  setup () {
    const value1 = ref('')
    const value2 = ref('123')
    return {
      value1,
      value2
    }
  },
  data () {
    return {
      user: {
        number: '',
        code: ''
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .icon-wrap{
    margin: 20px 0;
    text-align: center;
    img {
    align-self: center;
    }
  }
  .forget-code-wrap {
    text-align: right;
    padding-right:20px;
    .forget-code {
      border: 0ch;
      color: rgba(26, 188, 156, 1);
    }
  }
  .login-btn-wrap {
    padding: 26px 26px;
    .login-btn{
      background-color: rgba(26, 188, 156, 1);
      border: none;
    }
  }
}
</style>
