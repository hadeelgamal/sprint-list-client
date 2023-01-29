import "./App.css";
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from "./pages/DashboardPage";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="/dashboard" element={<DashboardPage />} />{" "}

      </Routes>
    </div>
  );
}

export default App;
