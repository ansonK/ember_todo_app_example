define("appkit/adapters/application", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // export default DS.FixtureAdapter.extend();
    __exports__["default"] = DS.LSAdapter.extend({ namespace: 'todo-emberjs' });
  });
define("appkit/app", 
  ["resolver","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Resolver = __dependency1__["default"];

    var App;

    App = Ember.Application.extend({
      LOG_ACTIVE_GENERATION: true,
      LOG_MODULE_RESOLVER: true,
      LOG_TRANSITIONS: true,
      LOG_TRANSITIONS_INTERNAL: true,
      LOG_VIEW_LOOKUPS: true,
      modulePrefix: 'appkit',
      Resolver: Resolver['default']
    });

    DS.DebugAdapter.reopen({
      getModelTypes: function() {
        var self;
        self = this;
        return Ember.keys(requirejs._eak_seen).filter(function(key) {
          return !!key.match(/^appkit\/models\//) && self.detect(require(key)["default"]);
        }).map(function(key) {
          var type, typeKey;
          type = require(key)["default"];
          typeKey = key.match(/^appkit\/models\/(.*)/)[1];
          type.toString = function() {
            return {
              typeKey: typeKey
            };
          };
          return type;
        });
      }
    });

    __exports__["default"] = App;;
  });
define("appkit/components/pretty-color", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Component.extend({
      classNames: ['pretty-color'],
      attributeBindings: ['style'],
      style: function(){
        return 'color: ' + this.get('name') + ';';
      }.property('name')
    });
  });
define("appkit/controllers/todo", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var TodoController;

    TodoController = Ember.ObjectController.extend({
      actions: {
        editTodo: function() {
          return this.set('isEditing', true);
        },
        removeTodo: function() {
          var todo;
          todo = this.get('model');
          todo.deleteRecord();
          return todo.save();
        },
        acceptChanges: function() {
          this.set('isEditing', false);
          if (Ember.isEmpty(this.get('model.title'))) {
            return this.send('removeTodo');
          } else {
            return this.get('model').save();
          }
        }
      },
      isEditing: false,
      isCompleted: (function(key, value) {
        var model;
        model = this.get('model');
        if (value === void 0) {
          return model.get('isCompleted');
        } else {
          model.set('isCompleted', value);
          model.save();
          return value;
        }
      }).property('model.isCompleted')
    });

    __exports__["default"] = TodoController;
  });
define("appkit/controllers/todos", 
  ["exports"],
  function(__exports__) {
    "use strict";
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

    __exports__["default"] = TodosController;
  });
define("appkit/helpers/reverse-word", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // Please note that Handlebars helpers will only be found automatically by the
    // resolver if their name contains a dash (reverse-word, translate-text, etc.)
    // For more details: http://stefanpenner.github.io/ember-app-kit/guides/using-modules.html

    __exports__["default"] = Ember.Handlebars.makeBoundHelper(function(word) {
      return word.split('').reverse().join('');
    });
  });
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
define("appkit/utils/ajax", 
  ["exports"],
  function(__exports__) {
    "use strict";
    /* global ic */
    __exports__["default"] = function ajax(){
      return ic.ajax.apply(null, arguments);
    }
  });
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
//@ sourceMappingURL=app.js.map