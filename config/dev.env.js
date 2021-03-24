'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
	API_ROOT: '"/api"',
//API_ROOT: '"//devapi.kunlunhealth.com.cn"',
  ENV:'"dev"'
});
