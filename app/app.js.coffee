`import Resolver from 'resolver';`

App = Ember.Application.extend
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit',
  Resolver: Resolver['default']

# To get the data tab picking up models in Ember Inspector
# https://github.com/stefanpenner/ember-app-kit/issues/263#issuecomment-31010792
DS.DebugAdapter.reopen
  getModelTypes: ->
    self = @
    Ember.keys(requirejs._eak_seen).filter((key) -> 
      !!key.match(/^appkit\/models\//) && self.detect(require(key).default)
    ).map((key) ->
      type = require(key).default 
      typeKey = key.match(/^appkit\/models\/(.*)/)[1]
      type.toString = -> { typeKey }
      type
    )

`export default App;`