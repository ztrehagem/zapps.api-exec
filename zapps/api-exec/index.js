(function() {

if (!angular) return;

angular.module('zapps.apiExec', []).provider('zpsApiExec', function() {
  var opt = {
    urlPrefix: '',
    httpMethods: ['get', 'post', 'put', 'patch', 'options', 'delete']
  };

  this.urlPrefix = function(str) {
    return (opt.urlPrefix = str || opt.urlPrefix);
  };

  this.httpMethods = function(arr) {
    return (opt.httpMethods = arr || opt.httpMethods);
  };

  this.$get = ['$http', zpsApiExecFactory.bind(this, opt)];
});

function zpsApiExecFactory(opt, $http) {
  var zpsApiExec = function(method, url, params, data, options) {
    options = options || {};
    var headers = {};

    if (options.multipartFormdata) {
      data = convertToFormData(data);
      headers['Content-Type'] = undefined;
    }

    return $http({
      method: method.toUpperCase(),
      url: resolve(url, params, opt.urlPrefix),
      params: params,
      data: data,
      headers: headers
    });
  };

  opt.httpMethods.forEach(function(method) {
    zpsApiExec[method] = zpsApiExec.bind(zpsApiExec, method);
  });

  return zpsApiExec;
}

function resolve(url, params, apiUrlPrefix) {
  // if `url` is not absolute then join prefix to url
  if (apiUrlPrefix && ['http://', 'https://', '//'].every(function(prefix) {
    return !startsWith(url, prefix);
  })) {
    url = apiUrlPrefix + url;
  }

  // fill url params
  return url.replace(/\/:[^/.]+/g, function(match) {
    var key = match.substring(2);
    var replaced = params[key] ? ('/' + params[key]) : '';
    delete params[key];
    return replaced;
  });
}


// String.prototype.startsWith for IE
function startsWith(orig, match) {
  if (orig.startsWith) return orig.startsWith(match);

  var len = match.length;
  var substr = orig.substring(0, len);
  return substr == match;
}

// convert plain `Object` to `FormData`
var convertToFormData = (function() {
  return function(data) {
    return recursive(new FormData(), [], data);
  };

  function recursive(fd, keystack, value) {
    angular.forEach(value, function(value, key) {
      if (angular.isUndefined(value) || value === null) return;
      var currentKeystack = keystack.concat(key);
      if (angular.isObject(value) && !(value instanceof Blob))
        recursive(fd, currentKeystack, value);
      else
        fd.append(buildKeyNameFrom(currentKeystack), value);
    });
    return fd;
  }

  function buildKeyNameFrom(keystack) {
    return keystack.slice(0, 1).concat(keystack.slice(1).map(function(key) {
      return '[' + key + ']';
    })).join('');
  }
})();

})();
