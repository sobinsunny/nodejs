var express = require('express');
var Router = express.Router();

/* GET users listing. */


module.exports = function() {
  Router.get('/', function(req, res, next) {
    return res.status(200).json({users: [{name: 'sobin'}]});
  });
  return Router;
}
