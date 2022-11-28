const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialnetworkAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
