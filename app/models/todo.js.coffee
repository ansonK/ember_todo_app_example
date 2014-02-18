`import App from 'appkit/app'`

Todo = DS.Model.extend
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean'),

Todo.FIXTURES = [
    {
     id: 1,
     title: 'Learn Ember.js',
     isCompleted: true
    },
    {
     id: 2,
     title: 'Go do Stuff',
     isCompleted: false
    }
  ]

`export default Todo;`