/**
 * Basic fetch wrapper to automate repetitive fetch tasks.
 * @param {String} location URL location to make the request to.
 * @param {String} method HTTP verb to use for the request.
 * @param {Object} body Body of the request, if POST or PUT
 * @returns {Promise} Promise returned by underlying fetch call.
 */
export const request = async (location, method = 'GET', body) => {
    const headers = {
      'Authorization': `Token ${localStorage.getItem('patient_token')}`
    };
  
    if(method === 'POST' || method === 'PUT' || method === 'DELETE') {
      headers['Content-Type'] = 'application/json';
    }
  
    const options = {
      method,
      headers
    };
  
    if(body) {
      options.body = JSON.stringify(body);
    }
  
    return await fetch(location, options);
};
  
const localServer = true;

export const BASE_URL = localServer ? `http://localhost:8000/` : `https://gavinschriver.pythonanywhere.com/`