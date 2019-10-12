import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = {
    'name': 'aaa',
    'username': 'jojo',
  }

  const blog = {
    'title': 'testing...',
    'author': 'jojo',
    'likes': 6,
    'url': 'www.xxx.xxx',
    user,
  }
  let component

  beforeEach(() => {
    component=render(
      <Blog blog={blog} user={user} />
    )
  })

  test('only renders title and author by defult', () => {
    expect(component.container).toHaveTextContent(
      'testing... jojo'
    )

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('aftering clicking the button, the other are displayed',() => {
    const clickedDiv = component.container.querySelector('.toggle')
    fireEvent.click(clickedDiv)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')

  })
})