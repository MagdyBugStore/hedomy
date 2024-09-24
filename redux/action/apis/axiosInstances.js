import axios from 'axios';

let prevDate = Date.now();

function convertLanguageToISO(languageName) {
  switch (languageName.toLowerCase()) {
    case 'arabic':
      return 'ar';
    case 'english':
      return 'en';
    // Add more cases for other languages if needed
    default:
      return 'en'; // Default to English
  }
}

// Create an instance of axios
export const mainApiInstance = axios.create({
  baseURL: process.env.BASE_URL || "",
  withCredentials: true
});

// Add a request interceptor
mainApiInstance.interceptors.request.use(
  config => {
    const dateNow = Date.now();
    const timeSinceLastRequest = dateNow - prevDate;

    const languageName = localStorage.getItem('lang') || 'english';
    const languageISOCode = convertLanguageToISO(languageName);

    // Set the language in the request headers
    config.headers['lang'] = languageISOCode;

    if (timeSinceLastRequest < 1000) {  // Check if less than 1 second has passed
      // Delay the request to fulfill the 1 second requirement
      return new Promise((resolve) => {
        setTimeout(() => {
          prevDate = Date.now();  // Update prevDate to the current time
          resolve(config);  // Continue with the request configuration
        }, 1000 - timeSinceLastRequest);  // Calculate the remaining time to delay
      });
    }
    prevDate = dateNow;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
mainApiInstance.interceptors.response.use(
  response => {
    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      // Find the 'connect.sid' cookie in the set-cookie header
      const connectSidCookie = setCookieHeader.find(cookie => cookie.startsWith('connect.sid='));
      if (connectSidCookie) {
        console.log('connect.sid:', connectSidCookie);
      }
    }
    return response;
  },
  async error => {
    // console.log(error.response)
    if (error.response && error.response.status === 423) {

      if (error.config.url == "/api/users/auth/refresh") {

      }
      else {
        try {
          const response = await mainApiInstance.post(`/api/users/auth/refresh`);
          return mainApiInstance(error.config);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);
