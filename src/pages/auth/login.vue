<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
      <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 class="mb-6 text-center text-2xl font-bold text-gray-700">Login</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              v-model="email"
              required
              class="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              v-model="password"
              required
              class="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            class="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p class="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <router-link to="/register" class="text-blue-500 hover:underline">
            Register
          </router-link>
        </p>
      </div>
    </div>
  </template>

  <script>
  import axios from "axios";

  export default {
    name: "LoginPage",
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/login/", {
            email: this.email,
            password: this.password,
          });

          const token = response.data.access;
          const role = response.data.role;

          console.log(response.data)

          // Store token and role;
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);

          // redirect based on role
          if (role === "user") {
            this.$router.push("/user/dashboard");
          } else {
            this.$router.push("/admin/dashboard");
          }

        } catch (error) {
          alert("Login failed. Check your credentials.");
        }
      },
    },
  };
  </script>