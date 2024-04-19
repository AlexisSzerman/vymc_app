/* import BrotherManager from './components/BrotherManager'
import BrotherList from './components/BrotherList' */
import MeetingSchedule from './components/MeetingSchedule';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
    <div className="container text-center">
      <img src="../src/assets/react.svg" alt="" className="mx-auto d-block" style={{ width: '10rem' }} />
    </div>
{/*         <BrotherManager />
        <BrotherList /> */}
        <MeetingSchedule/>
    </>

  );
}

export default App;

