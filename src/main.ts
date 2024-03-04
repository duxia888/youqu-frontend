import {createApp} from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router';
import routes from "./router/route";
import Vant from 'vant';
import 'vant/lib/index.css';
import '../global.css'
import BasicLayout from "./layouts/BasicLayout.vue";
import FriendsPage from "./pages/Friends/FriendsPage.vue";
import ChatCommon from "./components/ChatCommon.vue";
import UserLoginPage from "./pages/User/UserLoginPage.vue";
import UserRegister from "./pages/User/UserRegister.vue";

const app = createApp(App);
app.use(Vant);

const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})
app.component("default-layout", BasicLayout)
app.component("friends-layout", FriendsPage)
app.component("login-layout", UserLoginPage)
app.component("register-layout", UserRegister)
app.component("public_chat-layout", ChatCommon)

app.use(router);
app.mount('#app')
