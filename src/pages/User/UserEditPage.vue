<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {Toast} from "vant";
import {getCurrent} from "../../services/currentUser.ts";
import {genderMap} from "../../models/userMap.ts";

//获取当前页面路由信息的钩子
const route = useRoute();
const router = useRouter();
const showPicker = ref(false);
import {gender, genderId} from "../../enum/userEnum";
console.log(route.query)
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})

const onSubmit = async () => {
  const currentUser = await getCurrent();
  if (!currentUser) {
    Toast.fail('用户未登录');
    return;
  }
  const res = await myAxios.post('/user/update',{
    'id': currentUser.id,
    [editUser.value.editKey as string]: UpdateValue(),
  })
  console.log(res, '更新请求');
  if (res.code === 0 && res.data > 0) {
    Toast.success('修改成功');
    router.back();
  }else {
    Toast.fail('修改失败');
  }
};

const onConfirm = (selectedOptions: any) => {
  showPicker.value = false;
  console.log("selectedValues",selectedOptions )
  editUser.value.currentValue = selectedOptions.text;
};
if (editUser.value.editKey === "gender") {
  editUser.value.currentValue = genderMap[editUser.value.currentValue]
}
console.log("editUser",editUser)
let UpdateValue = () => {
  let newEditValue = ref();
  if (editUser.value.editKey === "gender") {
    newEditValue.value = genderId[editUser.value.currentValue]
  } else {
    newEditValue.value = editUser.value.currentValue
  }
  return newEditValue.value
}
</script>

<template>
  <van-form @submit="onSubmit">
    <div style="padding-top: 5px"/>
    <div v-if="editUser.editKey ==='gender'" style="margin: 15px">
      <van-field
          v-model="editUser.currentValue"
          is-link
          readonly
          label="性别"
          placeholder="选择性别"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker
            :columns="gender"
            @cancel="showPicker = false"
            @confirm="onConfirm"
        />
      </van-popup>
    </div>
    <div v-if="editUser.editKey !=='gender'">
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    </div>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>