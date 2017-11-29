import Vue from "vue";
import Router from "vue-router";
import IndexHome from "@/components/IndexHome";
import Play from "@/components/Play";

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: IndexHome
    },
    {
      path: "/play",
      component: Play
    }
  ]
})
