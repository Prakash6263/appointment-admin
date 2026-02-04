/**
 * Partners API calls
 */

import { config } from '../config/config';

const API_BASE_URL = config.API_BASE_URL;

const partnersAPI = {
  /**
   * Get all partners
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data with array of partners
   */
  getAllPartners: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/partners`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching partners:', error);
      throw error;
    }
  },

  /**
   * Delete a partner by ID
   * @param {string} partnerId - Partner ID to delete
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  deletePartner: async (partnerId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/partners/${partnerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting partner:', error);
      throw error;
    }
  },

  /**
   * Approve a partner by ID
   * @param {string} partnerId - Partner ID to approve
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  approvePartner: async (partnerId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/partners/${partnerId}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: 'APPROVED',
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error approving partner:', error);
      throw error;
    }
  },

  /**
   * Disable a partner by ID
   * @param {string} partnerId - Partner ID to disable
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  disablePartner: async (partnerId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/partners/${partnerId}/disable`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error disabling partner:', error);
      throw error;
    }
  },

  /**
   * Enable a partner by ID
   * @param {string} partnerId - Partner ID to enable
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  enablePartner: async (partnerId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/partners/${partnerId}/enable`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error enabling partner:', error);
      throw error;
    }
  },
};

export default partnersAPI;
