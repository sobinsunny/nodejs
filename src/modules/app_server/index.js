import http from 'http';
import express from 'express';
import extend from 'extend';
import Promise from 'bluebird';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import AppLogger from '../Logger'


const app = express();


const AppServer = function(config){
  this.config =  extend(true, AppServer.defaultConfig, config )
};

AppServer.defaultConfig = {
    serviceName: 'App',
    port: 3000,
    apiPath: process.cwd() + "/src/api"

};

AppServer.prototype.init = function() {
    
    app.set('port',this._setPort());
    return Promise.props({
        server: http.createServer(app)
    })
    .then(appInitalization => {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        appInitalization.server.listen(this.config.port);
        let logger = new AppLogger()
        app.use(logger.setTogger);

        Promise.all([require(this.config.apiPath).init(app)])
        .then( _ => {
          console.log("Succesfully Added routes");
        })
        .catch(error => {
          console.log("Failed to load Api routes",error);
        });
        return appInitalization;
      })
      .then(appInitalization => {
        return appInitalization.server;
      })
      .catch(error => {
          console.error("error for starting an app",error)
      });
};


AppServer.prototype._setPort = function() {
  const port = this.config.port;
  var assined_port = parseInt(port, 10);
  if (isNaN(port)) {
    return port;
  }

  if (assined_port >= 0) {
    return assined_port;
  }

  return false;
};

module.exports = AppServer; 
