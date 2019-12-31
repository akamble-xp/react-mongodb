import React from 'react';
import './App.css';
import Dashboard from './dashboard/dashboard';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import CreateBlog from './create-blog/create-blog';
import ReadBlog from './read-blog/read-blog';

function App() {
  return (
    <div>
      <header>
        <ul>
          <li className="app-title"><a href="/">GetReviews</a></li>
          <li><a href="/home">Home</a></li>
          <li><a href="/create-blog">Write Your Blog</a></li>
        </ul>
      </header>
      <div className="dashboard">
        <Router>
          <Route exact path='/' component={Dashboard} />
          <Route path='/home' component={Dashboard} />
          <Route path='/create-blog' component={CreateBlog} />
          <Route path='/read-blog/:id' component={ReadBlog} />
        </Router>
      </div>
      <footer>

      </footer>
    </div>
  );
}

export default App;
