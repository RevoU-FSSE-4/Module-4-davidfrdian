import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <div className="flex mb-4 p-3 justify-center">
        <nav>
          <ul className="flex justify-evenly gap-10">
            <li className="bg-violet-300 font-semibold py-2 px-2 rounded-lg hover:text-slate-100 hover:bg-violet-900 duration-200 shadow-lg">
              <Link to="/registration">Registration</Link>
            </li>
            <li className="bg-violet-300 font-semibold py-2 px-6 rounded-lg hover:text-slate-100 hover:bg-violet-900 duration-200 shadow-lg">
              <Link to="/">Login</Link>
            </li>
            <li className="bg-violet-300 font-semibold p-2 rounded-lg hover:text-slate-100 hover:bg-violet-900 duration-200 shadow-lg">
              <Link to="/categories">Categories</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}


export default Navigation