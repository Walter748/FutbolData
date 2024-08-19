import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/login";
import Register from "./components/register";
import Home from "./pages/home";
/* import ProtectedRoute from "./components/privateRoutes"; */
import { AuthProvider } from './components/authContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home/>} />
          {/* <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home/>} />
          </Route> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
