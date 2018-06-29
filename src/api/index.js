import Promise from 'bluebird';
import users from "../routes/users"

 module.exports.init = function(app){
     app.use("/api/users",users());
 }