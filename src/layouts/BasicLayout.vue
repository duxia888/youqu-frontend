<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../router/route";
import myAxios from "../plugins/myAxios.ts";
import qs from "qs";

const router = useRouter();
const route = useRoute();
const DEFAULT_TITLE = '游趣 - 匹配你的趣友';
const title = ref(DEFAULT_TITLE);
const active = ref(0)
const applyFriendsCount = ref(0)
const recordId = ref([])

const NOT_SHOW_NAVBAR_AND_TABBAR = ["/user/login", '/user/register']
const SHOW_SEARCH = ["/", '/team', '/public_chat', '/user', '/apply']
/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  document.title = "游趣 - 匹配你的趣友"
  title.value = route?.title ?? DEFAULT_TITLE;
})

const onClickLeft = () => {
  router.back();
};

const onClickRight = async () => {
  if (!SHOW_SEARCH.includes(route.path)) {
    const read = await myAxios.get("/friends/read", {
      params: {
        ids: recordId.value
      }, paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(params, {indices: false})
        }
      }
    })
    if (read.data) {
      recordId.value.length = 0
      applyFriendsCount.value = 0
    }
    await router.push("/apply")
  } else {
    await router.push("/search")
  }
};



</script>

<template>
<!--  <van-nav-bar-->
<!--      :title="title"-->
<!--      left-arrow-->
<!--      @click-left="onClickLeft"-->
<!--      @click-right="onClickRight"-->
<!--  >-->
<!--    <template #right>-->
<!--      <van-icon name="search" size="18"/>-->
<!--    </template>-->
<!--  </van-nav-bar>-->
  <van-nav-bar v-if="!NOT_SHOW_NAVBAR_AND_TABBAR.includes(route.path)" fixed="fixed" left-arrow left-text="返回"
               :title="title" @click-right="onClickRight" @click-left="onClickLeft">
    <template v-if="route.path ==='/friends'|| !SHOW_SEARCH.includes(route.path)" #right>
      <van-badge :content="applyFriendsCount" v-if="applyFriendsCount>0">
        <notice/>
      </van-badge>
      <notice v-else/>
    </template>
    <template v-else #right>
      <van-icon name="search" size="22"/>
      <span style="color: rgb(25,137,250)">标签</span>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>
  <van-tabbar v-model="active">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/friends" icon="friends-o" name="friends">好友</van-tabbar-item>
    <van-tabbar-item to="/public_chat" icon="chat-o" name="chat">公共聊天室</van-tabbar-item>
    <van-tabbar-item to="/team" icon="flag-o" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="manager-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
#content {
  margin-top: 48px;
  padding-bottom: 60px;}
</style>