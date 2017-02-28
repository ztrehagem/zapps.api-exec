modules.common

.service('viewModel', function() {
  var self = this;

  self.post = function(obj) { return obj && {
    id: obj.id
  };};
});
