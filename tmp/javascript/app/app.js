import Resolver from 'resolver';;
var App;

App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit',
  Resolver: Resolver['default']
});

DS.DebugAdapter.reopen({
  getModelTypes: function() {
    var self;
    self = this;
    return Ember.keys(requirejs._eak_seen).filter(function(key) {
      return !!key.match(/^appkit\/models\//) && self.detect(require(key)["default"]);
    }).map(function(key) {
      var type, typeKey;
      type = require(key)["default"];
      typeKey = key.match(/^appkit\/models\/(.*)/)[1];
      type.toString = function() {
        return {
          typeKey: typeKey
        };
      };
      return type;
    });
  }
});

export default App;;
