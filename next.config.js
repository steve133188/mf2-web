module.exports = {
  reactStrictMode: true,
}

const path = require('path')
const withSass = require('@zeit/next-sass');
// module.exports = withSass({
//   cssModules: true,
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
// })

const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack5: true,
  webpack: (config, { isServer }) => {
    if(!isServer){
      config.resolve.fallback = { fs: false ,crypto:false , stream: false , path :false};
    }
    return config;
  },
});


// module.exports = {
//
//   webpack5: true,
//   webpack: (config, { isServer }) => {
//     if(!isServer){
//       config.resolve.fallback = { fs: false ,crypto:false , stream: false , path :false};
//     }
//     return config;
//   },
// };
