import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/blogForm'
import  { useField } from './hooks'

function App() {

  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, resetTitle] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [url,  resetUrl] = useField('text')
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
        'username': username.value,
        'password': password.value,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogsService.setToken(user.token)
      setUser(user)
      resetUsername()
      resetPassword()
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
      'title': title.value,
      'author': author.value,
      'url': url.value,
    }

    const newBlog = await blogsService.create(blogObject)
    newBlog.user = user
    setBlogs(blogs.concat(newBlog))
    setInfo(`a new blog ${newBlog.title} by ${newBlog.author} add`)
    setTimeout(() => {
      setInfo(null)
    }, 5000)
    resetTitle()
    resetAuthor()
    resetUrl()
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
