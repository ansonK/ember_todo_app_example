TodosController = Ember.ArrayController.extend
  remaining: (->
    @.filterBy('isCompleted', false).get('length')
  ).property('@each.isCompleted')

  inflection: (->
    remaining = @.get('remaining')
    if remaining is 1 then 'item' else 'items'
  ).property('remaining')

  hasCompleted: (->
    @.get('completed_count') > 0
  ).property('completed_count')

  completed_count: (->
    @.filterBy('isCompleted', true).get('length')
  ).property('@each.isCompleted')

  allAreDone: (->
    #!!@.get('length') && 
    @.everyProperty('isCompleted', true)
  ).property('@each.isCompleted')

  actions:
    createTodo: ->
      title = @get('newTitle')
      if not title.trim() then return

      todo = @store.createRecord 'todo', {
        title: title,
        isCompleted: false
      }

      @set 'newTitle', ''

      todo.save()

    clearCompleted: ->
      completed = @.filterBy('isCompleted', true)
      completed.invoke 'deleteRecord'
      completed.invoke 'save'
    
`export default TodosController`