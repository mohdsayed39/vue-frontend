<template>
  <div>
    <div class="system-bar flex justify-between items-center p-2 sticky top-0 z-10 bg-white">
      <img alt="Bank logo" src="@/assets/logoImage.png" width="150" style="height: 60px;" />
      <div v-if="!isAuthenticated" class="flex">
        <router-link class="pr-3" to="/login">
          <button class="border-2 border-blue-500 hover:border-white hover:bg-blue-600 hover:text-white text-blue-500 p-1 rounded-full w-20">Login</button>
        </router-link>
        <router-link class="pr-3" to="/register">
          <button class="border-2 border-blue-500 hover:border-white hover:bg-blue-600 hover:text-white text-blue-500 p-1 rounded-full w-20">Register</button>
        </router-link>
      </div>
      <div v-else>
        <a @click="handleLogout" class="cursor-pointer border-2 border-blue-500 rounded flex justify-end p-2 font-bold text-l">Logout</a>
      </div>
    </div>
  </div>
</template>

<script>
import { isAuthenticated, logout } from '@/services/authService';  // Ensure the correct import path

export default {
  name: 'Home',
  computed: {
    isAuthenticated() {
      return isAuthenticated();
    }
  },
  methods: {
    handleLogout() {
      logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style>
.system-bar {
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.2);
}
/* Add your styles here */
</style>