define("appkit/router", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var Router;

    Router = Ember.Router.extend();

    Router.map(function() {
      return this.resource('todos', {
        path: '/'
      }, function() {
        this.route('active');
        return this.route('completed');
      });
    });

    __exports__["default"] = Router;;
  });