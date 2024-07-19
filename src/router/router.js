import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"
import NotFound from "@/views/NotFound.vue"
import routerProblems from "@/views/problems/router-problems.js"
import routerOrders from "@/views/orders/router-orders"
import routerRooms from "@/views/rooms/router-rooms"

const routes = [
    { name: "home-link", path: "/", component: Home },
    { name: "notfound-link", path: "/:pathMatch(.*)*", component: NotFound },
    ...routerOrders,
    ...routerProblems,
    ...routerRooms,
]


const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;