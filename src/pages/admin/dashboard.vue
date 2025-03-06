<template>
  <div>
    <Navbar />

    <!-- Crypto Data -->
    <CryptoData />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import CryptoData from '@/components/CryptoData.vue';

export default {
  name: 'AdminDashboard',
  components: {
    Navbar,
    CryptoData,
  }
}
</script>

<style>

</style>