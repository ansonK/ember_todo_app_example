EditTodoView = Ember.TextField.extend
  didInsertElement: ->
    @.$().focus()

# Ember.Handlebars.helper 'edit-todo', Todos.EditTodoView

`export default EditTodoView`