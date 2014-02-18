Router = Ember.Router.extend()

Router.map ->
  @resource 'todos', path: '/', ->
    @.route 'active'
    @.route 'completed'

`export default Router;`