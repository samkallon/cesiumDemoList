import { createRouter, createWebHashHistory} from "vue-router";
import demoList from "../public/demoList.js";
const modules = import.meta.glob("./components/**/**.vue");

const routes = [
    {
        path: "/",
        name: "Home",
        component: modules["./components/list.vue"],
        // component: ()=> import("./components/list.vue"),
    }
]

demoList.forEach((item) => {
    routes.push({
        path: `/${item.compName}`,
        name: item.compName,
        component: modules[`./components/demos/${item.compName}.vue`],
    })
})

const options = {
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
}

const router = createRouter(options)
export default router
