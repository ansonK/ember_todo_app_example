define("appkit/routes/todos/completed", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var TodosCompletedRoute;

    TodosCompletedRoute = Ember.Route.extend({
      model: function() {
        return this.store.filter('todo', function(todo) {
          return todo.get('isCompleted');
        });
      },
      renderTemplate: function(controller) {
        return this.render('todos/index', {
          controller: controller
        });
      }
    });

    __exports__["default"] = TodosCompletedRoute;
  });