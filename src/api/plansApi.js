/**
 * Membership Plans and Partners API calls
 */

const API_BASE_URL = 'https://appointment.aitechnotech.in/api';

export const plans = {
  /**
   * Create a new membership plan
   * @param {Object} planData - Plan details
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  createPlan: async (planData, token) => {
    const response = await fetch(`${API_BASE_URL}/admin/plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(planData),
    });

    return await response.json();
  },

  /**
   * Get all membership plans
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  getAllPlans: async (token) => {
    const response = await fetch(`${API_BASE_URL}/admin/plans`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  },

  /**
   * Get a single membership plan
   * @param {string} planId - Plan ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  getPlanById: async (planId, token) => {
    const response = await fetch(`${API_BASE_URL}/admin/plans/${planId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  },

  /**
   * Update a membership plan
   * @param {string} planId - Plan ID
   * @param {Object} planData - Updated plan details
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  updatePlan: async (planId, planData, token) => {
    const response = await fetch(`${API_BASE_URL}/admin/plans/${planId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(planData),
    });

    return await response.json();
  },

  /**
   * Delete a membership plan
   * @param {string} planId - Plan ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  deletePlan: async (planId, token) => {
    const response = await fetch(`${API_BASE_URL}/admin/plans/${planId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  },
};

/**
 * Partners API calls
 */
export const partners = {
  /**
   * Get all partners
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  getAllPartners: async (token) => {
    const response = await fetch(`${API_BASE_URL}/admin/partners`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  },

  /**
   * Get a single partner
   * @param {string} partnerId - Partner ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  getPartnerById: async (partnerId, token) => {
    const response = await fetch(`${API_BASE_URL}/admin/partners/${partnerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  },

  /**
   * Create a new partner
   * @param {Object} partnerData - Partner details
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  createPartner: async (partnerData, token) => {
    const response = await fetch(`${API_BASE_URL}/admin/partners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(partnerData),
    });

    return await response.json();
  },

  /**
   * Update a partner
   * @param {string} partnerId - Partner ID
   * @param {Object} partnerData - Updated partner details
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  updatePartner: async (partnerId, partnerData, token) => {
    const response = await fetch(`${API_BASE_URL}/admin/partners/${partnerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(partnerData),
    });

    return await response.json();
  },

  /**
   * Delete a partner
   * @param {string} partnerId - Partner ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response data
   */
  deletePartner: async (partnerId, token) => {
    const response = await fetch(`${API_BASE_URL}/admin/partners/${partnerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  },
};
