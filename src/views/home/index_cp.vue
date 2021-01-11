<template>
  <div id="homeLayout" style="max-width:1210px;margin:auto">
    <div class="titleBar">
      <div class="logo"></div>
      <div class="rightContent">
        <a-input-search class="search" placeholder="输入关键字进行搜索" />
        <div class="loginLink">
          <a href="/user/login">学生登录</a>
          <a-divider type="vertical" />
          <a href="/user/login">老师登录</a>
        </div>
      </div>
    </div>
    <a-layout>
      <a-layout-header style="height:46px;padding:0px;">
        <a-menu style="width:85%;margin:auto" theme="dark" v-model="menuCurrent" mode="horizontal">
          <a-menu-item key="s:a">
            <a href="/index">首页</a>
          </a-menu-item>
          <a-menu-item key="s:2">
            <a href="/test">中心概况</a>
          </a-menu-item>
          <a-sub-menu>
            <span slot="title">工作流程</span>
            <a-menu-item-group title="Item 1">
              <a-menu-item key="s:3"><a href="/major/test">专业测评</a></a-menu-item>
              <a-menu-item key="s:4">职业规划</a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group title="Item 2">
              <a-menu-item key="n:5">政策法规</a-menu-item>
              <a-menu-item key="n:6">面试宝典</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
          <a-menu-item key="s:7">规章制度</a-menu-item>
          <a-menu-item key="s:0">创业资讯</a-menu-item>
          <a-menu-item key="s:0">入驻企业</a-menu-item>
          <a-menu-item key="s:0">优秀项目</a-menu-item>
          <a-menu-item key="s:9">服务指南</a-menu-item>
          <a-menu-item key="s:0">联系我们</a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content>
        <swiper style="height:400px" :options="swiperOption">
          <swiper-slide><img style="width:100%;height:400px" src="../../assets/1.jpg"></swiper-slide>
          <swiper-slide><img style="width:100%;height:400px" src="../../assets/2.jpg"></swiper-slide>
          <swiper-slide><img style="width:100%;height:500px" src="../../assets/3.jpg"></swiper-slide>
          <swiper-slide><img style="width:100%;height:500px" src="../../assets/4.jpg"></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <!-- 文章列表 -->
        <a-row :gutter="24" style="margin:0px;">
          <a-col :md="8" class="publishList">
            <a-list item-layout="horizontal" :data-source="listData">
              <div slot="header">
                <span class="listTitle1">
                  <a-icon type="inbox" />通知公告
                </span>
                <span class="listTitle2">NOTICE</span>
                <div class="listMore"><a href="#">更多
                    <a-icon type="right" />
                  </a></div>
              </div>
              <a-list-item class="listItem" style="padding:3px" slot="renderItem" slot-scope="item">
                <a-list-item-meta :description="item.essayContent">
                  <a slot="title" :href="item.href">{{ item.essayTitle }}</a>
                </a-list-item-meta>
                <div class="listDate">{{ item.createTime }}</div>
              </a-list-item>
            </a-list>
          </a-col>
          <a-col :md="8" class="publishList">
            <a-list item-layout="horizontal" :data-source="listData2">
              <div slot="header">
                <span class="listTitle1">
                  <a-icon type="book" />政策法规
                </span>
                <span class="listTitle2">RECRUITMENT</span>
                <div class="listMore"><a href="#">更多
                    <a-icon type="right" />
                  </a></div>
              </div>
              <a-list-item class="listItem" style="padding:3px" slot="renderItem" slot-scope="item">
                <a-list-item-meta :description="item.essayContent">
                  <a slot="title" :href="item.href">{{ item.essayTitle }}</a>
                </a-list-item-meta>
                <div class="listDate">{{ item.createTime }}</div>
              </a-list-item>
            </a-list>
          </a-col>
          <a-col :md="8" class="publishList">
            <a-list item-layout="horizontal" :data-source="listData3">
              <div slot="header">
                <span class="listTitle1">
                  <a-icon type="book" />工作动态
                </span>
                <span class="listTitle2">WORKS</span>
                <div class="listMore"><a href="#">更多
                    <a-icon type="right" />
                  </a></div>
              </div>
              <a-list-item class="listItem" style="padding:3px" slot="renderItem" slot-scope="item">
                <a-list-item-meta :description="item.essayContent">
                  <a slot="title" :href="item.href">{{ item.essayTitle }}</a>
                </a-list-item-meta>
                <div class="listDate">{{ item.createTime }}</div>
              </a-list-item>
            </a-list>
          </a-col>
          <!--<a-col style="padding:2px;min-width:400px;margin:0 auto" :md="8">
            <div style="padding-top:12px;padding-bottom:12px">
              <span class="listTitle1"><a-icon type="appstore" />快速导航</span>
              <span class="listTitle2">NAVIGATION</span>
              <div class="listMore"><a href="#">更多 <a-icon type="right" /></a></div>
            </div>

            <div class="listContent">
              <a-row :gutter="16">
                <a-col :span="8">
                  <a href="#" style="background-color:#4489ca" class="navBlock">创客论道</a>
                </a-col>
                <a-col :span="8">
                  <a href="#" style="background-color:#ae5da0" class="navBlock">高层论坛</a>
                </a-col>
                <a-col :span="8">
                  <a href="#" style="background-color:#bf3b48" class="navBlock">课程培训</a>
                </a-col>
              </a-row>
            </div>
            <div class="listContent">
              <a-row :gutter="16">
                <a-col :span="8">
                  <a href="#" style="background-color:#00999b" class="navBlock">双创大赛</a>
                </a-col>
                <a-col :span="8">
                  <a href="#" style="background-color:#fabe10" class="navBlock">创客之星</a>
                </a-col>
                <a-col :span="8">
                  <a href="#" style="background-color:#03a9f4" class="navBlock">创客训练营</a>
                </a-col>
              </a-row>
            </div>
          </a-col>-->
        </a-row>

        <a-row style="margin:10px 0;" :gutter="[48,8]">
          <a-col :span="12">
            <a-list size="small" bordered>
              <a-list-item>
                <a href="#">全国大学生创业服务网</a>
              </a-list-item>
              <a-list-item>
                <a href="#">大学生创业网</a>
              </a-list-item>
              <a-list-item>
                <a href="#">河南省教育厅官网</a>
              </a-list-item>
              <div slot="header">
                快捷入口
              </div>
            </a-list>
          </a-col>
          <a-col :span="12">
            <a-list size="small" bordered>
              <a-list-item>
                <a href="#">郑州旅游职业学院 参加互联网+大赛申请表</a>
              </a-list-item>
              <a-list-item>
                <a href="#">郑州旅游职业学院 互联网+大赛获奖申请表</a>
              </a-list-item>
              <a-list-item>
                <a href="#">郑州旅游职业学院 学生创业团队入住孵化园申请表</a>
              </a-list-item>
              <div slot="header">
                下载专区
              </div>
            </a-list>
          </a-col>

        </a-row>
      </a-layout-content>

      <a-layout-footer class="pageFooter">
        <div class="frindlyLink">友情链接：
          <a href="">招生信息网</a>
          <a href="">大学生就业一站式服务平台</a>
          <a href="">用人单位指导手册</a>
        </div>
        <a-divider dashed />
        <div class="qrcode">
          <span><img src="http://jy.zztrc.edu.cn/R/images/images-footer/QQ.png" /><br>官方QQ</span>
          <span><img src="http://jy.zztrc.edu.cn/R/images/images-footer/wechatQRcode.jpg" /><br>官方微信</span>
          <span><img width="94px" src="http://jy.zztrc.edu.cn/R/images/images-footer/microblog.png" /><br>官方微博</span>
          <span><img width="94px" src="http://jy.zztrc.edu.cn/R/images/images-footer/blue.png" /><br>事业单位</span>
        </div>
        联系电话：0371-61130063 61130064 61130065 61130062 邮编：451464
        <br>
        学院地址：郑州市郑东新区金龙路188号（象湖校区)
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getEssayPublishListByEssayType } from '@/api/publish'
import moment from 'moment'
import 'swiper/dist/css/swiper.css'

