const ObjectID = require('mongodb').ObjectID;

module.exports = (app, mongoose, Service) => {
    // get all services
    app.get('/services', (req, res) => {
        Service.find({}, (err, service) =>{
            if(err) return res.sendStatus(500);
            res.send(service);
        });
    });

    // get one service by id
    app.get('/services/:id', (req, res) => {
        const id = { '_id': new ObjectID(req.params.id) };

        Service.findOne({_id: id}, (err, service) =>{
            if (err) return res.sendStatus(500);
            res.send(service);
        });
    });

    // create one service
    app.post('/services', (req, res) => {
        if (!req.body) return res.sendStatus(400);

        const params = req.body;
        const serviceData = {
            name: params.name,
            price: params.price
        };
        const service = new Service(serviceData);

        service.save((err) => {
            if (err) return res.sendStatus(500);
            res.send(service);
        });
    });

    // update one service by id
    app.put('/services/:id', (req, res) => {
        if (!req.body) return res.sendStatus(400);

        const id = { '_id': new ObjectID(req.params.id) };
        const params = req.body;
        const serviceData = {
            name: params.name,
            price: params.price
        };

        Service.findOneAndUpdate({_id: id}, serviceData, {new: true}, (err, service) => {
            if (err) return res.sendStatus(500);
            if (service === null) {
                res.send('No such service for update')
            } else {
                res.send(service);
            }
        });

    });

    // delete one service by id
    app.delete('/services/:id', (req, res) => {
        const id = { '_id': new ObjectID(req.params.id) };

        Service.findByIdAndDelete(id, (err, service) =>{
            if (err) return res.sendStatus(500);
            if (service === null) {
                res.send('No such service for delete')
            } else {
                res.send(service);
            }
        });
    });
};