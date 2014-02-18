var TodosController;

TodosController = Ember.ArrayController.extend({
  remaining: (function() {
    return this.filterBy('isCompleted', false).get('length');
  }).property('@each.isCompleted'),
  inflection: (function() {
    var remaining;
    remaining = this.get('remaining');
    if (remaining === 1) {
      return 'item';
    } else {
      return 'items';
    }
  }).property('remaining'),
  hasCompleted: (function() {
    return this.get('completed_count') > 0;
  }).property('completed_count'),
  completed_count: (function() {
    return this.filterBy('isCompleted', true).get('length');
  }).property('@each.isCompleted'),
  allAreDone: (function() {
    return this.everyProperty('isCompleted', true);
  }).property('@each.isCompleted'),
  actions: {
    createTodo: function() {
      var title, todo;
      title = this.get('newTitle');
      if (!title.trim()) {
        return;
      }
      todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });
      this.set('newTitle', '');
      return todo.save();
    },
    clearCompleted: function() {
      var completed;
      completed = this.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      return completed.invoke('save');
    }
  }
});

export default TodosController;
