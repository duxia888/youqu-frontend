<script setup lang="ts">
import {teamStatusEnum} from "../constants/team";
import waterCat from "../assets/waterCat.png"
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {Toast} from "vant";
import myAxios from "../plugins/myAxios.ts";
import {TeamType} from "../models/team";
import {getCurrentUser} from "../services/user.ts";

interface TeamCardListProps {
  // loading: boolean;
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // loading: true,
  // @ts-ignore
  teamList: [] as TeamType[],
});

const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);
const currentUser = ref();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const router = useRouter();

// const preJoinTeam = (team: TeamType) => {
//   joinTeamId.value = team.id;
//   if (team.status === 0) {
//     doJoinTeam()
//   } else {
//     showPasswordDialog.value = true;
//   }
// }

// const doJoinCancel = () => {
//   joinTeamId.value = 0;
//   password.value = '';
// }

/**
 * 加入队伍
 */
const doJoinTeam = async (id: number) => {
  // if (!joinTeamId.value) {
  //   return;
  // }
  const res = await myAxios.post('/team/join', {
    // teamId: joinTeamId.value,
    teamId: id,
    // password: password.value
  });
  if (res?.code === 0) {
    Toast.success('加入成功');
    // doJoinCancel();
  } else {
    Toast.fail('加入失败' + (res.description ? `，${res.description}` : ''));
  }
}

/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.code === 0) {
    Toast.success('操作成功');
  } else {
    Toast.fail('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id,
  });
  if (res?.code === 0) {
    Toast.success('操作成功');
  } else {
    Toast.fail('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}

</script>

<template>
  <van-card
      v-for="team in props.teamList"
      :thumb="waterCat"
      :desc="team.description"
      :title="`${team.name}`"
  >
    <template #tags>
      <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
        {{ teamStatusEnum[team.status] }}
      </van-tag>
    </template>
    <template #bottom>
      <div>
        {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}` }}
      </div>
      <div v-if="team.expireTime">
        {{ '过期时间: ' + team.expireTime }}
      </div>
      <div>
        {{ '创建时间: ' + team.createTime }}
      </div>
    </template>
    <template #footer>
      <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin" plain
                  @click="doJoinTeam(team.id)">
        加入队伍
      </van-button>
      <van-button v-if="team.userId === currentUser?.id" size="small" plain
                  @click="doUpdateTeam(team.id)">更新队伍
      </van-button>
      <!-- 仅加入队伍可见 -->
      <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="small" plain
                  @click="doQuitTeam(team.id)">退出队伍
      </van-button>
      <van-button v-if="team.userId === currentUser?.id" size="small" type="danger" plain
                  @click="doDeleteTeam(team.id)">解散队伍
      </van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>
