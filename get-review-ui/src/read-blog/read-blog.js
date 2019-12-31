import React, { useState, useEffect } from 'react';
import BlogAllComments from './blog-all-comments.js';
import './read-blog.css';

function ReadBlog(props) {

    const { match: { params } } = props;

    const [blog, setBlog] = useState({
        blogCommentId: '',
        blogTitle: '',
        writtenBy: '',
        postedDate: null,
        content: '',
        publishedBy: ''
    });

    const commentOnReview = { 
        writtenBy: '', 
        content: '' 
    }
    
    const [review, setReview] = useState(commentOnReview);
    
    const handleChange = (e, field) => {
        const tempReview = {
            writtenBy: review.writtenBy, 
            content: review.content 
        };
        tempReview[field] = e.target.value;
        setReview(tempReview);
    }

    useEffect(() => {
        fetch('http://localhost:3001/api/readBlog/' + params.id)
            .then(res => res.json())
            .then((data) => {
                setBlog(data);
            })
            .catch(console.log)
    },[]);

    const saveComment = (id) => {
        const saveData = {
            isBlog: false,
            publisherId: id,
            writtenBy: review.writtenBy,
            postDate: new Date(),
            blogText: review.content,
            imageUrls: [],
            videoUrls: [],
            pesentationUrls: []
        }

        fetch('http://localhost:3001/api/comments', {
            method: 'POST',
            body: JSON.stringify(saveData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            window.location.reload(false);
        });
    }

    return (
        <div>
            <div className="read-blog-card">
                <div className="read-blog-title">{blog.blogTitle}</div>
                <div className="read-blog-discription">
                    - by <span className="read-blog-written-by">@{blog.writtenBy}</span>, posted on {blog.postedDate}
                </div>
                <hr />
                <div className="read-blog-content">
                    {blog.content}
                </div>
                <hr />
                <div className="read-blog-published-by">{blog.publishedBy}</div>
            </div>
            <div className="read-blog-points">Reviews:</div>
            <div className="read-blog-card">
                <BlogAllComments key="blog-all-comments" blogId={blog.blogCommentId} />
            </div>
            <div className="read-blog-points">Your Review:</div>
            <div className="read-blog-card">
                <div className="replay-on-review">
                    <input type="text" placeholder="Your Name" className="txt-replay-on-review-your-name" value={review.writtenBy} onChange={(e) => handleChange(e, 'writtenBy')} />
                    <textarea rows={5} placeholder="Write your comment..." className="txa-replay-on-review-content" value={review.content} onChange={(e) => handleChange(e, 'content')} />
                    <hr />
                    <div className="replay-on-review-actions">
                        <button className="btn btn-replay-on-review-action-save" onClick={() => saveComment(blog.blogCommentId)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReadBlog;
