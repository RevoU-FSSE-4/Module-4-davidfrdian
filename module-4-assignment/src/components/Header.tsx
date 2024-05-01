import { useNavigate } from "react-router-dom";
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
      {token && (
        <header className="flex items-center justify-center">
          <nav className="top-0 flex h-20 w-96 items-center justify-between bg-opacity-75 backdrop-blur-sm font-semibold">
            <UserProfile />
            <Button className="hover:text-slate-100 hover:bg-violet-900 duration-300" variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
