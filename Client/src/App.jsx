import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HabitsPage from './pages/HabitsPage';
import TodoPage from './pages/TodoPage';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
      <Router>
         <Routes>
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </Router>
    </>
  )
}

export default App
