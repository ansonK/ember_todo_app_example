define("appkit/models/todo", 
  ["appkit/app","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var App = __dependency1__["default"];
    var Todo;

    Todo = DS.Model.extend({
      title: DS.attr('string'),
      isCompleted: DS.attr('boolean')
    });

    Todo.FIXTURES = [
      {
        id: 1,
        title: 'Learn Ember.js',
        isCompleted: true
      }, {
        id: 2,
        title: 'Go do Stuff',
        isCompleted: false
      }
    ];

    __exports__["default"] = Todo;;
  });