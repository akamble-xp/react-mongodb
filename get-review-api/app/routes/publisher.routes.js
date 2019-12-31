module.exports = (app) => {
    const publishers = require('../controllers/publisher.controller.js');

    // create a new publisher
    app.post('/api/publishers', publishers.create);

    // retrieve all publishers
    app.get('/api/publishers', publishers.findAll);

    // retrieve a single publisher with publisherId
    app.get('/api/publishers/:publisherId', publishers.findOne);

    // update a publisher with publisherId
    app.put('/api/publishers/:publisherId', publishers.update);

    // delete a publisher with publisherId
    app.delete('/api/publishers/:publisherId', publishers.delete);
}