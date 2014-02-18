var TodosIndexRoute;

TodosIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

export default TodosIndexRoute;
