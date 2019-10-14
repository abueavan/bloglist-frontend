import React from 'react'

const BlogForm = ({
  handleSubmit,
  title,
  author,
  url
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div>
                title:
          <input
            type={title.type}
            value={title.value}
            name="Title"
            onChange={title.onChange}
          />
        </div>
        <div>
                author:
          <input
            type={author.type}
            value={author.value}
            name="Author"
            onChange={author.onChange}
          />
        </div>
        <div>
                url:
          <input
            type={url.type}
            value={url.value}
            name="URL"
            onChange={url.onChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm