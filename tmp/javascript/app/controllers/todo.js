var TodoController;

TodoController = Ember.ObjectController.extend({
  actions: {
    editTodo: function() {
      return this.set('isEditing', true);
    },
    removeTodo: function() {
      var todo;
      todo = this.get('model');
      todo.deleteRecord();
      return todo.save();
    },
    acceptChanges: function() {
      this.set('isEditing', false);
      if (Ember.isEmpty(this.get('model.title'))) {
        return this.send('removeTodo');
      } else {
        return this.get('model').save();
      }
    }
  },
  isEditing: false,
  isCompleted: (function(key, value) {
    var model;
    model = this.get('model');
    if (value === void 0) {
      return model.get('isCompleted');
    } else {
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }).property('model.isCompleted')
});

export default TodoController;
