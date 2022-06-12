<!--
 * @Author: 陈永平 956086636@qq.com
 * @Date: 2022-04-25 10:36:38
 * @LastEditors: 陈永平 956086636@qq.com
 * @LastEditTime: 2022-06-12 22:00:58
 * @FilePath: \Blog_Vue_Node\Blog_Vue\src\components\Essay.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-container>
    <el-timeline class="animate__animated animate__fadeInLeft">
      <el-timeline-item :color="essay.borderColor" v-for="essay in essayList" :key="essay.id"
        :timestamp="essay.create_time| dataFormat" placement="top">
        <el-card style="letter-spacing: 1px;" :style="calcuteStyle(essay)">
          <h2 v-if="essay.title">{{essay.title}}</h2>
          <div class="typo" v-html="essay.content"></div>
          <el-image v-if="essay.image" :src="essay.image"></el-image>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      essayList: []
    }
  },
  created () {
    this.getEssayList()
  },
  methods: {
    async getEssayList () {
      const { data: res } = await this.$blog({
        url: '/blog/getEssay',
        methods: 'get',
        params: {
          token: JSON.parse(window.sessionStorage.getItem('token'))
        }
      }
      )
      if (res.code === 200) {
        this.essayList = res.data.sort((a, b) => {
          return a.createTime > b.createTime ? 1 : -1
        })// 先按时间排序
        this.essayList.forEach((essay) => {
          // console.log(essay.content)
          var date = essay.create_time
          var timezone = 'Asia/Shanghai'
          essay.create_time = this.$moment(date).tz(timezone).format('YYYY-MM-DD hh:mm:ss');
          essay.content = this.$marked(essay.content)
          essay.borderColor = essay.color.split(",")[0] + ',' + essay.color.split(",")[1] + ',' + essay.color.split(",")[2] + ')'
          essay.contentColor = essay.color.split(",")[0] + ',' + essay.color.split(",")[1] + ',' + essay.color.split(",")[2] + ',0.1)'
        })

        console.log(this.essayList)
      }
    },
    calcuteStyle (essay) {
      return 'border: 3px solid ' + essay.borderColor + '; background-color: rgba(255,255,255,0.9);box-shadow: 0 0 30px -10px ' + essay.borderColor
    }
  }
}
</script>

<style scoped lang="less">
.el-timeline {
  font: 16px/1.5 "Microsoft Yahei", "PingFang SC", "Hiragino Sans GB",
    sans-serif !important;

  width: 80%;
  margin: 0 auto;

  .el-image {
    width: 200px;
  }
  .el-card {
    border-radius: 20px;
    box-shadow: 0 0 15px 5px white;
  }
}

@media screen and (max-width: 768px) {
  .el-timeline {
    width: 98%;
    padding: 2px;
  }

  .el-timeline /deep/ .el-timeline-item__wrapper {
    padding-left: 15px !important;
  }
}
</style>