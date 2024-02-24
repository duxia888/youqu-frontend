import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import Talk from "../pages/TalkPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";

//定义一些路由
const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team },
    { path: '/talk', component: Talk },
    { path: '/user', component: User },
    { path: '/search', component: SearchPage },
    { path: '/user/list', component: SearchResultPage },
    { path: '/user/edit', component: UserEditPage },
    { path: '/user/login', component: UserLoginPage },
]

export default routes;