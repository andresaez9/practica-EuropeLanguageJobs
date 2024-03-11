
const routes = [
  /*{
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }*/
  {
    path: '/',
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: '/add',
    component: () => import('pages/DogFormPage.vue'),
  },
  {
    path: '/all',
    component: () => import('pages/DogDetailsPage.vue'),
  },
  {
    path: '/edit/:id',
    component: () => import('pages/DogFormPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*', // 404
    name: 'notFound',
    component: () => import('../pages/ErrorNotFoundPage.vue')
  }
]

export default routes
