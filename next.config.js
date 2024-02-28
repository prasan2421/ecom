

/** @type {import('next').NextConfig} */
module.exports = {
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
      // Looks like backward compatibility approach.
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
      child_process: 'empty',
      net: 'empty',
      dns: 'empty',
      tls: 'empty',
    };

    return config;
  },
  images: {
    unoptimized: true,
   
    // path:'http://localhost:8888/tedxwordpress/wp-content/uploads'
  },
}
