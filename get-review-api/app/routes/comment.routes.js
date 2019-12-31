module.exports = (app) => {
    const comments = require('../controllers/comment.controller.js');

    // create a new comment
    app.post('/api/comments', comments.create);

    // retrieve all comments
    app.get('/api/comments', comments.findAll);

    // retrieve a single comment with commentId
    app.get('/api/comments/:commentId', comments.findOne);

    // update a comment with commentId
    app.put('/api/comments/:commentId', comments.update);

    // delete a comment with commentId
    app.delete('/api/comments/:commentId', comments.delete);
}