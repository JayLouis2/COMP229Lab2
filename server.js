require('dotenv').config();
const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Portfolio';

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)
  .then(function(conn) {
    console.log('MongoDB connected: ' + conn.connection.host + '/' + conn.connection.name);
    const server = http.createServer(app);
    server.listen(PORT, function() { console.log('Server listening on port ' + PORT); });
  })
  .catch(function(err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
