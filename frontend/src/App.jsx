import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TrackComplaint from "./pages/TrackComplaint";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BillUpload from "./pages/BillUpload";
import Complaint from "./pages/Complaint";
import Awareness from "./pages/Awareness";
import Alerts from "./pages/Alerts";
import Genie from "./pages/Genie";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";



// Layout Component
function Layout({ children }) {
  const location = useLocation();
  const isGenie = location.pathname === "/genie";

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-r from-teal-100 to-purple-100 overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main
        className={`flex-grow w-full px-4 py-6 ${
          isGenie ? "pb-32 overflow-y-auto" : "pb-20 overflow-y-auto"
        }`}
      >
        {children}
          {/* Footer */}
      <Footer />
      </main>

   
    </div>
  );
}

// PrivateRoute for protected pages
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token });
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard user={user} />
              </PrivateRoute>
            }
          />
          <Route path="/billupload" element={<BillUpload />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/awareness" element={<Awareness />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/genie" element={<Genie />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/track-complaint" element={<TrackComplaint />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

        </Routes>
      </Layout>
    </Router>
     
  );
}

export default App;
