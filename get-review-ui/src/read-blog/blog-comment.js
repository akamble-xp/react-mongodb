import React, { useState, useEffect } from 'react';
import './blog-comment.css';

function BlogComment(props) {

    const [isAddComment, setIsAddComment] = useState(false);
    const [blogComments, setBlogComments] = useState({});
    let commentPId = props.comment._id;
    
    useEffect(() => {
        if(commentPId) {
            fetch('http://localhost:3001/api/getComments/' + commentPId)
            .then(res => res.json())
            .then((data) => {
                setBlogComments(data);
            })
            .catch(console.log)
        }
    },[commentPId]);
    
    const showHideReplayOnComment = (action) => {
        if(action === 'replay') {
            setIsAddComment(!isAddComment);
        } else if(action === 'cancel') {
            setIsAddComment(false);
        }
    }

    const commentOnComment = { 
        writtenBy: '', 
        content: '' 
    }
    
    const [comment, setComment] = useState(commentOnComment);
    
      const handleChange = (e, field) => {
        const tempComment = {
          writtenBy: comment.writtenBy, 
          content: comment.content 
        };
        tempComment[field] = e.target.value;
        setComment(tempComment);
      }

    const saveComment = (id) => {
        const saveData = {
            isBlog: false,
            publisherId: id,
            writtenBy: comment.writtenBy,
            postDate: new Date(),
            blogText: comment.content,
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
            fetch('http://localhost:3001/api/getComments/' + id)
            .then(res => res.json())
            .then((data) => {
                setBlogComments(data);
                setIsAddComment(false);
            })
            .catch(console.log)
        });

    }

    return (
        <div className="blog-comment">
            <div className="blog-comment-discription">
                <span className="blog-comment-written-by">@{props.comment.writtenBy}</span>
                <span className="blog-comment-posted-on"> on {props.comment.postDate}</span>
                <span className="blog-comment-action-replay" onClick={() => showHideReplayOnComment('replay')}>Replay</span>
            </div>
            <div className="blog-comment-content">
                {props.comment.blogText}
            </div>
            {isAddComment ?
                (<div className="replay-on-comment">
                    <input type="text" placeholder="Your Name" className="txt-replay-on-comment-your-name" value={comment.writtenBy} onChange={(e) => handleChange(e, 'writtenBy')} />
                    <textarea rows={5} placeholder="Write your comment..." className="txa-replay-on-comment-content" value={comment.content} onChange={(e) => handleChange(e, 'content')} />
                    <hr />
                    <div className="replay-on-comment-actions">
                        <button className="btn btn-replay-on-comment-action-cancel" onClick={() => showHideReplayOnComment('cancel')}>Cancel</button>
                        <button className="btn btn-replay-on-comment-action-save" onClick={() => saveComment(props.comment._id)}>Save</button>
                    </div>
                </div>)
                : null
            }
            <div className="comments-on-comment">
                {blogComments && blogComments.length ? blogComments.map(comment => <BlogComment key={`comment${comment._id}`} comment={comment} />) : null}
            </div>
        </div>
    );
}

export default BlogComment;
