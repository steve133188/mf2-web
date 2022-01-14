module.exports = {
  reactStrictMode: true,
}

const path = require('path')
const withSass = require('@zeit/next-sass');
module.exports = withSass({
  cssModules: true
})

const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public'
  }
})


module.exports = {
  /* Add Your Scss File Folder Path Here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
module.exports = {
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
};
