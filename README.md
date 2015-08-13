# ReactJS, RxJS and ImmutableJS example project

Example project setup with configuration out the box and a working dev api server.

![image](https://cloud.githubusercontent.com/assets/31971/9246096/17e744b6-41a1-11e5-9500-cbb5ad6bb88e.png)

1. [Webpack](http://webpack.github.io/) - module loader. Configured using the [hjs-webpack](https://github.com/HenrikJoreteg/hjs-webpack) helpers/presets.
2. [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) including [hot module replacement](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack) (supports [react](https://github.com/gaearon/react-hot-loader) and css) - local server to run client application.
3. [React](http://facebook.github.io/react/) - user interface development library.
4. [RxJS](https://github.com/Reactive-Extensions/RxJS) - reactive extensions for JS.
5. [ImmutableJS](https://facebook.github.io/immutable-js/) - immutable collections for JavaScript.
6. [hapi-dummy-api](https://github.com/HenrikJoreteg/hapi-dummy-api) - generate dummy APIs for hapi.js, for building clientside apps before the real API is done.
7. [ES2015](https://babeljs.io/docs/learn-es2015/) - syntax support.
8. [yeticss](http://yeticss.com/) - lightweight, modular pattern library written in [Stylus](https://learnboost.github.io/stylus/) (simple style bootstrap so don't have to bother).

## Usage

* Build - `npm run build`
* Start local server - `npm start`
* Start dummy api - `node api/server.js`

### API

To add further *api* endpoints simply:

1. Create a new file in `api/plugins/` and follow the logic as seen in `api/plugins/people`.
2. Register the plugin in the `api/server.js` by simply adding to the array of registered plugins e.g.

```
[{
  register: dummy,
  options: require('./plugins/people')
},{
  register: dummy,
  options: require('./plugins/another')
}]
```
