import React, { useState, useEffect } from 'react';
import './blog-all-comments.css';
import BlogComment from './blog-comment';

function BlogAllComments(props) {
    

    const [blogComments, setBlogComments] = useState({});
    let commentPId = props.blogId;
    useEffect(() => {
        if(commentPId) {
            fetch('http://localhost:3001/api/getComments/' + commentPId)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setBlogComments(data);
            })
            .catch(console.log)
        }
    },[commentPId]);

    return (
        <div className="blog-all-comments">
            {blogComments && blogComments.length ? blogComments.map(comment => <BlogComment key={`comment${comment._id}`} comment={comment} />) : null}
        </div>
    );
}

export default BlogAllComments;
