const CracoAntDesignPlugin = require('craco-antd');
const path = require('path');
module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin
    }
  ],
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
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
