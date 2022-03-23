<template>
  <div class="detail-index-wrap">
    <van-nav-bar title="三年级 1班 语文" left-text="返回" left-arrow @click-left="ToBack">
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

export default {
  name: 'detailInfoIndex',
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
  setup () {
    const ToBack = () => history.back()
    return {
      ToBack
    }
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
      ]
    }
  }
}

</script>

<style lang="less">
.detail-index-wrap{
  background-color: white;
}
</style>
