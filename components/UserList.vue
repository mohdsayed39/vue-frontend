<template>
  <div>
    <Home />
    <div class="p-4">
      <div class="flex items-center mb-4">
        <button class="text-blue-500 text-2xl mr-2" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="text-2xl font-bold">User List</h1>
      </div>
      <button class="bg-blue-500 text-white px-4 py-2 rounded mb-4" @click="showCreateForm">Add User</button>
      <div class="flex items-center mb-3">
        <span class="font-bold font-l mr-2">Filter:</span>
        <input v-model="searchQuery" type="text" placeholder="Search..."
          class="w-25 border p-2 focus:!border-blue-500 focus:outline-none focus:shadow-outline" />
      </div>
      <div v-if="isLoading" class="text-center my-8">
        Loading...
      </div>
      <div v-else>
        <div class="table-responsive">
          <table class="table table-hover table-striped table-bordered table-sm">
            <thead>
              <tr>
                <th class="py-2 cursor-pointer" @click="sortBy('id')">
                  ID
                  <i :class="sortIcon('id')" class="ml-1"></i>
                </th>
                <th class="py-2 cursor-pointer" @click="sortBy('username')">
                  Username
                  <i :class="sortIcon('username')" class="ml-1"></i>
                </th>
                <th class="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredAndSortedUsers" :key="user.id" class="border-t">
                <td class="py-2 text-center">{{ user.id }}</td>
                <td class="py-2">{{ user.username }}</td>
                <td class="py-2">
                  <button class="btn btn-primary btn-sm mr-3" @click="editUser(user)">Edit</button>
                  <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Modal v-if="showForm" @close="cancelEdit" :title="editMode ? 'Edit User' : 'Create User'">
        <form @submit.prevent="editMode ? updateUser() : createUser()">
          <div class="mb-4">
            <label for="username" class="block mb-2">Username:</label>
            <input type="text" v-model="formData.username" id="username" class="border p-2 w-full" required>
          </div>
          <div class="mb-4">
            <label for="password" class="block mb-2">Password:</label>
            <input type="password" v-model="formData.password" id="password" class="border p-2 w-full" required>
          </div>
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded mr-2">{{ editMode ? 'Update' : 'Create'
            }}</button>
          <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded" @click="cancelEdit">Cancel</button>
        </form>
      </Modal>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import { fetchUsers, createUser, updateUser, deleteUser } from '@/services/userService';
import Home from '@/components/Home.vue';

export default {
  name: 'UserList',
  components: { Modal, Home },
  data() {
    return {
      users: [],
      isLoading: false,
      showForm: false,
      editMode: false,
      formData: {
        id: null,
        username: '',
        password: ''
      },
      searchQuery: '',
      sortKey: 'id', // Default sort by 'id'
      sortOrder: 'asc' // Default sort order 'asc'
    };
  },
  computed: {
    filteredAndSortedUsers() {
      // Filter users based on search query
      let users = this.users.filter(user =>
        (user.username && user.username.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );

      // Sort users based on sortKey and sortOrder
      if (this.sortKey) {
        users = users.sort((a, b) => {
          let modifier = 1;
          if (this.sortOrder === 'desc') modifier = -1;
          if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
          if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
          return 0;
        });
      }

      return users;
    }
  },
  methods: {
    async fetchUsers() {
      try {
        this.isLoading = true;
        const response = await fetchUsers(); // Adjust this based on your service method
        this.users = response;
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        this.isLoading = false;
      }
    },
    showCreateForm() {
      this.showForm = true;
      this.editMode = false;
      this.formData = { id: null, username: '', password: '' };
    },
    async createUser() {
      try {
        await createUser(this.formData.username, this.formData.password);
        this.fetchUsers();
        this.showForm = false;
      } catch (err) {
        console.error('Error creating user:', err);
      }
    },
    editUser(user) {
      this.showForm = true;
      this.editMode = true;
      this.formData = { ...user, password: '' };
    },
    async updateUser() {
      try {
        await updateUser(this.formData.id, this.formData.username, this.formData.password);
        this.fetchUsers();
        this.showForm = false;
        this.editMode = false;
      } catch (err) {
        console.error('Error updating user:', err);
      }
    },
    async deleteUser(userId) {
      try {
        await deleteUser(userId);
        this.fetchUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    },
    cancelEdit() {
      this.showForm = false;
      this.editMode = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    },
    sortIcon(key) {
      if (this.sortKey !== key) return 'cil-arrow-top'; // Default icon
      return this.sortOrder === 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom';
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
