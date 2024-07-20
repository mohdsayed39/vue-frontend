<template>
  <div>
    <Toast ref="toast" class="bg-red-500" />
    <Home />
    <!-- min-h-screen overflow-hidden -->
    <div class="min-h-screen flex items-center justify-center bg-slate-100">
      <div class="w-full max-w-md">
        <form @submit.prevent="register" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input v-model="username" ref="username" @input="clearUsernameError"
              class="shadow-md focus:border-blue-500 appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" type="text" placeholder="Username" :class="{ 'border-rose-500': errors.username }">
              <p v-if="errors.username" class="text-rose-500 text-xs italic">{{ errors.username }}</p>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <div class="relative">
              <input v-model="password" ref="password" @input="clearPasswordError"
                class="shadow-md focus:border-blue-500 appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                :type="showPassword ? 'text' : 'password'" placeholder="*********" :class="{ 'border-rose-500': errors.password }">
              <button @click="showPassword = !showPassword" type="button"
                class="absolute right-0 top-0 mr-2 mt-2">
                <i v-if="showPassword" class="fas fa-eye text-gray-700"></i>
                <i v-else class="fas fa-eye-slash text-gray-700"></i>
              </button>
            </div>
            <p v-if="errors.password" class="text-rose-500 text-xs italic">{{ errors.password }}</p>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit" :disabled="loading">
              Register
            </button>
            <div class="flex items-center cursor-pointer hover:underline">
              <router-link to="/login" class="text-xs text-black">Already a User? <span class="text-blue-500 font-bold">Login</span></router-link>
            </div>
          </div>
          <!-- <p v-if="message" class="mt-4 text-red-500">{{ message }}</p> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Home from '@/components/Home.vue';
import Toast from '@/components/Toast.vue';

export default {
  name: 'RegisterComponent',
  components: { Home, Toast },
  data() {
    return {
      username: '',
      password: '',
      message: '',
      errors: {},
      showPassword: false,
      loading: false,
    };
  },
  methods: {
    async register() {
      // Reset errors
      this.errors = {};

      // Validate inputs
      if (!this.username) {
        this.errors.username = 'Username is required.';
      }
      if (!this.password) {
        this.errors.password = 'Password is required.';
      }

      // If there are validation errors, stop execution
      if (Object.keys(this.errors).length > 0) {
        return;
      }

      this.loading = true;

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
        this.$refs.toast.showToast(this.message, 'green'); // Show success toast
        this.username = '';
        this.password = '';
        const redirect = this.$route.query.redirect || '/login';
        setTimeout(() => {
          this.$router.push(redirect);
        }, 2000)
      } catch (error) {
        this.message = error.message;
        this.$refs.toast.showToast(this.message, 'red'); // Show success toast
      } finally {
        this.loading = false;
      }
    },
    clearUsernameError() {
      if (this.username) {
        this.errors.username = '';
      }
    },
    clearPasswordError() {
      if (this.password) {
        this.errors.password = '';
      }
    }
  }
};
</script>


<style scoped>
/* Add any additional styles here */
</style>
