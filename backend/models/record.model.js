const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: 'string',
  position: 'string',
  level: 'string',
});

const Record = mongoose.model('sample_training', recordSchema, 'records');

module.exports = {
  Record,
};
