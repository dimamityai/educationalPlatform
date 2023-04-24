//В routes.js будут описаны все маршруты, которые есть в приложении

import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Favorites from "./pages/Favorites"
import MainPage from "./pages/MainPage"
import TestPage from "./pages/testPage/TestPage"
import {
    ADMIN_ROUTE,
    FAVORITES_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    TEST_ROUTE,
    USER_INFORMATION_ROUTE,
    USER_TEST_RESULT_ROUTE
} from "./utils/const"
import UserPage from "./pages/userPage/UserPage";

//масив с маршрутами для авторизованного пользотваеля
export const authRoutes = [
    //странницы админа и избранного будент доступна только для авторизованного пользователя
    {
        path: ADMIN_ROUTE, //ссылка по которой буддет выполняться та или иная ссылка
        Component: Admin //компонент админа
    },
    {
        path: FAVORITES_ROUTE,
        Component: Favorites
    },
    {
        path: USER_INFORMATION_ROUTE,
        Component: UserPage
    },
    // {
    //     path: USER_TEST_RESULT_ROUTE,
    //     Component: UseTestResult
    // }
]
//масив с маршрутами для любого пользователя
export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        //к url тесту будет передавать его id
        path: TEST_ROUTE + '/:id',
        Component: TestPage
    },
]