import React, { useState } from 'react'
const Blog = ({
  blog,
  user,
  handleLike,
  handleDelete
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog'>
      <div style={blogStyle}>
        <div onClick={toggleVisibility} className='toggle'>
          {blog.title} {blog.author}
        </div>
        <div style={showWhenVisible} className="togglableContent">
          <a href={blog.url}>{blog.url}</a>
          <p>{blog.likes}<button onClick={handleLike}>like</button></p>
          <p>added by {blog.user.name}</p>
          {user.username === blog.user.username &&<button onClick={handleDelete}>remove</button> }
        </div>
      </div>
    </div>
  )}

export default Blog