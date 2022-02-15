<template>
  <div class="discipline-container">
    <van-nav-bar title="班风班纪" >
    </van-nav-bar>
    <div class="class-list-wrap">
      <div class="class-item-wrap"
        v-for="(item, index) in classList"
        :key="index" >
        <div class="left-number">{{item.id}}</div>
        <div class="mid-info">
          <div class="class-name">{{item.name}}</div>
          <div class="score-info">分数<span class="score-number">{{item.score}}</span></div>
        </div>
        <div class="btn-wrap">
          <div class="comment">点评</div>
          <div class="dis">｜</div>
          <div class="detail">详情</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Button, Icon, Grid, GridItem, Popover, NavBar, Cell, CellGroup } from 'vant'

export default {
  name: 'DisciplineIndex',
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
.discipline-container{
  .class-list-wrap{
    .class-item-wrap{
      padding: 10px 15px;
      display: flex;
      background-color: white;
      border-bottom: 1px solid rgba(0, 0, 0, 0.164);
      .left-number{
        align-self: center;
        text-align: center;
        font-size: 20px;
        font-weight: 400;
        color: rgb(66, 66, 66);
        // border-right: 1px solid rgba(199, 67, 67, 0.164);
      }
      .mid-info{
        align-self: center;
        margin-left: 12px;
        .class-name{
          font-size: 12px;
        }
        .score-info{
          font-size: 12px;
          align-self: center;
          .score-number{
            font-size: 20px;
            color: #1890FF;
            font-weight: 400;
            align-self: center;
            margin-left: 5px;
          }
        }
      }
      .btn-wrap{
        background-color: #1890FF;
        border-radius: 20px;
        margin-left:auto;
        padding: 0px 8px;
        display: flex;
        height: 30px;
        align-self: center;
        .comment{
          font-size: 12px;
          color: white;
          align-self: center;
        }
        .dis{
          font-size: 12px;
          color: white;
          align-self: center;
        }
        .detail{
          font-size: 12px;
          color: white;
          align-self: center;
        }
      }
    }
  }
}
</style>
