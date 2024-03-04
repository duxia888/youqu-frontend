<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {Dialog, Toast} from "vant";
import getCurrent from "../../services/currentUser.ts"
import myAxios from "../../plugins/myAxios.ts";

const router = useRouter()
const route = useRoute()

const oldPassword = ref();
const newPassword = ref();
const checkPassword = ref();

const id = ref(route.query.id);


const onSubmit = () => {
  Dialog.confirm({
    message: '请确认是否修改密码！',
  }).then(async () => {
    const updateData = (await myAxios.post("/user/update/password", {
      id: id.value,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      checkPassword: checkPassword.value
    })).data
    if (updateData) {
      Toast.success("修改成功")
        const loginOut = await myAxios.post("/user/logout", {})
        sessionStorage.clear()
        if (loginOut) {
          Toast.success("退出成功")
          router.replace("/user/login").catch(e => console.log(e))
        }
    }
  }).catch(() => {
    Toast.success("取消修改")
  });
};

onMounted(() => {
  getCurrent()
})
</script>

<template>
  <van-form @submit="onSubmit">
    <div style="padding-top: 18px"/>
    <van-cell-group inset>
      <van-field
          v-model="oldPassword"
          label="登录密码"
          name="旧密码"
          placeholder="请输入登录密码"
          :rules="[{ required: true, message: '请填写登录密码!' }]"
      />
      <van-field
          v-model="newPassword"
          label="新密码"
          type="password"
          name="新密码"
          placeholder="请输入新密码"
          :rules="[{ required: true, message: '请填写新密码!' }]"
      />
      <van-field
          v-model="checkPassword"
          label="确认密码"
          type="password"
          name="确认密码"
          placeholder="请确认密码"
          :rules="[{ required: true, message: '请填写相同密码!' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button block native-type="submit" round type="primary">
        修改
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>