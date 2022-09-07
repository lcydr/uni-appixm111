<template>
  <view>
    <van-card :thumb-link="`/subpkg/goods_detail/goods_detail?id=${item.goods_id}`" :thumb="item.goods_small_logo || defaultPic" v-for="item in goods" :key="item.goods_id" 
      :title="item.goods_name" >
      <template v-slot:price>
        <span style="color:red">{{item.goods_price | toFixed}}</span>
      </template>
      </van-card>
  </view>
</template>

<script>
  import {
    getGoodsList
  } from '../../api/goods.js'
  import toast from '../../utils/toast.js'
  export default {
    data() {
      return {
    // 默认的空图片
    defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      queryData: {
          query: '', //关键字
          cid: '', //分类id
          pagenum: 1, //页码
          pagesize: 10 //每页条数
        },
        goods: [],
        total: 0,
            // 是否正在请求数据
            isloading: false
    }
  },
  methods: {
      async ggetGoodsList(stopPullDown) {
          // ** 打开节流阀
          this.isloading = true
        const res = await getGoodsList(this.queryData)
        // console.log(res)
          // ** 关闭节流阀
          this.isloading = false
        this.total = res.message.total
        this.goods = [...this.goods,...res.message.goods]
        stopPullDown && stopPullDown()
      }
    },
    onLoad({
      query
    }) {
      console.log(query)
      this.queryData.query = query
      this.ggetGoodsList()
    },
    // 监听下拉行为
    onPullDownRefresh(){
      this.queryData = {
        query: this.queryData.query, //关键字
        cid: '', //分类id
        pagenum: 1, //页码
        pagesize: 10 //每页条数
      }
      this.goods = []
      this.total = 0
      this.ggetGoodsList(()=>{
        uni.stopPullDownRefresh()
      })
    },
    // 监听上拉触底
    onReachBottom(){
        // 判断是否还有下一页数据
        if (this.queryData.pagenum * this.queryData.pagesize >= this.total) return toast('数据加载完毕！')
        // 判断是否正在请求其它数据，如果是，则不发起额外的请求
        if (this.isloading) return
      this.queryData.pagenum++
      this.ggetGoodsList()
    }
  }
</script>

<style lang="scss">

</style>
