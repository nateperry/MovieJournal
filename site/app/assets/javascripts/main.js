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

  defaults: {
    title:'',
    date: '',
    review: '',
    rating: 0,
    recommend: false
  },

  validate: function(attrs, options) {
    if (! attrs.title) {
      return 'Title of the movie is required';
    }

    if (! attrs.review || attrs.review.length < 4) {
      return'Your review must be at least 4 letters';
    }

    if (! attrs.date) {
      return 'Must select a date';
    }
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
    'click .publish': 'onPublishSubmit',
    'click .draft': 'onDraftSubmit',
    'click .cancel': 'onCancel',
  },
  onPublishSubmit: function (e) {
    e.preventDefault();
    var j = this.createJournal();
    if (j.isValid()) {
      // go ahead and save
    } else {
      alert(j.validationError);
    }
  },
  onDraftSubmit: function (e) {
    e.preventDefault();
    var j = this.createJournal();
    if (j.isValid()) {
      // go ahead and save
    } else {
      alert(j.validationError);
    }
  },
  onCancel: function (e) {
    if (! window.confirm("Are you sure you cant to clear your journal?")) {
      e.preventDefault();
    }
  },
  createJournal: function () {
    return new App.Models.Journal({
      title: $('#journal-form-title').val(),
      date: $('#journal-form-date').val(),
      rating: $('#journal-form-rating').val(),
      recommend: $('#journal-form-recommend').is(':checked'),
      review: $('#journal-form-review').val(),
    });
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

/*
var myJournal = new App.Models.Journal({
  title: 'Test',
  dates: ['1/22/2015'],
  review: 'this is my review',
  rating: 3,
  recommend: false
});

/*
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
*/


var form = new App.Views.JournalForm();