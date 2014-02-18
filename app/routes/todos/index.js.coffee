TodosIndexRoute = Ember.Route.extend
  model: ->
    # @.modelFor 'todos'
    @store.find 'todo'

`export default TodosIndexRoute`