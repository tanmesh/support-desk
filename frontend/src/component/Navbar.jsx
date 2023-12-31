import { Link, useNavigate } from 'react-router-dom'
import { FaSignOutAlt, FaSignInAlt, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Navbar() {
    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className='header'>
            <h2>
                <Link to='/'>
                    Support Desk
                </Link>
            </h2>
            <ul>
                {user
                    ?
                    (
                        <button className="btn" onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    )
                    :
                    (
                        <>
                            <li>
                                <Link to='/login'>
                                    <FaSignInAlt /> Login
                                </Link>
                            </li>
                            <li>
                                <Link to='/register'>
                                    <FaUser /> Register
                                </Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </header>
    )
}

export default Navbar
