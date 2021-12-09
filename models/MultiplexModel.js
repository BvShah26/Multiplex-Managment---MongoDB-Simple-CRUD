const mongoose = require('mongoose');
const MultiplexSchema = mongoose.Schema({
    MultiplexId:String,
    name:String,
    ScreenId:Array,

});

const MultiplexModel = mongoose.model("Multiplex", MultiplexSchema, "Multiplex");
module.exports = MultiplexModel;