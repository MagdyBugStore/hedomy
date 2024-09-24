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
  };
  
  module.exports = nextConfig;
  