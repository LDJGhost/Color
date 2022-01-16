<template>
  <div class="my-container">
    <van-nav-bar title="我的" >
      <template #right>
        <van-icon name="setting-o" size="18" />
      </template>
    </van-nav-bar>
    <div class="user-wrap">
      <van-cell >
        <template #icon>
          <van-image  width="60px" height="60px" round :src="require('../../assets/head-img.jpeg')" class="head-img" />
        </template>
        <template #title>
          <div class="user-info-wrap">
            <div class="user-name">Eva</div>
            <div class="user-id">13925531258</div>
          </div>
        </template>
      </van-cell>
    </div>
    <div class="item-selet-wrap">
      <van-cell-group>
        <van-cell title="我的课程" value="100门" is-link />
        <van-cell title="我的社团" value="100条" is-link />
        <van-cell title="我的点评" value="100条" is-link />
        <van-cell title="审批" value="100条" is-link />
      </van-cell-group>
    </div>
    <div class="exit-wrap"> <van-button type="primary" block class="exit-btn" >退出账号</van-button></div>
  </div>
</template>

<script>
import { NavBar, Cell, CellGroup, Icon, Image, Button } from 'vant'
export default {
  name: 'MyIndex',
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon
  }
}
</script>

<style lang="less">
.my-container{
  .user-wrap{
    .van-cell {
      padding-top: 30px;
      padding-bottom: 30px;
    }
    .head-img{
        margin-left: 10px;
        border-radius: 99px;
        border: 3px solid #9ec9e9;
      }
      .user-info-wrap{
        margin-left: 12px;
        align-self: center;
        margin-top: auto;
        padding: 5px 0;
        .user-name{
          align-self: center;
          font-size: 15px;
        }
        .user-id{
          font-size: 10px;
          align-self: center;
          color:rgba(48, 48, 48, 0.548);
        }
      }
  }
  .item-selet-wrap{
    margin-top: 20px;
    .van-cell {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  .exit-wrap{
    margin-top: 230px;
    margin-bottom: 100px;
    text-align: center;
    .exit-btn{
        border-radius: 20px;
        width: 80%;
        display: inline-block;
      }
  }
}
</style>
