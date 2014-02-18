var EditTodoView;

EditTodoView = Ember.TextField.extend({
  didInsertElement: function() {
    return this.$().focus();
  }
});

export default EditTodoView;
