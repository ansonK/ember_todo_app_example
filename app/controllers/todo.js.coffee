TodoController = Ember.ObjectController.extend
  actions:
    editTodo: ->
      @.set 'isEditing', true

    removeTodo: ->
      todo = @.get 'model'
      todo.deleteRecord()
      todo.save()

    acceptChanges: ->
      @.set 'isEditing', false

      if Ember.isEmpty(@.get('model.title'))
        @.send 'removeTodo'
      else
        @.get('model').save()

  isEditing: false

  isCompleted: ((key, value)->
    model = @.get 'model'

    if value is undefined
      model.get 'isCompleted'
    else
      model.set 'isCompleted', value
      model.save()
      value
    ).property('model.isCompleted')

`export default TodoController`