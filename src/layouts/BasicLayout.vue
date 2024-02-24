<script setup>
import {Toast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter();

const onClickLeft = () => {
  router.back()
};
const onClickRight = () => {
  router.push('/search')
};
const onChange = (index) => Toast(`标签 ${index}`);

</script>

<template>
  <!--引入导航栏-->
  <van-nav-bar
      title="标题"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <!-- 插槽语法 -->
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view />
  </div>

  <!--引入任务栏-->
  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/talk" icon="chat-o" badge="99" name="talk">聊天</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
#content {
  padding-bottom: 60px;
}
</style>