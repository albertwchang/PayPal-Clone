'use strict';

/* eslint no-console: "off" */
const webpackConfigs = require('./conf/webpack');

module.exports = (configName) => {
  // Return a new instance of the webpack config
  // or the default one if it cannot be found.
  let LoadedConfig = webpackConfigs[configName];

  if (LoadedConfig === undefined) {
    console.warn(`
      Provided environment "${configName}" was not found.
      Please use one of the following ones:
      ${Object.keys(webpackConfigs).join(' ')}
    `);

    // If there was no configuration give, assume default
    LoadedConfig = webpackConfigs['dev'];
  }

  const loadedInstance = new LoadedConfig();

  // Set the global environment
  process.env.NODE_ENV = loadedInstance.env;

  return loadedInstance.config;
};
