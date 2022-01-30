// module.exports = {
//   reactStrictMode: true,
// }

const path = require('path')
const withSass = require('@zeit/next-sass');
module.exports = withSass({
  cssModules: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
})



module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack5: true,
  webpack: (config, { isServer }) => {
    if(!isServer){
      config.resolve.fallback = { fs: false ,crypto:false , stream: false , path :false};
    }
    return config;
  },
};
