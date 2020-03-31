const fs = require('fs')
var webpack = require("webpack");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import '@/assets/style.scss';
        `
      }
    }
  },

  devServer: {
    /* https: {
      key: fs.readFileSync('./raymond.key'),
      cert: fs.readFileSync('./raymond.crt'),
    },
    public: 'https://192.168.1.129:8080/' */
    /* https: {
      key: fs.readFileSync('./server.key'),
      cert: fs.readFileSync('./server.crt'),
    },
    public: 'https://192.168.1.152:8080/' */
  },

  pwa: {
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'public/service-worker.js',
      // ...other Workbox options...
    }
  },

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery'
      })
    ]
  }
}