var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get().then((r) => {
        res.send(JSON.stringify(r));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body.message, req.body.username, req.body.roomname).then((r) => {
        res.end();
      }).catch((e) => {
        res.status(400);
        res.end();
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get().then((r) => {
        res.end(JSON.stringify(r));
      });
    },
    post: function (req, res) {
      models.users.post(req.body.username).then((r) => {
        res.end();
      }).catch((e) => {
        res.status(400);
        res.end();
      });
    }
  }
};
