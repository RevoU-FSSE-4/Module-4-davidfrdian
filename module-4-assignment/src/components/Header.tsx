import { useNavigate, Link } from "react-router-dom";
import { Button } from "../GUI/Button";
import UserProfile from "./UserProfile";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
          </ul>
        </nav>
      </div>
      {token && (
        <header className="flex items-center justify-center">
          <nav className="fixed top-0 flex h-20 w-96 items-center justify-between bg-opacity-75 backdrop-blur-sm">
            <UserProfile />
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
