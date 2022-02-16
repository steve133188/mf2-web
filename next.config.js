// module.exports = {
//   reactStrictMode: true,
// }

const path = require('path')
const withSass = require('@zeit/next-sass');
module.exports ={
    eslint: {
        ignoreDuringBuilds: true,
    },
  cssModules: true,
    swcMinify: true,
    sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
            config.resolve.fallback = {
                fs: false ,crypto:false , stream: false , path :false , os:false , util:false
            }
        }

        return config;
    }
}



// module.exports = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   webpack5: true,
//   webpack: (config, { isServer }) => {
//     if(!isServer){
//       config.resolve.fallback = {process, fs: false ,crypto:false , stream: false , path :false};
//     }
//     return config;
//   },
// };
