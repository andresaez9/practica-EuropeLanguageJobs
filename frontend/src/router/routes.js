
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
    component: () => import('pages/DogForm.vue'),
  },
  {
    path: '/details',
    component: () => import('pages/DogDetails.vue'),
  }
]

export default routes
