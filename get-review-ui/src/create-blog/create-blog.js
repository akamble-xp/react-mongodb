import React, {useState, useEffect} from 'react';
import './create-blog.css';

function CreateBlog() {

  const CreateBlogModel = {
    blogTitle: '', 
    writtenBy: '', 
    content: '', 
    publishedBy: ''
  }

  const [blogModel, setBlogModel] = useState(CreateBlogModel);

  const handleChange = (e, field) => {
    const tempBlogModel = {
      blogTitle: blogModel.blogTitle, 
      writtenBy: blogModel.writtenBy, 
      content: blogModel.content, 
      publishedBy: blogModel.publishedBy
    };
    tempBlogModel[field] = e.target.value;
    setBlogModel(tempBlogModel);
  }

  const cereateBlog = () => {
    blogModel.status = true;
    blogModel.postDate = new Date();
    blogModel.writtenBy = blogModel.writtenBy;
    fetch('http://localhost:3001/api/createBlog', {
      method: 'POST',
      body: JSON.stringify(blogModel),
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(res => {
      window.location = 'http://localhost:3000/';
    });
  }

  let cancelBlog = () => {
    if(window.confirm('It will erase all the contents. Are you sure you want to go on home screen?')) {
      window.location = 'http://localhost:3000/'
    }  
  }

  return (
    <div className="create-blog">
        <div className="create-blog-instructions">
          <h2>Write A Blog To Express Your Thoughts</h2>
          <h4>Writing Instructions :</h4>
          <p><b>1. Blog Title :</b> Write the unique title that will make an impact on readers.</p>
          <p><b>2. Written By :</b> Write your name. It will be great if you have a habit of writing your email id in this field that will help your reader to get easily connect with you.</p>
          <p><b>3. Content :</b> Write your thoughts with proper explanation and proofs. That will create an interest in your reader to read the blog.</p>
          <p><b>4. Published By :</b> Write your organization name.</p>
          <p><b>5. Create :</b> Verify all the details and click on "Create" button that will publish your blog.</p>
          <p><b>6. Cancel :</b> "Cancel" button will transfer you to on home page. It will erase all the contents you written. Please be careful when you are clicking on "Cancel" button.</p>
        </div>
        <div className="create-blog-card">
            <div className="form-body">
                <div className="lbl-blog">Blog Title:</div>
                <input type="text" className="txt-blog" value={blogModel.blogTitle} onChange={(e) => handleChange(e, 'blogTitle')} />
                <div className="lbl-blog">Written By:</div>
                <input type="text" className="txt-blog" value={blogModel.writtenBy} onChange={(e) => handleChange(e, 'writtenBy')} />
                <div className="lbl-blog">Content:</div>
                <textarea rows={10} className="txa-blog" value={blogModel.content} onChange={(e) => handleChange(e, 'content')} />
                <div className="lbl-blog"> Published By:</div>
                <input type="text" className="txt-blog" value={blogModel.publishedBy} onChange={(e) => handleChange(e, 'publishedBy')} />
            </div>
            <hr />
            <div className="action-bottons">
                <button className="btn btn-blog-cancel" onClick={cancelBlog}>Cancel</button>&nbsp;&nbsp;
                <button className="btn btn-blog-create" onClick={cereateBlog}>Create</button>
            </div>
        </div>
    </div>
  );
}

export default CreateBlog;
