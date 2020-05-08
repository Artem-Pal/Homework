const ObjectID = require('mongodb').ObjectID;

module.exports = (app, mongoose, Client, Application, Service) => {
    // get all applications
    // populate - джойнит связанные таблицы
    app.get('/applications', (req, res) => {
        Application.find({})
            .populate('client service')
            .then(application => res.send(application));
    });

    // get one application by id
    app.get('/applications/:id', (req, res) => {
        const id = { '_id': new ObjectID(req.params.id) };

        Application
            .findOne({_id: id})
            .populate('client service')
            .then(application => res.send(application));
    });

    // create one application
    app.post('/applications', (req, res) => {
        if (!req.body) return res.sendStatus(400);

        const params = req.body;
        const applicationData = {
            client: params.client,
            service: params.service.split(', ')
        };
        const application = new Application(applicationData);

        application.save((err) => {
            if (err) return res.sendStatus(500);
            res.send(application);
        });
    });

    // read one application by id
    app.put('/applications/:id', (req, res) => {
        if (!req.body) return res.sendStatus(400);

        const id = { '_id': new ObjectID(req.params.id) };
        const params = req.body;
        const applicationData = {
            client: params.client,
            service: params.service.split(', ')
        };

        Application
            .findOneAndUpdate({_id: id}, applicationData, {new: true})
            .populate('client service')
            .then(application => res.send(application))
            .catch(err => console.log(err));
    });

    test = (params) => {

        return t;
    };

    // delete one application by id
    app.delete('/applications/:id', (req, res) => {
        const id = { '_id': new ObjectID(req.params.id) };

        Application.findByIdAndDelete(id, (err, application) =>{
            if (err) return res.sendStatus(500);
            res.send(application);
        });
    });
};