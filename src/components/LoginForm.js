import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  return (
    <div className='loginForm'>

      <form onSubmit={handleSubmit}>
        <div>
         username
          <input
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div>
         password
          <input
            type={password.type}
            value={password.value}
            onChange={password.onChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
