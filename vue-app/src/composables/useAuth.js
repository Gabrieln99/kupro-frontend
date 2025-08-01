import { ref, computed } from 'vue'
import { authService } from '../services/authService.js'

// Global auth state
const user = ref(authService.getCurrentUser())
const token = ref(authService.getToken())

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value)
  const isLoading = ref(false)
  const error = ref(null)

  // Login function
  const login = async (credentials) => {
    try {
      isLoading.value = true
      error.value = null

      const response = await authService.login(credentials)

      if (response.success) {
        user.value = response.data.user
        token.value = response.data.token
        return response
      }
    } catch (err) {
      error.value = err.message || 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      isLoading.value = true
      error.value = null

      const response = await authService.register(userData)

      if (response.success) {
        user.value = response.data.user
        token.value = response.data.token
        return response
      }
    } catch (err) {
      error.value = err.message || 'Registration failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Logout function
  const logout = () => {
    authService.logout()
    user.value = null
    token.value = null
  }

  // Update profile function
  const updateProfile = async (userData) => {
    try {
      isLoading.value = true
      error.value = null

      const response = await authService.updateProfile(userData)

      if (response.success) {
        user.value = response.data.user
        return response
      }
    } catch (err) {
      error.value = err.message || 'Profile update failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Get profile function
  const getProfile = async () => {
    try {
      isLoading.value = true
      error.value = null

      const response = await authService.getProfile()

      if (response.success) {
        user.value = response.data.user
        return response
      }
    } catch (err) {
      error.value = err.message || 'Failed to fetch profile'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Clear error
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user: computed(() => user.value),
    token: computed(() => token.value),
    isAuthenticated,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),

    // Actions
    login,
    register,
    logout,
    updateProfile,
    getProfile,
    clearError,
  }
}
