modules.api

.config(function(zpsApiExecProvider) {
  'ngInject';

  zpsApiExecProvider.urlPrefix('/api/v1');
})

.service('api', function($injector) {
  'ngInject';

  var apiNames = ['post'];
  var api = this;

  apiNames.forEach(function(name) {
    api[name] = $injector.get('api.' + name);
  });
});
