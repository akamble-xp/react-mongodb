import React, {useState, useEffect} from 'react';
import './dashboard.css';
import Posts from '../posts/posts';

function Dashboard() {
  
  const [posts, setPosts] = useState([]);

  //setPosts([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/publishers')
        .then(res => res.json())
        .then((data) => {
            setPosts(data);
        })
        .catch(console.log)
  },[]);
  
  return (
    <Posts data={posts}/>
  );
}

export default Dashboard;
