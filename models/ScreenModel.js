const mongoose=require('mongoose');
const ScreenSchema=mongoose.Schema({
    ScreenId:String,
    MovieName:String,
    MultiplexId:String
});

const ScreenModel=mongoose.model("Screen",ScreenSchema,"Screen");
module.exports=ScreenModel;