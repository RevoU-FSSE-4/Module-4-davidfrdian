

import { useNavigate, Link } from 'react-router-dom'
import UserProfile from './UserProfile'

const Navigation = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <>
    <nav className="flex justify-center">
      <ul className="flex flex-row justify-between gap-10 mt-5">
        <li>
          <Link to="/">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/category">Category</Link>
        </li>
      </ul>
    </nav>
            {token && (
                <header className="flex items-center justify-center">
                    <nav className="fixed top-0 flex h-20 w-96 items-center justify-between bg-opacity-75 backdrop-blur-sm">
                        <UserProfile />
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </nav>
                </header>
            )}
        </>
    )
}

export default Navigation