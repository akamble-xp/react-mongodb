const Publisher = require('../models/publisher.model.js');
const Comment = require('../models/comment.model.js');

// create and save a new blog
exports.create = (req, res) => {
    // validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Blog content can not be empty"
        });
    }

    // create a publisher
    const publisher = new Publisher({
        name: req.body.publishedBy, 
        blogTitle: req.body.blogTitle,
        status: req.body.status
    });

    //save publisher in the database
    publisher.save()
    .then(data => {
        // create a blog
        const comment = new Comment({
            isBlog: true, 
            publisherId: data._id,
            writtenBy: req.body.writtenBy,
            postDate: req.body.postDate,
            blogText: req.body.content,
            imageUrls: [],
            videoUrls: [],
            presentationUrls: []
        });

        // save blog in the database
        comment.save()
        .then(comment => {
            res.send([data, comment]);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the blog."
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the blog."
        });
    });
};

// find a blog with a publisherId
exports.findOne = (req, res) => {
    Publisher.findById(req.params.id)
    .then(publisher => {
        if(!publisher) {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.id
            });            
        }

        Comment.find({ publisherId: req.params.id, isBlog: true })
        .then(comment => {
            if(!comment) {
                return res.status(404).send({
                    message: "Blog not found with id " + req.params.id
                });            
            }

            // Send blog details
            res.send({
                blogCommentId: comment[0]._id,
                blogTitle: publisher.blogTitle,
                writtenBy: comment[0].writtenBy,
                postedDate: comment[0].postDate,
                content: comment[0].blogText,
                publishedBy: publisher.name,
                references: []
            });
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving blog with id " + req.params.id
        });
    });
};

exports.getComments = (req, res) => { 
    Comment.find({ publisherId: req.params.id, isBlog: false })
            .then(data => {
                res.send([...data]);
            }).catch(err => {
                res.send([]);
            });
}