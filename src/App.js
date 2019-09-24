import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/blogForm'

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
      .then(initialBlogs => setBlogs(initialBlogs.sort((a, b) => a.likes - b.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    setBlogs(blogs.sort((a, b) => a.likes - b.likes))
  }, [blogs])

  const blogFormRef = React.createRef()

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

  const handlelogout = () => {
    window.localStorage.clear()
    setUser(null)
    setInfo('You have logged out successfully')
    setTimeout(() => {
      setInfo(null)
    }, 5000)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title,
      author,
      url,
    }

    const newBlog = await blogsService.create(blogObject)
    newBlog.user = {
      usename: user.username,
      name: user.name
    }
    setBlogs(blogs.concat(newBlog))
    setInfo(`a new blog ${newBlog.title} by ${newBlog.author} add`)
    setTimeout(() => {
      setInfo(null)
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')

  }

  const addLikes = async (oldBlog) => {
    const newObject = {
      user: oldBlog.user._id,
      likes: oldBlog.likes + 1,
      author: oldBlog.author,
      title: oldBlog.title,
      url: oldBlog.url
    }
    const newBlog = await blogsService.put(oldBlog.id, newObject)
    setBlogs(blogs.map(blog => blog.id === newBlog.id ? newBlog : blog))
  }

  const delelteBlog = async (blog) => {
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      await blogsService.del(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setInfo(`Removed blog ${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setInfo(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={info} />
      <Notification message={error} err />
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={info} />
      <Notification message={error} err />
      <p>
        {user.username} logged in
        <button onClick={handlelogout} >logout</button>
      </p>
      <h2>create new</h2>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleTitleChange ={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange   ={({ target }) => setUrl(target.value)}
          handleSubmit={addBlog}
        />
      </Togglable>
      {blogs.map((blog) =>
        <Blog key={blog.id} blog={blog} user={user} handleLike={() => addLikes(blog)} handleDelete={() => delelteBlog(blog)} />
      )}
    </div>
  )


  return (
    <div>
      {
        user === null ?
          loginForm() :
          blogForm()
      }
    </div>
  )
}

export default App
