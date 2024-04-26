import { Link } from "react-router-dom";

const Home = () => {
  return (
    <nav className="flex justify-center">
      <ul className="flex flex-row justify-between gap-10 mt-5">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/category">Category</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Home;
