import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PaletteMakerView from "@/views/PaletteMakerView.vue";
import TestView from "@/views/TestView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/palette_maker",
    name: "palette_maker",
    component: PaletteMakerView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