export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      // 导航菜单 当前页
      menuCurrent: ['s:a'],

      listData: [],
      listData2: [],
      listData3: [],

      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  methods: {
    loadPublishData (essayType, limit) {
      return new Promise(function (resolve, reject) {
        getEssayPublishListByEssayType(essayType, limit).then(res => {
          if (res.code === 0) {
            resolve(res.rows)
          } else {
            this.$message.error('取得文章列表失败')
          }
        }).catch(() => {
          this.$message.error('系统错误，请稍后再试')
        })
      })
    }
  },
  mounted () {
    this.loadPublishData(1, 6).then(res => {
      res.forEach(item => {
        item.createTime = moment(item.createTime).format('MM-DD')
      })
      this.listData = res
    })
    this.loadPublishData(2, 6).then(res => {
      res.forEach(item => {
        item.createTime = moment(item.createTime).format('MM-DD')
      })
      this.listData2 = res
    })
    this.loadPublishData(3, 6).then(res => {
      res.forEach(item => {
        item.createTime = moment(item.createTime).format('MM-DD')
      })
      this.listData3 = res
    })
  }
}
</script>

<style scoped>
/** {
  border: 1px solid #ff00ff;
}*/

.titleBar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  background-color: #fff;
  padding: 10px;
}

.logo {
  background: url(../../assets/zztrc.png) no-repeat;
  background-size: 100% 100%;
  width: 567px;
  height: 85px;
}

