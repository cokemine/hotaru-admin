const path = require('path');
const tailwindcss = require('tailwindcss');
module.exports = {
  style: {
    postcss: {
      plugins: [ tailwindcss(path.resolve(__dirname, './tailwind.config.js')), require('autoprefixer') ]
    }
  },
  webpack: {
    configure: config => {
      config.module.rules[1].oneOf.unshift({
        test: /\.svg$/,
        include: path.resolve('./src/assets/img/client'),
        use: [
          {
            loader: require.resolve('svg-sprite-loader'),
            options: {
              symbolId: '[name]'
            }
          }
        ]
      });
      return config;
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:35601',
        changeOrigin: true,
        pathRewrite: {}
      }
    }
  }
};
