<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrent} from "../../services/currentUser.ts";

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

onMounted(async () => {
  user.value = await getCurrent();
})

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

const updatePassword = (id: number) => {
  router.push({
    path: "/user/password",
    query: {
      id: id,
    }
  })
}
</script>

<template>
  <template v-if="user">
    <van-cell center title="头像" is-link to="/user/edit">
      <img style="width: 60px;height: 60px;border-radius: 50%" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell center title="昵称" is-link to="/user/edit" :value="user.username"  @click="toEdit('username', '昵称', user.username)"/>
    <van-cell center title="账号" :value="user.userAccount"/>
    <van-cell center title="性别" is-link :value="user.gender" @click="toEdit('gender', '性别', user.gender)">
      <span v-if="user.gender===0">男</span>
      <span v-else-if="user.gender===1">女</span>
      <span v-else-if="user.gender===2">保密</span>
      <span v-else>{{ "还没有填写性别" }}</span>
    </van-cell>
    <van-cell title="标签" to="/user/tag" is-link/>
    <van-cell center title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话', user.phone)"/>
    <van-cell center title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email', '邮箱', user.email)"/>
    <van-cell center title="注册时间" :value="user.createTime"/>
    <van-cell value="点击修改" icon="eye-o" is-link
              @click="updatePassword(user.id)">
      <template #title>
        <span class="custom-title">修改密码</span>
      </template>
    </van-cell>  </template>
</template>

<style scoped>

</style>