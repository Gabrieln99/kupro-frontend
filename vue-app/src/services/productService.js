import api from './api.js'

export const productService = {
  // Get all products with filters
  async getProducts(params = {}) {
    try {
      const response = await api.get('/products', { params })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch products' }
    }
  },

  // Get single product by ID
  async getProduct(id) {
    try {
      const response = await api.get(`/products/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch product' }
    }
  },

  // Create new product
  async createProduct(productData) {
    try {
      const response = await api.post('/products', productData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create product' }
    }
  },

  // Update product
  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/products/${id}`, productData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update product' }
    }
  },

  // Delete product
  async deleteProduct(id) {
    try {
      const response = await api.delete(`/products/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete product' }
    }
  },

  // Get user's products
  async getUserProducts() {
    try {
      const response = await api.get('/products/user/my-products')
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user products' }
    }
  },

  // Search products
  async searchProducts(searchTerm, filters = {}) {
    try {
      const params = {
        search: searchTerm,
        ...filters,
      }
      const response = await api.get('/products', { params })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to search products' }
    }
  },

  // Get products by category
  async getProductsByCategory(category, params = {}) {
    try {
      const response = await api.get('/products', {
        params: {
          category,
          ...params,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch products by category' }
    }
  },
}
