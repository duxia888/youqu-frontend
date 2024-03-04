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

//定义一些路由
const routes = [
    { path: '/', component: Index },
    { path: '/team', title: '找队伍', component: Team },
    { path: '/team/add', title: '创建队伍', component: TeamAddPage },
    { path: '/team/update', title: '更新队伍', component: TeamUpdatePage },
    { path: '/chat', component: ChatPage },
    { path: '/public_chat', title: '公共聊天室',component: ChatCommon },
    { path: '/friends', title: '我的好友', component: FriendsPage },
    { path: '/apply', title: '新的朋友', component: ApplicationRecord },
    { path: '/search', title: '找伙伴', component: SearchPage },
    {path: '/after', title: '标签', component: AfterSignUp, meta: {layout: 'after'}},
    { path: '/user', title: '个人信息', component: UserPage },
    {path: '/user/tag', title: "标签", component: UserTagPage},
    { path: '/user/list', title: '用户列表', component: SearchResultPage },
    { path: '/user/show/:userId', meta: {title: "查看用户"}, name: 'userShow', component: UserShow },
    { path: '/user/edit', title: '编辑信息', component: UserEditPage },
    { path: '/user/update', title: '更新信息', component: UserUpdatePage },
    { path: '/user/login', meta: {layout:"login"}, component: UserLoginPage },
    { path: '/user/register', meta: {layout:"register"}, component: UserRegister },
    { path: '/user/team/join', title: '加入队伍', component: UserTeamJoinPage },
    { path: '/user/team/create', title: '创建队伍', component: UserTeamCreatePage },
    {path: '/user/password', title: '修改密码', component: PasswordEdit}
]

export default routes;