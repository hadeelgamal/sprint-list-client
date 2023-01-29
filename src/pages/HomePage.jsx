import { Link } from "react-router-dom";
import Task from "../components/Task";

function HomePage() {
    return (
      <div>
        <h1>Home Page</h1>
            <Link to="/signup"> <button>Sign Up</button> </Link>
            <Link to="/login"> <button>Login</button> </Link>
            <Link to="/dashboard"> <button>Dashboard</button> </Link>
            <Task />

           
      </div>
    );
  }
   
  export default HomePage;