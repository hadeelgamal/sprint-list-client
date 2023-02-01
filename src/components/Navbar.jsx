import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      
      <div className="shadow bg-white">
        <div className="h-16 mx-auto px-5 flex items-center justify-between">
          <Link className="text-2xl hover:text-cyan-500 transition-colors cursor-pointer" to="/">
            Sprint List
          </Link>
          {user && <span>Welcome back {user.name}</span>}
          <ul className="flex items-center gap-5">
            
            {isLoggedIn && (
              <>
              
                <button
                  className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                  onClick={logOutUser}
                >
                  Logout
                </button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li>
                  <Link
                    className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                    to="/signup"
                  >
                    {" "}
                    <button>Sign Up</button>{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                    to="/login"
                  >
                    {" "}
                    <button>Login</button>{" "}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
