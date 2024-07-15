// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';

// Import your components
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import UserList from '@/components/UserList.vue';
import Home from '@/components/Home.vue';
import Dashboard from '@/components/Dashboard.vue';
import MappingDetails from '@/components/MappingDetails.vue';
import { isAuthenticated } from '@/services/authService';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/userlist',
    name: 'UserList',
    component: UserList,
    meta: { requiresAuth: true } // Assuming UserList requires authentication
  },
  {
    path: '/transactions',
    name: 'MappingDetails',
    component: MappingDetails,
    meta: { requiresAuth: true } // Assuming UserList requires authentication
  }
];

const router = new Router({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      // User is not authenticated, redirect to login with redirect query
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      // User is authenticated, allow navigation
      next();
    }
  } else {
    // No authentication required, allow navigation
    next();
  }
});


export default router;
