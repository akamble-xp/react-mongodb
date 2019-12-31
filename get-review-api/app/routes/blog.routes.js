module.exports = (app) => {
    const blog = require('../controllers/blog.controller.js');

    // create a new blog
    app.post('/api/createBlog', blog.create);

    // read blog by publisherId
    app.get('/api/readBlog/:id', blog.findOne);

    // get cooments by publisherId
    app.get('/api/getComments/:id', blog.getComments);
}