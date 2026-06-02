const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetches dynamic portfolio configurations from Express backend.
 * @returns {Promise<Object>} The parsed portfolio JSON structure.
 */
export async function getPortfolioData() {
  try {
    const response = await fetch(`${API_URL}/portfolio`);
    if (!response.ok) {
      throw new Error(`Failed to load portfolio metadata. Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('getPortfolioData error:', error);
    throw error;
  }
}

/**
 * Posts contact form message to the backend with validations.
 * @param {Object} formData { name, email, subject, message }
 * @returns {Promise<Object>} Response status details.
 */
export async function submitContactForm(formData) {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (!response.ok) {
      // Return custom array validation errors if present
      if (result.errors) {
        throw new Error(result.errors.map(err => err.msg).join(', '));
      }
      throw new Error(result.error || 'Failed to submit contact request');
    }
    return result;
  } catch (error) {
    console.error('submitContactForm error:', error);
    throw error;
  }
}
