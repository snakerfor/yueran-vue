<template>
  <div class="homeLayout" style="max-width:1210px;margin:auto">
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
      <a-layout-header class="sk-layout-header">
        <a-menu style="width:85%;margin:auto" theme="dark" v-model="menuCurrent" mode="horizontal">
          <a-menu-item key="s:1">
            <a href="/index">首页</a>
          </a-menu-item>
          <a-menu-item key="s:2">
            <a href="/introduction">中心概况</a>
          </a-menu-item>
          <a-menu-item key="s:3">
            <a href="">通知公告</a>
          </a-menu-item>
          <a-menu-item key="s:4">
            <a href="">工作动态</a>
          </a-menu-item>
          <!-- <a-sub-menu>
            <span slot="title">工作动态</span>
            <a-menu-item key="s:3"><a href="/major/test">专业测评</a></a-menu-item>
            <a-menu-item key="s:4">职业规划</a-menu-item>
            <a-menu-item key="n:5">政策法规</a-menu-item>
            <a-menu-item key="n:6">面试宝典</a-menu-item>
          </a-sub-menu> -->
          <a-menu-item key="s:7">政策法规</a-menu-item>
          <a-menu-item key="s:8">创业资讯</a-menu-item>
          <a-menu-item key="s:9">入驻企业</a-menu-item>
          <a-menu-item key="s:10">优秀项目</a-menu-item>
          <a-menu-item key="s:11">服务指南</a-menu-item>
          <a-menu-item key="s:12">联系我们</a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content>
        <router-view />
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

export default {
  name: 'FrontLayout',
  data () {
    return {
      // 导航菜单 当前页
      menuCurrent: ['s:a']
    }
  }
}
</script>

<style lang="less" scoped>
.sk-layout-header {
  height: 46px;
  padding: 0px;
  background: #0078bd;
}
.sk-layout-header .ant-menu {
  background: #0078bd;
  font-size: 16px;
  color: #ffffff;
}
.ant-menu-submenu > .ant-menu {
  background-color: #4094e7;
  border-radius: 2px;
  color: #fff;
  font-size: 16px;
}
.sk-layout-header a {
  color: #ffffff;
}
.homeLayout .ant-layout-content {
  min-height: 500px;
}
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
  background: url(../assets/zztrc.png) no-repeat;
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

.pageFooter {
  background-color: #0f557e;
  text-align: center;
  min-height: 260px;
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
