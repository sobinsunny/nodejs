
import AppServer from './modules/app_server';
import Promise from 'bluebird';


module.exports = Promise.props({
    appServer: new AppServer({})
})
.then(initializationparams => {
    return initializationparams.appServer.init();
})
.then(appServer => {
    return Promise.resolve(appServer);
})
.catch(error => {
    console.error(error);
});


