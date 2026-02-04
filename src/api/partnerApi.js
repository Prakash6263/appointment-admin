/**
 * Partners API calls
 */

const API_BASE_URL = 'http://localhost:5000/api';
// const API_BASE_URL = 'https://appointment.aitechnotech.in/api';

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
};

export default partnersAPI;
