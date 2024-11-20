import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import AllTasks from './pages/AllTasks';
import ProtectedRoute from './components/home/protectedRoute';
import { AuthProvider } from "./context/authContext.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Trash from "./components/home/trash.jsx";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/trashcan/:id" element={<Trash />} />
          <Route path="/workspaces/:id/tasks" element={<ProtectedRoute><AllTasks /></ProtectedRoute>} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