.search {
  width: 240px;
  margin-right: 30px;
}

@media only screen and (min-width: 850px) and (max-width: 1000px) {
  .loginLink {
    display: block !important;
    margin-top: 10px;
  }
  .search {
    margin: 0px;
  }
}

.loginLink {
  display: inline;
  min-width: 135px;
  font-weight: 800;
}

@media only screen and (max-width: 850px) {
  .rightContent {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .search {
    flex: 4;
  }
  .loginLink {
    flex: 1;
  }
  .logo {
    width: 100%;
  }
}

.publishList {
  border: 1px dashed grey;
  padding: 5px;
  min-width: 400px;
  margin: 0 auto;
  min-height: 440px;
}

.listTitle1 {
  font-size: 20px;
  color: #01478c;
}

.listTitle2 {
  font-size: 13px;
  margin-left: 8px;
}

.listMore {
  float: right;
  font-size: 14px;
  line-height: 30px;
}

.listMore a {
  color: #999999;
}

.listMore a:hover {
  color: #01478c;
}

.listItem {
  font-size: 16px;
}

.listItem:hover {
  background-color: #ebeced;
}

.listItem a {
  display: block;
  width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.65);
}

.listItem a:hover {
  color: #01478c;
}

.listDate {
  color: #999999;
  font-size: 17px;
  width: 50px;
  margin-left: auto;
}

.listContent {
  width: 100%;
  padding: 10px 10px;
}

.navBlock {
  display: block;
  width: 100%;
  height: 100px;
  border: 1px solid;
  border-radius: 4px;
  text-align: center;
  color: #ffffff;
  line-height: 100px;
  font-size: 17px;
  background-color: cornflowerblue;
}

.navBlock:hover {
  box-shadow: 3px 3px 3px #666;
}

.pageFooter {
  background-color: #0065ca;
  text-align: center;
  min-height: 300px;
  color: #ffffff;
}

.pageFooter .qrcode {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pageFooter .qrcode span {
  margin: 10px;
}

.pageFooter .frindlyLink {
  display: flex;
}
.pageFooter .frindlyLink a {
  margin-right: 10px;
}
</style>
