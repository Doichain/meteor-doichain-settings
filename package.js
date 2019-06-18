Package.describe({
  name: 'doichain:settings',
  version: '0.2.18',
  summary: 'Loads and provides settings from settings json or alternatively from db',
  git: 'https://github.com/Doichain/meteor-doichain-settings.git',
  documentation: 'README.md'
});

const use   = ['ecmascript',
               'alanning:roles@1.2.16'];

Package.onUse(function(api) {
  api.versionsFrom('1.8.1');
  api.use(use);
  api.mainModule('settings-client.js','client');
  api.mainModule('settings-server.js','server');
});

Npm.depends({
    'lodash':'4.17.11',
    'react-table':'6.10.0',
});

/**
 * run tests via: meteor test-packages --settings settings-test.json --driver-package meteortesting:mocha ./
 */
Package.onTest(function(api) {
  api.use('ecmascript');
  api.use(['mongo@1.6.2','meteortesting:mocha@1.1.2','practicalmeteor:chai@2.1.0_1']);
  api.use('doichain:settings');
  api.mainModule('settings-tests.js');
});
