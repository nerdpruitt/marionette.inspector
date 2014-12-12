var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chaiJq = require('chai-jq');
var requireHelper = require('./require-helper');

chai.use(sinonChai);
chai.use(chaiJq);

global.expect = chai.expect;
global.sinon = sinon;

if (!global.document || !global.window) {
  var jsdom = require('jsdom').jsdom;

  document = global.document = jsdom('<html><head><script></script></head><body><div id="fixtures" hidden></div></body></html>', null, {
    FetchExternalResources   : ['script'],
    ProcessExternalResources : ['script'],
    MutationEvents           : '2.0',
    QuerySelector            : false
  });

  window = global.window = document.createWindow();
  global.navigator = global.window.navigator;
}


window.$ = global.$ = global.jQuery = require('../../../lib/jquery');
_ = window._ = global._ = require('../../../lib/underscore');
window.Backbone = global.Backbone = require('../../libs/backbone');
global.Backbone.$ = global.$;
window.Marionette = global.Marionette = require('../../libs/marionette');

// requireHelper('core');
