import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login} from '../redux/authSlice'

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { status, error } = useSelector(state => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const resultAction = await dispatch(login({ email, password }))

    if (login.fulfilled.match(resultAction)) {
      navigate('/user')
    }
  }

  return (
    <main className="main">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button type="submit" className="sign-in-button">
            {status === 'loading' ? 'Loading...' : 'Sign In'}
          </button>

          {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </section>
    </main>
  )
}

export default SignIn
