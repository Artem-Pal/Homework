const ObjectID = require('mongodb').ObjectID;

module.exports = (app, mongoose, Client) => {
    // get all clients
    app.get('/clients', (req, res) => {
        Client.find({}, (err, client) =>{
            if (err) return res.sendStatus(500);
            res.send(client);
        });
    });

    // get one client by id
    app.get('/clients/:id', (req, res) => {
        const id = { '_id': new ObjectID(req.params.id) };

        Client.findOne({_id: id}, (err, client) =>{
            if (err) return res.sendStatus(500);
            res.send(client);
        });
    });

    // create one client
    app.post('/clients', (req, res) => {
        if (!req.body) return res.sendStatus(400);

        const params = req.body;
        const clientData = {
            fullname: params.fullname,
            age: params.age,
            phone: params.phone,
            city: params.city
        };
        const client = new Client(clientData);

        client.save((err) => {
            if (err) return res.sendStatus(500);
            res.send(client);
        });
    });

    // update one client by id
    app.put('/clients/:id', (req, res) => {
        if (!req.body) return res.sendStatus(400);

        const id = { '_id': new ObjectID(req.params.id) };
        const params = req.body;
        const clientData = {
            fullname: params.fullname,
            age: params.age,
            phone: params.phone,
            city: params.city
        };

        Client.findOneAndUpdate({_id: id}, clientData, {new: true}, (err, client) => {
            if (err) return res.sendStatus(500);
            if (client === null) {
                res.send('No such client for update')
            } else {
                res.send(client);
            }

        });

    });

    // delete one client by id
    app.delete('/clients/:id', (req, res) => {
        const id = { '_id': new ObjectID(req.params.id) };

        Client.findByIdAndDelete(id, (err, client) =>{
            if (err) return res.sendStatus(500);
            if (client === null) {
                res.send('No such client for delete')
            } else {
                res.send(client);
            }
        });
    });
};