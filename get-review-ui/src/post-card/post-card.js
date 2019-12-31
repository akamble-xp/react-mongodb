import React from 'react';
import './post-card.css';
import { Link } from 'react-router-dom'

function PostCard(props) {
  console.log(props);
  return (
    <Link to={`/read-blog/${props.data._id}`} className="card">
      <div className="card-blog">
          <div className="card-blog-title">{props.data.blogTitle}</div>
          <div className="card-blog-written-by">- {props.data.writtenBy}</div>
      </div>
      <hr />
      <div className="card-blog-publisher">{props.data.name}</div>
    </Link>
  );
}

export default PostCard;
