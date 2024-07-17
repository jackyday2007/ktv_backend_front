import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"
import NotFound from "@/views/NotFound.vue"
import Problems from "@/views/problems/router-problems"
import routerOrders from "@/views/orders/router-orders"

const routes = [
    { name: "home-link", path: "/", component: Home },
    { name: "notfound-link", path: "/:pathMatch(.*)*", component: NotFound },
    ...routerOrders,
    ...Problems,
]


const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;