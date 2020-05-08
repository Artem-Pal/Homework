const clientsRoutes = require('./clientsRoutes');
const applicationsRoutes = require('./applicationsRoutes');
const servicesRoutes = require('./servicesRoutes');

module.exports = function(app, mongoose, Client, Application, Service) {
    clientsRoutes(app, mongoose, Client);
    applicationsRoutes(app, mongoose, Client, Application, Service);
    servicesRoutes(app, mongoose, Service);
};