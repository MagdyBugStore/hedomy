const nextConfig = {
    async rewrites() {
      return [
        {
            source: '/women',
            destination: '/',
        },
        {
          source: '/men',
          destination: '/',
        },
        {
          source: '/kids',
          destination: '/',
        }
      ];
    },
    env: {
      BASE_URL: "https://carrefour-1.onrender.com/api/",
      MAP_KEY: "AIzaSyBmXFsC7j7TpnZhwwqTYGPc8YaUXUjDw0g",
    },
  };
  
  module.exports = nextConfig;
  