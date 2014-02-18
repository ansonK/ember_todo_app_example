TodosRoute = Ember.Route.extend
  model: ->
    @.store.find 'todo'

`export default TodosRoute`