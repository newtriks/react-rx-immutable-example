var getConfig = require('hjs-webpack');

module.exports = getConfig({
	in: 'src/index.js',
	out: 'public',
	isDev: process.env.NODE_ENV !== 'production',
  clearBeforeBuild: true
  // hostname: 'paranoid.local'
});
