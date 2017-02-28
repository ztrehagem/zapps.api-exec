window.modules = {};

modules.common = angular.module('common', []);

modules.api = angular.module('api', [
  'common',
  'zapps.apiExec'
]);

modules.app = angular.module('app', [
  'api',
  // 'model'
  'common'
]);
// modules.model = angular.module('model', []);
