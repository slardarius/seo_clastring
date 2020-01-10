import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ListSearch from "./views/ListSearch.vue";
import Statistics from './views/Statistics';
import Kmeans from './views/Kmeans';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/list_search",
      name: "list_search",
      component: ListSearch,
    },
      {
      path: "/statistics",
      name: "statistics",
      component: Statistics,
    },
    {
      path: "/kmeans",
      name: "kmeans",
      component: Kmeans,
    },
  ]
});
