import React, { useState, useEffect } from 'react';
import loginService from './services/login'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'

function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [info, setInfo] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    blogsService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handlelogout = () =>{
    window.localStorage.clear()
    setUser(null)
    setInfo('You have logged out successfully')
    setTimeout(() => {
      setInfo(null)
    }, 5000)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
    }

    const newBlog = await blogsService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setInfo(`a new blog ${newBlog.title} by ${newBlog.author} add`)
    setTimeout(() => {
      setInfo(null)
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
    
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog} >
      <div>
        title:
        <input
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
        type="text"
        value={url}
        name="URL"
        onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  if(user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={info} />
        <Notification message={error} err />
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={info} />
      <Notification message={error} err />
      <p>
      {user.name} logged in
      <button onClick={handlelogout} >logout</button>
      </p>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default App;
