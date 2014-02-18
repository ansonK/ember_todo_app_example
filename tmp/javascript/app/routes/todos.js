var TodosRoute;

TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

export default TodosRoute;
