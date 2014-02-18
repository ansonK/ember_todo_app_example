define("appkit/views/edit_todo", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var EditTodoView;

    EditTodoView = Ember.TextField.extend({
      didInsertElement: function() {
        return this.$().focus();
      }
    });

    __exports__["default"] = EditTodoView;
  });