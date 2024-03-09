import Index from "../pages/Index.vue";
import Team from "../pages/Team/TeamPage.vue";
import UserEditPage from "../pages/User/UserEditPage.vue";
import SearchPage from "../pages/Search/SearchPage.vue";
import SearchResultPage from "../pages/Search/SearchResultPage.vue";
import UserLoginPage from "../pages/User/UserLoginPage.vue";
import TeamAddPage from "../pages/Team/TeamAddPage.vue";
import UserTeamJoinPage from "../pages/Team/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/Team/UserTeamCreatePage.vue";
import UserUpdatePage from "../pages/User/UserUpdatePage.vue";
import TeamUpdatePage from "../pages/Team/TeamUpdatePage.vue";
import UserPage from "../pages/User/UserPage.vue";
import UserRegister from "../pages/User/UserRegister.vue";
import ChatCommon from "../components/ChatCommon.vue";
import FriendsPage from "../pages/Friends/FriendsPage.vue";
import ApplicationRecord from "../pages/Friends/ApplicationRecord.vue";
import UserShow from "../pages/User/UserShow.vue";
import ChatPage from "../pages/ChatPage.vue";
import AfterSignUp from "../pages/AfterSignUp.vue";
import UserTagPage from "../pages/User/UserTagPage.vue";
import PasswordEdit from "../pages/User/PasswordEdit.vue";
import TeamShow from "../pages/Team/TeamShow.vue";

//定义一些路由
const routes = [
    { path: '/', component: Index },
    { path: '/team', meta: {title: '找队伍'}, component: Team },
    { path: '/team/add', meta: {title: '创建队伍'}, component: TeamAddPage },
    { path: '/team/update', meta: {title: '更新队伍'}, component: TeamUpdatePage },
    { path: '/team/show', meta: {title: '查看队伍'}, name: 'teamShow', component: TeamShow },
    { path: '/chat', meta: {title: '聊天'}, component: ChatPage },
    { path: '/public_chat', meta: {title: '公共聊天室'},component: ChatCommon },
    { path: '/friends', meta: {title: '我的好友'}, component: FriendsPage },
    { path: '/apply', meta: {title: '新的朋友'}, component: ApplicationRecord },
    { path: '/search', meta: {title: '找伙伴'}, component: SearchPage },
    { path: '/after', component: AfterSignUp, meta: {layout: 'after', title: '标签'}},
    { path: '/user', meta: {title: '个人信息'}, component: UserPage },
    { path: '/user/tag', meta: {title: "标签"}, component: UserTagPage},
    { path: '/user/list', meta: {title: '用户列表'}, component: SearchResultPage },
    { path: '/user/show/:userId', meta: {title: "查看好友",}, name: 'userShow', component: UserShow },
    { path: '/user/edit', meta: {title: '编辑信息'}, component: UserEditPage },
    { path: '/user/update', meta: {title: '更新信息'}, component: UserUpdatePage },
    { path: '/user/login', meta: {layout:"login"}, component: UserLoginPage },
    { path: '/user/register', meta: {layout:"register"}, component: UserRegister },
    { path: '/user/team/join', meta: {title: '加入队伍'}, component: UserTeamJoinPage },
    { path: '/user/team/create', meta: {title: '创建队伍'}, component: UserTeamCreatePage },
    { path: '/user/password', meta: {title: '修改密码'}, component: PasswordEdit}
]

export default routes;