//工程配置文件，参见 https://eluxjs.com/guide/configure.html
const {getLocalIP} = require('@elux/cli-utils');
const serverPort = 4003;
const apiHosts = {
  local: `http://${getLocalIP()}:3003/`,
  test: 'http://10.201.0.212:31088/',
};
const APP_ENV = process.env.APP_ENV || 'local';
module.exports = {
  type: 'react',
  mockServer: {port: 3003, dir: '../app-api'},
  cssProcessors: {less: true},
  all: {
    //开发和生成环境都使用的配置
    serverPort,
    clientGlobalVar: {
      ApiPrefix: apiHosts[APP_ENV],
      StaticPrefix: apiHosts[APP_ENV],
    },
    webpackConfigTransform(config) {
      return config;
    },
  },
  dev: {
    //开发环境专用配置
    eslint: false,
    stylelint: false,
    //要使用开发代理可以放开下面代码
    // apiProxy: {
    //   '/api': {
    //     target: apiHosts[APP_ENV],
    //     pathRewrite: {
    //       '^/api': '',
    //     },
    //   },
    // },
  },
  moduleFederation: {
    name: 'reactTeam',
    filename: 'remote.js',
    exposes: {
      './stage-model': './src/modules/stage-model',
      './admin-model': './src/modules/admin-model',
      './article-model': './src/modules/article-model',
      './my-model': './src/modules/my-model',
      './shop-model': './src/modules/shop-model',
    },
    shared: {
      'query-string': {singleton: true, eager: true, requiredVersion: '*'},
      'path-to-regexp': {singleton: true, eager: true, requiredVersion: '*'},
      axios: {singleton: true, eager: true, requiredVersion: '*'},
      '@elux/core': {singleton: true, eager: true, requiredVersion: '*'},
      '@/Global': {singleton: true, eager: true, requiredVersion: '*'},
    },
  },
};
