import React from 'react'

const BlogForm = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
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
                type="text"
                value={title}
                name="Title"
                onChange={handleTitleChange}
                />
            </div>
            <div>
                author:
                <input
                type="text"
                value={author}
                name="Author"
                onChange={handleAuthorChange}
                />
            </div>
            <div>
                url:
                <input
                type="text"
                value={url}
                name="URL"
                onChange={handleUrlChange}
                />
            </div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm