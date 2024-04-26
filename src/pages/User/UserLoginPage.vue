<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";
import {useRoute, useRouter} from "vue-router";
import {defaultPicture} from "../../components/userCommon.ts";

// 向其他页面传参数的钩子
const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');

const onSubmit = async () => {
  const res = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  console.log(res, '用户登录');
  if (res.code === 0 && res.data) {
    Toast.success('登录成功');
    //跳转到之前的页面
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;  }else {
    Toast.fail('登录失败');
  }
};
</script>

<template>
<!--  <van-form @submit="onSubmit">-->
<!--    <van-cell-group inset>-->
<!--      <van-field-->
<!--          v-model="userAccount"-->
<!--          name="userAccount"-->
<!--          label="账号"-->
<!--          placeholder="请输入账号"-->
<!--          :rules="[{ required: true, message: '请填写用户名' }]"-->
<!--      />-->
<!--      <van-field-->
<!--          v-model="userPassword"-->
<!--          type="password"-->
<!--          name="userPassword"-->
<!--          label="密码"-->
<!--          placeholder="请输入密码"-->
<!--          :rules="[{ required: true, message: '请填写密码' }]"-->
<!--      />-->
<!--    </van-cell-group>-->
<!--    <div style="margin: 16px;">-->
<!--      <van-button round block type="primary" native-type="submit">-->
<!--        提交-->
<!--      </van-button>-->
<!--    </div>-->
<!--  </van-form>-->
  <div style="padding-top:60px;  margin-left: -20px;;min-width: 380px">
    <div class="center">
      <img alt="游趣" class="img" :src="defaultPicture">
    </div>
    <div style="padding-top: 20px"/>
    <van-row justify="center">
      <h3>"游趣 —— 匹配你的趣友"</h3>
    </van-row>
    <div style="margin: 14px;padding-top: 20px">
      <van-cell-group inset>
        <van-field
            v-model="userAccount"
            :rules="[{ required: true, message: '请填写账号!' }]"
            label="账号"
            name="账号"
            placeholder="账号"
        />
        <van-field
            v-model="userPassword"
            :rules="[{ required: true, message: '请填写密码!' }]"
            label="密码"
            name="密码"
            placeholder="密码"
            type="password"
        />
        <div class="longin">
          <van-button plain class="defaultLogin" @click="onSubmit" round type="primary">
            <van-icon name="lock"/>
            账号密码登录
          </van-button>
        </div>
        <van-cell title="" to="/user/register" value="还没有账号？点击注册"></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped>
@import "../../assets/css/public.css";

.longin {
  margin: 16px 14px 0 12%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.defaultLogin {
  flex: auto;
  min-width: 140px;
  margin-right: 10px;
}

.qqLogin {
  flex: auto;
  min-width: 140px;
}
</style>