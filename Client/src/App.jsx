import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HabitsPage from './pages/HabitsPage';
import TodoPage from './pages/TodoPage';
import Dashboard from './pages/Dashboard';
import Register from './pages/SignUp';
import Login from './pages/Login';
import ProtectedRoute from './componenets/layouts/ProtectedRoutes';
import LandingPage from './pages/LandingPage';

function App() {

  return (
    <>
      <Router>
         <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        <Route path="/habits" element={
          <ProtectedRoute>
          <HabitsPage />
          </ProtectedRoute>
          } />
        <Route path="/todo" element={
           <ProtectedRoute>
          <TodoPage />
           </ProtectedRoute>
          } />
        <Route path="/dashboard" element={
           <ProtectedRoute>
          <Dashboard />
           </ProtectedRoute>
          } />
      </Routes>
      </Router>
    </>
  )
}

export default App
