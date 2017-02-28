const Zelixir = require('z-elixir');
const Resource = Zelixir.Resource;
const Task = Zelixir.Task;
const config = Zelixir.config;
const options = Zelixir.options;

config.enabledNgAnnotate = true;

Resource('html', Resource.template('html'));
Resource('js', Resource.template('js'));
Resource('sass', Resource.template('sass'));
Resource('zapps-api-exec', Resource.create({
  src: ['zapps/api-exec/index.js'],
  concat: 'zapps-api-exec.js'
}).dest('js'));
Resource('zapps-api-exec-build', Resource.create({
  src: ['zapps/api-exec/index.js'],
  concat: 'zapps-api-exec.js',
  dest: 'build/'
}));


Task('html', ['html'], Task.template('html'));
Task('js', ['js'], Task.template('js'));
Task('sass', ['sass'], Task.template('sass'));
Task('zapps-api-exec', ['zapps-api-exec'], Task.template('js'));
if (options.p) Task('zapps-api-exec-build', ['zapps-api-exec-build'], Task.template('js'));


Task.default();
Task.watch();
