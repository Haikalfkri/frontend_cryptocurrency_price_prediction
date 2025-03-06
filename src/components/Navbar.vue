<template>
    <nav class="bg-white p-4 px-6 relative shadow-md font-poppins">
      <div class="flex justify-between items-center">
        <!-- Left side -->
        <div class="flex items-center space-x-4">
          <div class="text-gray-600 font-semibold text-md">Cryptocurrency Price Prediction System</div>
          <!-- Desktop Links -->
          <div class="hidden md:flex space-x-6 items-center">
            <router-link class="router-link text-sm font-medium text-gray-600" to="/home">Home</router-link>
            <router-link class="router-link text-sm font-medium text-gray-600" to="/predict">Predict</router-link>
            <router-link class="router-link text-sm font-medium text-gray-600" to="/users">Users</router-link>
            <router-link class="router-link text-sm font-medium text-gray-600" to="/feedbacks">Feedbacks</router-link>
          </div>
        </div>


      </div>
    </nav>
  </template>

  <script>
  export default {
    name: "NavbarLayout",
    data() {
      return {
        isDropdownOpen: false,
      };
    },
    methods: {
    },
  };
  </script>

  <style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  .font-poppins {
    font-family: 'Poppins', sans-serif;
  }

  .router-link:hover {
    color: #606691;
  }
  </style>