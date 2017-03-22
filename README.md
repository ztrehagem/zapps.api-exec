zapps.api-exec
==

# What's this?
AngularJS 1.x を用いたアプリケーションでAPIの実行に特化したservice

# Features
- build RESTful URI with any parameters
  - ex) `/foo/:id` + `{id: 123}` = `/foo/123`
- if you need, convert "Object" to "FormData" then post as "multipart/form-data" Content-Type

# Installation
1. Download `build/zapps-api-exec.js`
2. put in your html:`<script src="path/to/zapps-api-exec.js">`
3. put in your angular module dependency: `'zapps.apiExec'`
4. inject your service or controller: `zpsApiExec`
5. call methods when need to call your API: `zpsApiExec.get(...)`

# Usage

## zpsApiExecProvider
- inject `zpsApiExecProvider` in your 'config' function


### zpsApiExecProvider.urlPrefix([prefix])
- args
  - (option) prefix : String (default: `''`)
    - ex) `zpsApiExecProvider.urlPrefix('/api/v1');`
- return urlPrefix : String

### zpsApiExecProvider.httpMethods([methods])
- set shorthand method for `zpsApiExec`
- args
  - (option) methods : Array <String> (default: `['get', 'post', 'put', 'patch', 'options', 'delete']`)
- return methods : Array


## zpsApiExec

### zpsApiExec(method, url [, params [, data [, options]]])
- args
  - method : String
    - ex) `'get'` `'post'` etc
  - url : String
    - ex) `'/foo/bar'` `'http://example.com/foobar'`
  - (option) params : Object
    - ex) params `{id: 123, page: 5}` with url `/foo/:id` => `/foo/123?page=5`
  - (option) data : Object
    - request body as json for only non-GET method
  - (option) options : Object
    - `multipartFormdata` : boolean (default: `false`)
      - convert `data` object to `FormData` and set Content-Type to `multipart/form-data`
- returns $q deferred object same as $http service

### zpsApiExec[methodname] (url [, params [, data [, options]]])
- shorthand method to zpsApiExec
```js
zpsApiExec.get('/foo/:id', {id: 123})
```
equals
```js
zpsApiExec('get', '/foo/:id', {id: 123})
```
