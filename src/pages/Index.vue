<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";
// import {useRoute} from "vue-router";

const isMatchMode = ref<boolean>(false);

const userList = ref([]);
const loading = ref(true);
// const route = useRoute()
const searchText = ref('');
// const {tags} = route.query
const images = [
  "https://img0.baidu.com/it/u=3358848204,1936258606&fm=253&fmt=auto&app=120&f=JPEG?w=1421&h=800",
  "https://img2.baidu.com/it/u=3012806272,1276873993&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
  "https://img0.baidu.com/it/u=741268616,1401664941&fm=253&fmt=auto&app=138&f=JPEG?w=748&h=500",
  "https://img1.baidu.com/it/u=2389614815,1145894179&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800"
]


/**
 * 加载数据
 */
const loadData = async () => {
  let userListData;
  loading.value = true;
  // 心动模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match succeed', response);
          return response?.data;
        })
        .catch(function (error) {
          console.error('/user/match error', error);
          Toast.fail('请求失败');
        })
  }else{
    if (searchText.value != ''){
      searchText.value = searchText.value.trim()
      userListData = (await myAxios.post("/user/search", {
        searchText: searchText.value
      })).data
      if (userListData.length <= 0) {
        Toast.fail("无搜索用户")
      }
    }else {
      // 普通模式，直接分页查询用户
      userListData = await myAxios.get('/user/recommend', {
        params: {
          pageSize: 8,
          pageNum: 1,
        },
      })
          .then(function (response) {
            console.log('/user/recommend succeed', response);
            if (response.code === 40101) {
              Toast.fail(response.message+"，请登录")
            }
            return response?.data?.records;
          })
          .catch(function (error) {
            console.error('/user/recommend error', error);
            Toast.fail('请求失败');
          })
    }
    }
  if (userListData) {
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

//钩子，自动监听某个方法，发生变化的时候重新加载一次数据
watchEffect(() => {
  loadData();
})

</script>

<template>
  <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="volume-o"
      style="margin-bottom: 10px"
      text="富强、民主、文明、和谐；自由、平等、公正、法治；爱国、敬业、诚信、友善。"
  />
  <div style="position: relative;height: 100%;width: 100%">
    <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white" lazy-render
               style="width: 90%;height: 150px;margin: 0 auto">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" style="width: 100%;height: 150px"/>
      </van-swipe-item>
    </van-swipe>
    <van-cell center title="心动模式">
      <template #right-icon>
        <van-switch v-model="isMatchMode" size="24" background="#39a9ed" active-color="#39a9ed"/>
      </template>
    </van-cell>
    <van-search
        v-if="!isMatchMode"
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="loadData"
    >
      <!--    <template #action>-->
      <!--      <div style="color: #1989fa" @click="loadData">搜索</div>-->
      <!--    </template>-->
    </van-search>
    <div>
      <user-card-list :user-list="userList" :loading="loading"/>
    </div>
    <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
  </div>
</template>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.my-swipe {
  margin: 15px;
  border-radius: 3%;
}
</style>