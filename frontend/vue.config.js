const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      staticOptions: {
        index: 'home.html',
      },
    },

    // proxy: 'http://127.0.0.1:8000',       // xhr only
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:8000',
      },
      '^/admin': {
        target: 'http://127.0.0.1:8000',
      },
      '^/static': {
        target: 'http://127.0.0.1:8000',
      }
    }    
  },

  outputDir: 'dist',
  publicPath: '/',
  assetsDir: 'static',

  pages: {
    home: {
      template: 'public/index.html',
      entry: 'src/pages/main_home.js',
      filename: 'home.html',
      title: 'VueDjangoWebpack2/home.html',
      minify: false,
    },

    post_list: {
      template: 'public/index.html',
      entry: 'src/pages/main_post_list.js',
      filename: 'post_list.html',
      title: 'VueDjangoWebpack2/post_list.html',
      minify: false,
    },

    post_detail: {
      template: 'public/index.html',
      entry: 'src/pages/main_post_detail.js',
      filename: 'post_detail.html',
      title: 'VueDjangoWebpack2/post_detail.html',
      minify: false,
    },
  },

  configureWebpack: {
    plugins: [
      new FileManagerPlugin({
        events: {
          onStart: {
            delete: [
              {
                source: '../backend/static/*/',
                options: { force: true },
              },
              {
                source: '../backend/templates/*/',
                options: { force: true },
              },              
            ],
          },

          onEnd: {
            copy: [
              // { source: 'dist/js/*', destination: '../backend/static/js/' },
              // { source: 'dist/css/*', destination: '../backend/static/css/' },
              { source: 'dist/static', destination: '../backend/static/' },
              { source: 'dist/favicon.ico', destination: '../backend/static/img/' },
              { source: 'dist/home.html', destination: '../backend/templates/' },
              { source: 'dist/post*.html', destination: '../backend/templates/blog/' },
            ],
          },
        },
      }),
    ]
  },

  css: {
    extract: { ignoreOrder: true },
  },
    
})
