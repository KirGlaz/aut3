export default [
  {
    path: "/",
    component: () => import("../components/about.vue"),
    meta: {
      title: "Блок «Обо мне»"
    }
  },
  {
    path: "/works",
    component: () => import("../components/work.vue"),
    meta: {
      title: "Блок «Работы»"
    }
  },
  {
    path: "/comments",
    component: () => import("../components/comment.vue"),
    meta: {
      title: "Блок «Отзывы»"
    }
  },
  {
    path: "/login",
    component: () => import("../components/login.vue"),
    meta: {
      public: true
    }
  }
];
