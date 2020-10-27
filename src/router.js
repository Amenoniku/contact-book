import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", redirect: "/contacts" },
    {
      path: "/contacts",
      name: "Contacts",
      component: () => import("@/views/contacts")
    },
    {
      path: "/contacts/:id",
      name: "Contact",
      component: () => import("@/views/contacts/_id")
    }
  ]
});
