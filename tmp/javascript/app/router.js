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

export default Router;;
