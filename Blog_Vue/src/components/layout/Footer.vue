<template>
  <div class="animate__animated animate__fadeInUp footer-wrap">
    <!--    center aligned居中-->
    <el-row :gutter="20" class=" footer-info">
      <el-col class="ewm" :xs="24" :sm="4">
        <el-image
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-07-13%2F5b480fc8b2a66.jpg%3Fdown&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655623525&t=8c52c69bf73405e3e16145ee9abb2f2d"
          alt="图片加载失败" class="ui rounded image" style="width: 110px" />
      </el-col>
      <el-col class="new-blog" :xs="24" :sm="7">
        <h4 class="ui inverted header m-text-spaced ">最新博客</h4>
        <div id="newblog-container">
          <div class="recommend-blog l-text list" v-for="blog in footerList" :key="blog.id">
            <a class="item" href="#" target="_blank">{{blog.title}}</a>
          </div>
        </div>
      </el-col>
      <el-col class="connect" :xs="24" :sm="5">
        <h4 class="ui inverted header m-text-spaced ">联系我</h4>
        <div class="ui inverted link list">
          <p class="item">Email：956086636@qq.com</p>
          <p class="item">电话：18817076020</p>
        </div>
      </el-col>
      <el-col class="intro" :xs="24" :sm="8">
        <div class="seven wide column">
          <h4 class="ui inverted header m-text-spaced">博客简介</h4>
          <p class="m-text-thin m-text-spaced m-opacity-mini">
            梦想还是要有的，万一实现了呢～</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="author">
        <p class="m-text-thin m-text-spaced m-opacity-mini">Copright©2020-2022 Designed by
          Alex chen</p>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      footerList: [],
    }
  },
  created () {
    this.getfooterList()
  },
  methods: {
    async getfooterList () {
      const { data: res } = await this.$blog.get('/footer/newblog')
      this.footerList = res.data
    }
  }
}
</script>

<style scoped lang="less">
*:hover {
  cursor: pointer;
}
.footer-wrap {
  bottom: 0 !important;
  line-height: 2;
  position: relative;
  padding: 40px 20px;
  color: #eee;
  font-size: 14px;
  text-align: center;
  background-color: #545c64;
  transition: 0.2s;
}
.footer-info {
  line-height: 15px;
  color: rgba(255, 255, 255, 0.5);
  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.5);
  }
  h4 {
    color: white;
  }

  .list .item {
    line-height: 20px;
  }

  .list .item:hover {
    color: white;
  }
  .el-image {
    margin: 0 auto;
    opacity: 0.8;
  }
  .el-image:hover {
    opacity: 1;
  }
}
.author {
  color: rgba(255, 255, 255, 0.5);
}

@media only screen and (max-width: 480px) {
  .ewm,
  .new-blog,
  .intro,
  .connect {
    display: none;
  }
}
</style>
