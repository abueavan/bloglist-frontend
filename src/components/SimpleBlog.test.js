import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  const blog = {
    'title': 'testing...',
    'author': 'jojo',
    'likes': 6,
  }
  const mockHander = jest.fn()
  let component

  beforeEach(() => {
    component=render(
      <SimpleBlog blog={blog} onClick={mockHander} />
    )
  })

  test('renders title and author ', () => {
    expect(component.container).toHaveTextContent(
      'testing... jojo'
    )
  })

  test('render likes', () => {
    const element = component.getByText(
      'blog has 6 likes'
    )
    expect(element).toBeDefined()
  })

  test('clicking the button twice calls event handle twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHander.mock.calls.length).toBe(2)
  })
})