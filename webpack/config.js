const webpackMerge = require('webpack-merge');
const loadSharedConfig = require('./configs/shared');
const debounce = require('lodash.debounce');

const loadModeConfig = env => require(`./configs/${env.mode}`)(env);

module.exports = env =>
  webpackMerge(loadSharedConfig(env), loadModeConfig(env));
