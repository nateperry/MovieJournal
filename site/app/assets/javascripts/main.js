/*
  main.js
  Will act as main controller
*/

window.App = {
  Models: {},
  Collections: {},
  Views: {}
};

App.Models.Journal = Backbone.Model.extend({

  initialize : function () {
    console.log('Journal initialized');
  },

  defaults : {
    title:'',
    dates: [],
    review: '',
    rating: 0,
    recommend: false
  }

});

App.Collections.JournalCollection = Backbone.Collection.extend({
  model: App.Models.Journal
});

App.Views.JournalForm = Backbone.View.extend({
  tagName: 'form',
  className: 'new-journal',
  initialize: function () {
    this.render();
  },
  render: function () {
    this.$el.html(this.newTemplate());
    $('#content').append(this.el);
  },
  newTemplate: _.template($('#journal-form').html()),
  events: {
    'submit': 'onFormSubmit'
  },
  onFormSubmit: function () {
    alert('form submitted!');
  }
});

App.Views.JournalsView = Backbone.View.extend({
  tagName: 'ul',
  className: 'journal-list',
  initialize: function () {
    this.collection;
  },
  render: function () {
    this.collection.each(function(Journal){
      var journalView = new App.Views.Journal({model: Journal});
      $('#content').append(journalView.el);
    });
  }
});

App.Views.Journal = Backbone.View.extend({
  tagName: 'div',
  className: 'journal',
  initialize: function () {
    this.render();
  },
  render: function () {
    this.el.innerHTML = this.model.get('title');
  }
});

var myJournal = new App.Models.Journal({
  title: 'Test',
  dates: ['1/22/2015'],
  review: 'this is my review',
  rating: 3,
  recommend: false
});

var myCollection = new App.Collections.JournalCollection([
  {
    title: 'Test',
    dates: ['1/22/2015'],
    review: 'this is my review',
    rating: 3,
    recommend: false
  },
  {
    title: 'Test Two',
    dates: ['1/22/2015'],
    review: 'this is my review',
    rating: 3,
    recommend: false
  }
]);

var myView = new App.Views.JournalsView({collection: myCollection});
myView.render();


var form = new App.Views.JournalForm();