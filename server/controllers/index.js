var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(req.body, function(err, results) {
        if (err) {
          console.log(err);
        }
        res
        .status(200)
        .type('json')
        .json({results: results});
      });


    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, function(err) {
        if (err) {
          console.log(err);
        }
      });
      res.end();
      // res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {

    },
    post: function (req, res) {
      models.users.post(req.body.username, function(err) {
        if (err) {
          console.log(err);
        }
      });
      res.end();
      //models.users.post(user);
    }
  }
};
