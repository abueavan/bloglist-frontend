import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.getAllByText('login')
    )

    expect(component.container).toHaveTextContent('Log in to application')

    const loginDiv = component.container.querySelector('.loginForm')
    expect(loginDiv).toBeDefined()

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })

  test(' when the user is logged in, the blog posts are rendered to the page', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    component.rerender(<App />)


    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    expect(component.container).not.toHaveTextContent('Log in to application')

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(2)

    expect(component.container).toHaveTextContent(
      'React patterns Michael Chan'
    )

    expect(component.container).toHaveTextContent(
      'Go To Statement Considered Harmful Edsger W. Dijkstra'
    )
  })
})