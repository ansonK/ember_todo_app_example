define("appkit/routes/todos", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var TodosRoute;

    TodosRoute = Ember.Route.extend({
      model: function() {
        return this.store.find('todo');
      }
    });

    __exports__["default"] = TodosRoute;
  });