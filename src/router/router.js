import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"
import NotFound from "@/views/NotFound.vue"
<<<<<<< HEAD
import routerOrders from '@/views/orders/router-orders'

=======
import Problems from "@/views/problems/ProblemList.vue"
>>>>>>> f84162522616150573df3c2dd2235e7b0408374f

const routes = [
    { name: "home-link", path: "/", component: Home },
    { name: "notfound-link", path: "/:pathMatch(.*)*", component: NotFound },
<<<<<<< HEAD
    ...routerOrders,
=======
    { name: "router-problems-link", path: "/router/problems", component: Problems },
>>>>>>> f84162522616150573df3c2dd2235e7b0408374f
]


const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;