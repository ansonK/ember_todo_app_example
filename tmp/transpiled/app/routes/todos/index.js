define("appkit/routes/todos/index", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var TodosIndexRoute;

    TodosIndexRoute = Ember.Route.extend({
      model: function() {
        return this.store.find('todo');
      }
    });

    __exports__["default"] = TodosIndexRoute;
  });