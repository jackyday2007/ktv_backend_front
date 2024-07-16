import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"
import NotFound from "@/views/NotFound.vue"
import Problems from "@/views/problems/ProblemList.vue"

const routes = [
    { name: "home-link", path: "/", component: Home },
    { name: "notfound-link", path: "/:pathMatch(.*)*", component: NotFound },
    { name: "router-problems-link", path: "/router/problems", component: Problems },
]


const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;