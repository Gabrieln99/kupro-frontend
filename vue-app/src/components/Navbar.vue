<template>
  <header class="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Brand/Logo -->
        <div class="flex-shrink-0">
          <router-link
            to="/"
            class="flex items-center space-x-3 text-white hover:text-blue-100 transition-all duration-200"
          >
            <!-- Logo Icon -->
            <div
              class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md p-1"
            >
              <img src="/kupro_logo.png" alt="Kupro Logo" class="w-full h-full object-contain" />
            </div>
            <span class="text-2xl font-bold tracking-tight">Kupro</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            to="/"
            class="text-white hover:text-blue-100 hover:bg-blue-700 px-6 py-3 rounded-lg text-base font-medium transition-all duration-200"
            :class="{ 'bg-blue-800 text-blue-100': $route.path === '/' }"
          >
            Početna
          </router-link>

          <router-link
            to="/products"
            class="text-white hover:text-blue-100 hover:bg-blue-700 px-6 py-3 rounded-lg text-base font-medium transition-all duration-200"
            :class="{ 'bg-blue-800 text-blue-100': $route.path === '/products' }"
          >
            Proizvodi
          </router-link>

          <router-link
            to="/about"
            class="text-white hover:text-blue-100 hover:bg-blue-700 px-6 py-3 rounded-lg text-base font-medium transition-all duration-200"
            :class="{ 'bg-blue-800 text-blue-100': $route.path === '/about' }"
          >
            O nama
          </router-link>
        </div>

        <!-- Desktop Auth Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Authenticated User Menu -->
          <div v-if="isAuthenticated" class="flex items-center space-x-4">
            <router-link
              to="/add-item"
              class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Dodaj oglas
            </router-link>

            <!-- User Dropdown -->
            <div class="relative">
              <button
                @click="toggleUserMenu"
                class="flex items-center space-x-2 text-white hover:text-blue-100 px-4 py-2 rounded-lg transition-colors"
              >
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span class="text-sm font-semibold">{{ userInitials }}</span>
                </div>
                <span class="font-medium">{{ user?.name }}</span>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Moj profil
                </router-link>
                <router-link
                  to="/my-products"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Moji oglasi
                </router-link>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Odjavi se
                </button>
              </div>
            </div>
          </div>

          <!-- Guest User Buttons -->
          <div v-else class="flex items-center space-x-4">
            <router-link
              to="/login"
              class="text-white hover:text-blue-100 px-6 py-3 text-base font-medium transition-all duration-200 border border-transparent hover:border-blue-400 rounded-lg"
            >
              Prijava
            </router-link>
            <router-link
              to="/register"
              class="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 border border-white"
            >
              Registracija
            </router-link>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-white hover:text-blue-100 p-2 rounded-md transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!showMobileMenu"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div v-if="showMobileMenu" class="md:hidden bg-blue-700 border-t border-blue-600">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            class="block px-3 py-2 text-white hover:bg-blue-600 rounded-md text-base font-medium"
            @click="closeMobileMenu"
          >
            Početna
          </router-link>
          <router-link
            to="/products"
            class="block px-3 py-2 text-white hover:bg-blue-600 rounded-md text-base font-medium"
            @click="closeMobileMenu"
          >
            Proizvodi
          </router-link>
          <router-link
            to="/about"
            class="block px-3 py-2 text-white hover:bg-blue-600 rounded-md text-base font-medium"
            @click="closeMobileMenu"
          >
            O nama
          </router-link>

          <!-- Mobile Auth Section -->
          <div v-if="isAuthenticated" class="border-t border-blue-600 pt-4">
            <div class="px-3 py-2 text-blue-100 text-sm">Pozdrav, {{ user?.name }}!</div>
            <router-link
              to="/add-item"
              class="block px-3 py-2 text-white hover:bg-blue-600 rounded-md text-base font-medium"
              @click="closeMobileMenu"
            >
              Dodaj oglas
            </router-link>
            <router-link
              to="/profile"
              class="block px-3 py-2 text-white hover:bg-blue-600 rounded-md text-base font-medium"
              @click="closeMobileMenu"
            >
              Moj profil
            </router-link>
            <router-link
              to="/my-products"
              class="block px-3 py-2 text-white hover:bg-blue-600 rounded-md text-base font-medium"
              @click="closeMobileMenu"
            >
              Moji oglasi
            </router-link>
            <button
              @click="handleLogout"
              class="block w-full text-left px-3 py-2 text-white hover:bg-blue-600 rounded-md text-base font-medium"
            >
              Odjavi se
            </button>
          </div>

          <div v-else class="border-t border-blue-600 pt-4 space-y-1">
            <router-link
              to="/login"
              class="block px-3 py-2 text-white hover:bg-blue-600 rounded-md text-base font-medium"
              @click="closeMobileMenu"
            >
              Prijava
            </router-link>
            <router-link
              to="/register"
              class="block px-3 py-2 text-white hover:bg-blue-600 rounded-md text-base font-medium"
              @click="closeMobileMenu"
            >
              Registracija
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { user, isAuthenticated, logout } = useAuth()

// Mobile menu state
const showMobileMenu = ref(false)
const showUserMenu = ref(false)

// User initials for avatar
const userInitials = computed(() => {
  if (!user.value?.name) return '??'
  return user.value.name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

// Toggle mobile menu
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

// Close mobile menu
const closeMobileMenu = () => {
  showMobileMenu.value = false
}

// Toggle user menu
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

// Handle logout
const handleLogout = () => {
  logout()
  showUserMenu.value = false
  showMobileMenu.value = false
  router.push('/')
}
</script>
