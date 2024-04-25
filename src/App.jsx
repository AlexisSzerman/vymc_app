import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BrotherManager from './components/BrotherManager';
import BrotherList from './components/BrotherList';
import Welcome from './components/Welcome';
import MeetingSchedule from './components/MeetingSchedule';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Welcome/>} />
        <Route path="/brother-manager" element={<BrotherManager/>} />
        <Route path="/brother-list" element={<BrotherList/>} />
        <Route path="/meeting-schedule" element={<MeetingSchedule/>} />
      </Routes>
    </Router>
  );
}

export default App;


