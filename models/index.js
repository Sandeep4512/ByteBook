const mongoose=require('mongoose');
   mongoose.connect('mongodb+srv://phulmala:phulmala@cluster0.f5oyo.mongodb.net/myDatabase?retryWrites=true&w=majority');
   mongoose.Promise=Promise;
   mongoose.set('debug',true);

   module.exports.Products=require('./product');
   module.exports.Users=require('./user'); 
   module.exports.SliderImg=require('./slider')