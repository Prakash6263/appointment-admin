/**
 * Authentication API calls
 */

const API_BASE_URL = 'http://localhost:5000/api';

export const authApi = {
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} role - User role (default: platform_admin)
   * @returns {Promise<Object>} Response data
   */
  login: async (email, password, role = 'platform_admin') => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });

    return await response.json();
  },

  /**
   * Logout user
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  logout: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  },
};
