var express = require('express');
var Router = express.Router();

/* GET users listing. */


module.exports = function() {
  Router.get('/', function(req, res, next) {+
    console.log("Users");
    return res.json({users: [{name: 'sobin'}]});
  });
  return Router;
}
