import { useState } from "react"
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux'
import { login } from "../features/auth/authSlice"

function LogIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { name, email, password, password_confirmation } = formData

  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, message } = useSelector(state => state.auth)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))

  }

  return (
    <>
      <section className="heading">
        <h3>
          <FaSignInAlt /> Login
        </h3>
        <p>Please login to get support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section >
    </>
  )
}

export default LogIn
