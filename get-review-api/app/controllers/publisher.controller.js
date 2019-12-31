const Publisher = require('../models/publisher.model.js');
const Comment = require('../models/comment.model.js');

// create and save a new publisher
exports.create = (req, res) => {
    // validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Publisher content can not be empty"
        });
    }

    // create a publisher
    const publisher = new Publisher({
        name: req.body.name, 
        blogTitle: req.body.blogTitle,
        status: req.body.status
    });

    // save publisher in the database
    publisher.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the publisher."
        });
    });
};

// retrieve and return all publishers from the database.
exports.findAll = (req, res) => {
    Publisher.find()
    .then(async (publishers) => {
        let blogs = [];
        for(let blog of publishers) {
            await Comment.find({publisherId: blog._id, isBlog: true}).then( blogDetails => {
                if(blogDetails && blogDetails.length > 0) {
                    blogs.push({
                        _id: blog._id,
                        name: blog.name,
                        blogTitle: blog.blogTitle,
                        status: blog.status,
                        writtenBy: blogDetails[0].writtenBy 
                    });
                } else {
                    blogs.push({
                        _id: blog._id,
                        name: blog.name,
                        blogTitle: blog.blogTitle,
                        status: blog.status,
                        writtenBy: '' 
                    });
                }
            }).catch(err => console.log(err));
        }
        res.send(blogs);
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving publishers."
        });
    });
};

// find a single publisher with a publisherId
exports.findOne = (req, res) => {
    Publisher.findById(req.params.publisherId)
    .then(publisher => {
        if(!publisher) {
            return res.status(404).send({
                message: "Publisher not found with id " + req.params.publisherId
            });            
        }
        res.send(publisher);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Publisher not found with id " + req.params.publisherId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving publisher with id " + req.params.publisherId
        });
    });
};

// update a publisher identified by the publisherId in the request
exports.update = (req, res) => {
    // validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Publisher content can not be empty"
        });
    }

    // find publisher and update it with the request body
    Publisher.findByIdAndUpdate(req.params.publisherId, {
        name: req.body.name, 
        blogTitle: req.body.blogTitle,
        status: req.body.status
    }, {new: true})
    .then(publisher => {
        if(!publisher) {
            return res.status(404).send({
                message: "Publisher not found with id " + req.params.publisherId
            });
        }
        res.send(publisher);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Publisher not found with id " + req.params.publisherId
            });                
        }
        return res.status(500).send({
            message: "Error updating publisher with id " + req.params.publisherId
        });
    });
};

// delete a publisher with the specified publisherId in the request
exports.delete = (req, res) => {
    Publisher.findByIdAndRemove(req.params.publisherId)
    .then(publisher => {
        if(!publisher) {
            return res.status(404).send({
                message: "Publisher not found with id " + req.params.publisherId
            });
        }
        res.send({message: "Publisher deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Publisher not found with id " + req.params.publisherId
            });                
        }
        return res.status(500).send({
            message: "Could not delete publisher with id " + req.params.publisherId
        });
    });
};