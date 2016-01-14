if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod/index.prod');
} else {
  module.exports = require('./dev/index.dev');
}