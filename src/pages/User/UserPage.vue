<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrent} from "../../services/currentUser.ts";
import MyAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";

// const user = {
//   id: 3,
//   username: 'axin1',
//   userAccount: 'Dex001',
//   avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
//   gender: '男',
//   phone: '123112312',
//   email: '12345@qq.com',
//   planetCode: '1234',
//   createTime: new Date(),
// }

const user = ref();

const router = useRouter();

onMounted(async () => {
  user.value = await getCurrent();
})

const loginOut = async () => {
  const loginOut = await MyAxios.post("/user/logout", {})
  sessionStorage.clear()
  if (loginOut) {
    Toast.success("退出成功")
    router.replace("/user/login").catch(e => console.log(e))
  }
}

// const toEdit = (editKey: string, editName: string, currentValue: string) => {
//   router.push({
//     path: '/user/edit',
//     query: {
//       editKey,
//       editName,
//       currentValue,
//     }
//   })
// }
</script>

<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
    <van-space style="margin: 13px" direction="vertical" fill>
      <van-button type="primary" @click="loginOut" block>退出登录</van-button>
    </van-space>
  </template>
</template>

<style scoped>

</style>
