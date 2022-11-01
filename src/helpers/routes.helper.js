import SignIn from "../Layout/auth/login.auth";
import HomeView from "../views/home.view";

export const authRoutes = [
    {
        path: 'login',
        name: 'Login',
        mini: 'L',
        component: SignIn,
        layout: '/auth',
    },
]

export const appRoutes = [
    {
        path: '/',
        name: 'home',
        isIndex: true,
        mini: 'H',
        component: HomeView,
        layout: 'admin',
    },

]