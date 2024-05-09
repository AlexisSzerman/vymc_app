import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BrotherManager from './components/BrotherManager';
import BrotherList from './components/BrotherList';
import Welcome from './components/Welcome';
import MeetingSchedule from './components/MeetingSchedule';
import MeetingHistory from './components/MeetingHistory';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <nav className="navbar bg-light">
        <form className="container-fluid justify-content-center">
          <Link to="/" className="btn btn-outline-success me-2" type="button">Home</Link>
          <Link to="/brother-manager" className="btn btn-outline-primary me-2" type="button">Añadir Hermano</Link>
          <Link to="/brother-list" className="btn btn-outline-primary me-2" type="button">Estudiantes</Link>
          <Link to="/meeting-schedule" className="btn btn-outline-primary me-2" type="button">Programa</Link>
          <Link to="/meeting-history" className="btn btn-outline-primary me-2" type="button">Historial</Link>
        </form>
      </nav>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/brother-manager" element={<BrotherManager/>} />
        <Route path="/brother-list" element={<BrotherList/>} />
        <Route path="/meeting-schedule" element={<MeetingSchedule/>} />
        <Route path="/meeting-history" element={<MeetingHistory/>} />
      </Routes>
    </Router>
  );
}

export default App;



