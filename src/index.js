import 'babel/polyfill';

import React from 'react';
import App from './components/App';

function run() {
  let props = {};
  // Render the top-level React component
  React.render(React.createElement(App, {props}), document.body);
}

// Run the application when both DOM is ready
// and page content is loaded
Promise.all([
  new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  })
]).then(run);
