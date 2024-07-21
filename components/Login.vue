<template>
  <div>
    <Toast ref="toast" />
    <Home />
    <div class="min-h-screen flex items-center justify-center bg-slate-100">
      <div class="w-full max-w-md">
        <form @submit.prevent="handleLogin" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input v-model="username" ref="username" @input="clearUsernameError"
              class="shadow-md focus:border-blue-500 appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" type="text" placeholder="Username" :class="{ 'border-rose-500': errors.username }" />
            <p v-if="errors.username" class="text-rose-500 text-xs italic">{{ errors.username }}</p>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <div class="relative">
              <input v-model="password" ref="password" @input="clearPasswordError"
                class="shadow-md focus:border-blue-500 appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                :type="showPassword ? 'text' : 'password'" placeholder="*********"
                :class="{ 'border-rose-500': errors.password }" />
              <p v-if="errors.password" class="text-rose-500 text-xs italic">{{ errors.password }}</p>
              <button @click="showPassword = !showPassword" type="button" class="focus:outline-none focus:shadow-outline absolute right-0 top-0 mr-2 mt-2">
                <i v-if="showPassword" class="fas fa-eye text-gray-700"></i>
                <i v-else class="fas fa-eye-slash text-gray-700"></i>
              </button>
            </div>
          </div>
          <div class="flex justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              type="submit" :disabled="loading">
              <span v-if="loading" class="spinner-border animate-spin inline-block w-1 h-1 border-2 rounded-full mr-2"></span>Sign In
            </button>
            <div class="flex items-center cursor-pointer hover:underline">
              <router-link to="/register" class="text-xs text-black">Not a User? <span class="text-blue-500 font-bold">Create Account</span></router-link>
            </div>
          </div>
          <!-- <p v-if="error" class="mt-4 text-red-500">{{ error }}</p> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/services/authService'; // Ensure the correct import path
import Toast from '@/components/Toast.vue';
import Home from '@/components/Home.vue';

export default {
  name: 'LoginComponent',
  components: { Home, Toast },
  data() {
    return {
      username: '',
      password: '',
      errors: {},
      showPassword: false,
      loading: false, // Add loading state
      error: '' // Add error state
    };
  },
  methods: {
    async handleLogin() {
      this.errors = {};
      this.loading = true; // Set loading to true when login starts
      this.error = ''; // Clear general error message

      // Validate input fields
      if (!this.username) {
        this.errors.username = 'Username is required.';
        this.$refs.username.blur(); // Focus the username input
      }
      if (!this.password) {
        this.errors.password = 'Password is required.';
        this.$refs.password.blur(); // Focus the password input
      }

      // If there are errors, stop the login process
      if (this.errors.username || this.errors.password) {
        this.loading = false;
        return;
      }

      try {
        await login(this.username, this.password); // Assume login function handles authentication
        this.$refs.toast.showToast('Login successful!', 'green'); // Show success toast
        const redirect = this.$route.query.redirect || '/dashboard';
        setTimeout(() => {
          this.$router.push(redirect);
        }, 2000)
      } catch (err) {
        this.loading = false;
        this.error = err.message;
        this.$refs.toast.showToast(this.error,'red');
      }
    },
    clearUsernameError() {
      if (this.username) {
        this.errors.username = '';
      } 
      // else {
      //   this.errors.username = 'Username is required.';
      //   this.$refs.username.blur();
      // }
    },
    clearPasswordError() {
      if (this.password) {
        this.errors.password = '';
      } 
      // else {
      //   this.errors.password = 'Password is required.';
      //   this.$refs.password.blur();
      // }
    }

  }
};
</script>

<style scoped>
.spinner-border {
  width: 1rem !important;
  height: 1rem !important;
  border-top-color: transparent;
  border-right-color: transparent;
}
</style>
