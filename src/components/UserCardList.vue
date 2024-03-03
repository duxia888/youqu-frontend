<script setup lang="ts">
import {UserType} from "../models/user";
import {useRouter} from "vue-router";
import {defaultPicture} from "../components/userCommon";


const router = useRouter()

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  // @ts-ignore
  userList: [] as UserType[],
});

const showUser = (id: number) => {
  router.push({
    name: 'userShow',
    params: {
      userId: id
    }
  })
}

</script>

<template>
<!--  <div v-if="!props.userList||props.userList.length <=0" class="null">-->
<!--    <van-empty image="search" description="暂无数据"/>-->
<!--  </div>-->
  <div v-if="props.userList.length>0 && props.userList">
    <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
      <van-card
          :desc="user.profile ?'简介：'+ user.profile:'简介：该用户比较懒,暂时没有设置'"
          :title="user.username"
          :thumb="user.avatarUrl ? user.avatarUrl :defaultPicture"
          @click="showUser(user.id)"
      >
        <template #tags>
          <div v-if="user.tags.length<7" style="margin-bottom: 12px"></div>
          标签:<br>
          <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
            {{ tag }}
          </van-tag>
          <span v-if="!user.tags||user.tags.length<=0">该用户暂时没有设置</span>
        </template>
<!--        <template #footer>-->
<!--          <van-button size="mini" to="/chat">联系我</van-button>-->
<!--        </template>-->
      </van-card>
    </van-skeleton>
  </div>
</template>

<style scoped>
@import "../assets/css/userList.css";
@import "../assets/css/public.css";

:deep(.van-search__field) {
  flex: 1;
  align-items: center;
  padding: 0 var(--van-padding-xs) 0 0;
  height: var(--van-search-input-height);
  background-color: transparent;
}
</style>
