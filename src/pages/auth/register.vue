<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md font-poppins">
      <h2 class="mb-6 text-center text-2xl font-bold text-gray-700">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-sm text-left font-medium text-gray-600">Username</label>
          <input
            type="text"
            v-model="username"
            required
            class="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm text-left font-medium text-gray-600">Email</label>
          <input
            type="email"
            v-model="email"
            required
            class="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm text-left font-medium text-gray-600">Password</label>
          <input
            type="password"
            v-model="password"
            required
            class="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm text-left font-medium text-gray-600">Confirm Password</label>
          <input
            type="password"
            v-model="password2"
            required
            class="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          class="w-full rounded-md bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white"
        >
          Register
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:underline">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password2: "",
    };
  },
  methods: {
    async register() {
      if (this.password !== this.password2) {
        alert("Passwords do not match!");
        return;
      }
      try {
        await axios.post("http://127.0.0.1:8000/api/register/", {
          username: this.username,
          email: this.email,
          password: this.password,
          password2: this.password2,
        });
        this.$router.push("/login");
      } catch (error) {
        alert("Registration failed.");
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>
