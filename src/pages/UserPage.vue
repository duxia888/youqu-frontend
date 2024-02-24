<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user.ts";

// const user = {
//   id: 1,
//   username: 'dex',
//   userAccount: 'Dex001',
//   avatarUrl: 'https://st0.dancf.com/static/02/202306090204-51f4.png',
//   gender: '男',
//   phone: '12312312',
//   email: '123123@qq.com',
//   createTime: new Date(),
// };

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
})

// 向其他页面传参数的钩子
const router = useRouter();

const toEdit = (editKey:string, editName:string, currentValue:string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

</script>

<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称', user.username)"/>
    <van-cell title="账号" :value="user.userAccount"/>
    <van-cell title="头像" is-link to="/user/edit">
      <img style="height: 48px" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender','性别', user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话', user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱', user.email)"/>
    <van-cell title="注册时间" :value="user.createTime"/>
  </template>
</template>

<style scoped>

</style>