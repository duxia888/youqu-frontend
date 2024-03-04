<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";

const active = ref('public')
const router = useRouter();
const searchText = ref('');

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  // 查公开
  if (name === 'public') {
    listTeam(searchText.value, 0);
  } else {
    // 查加密
    listTeam(searchText.value, 2);
  }
}

// 跳转到创建队伍页
const toAddTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([]);

/**
 * 搜索队伍
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    Toast.fail('加载队伍失败，请刷新重试');
  }
}

// 页面加载时只触发一次
onMounted( () => {
  listTeam();
})

const onSearch = (val) => {
  listTeam(val);
};
</script>

<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab name="public" title="公开">
        <template #title>
          <van-icon name="fire-o" color="#ee0a24" size="16px"/>
          公开
        </template>
      </van-tab>
      <van-tab name="private" title="加密">
        <template #title>
          <van-icon name="lock" size="16px"/>
          加密
        </template>
      </van-tab>
    </van-tabs>
    <div style="margin-bottom: 16px" />
    <team-card-list :teamList="teamList" />
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
    <van-button class="add-button" type="primary" icon="plus" @click="toAddTeam" />
  </div>
</template>

<style scoped>
#teamPage {

}
</style>
