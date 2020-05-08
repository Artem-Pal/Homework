const express        = require('express');
const mongoose       = require("mongoose");
const Schema         = mongoose.Schema;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = 8000;
const Service = require('./app/models/service')(mongoose);
const Client = require('./app/models/client')(mongoose);
const Application = require('./app/models/application')(mongoose);

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;

mongoose.connect(db.url,  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, (err, database) => {
    if (err) return console.log(err);

    require('./app/routes')(
        app,
        mongoose,
        Client,
        Application,
        Service
    );

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});
