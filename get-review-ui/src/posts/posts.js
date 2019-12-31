import React from 'react';
import './posts.css';
import PostCard from '../post-card/post-card';

function Posts(props) {
  console.log(props);
  return (
        <div className="blog-posts">
            {props.data.map((post, index) => <PostCard  key={post.name + index} data={post} />)}
        </div>
  );
}

export default Posts;
