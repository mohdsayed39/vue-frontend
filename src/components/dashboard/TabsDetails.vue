<template>
    <div>
      <div class="flex border-b border-gray-300 ">
        <button 
          v-for="(tab, index) in tabs" 
          :key="index" 
          class="focus:outline-none focus:shadow-outline appearance-none"
          @click="selectedTab = tab"
          :class="[
            'px-4 py-2',
            { 'border-b-2 border-blue-500 font-semibold': selectedTab === tab },
            { 'text-gray-600': selectedTab !== tab }
          ]">
          {{ tab }}
        </button>
      </div>
  
      <div class="p-4">
        <div v-if="selectedTab === 'Security Account Master'">
          <SecAccMaster />
        </div>
        <div v-else-if="selectedTab === 'Security Master'">
          <SecurityMaster />
        </div>
        <div v-else-if="selectedTab === 'Security Transactions'">
          <SecurityTransactions />
        </div>
      </div>
    </div>
  </template>
  
  <script>
import SecAccMaster from './SecAccMaster.vue';
import SecurityMaster from './SecurityMaster.vue';
import SecurityTransactions from './SecurityTransactions.vue';
  export default {
    name: '',
    components: {
        SecAccMaster,
        SecurityMaster,
        SecurityTransactions,
    },
    data() {
      return {
        tabs: ['Security Account Master', 'Security Master', 'Security Transactions'],
        selectedTab: 'Security Account Master'
      };
    }
  };
  </script>
  
  <style scoped>
  /* Additional custom styles if needed */
  </style>
  