
import store from '../store'

const ifAuthenticated = (to, from, next) => {
  if (store.state.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const logout = (to, from, next) => {
  store.state.isAuthenticated = false
}


const routes = [
  {
    path: '/Dashboard',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: ifAuthenticated,
    children: [
      
      // {path: '/Dashboard', name:"dashboard", component: () => import('pages/Dashboard.vue'),},
      {path: '/Dashboard2', component: () => import('pages/Dashboard2.vue')},
      {path: '/Profile', component: () => import('pages/UserProfile.vue')},
      {path: '/Map', component: () => import('pages/Map.vue')},
      {path: '/MapMarker', component: () => import('pages/MapMarker.vue')},
      {path: '/StreetView', component: () => import('pages/StreetView.vue')},
      {path: '/LeafletMap', component: () => import('pages/LeafletMap.vue')},
      {path: '/ClusterMap', component: () => import('pages/ClusterMap.vue')},
      {path: '/WebSockets', component: () => import('pages/WebSockets.vue')},
      {path: '/TreeTable', component: () => import('pages/TreeTable.vue')},
      {path: '/Charts', component: () => import('pages/Charts.vue')},
      {path: '/Cards', component: () => import('pages/Cards.vue')},
      {path: '/Tables', component: () => import('pages/Tables.vue')},
      {path: '/Contact', component: () => import('pages/Contact.vue')},
      {path: '/Checkout', component: () => import('pages/Checkout.vue')},
      {path: '/Calendar', component: () => import('pages/Calendar.vue')},
      {path: '/Pagination', component: () => import('pages/Pagination.vue')},
      {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
      {path: '/Ecommerce', component: () => import('pages/ProductCatalogues.vue')},

      {path: '/UserProfile', component: () => import('pages/UserProfile.vue')},
      {path: '/PageTest', component: () => import('pages/PageTest.vue')},
      {path: '/MapSocket', component: () => import('pages/ClusterMapWebSocket.vue')},
      {path: '/MapSocket2', component: () => import('pages/ClusterMapWebSocket2.vue')},
      //{path: '/MapMoving', name:"map_moving", component: () => import('pages/MapMoving.vue'), beforeEnter: ifAuthenticated,},
      {path: '/MapDetail', component: () => import('pages/MapDetail2.vue')},

      {path: '/Dashboard', name:"dashboard", component: () => import('pages/Dashboard.vue'), beforeEnter: ifAuthenticated,},
      {path: '/MapMoving', name:"map_moving", component: () => import('pages/MapMoving.vue'), beforeEnter: ifAuthenticated,},

      {path: '/Devices', name: "devices_list", component: () => import('pages/devices/Index.vue')},
      {path: '/Devices/Create', name: "devices_create", component: () => import('pages/devices/Create.vue')},
      {path: '/Devices/Edit/:id', name: "device_edit", component: () => import('pages/devices/Edit.vue')},

      {path: '/Vehicles', name: "vehicles_list", component: () => import('pages/vehicles/Index.vue'), beforeEnter: ifAuthenticated,},
      {path: '/Vehicles/Create', name: "vehicles_create", component: () => import('pages/vehicles/Create.vue'), beforeEnter: ifAuthenticated,},
      {path: '/Vehicles/Edit/:id', name: "vehicles_edit", component: () => import('pages/vehicles/Edit.vue'), beforeEnter: ifAuthenticated,},
      {path: '/Vehicles/View/:id', name: "vehicles_view", component: () => import('pages/vehicles/View.vue'), beforeEnter: ifAuthenticated,},


      {path: 'forms/create', name: "form_create", component: () => import('pages/forms/Create.vue')},
      {path: 'forms/edit/:id', name: "form_edit", component: () => import('pages/forms/Edit.vue')},
      {path: 'forms/index', name: "form_index", component: () => import('pages/forms/Index.vue')},

    ]
  },
  {
    path: '/Lock',
    component: () => import('pages/LockScreen.vue')
  },
  {
    path: '/Maintenance',
    component: () => import('pages/Maintenance.vue')
  },
  {
    path: '/Pricing',
    component: () => import('pages/Pricing.vue')
  },




  {
    path: '/',
    name: 'login',
    // beforeEnter: logout,
    component: () => import('pages/Login.vue')
  },
  {
    path: '/Login-3',
    component: () => import('pages/Login-3.vue')
  },
  {
    path: '/Login-4',
    component: () => import('pages/Login4.vue')
  },
  {
    path: '/ForgottenPassword/:token',
    component: () => import('pages/ForgottenPassword.vue')
  },
  {
    path: '/Register',
    component: () => import('pages/RegisterForm.vue')
  },



  {
    path: '/Mail',
    component: () => import('layouts/Mail.vue')
  },
  {
    path: '/Lock-2',
    component: () => import('pages/LockScreen-2.vue')
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
