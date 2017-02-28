modules.app

.run(function() {
  console.log('run');
})

.controller('post', function(api) {
  'ngInject';

  var ctrl = this;

  ctrl.reload = function(id) {
    console.log('reload');
    ctrl.gettingStatus = api.post.get(id).then(setPost);
  };

  ctrl.send = function(form) {
    console.log('send');
    var method = form.id ? api.post.update : api.post.post;
    ctrl.postingStatus = method(form).then(setPost);
  };

  function setPost(post) {
    ctrl.post = post;
  }
});
