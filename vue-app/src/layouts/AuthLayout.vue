<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Simple Auth Header with Logo -->
    <Navbar />
    <!-- Main Content Area -->
    <main class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-md w-full">
        <RouterView />
      </div>
    </main>

    <!-- Simple Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>
