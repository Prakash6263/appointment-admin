/**
 * Application Configuration
 * Centralized configuration for API endpoints and environment variables
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://appointment.aitechnotech.in/api';

export const config = {
  API_BASE_URL,
};

export default config;
