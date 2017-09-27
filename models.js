const mongoose = require('mongoose');

const agendaSchema = mongoose.Schema({
  events: { type: Array, required: true }
});

agendaSchema.methods.apiRepr = function() {
  return {
    events: this.events
  };
};

const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = { Agenda };
