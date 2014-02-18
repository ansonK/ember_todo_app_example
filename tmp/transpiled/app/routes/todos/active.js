define("appkit/routes/todos/active", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var TodosActiveRoute;

    TodosActiveRoute = Ember.Route.extend({
      model: function() {
        return this.store.filter('todo', function(todo) {
          return !todo.get('isCompleted');
        });
      },
      renderTemplate: function(controller) {
        return this.render('todos/index', {
          controller: controller
        });
      }
    });

    __exports__["default"] = TodosActiveRoute;
  });