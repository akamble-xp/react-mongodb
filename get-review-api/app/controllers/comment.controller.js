const Comment = require('../models/comment.model.js');

// create and save a new comment
exports.create = (req, res) => {
    // validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Comment content can not be empty"
        });
    }

    // create a comment
    const comment = new Comment({
        isBlog: req.body.isBlog, 
        publisherId: req.body.publisherId,
        writtenBy: req.body.writtenBy,
        postDate: req.body.postDate,
        blogText: req.body.blogText,
        imageUrls: req.body.imageUrls,
        videoUrls: req.body.videoUrls,
        presentationUrls: req.body.presentationUrls
    });

    // save comment in the database
    comment.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the comment."
        });
    });
};

// retrieve and return all comments from the database.
exports.findAll = (req, res) => {
    Comment.find()
    .then(comments => {
        res.send(comments);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comments."
        });
    });
};

// find a single comment with a commentId
exports.findOne = (req, res) => {
    Comment.findById(req.params.commentId)
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });            
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving comment with id " + req.params.commentId
        });
    });
};

// update a comment identified by the commentId in the request
exports.update = (req, res) => {
    // validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Comment content can not be empty"
        });
    }

    // find comment and update it with the request body
    Comment.findByIdAndUpdate(req.params.commentId, {
        isBlog: req.body.isBlog, 
        publisherId: req.body.publisherId,
        writtenBy: req.body.writtenBy,
        postDate: req.body.postDate,
        blogText: req.body.blogText,
        imageUrls: req.body.imageUrls,
        videoUrls: req.body.videoUrls,
        presentationUrls: req.body.presentationUrls
    }, {new: true})
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });                
        }
        return res.status(500).send({
            message: "Error updating comment with id " + req.params.commentId
        });
    });
};

// delete a comment with the specified commentId in the request
exports.delete = (req, res) => {
    Comment.findByIdAndRemove(req.params.commentId)
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });
        }
        res.send({message: "Comment deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete comment with id " + req.params.commentId
        });
    });
};