modules.api

.service('api.post', function(zpsApiExec, $q, viewModel, sendModel) {
  'ngInject';

  this.get = function(id) {
    return zpsApiExec.get('/posts/:id', {id: id}, null).then(function(resp) {
      return viewModel.post(resp.data);
    }).catch(function(error) {
      if (error.status == 404) return null;
      return $q.reject(error);
    });
  };

  this.post = function(post) {
    post = sendModel.post(post);
    return zpsApiExec.post('/posts', null, post, {
      multipartFormdata: true
    }).then(function(resp) {
      return viewModel.post(resp.data);
    });
  };

  this.update = function(post) {
    post = sendModel.post(post);
    return zpsApiExec.put('/posts/:id', {id: post.id}, post).then(function(resp) {
      return viewModel.post(resp.data);
    });
  };
});
