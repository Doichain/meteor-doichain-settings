Package.describe({
  name: 'doichain:settings',
  version: '0.1.2',
  // Brief, one-line summary of the package.
  summary: 'Loads and provides settings',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

const use   = [
      'ecmascript',
      'wanglian:lodash@0.0.1'
    ];

Package.onUse(function(api) {
  api.versionsFrom('1.8.1');
  api.use(use);
  api.mainModule('settings.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('doichain:settings');
  api.mainModule('settings-tests.js');
});
