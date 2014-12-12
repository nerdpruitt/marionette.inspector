var $ = require('jquery');
var $fixtures = $('#fixtures');

var setFixtures = function () {
    _.each(arguments, function (content) {
        $fixtures.append(content);
    });
};

var clearFixtures = function () {
    $fixtures.empty();
};

var originalHash = global.window.location.hash;

before(function() {
            this.setFixtures = setFixtures;
            this.clearFixtures = clearFixtures;
});

beforeEach(function () {
    this.sinon = sinon.sandbox.create();

    /*
     * This is the Agent secret sauce.
     * We'll want to be able to run this before/after each unit test...
     * but to do that, we'll need to be able to pass in a new Backbone,Marionette
     * which means wrapping these libs in a factory that creates a new one.
    */

    delete global.patchedBackbone;
    delete global.patchedMarionette;
    delete global._knownTypes;
    global.window.Backbone = global.window.BackboneFactory();
    global.window.Marionette = global.window.MarionetteFactory(global.window.Backbone);
    patchBackbone(global.window.Backbone);
    global.patchMarionette(global.window.Backbone, global.window.Marionette);

    global.knownTypes();

});

afterEach(function () {
    this.sinon.restore();
    this.clearFixtures();
    global.window.location.hash = originalHash;
    Backbone.history.stop();
    Backbone.history.handlers.length = 0;
});
