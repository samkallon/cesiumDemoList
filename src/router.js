import { createRouter, createWebHashHistory} from "vue-router";
import demoList from "../public/demoList.js";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("./components/list.vue"),
    }
]

demoList.forEach((item) => {
    routes.push({
        path: `/${item.compName}`,
        name: item.compName,
        component: () => import((`./components/demos/${item.compName}.vue`)),
    })
})

const options = {
    history: createWebHashHistory(),
    routes
}

const router = createRouter(options)
export default router
