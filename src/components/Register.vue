<template>
  <div>
    <Home />
    <div class="min-h-screen overflow-hidden flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-md">
        <form @submit.prevent="register" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input v-model="username"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" type="text" placeholder="Username">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <!-- <input v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password" type="password" placeholder="*********"> -->
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
              Register
            </button>
          </div>
          <p v-if="message" class="mt-4 text-red-500">{{ message }}</p>
        </form>
      </div>
      <router-link to="/users" class="text-white">Users</router-link> <!-- Example link -->
    </div>
  </div>

</template>

<script>
import Home from '@/components/Home.vue';

export default {
  name: 'RegisterComponent',
  components: { Home },
  data() {
    return {
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.error || 'Registration failed');
        }

        this.message = 'User registered successfully';
        this.username = '';
        this.password = '';
      } catch (error) {
        this.message = error.message;
      }
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
