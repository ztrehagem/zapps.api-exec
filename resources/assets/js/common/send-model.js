modules.common

.service('sendModel', function() {
  var self = this;

  self.post = function(obj) { return obj && {
    id: obj.id
  };};
});
