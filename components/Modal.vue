<!-- src/components/Modal.vue -->
<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg w-1/3">
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold">{{ title }}</h2>
          <button @click="$emit('close')" class="text-gray-600 hover:text-gray-900">&times;</button>
        </div>
        <div class="p-4">
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Modal',
    props: {
      title: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your modal styles here */
  </style>
   