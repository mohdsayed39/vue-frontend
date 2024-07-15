<template>
    <div>
      <template v-if="!isAuthenticated">
        <div class="flex">
          <router-link class="pr-3" to="/">Home</router-link>
          <router-link class="pr-3" to="/login">Login</router-link>
          <router-link class="pr-3" to="/register">Register</router-link>
        </div>
      </template>
      <template v-else><a @click="handleLogout" class="cursor-pointer flex justify-end p-2">Logout</a></template>
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
      this.$router.push('/');
    }
  }
};
</script>

<style>
/* Add your styles here */
</style>