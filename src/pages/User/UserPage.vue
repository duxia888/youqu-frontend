<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrent} from "../../services/currentUser.ts";
import {defaultPicture} from "../../components/userCommon";
import MyAxios from "../../plugins/myAxios.ts";
import {Dialog, Toast} from "vant";

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
const showPasswordDialog = ref(false);
const VanDialog = Dialog.Component;
const router = useRouter();

onMounted(async () => {
  let currentUser = await getCurrent();
  if (currentUser) {
    if (currentUser.tags) {
      currentUser.tags = JSON.parse(currentUser.tags)
    }else {
      currentUser.tags = "此用户暂未设置标签";
    }
    user.value = currentUser
  }
})

const loginOut = async () => {
  const loginOut = await MyAxios.post("/user/logout", {})
  sessionStorage.clear()
  if (loginOut) {
    Toast.success("退出成功")
    router.replace("/user/login").catch(e => console.log(e))
  }
}

const logOutValue = () => {
  showPasswordDialog.value = true;
}

const doQuitCancel = () => {
  showPasswordDialog.value = false;
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
    <div>
      <div style="padding-top: 5px"></div>
      <div class="center">
        <van-image
            round
            width="10rem"
            height="10rem"
            :src="user.avatarUrl ? user.avatarUrl :defaultPicture"
        />
      </div>
    </div>
    <van-cell icon="label-o" center>
      <template #title>
        <span>我的标签</span>
      </template>
      <template #value>
        <van-tag v-for="tag in user.tags" plain type="danger" style="margin-right: 8px;margin-top: 8px">
          {{ tag }}
        </van-tag>
      </template>
    </van-cell>
    <van-cell title="昵称" :value="user?.username" icon="manager-o"/>
    <van-cell title="账号" :value="user?.userAccount" icon="user-circle-o"/>
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
    <van-cell title="更多信息" is-link to="/user/update" icon="ellipsis"/>
    <van-space style="margin: 13px" direction="vertical" fill>
      <van-button type="primary" color="red" @click="logOutValue" block>退出登录</van-button>
    </van-space>
    <!--是否注销-->
    <van-dialog v-model:show="showPasswordDialog" title="是否确认退出登录" show-cancel-button @confirm="loginOut"
                @cancel="doQuitCancel">
    </van-dialog>
  </template>
</template>

<style scoped>
@import "../../assets/css/userPage.css";
@import "../../assets/css/public.css";
</style>
