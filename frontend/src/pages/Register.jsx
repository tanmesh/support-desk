import { useState } from "react"
import { FaUser } from 'react-icons/fa'
import { toast } from "react-toastify"

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const { name, email, password, password_confirmation } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password_confirmation) {
      toast.error('Passwords do not match')
    }


  }

  return (
    <>
      <section className="heading">
        <h3>
          <FaUser />
          Register
        </h3>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              id="password_confirmation"
              value={password_confirmation}
              onChange={onChange}
              placeholder="Confirm your password"
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

export default Register
