import "./App.css";
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from "./pages/DashboardPage";
import EditSprintPage from "./pages/EditSprintPage";
import Navbar from "./components/Navbar";
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<IsAnon><HomePage /></IsAnon>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="/dashboard" element={<IsPrivate><DashboardPage /></IsPrivate>} />{" "}
        <Route path="/sprint/:sprintId/edit" element={<IsPrivate><EditSprintPage /></IsPrivate>} />{" "}

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
