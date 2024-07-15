<template>
  <div>
    <Home />
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-md">
        <form @submit.prevent="handleLogin" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input v-model="username"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" type="text" placeholder="Username" required>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <div class="relative">
              <input v-model="password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                :type="showPassword ? 'text' : 'password'" placeholder="*********" required>
              <button @click="showPassword = !showPassword" type="button"
                class="absolute right-0 top-0 mt-3 mr-4">
                <i v-if="showPassword" class="fas fa-eye text-gray-700"></i>
                <i v-else class="fas fa-eye-slash text-gray-700"></i>
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Sign In
            </button>
          </div>
          <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/services/authService';  // Ensure the correct import path
import Home from '@/components/Home.vue';

export default {
  name: 'LoginComponent',
  components: { Home },
  data() {
    return {
      username: '',
      password: '',
      error: '',
      showPassword: false  // Add showPassword data property
    };
  },
  methods: {
    async handleLogin() {
      try {
        await login(this.username, this.password);  // Assume login function handles authentication
        const redirect = this.$route.query.redirect || '/dashboard';
        this.$router.push(redirect);
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
