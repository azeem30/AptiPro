import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import UserSelect from './screens/UserSelect';
import TeacherSignup from './screens/TeacherSignup';
import TeacherLogin from './screens/TeacherLogin';
import TeacherHome from './screens/TeacherHome';
import StudentSignup from './screens/StudentSignup';
import StudentLogin from './screens/StudentLogin';
import StudentHome from './screens/StudentHome';
import CreateTest from './screens/CreateTest';
import ScheduledTests from './screens/ScheduledTests';
import Quiz from './screens/Quiz';
import StudentResults from './screens/StudentResults';
import DetailedResult from './screens/DetailedResult';
import TeacherResults from './screens/TeacherResults';
import AddQuestions from './screens/AddQuestions';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<UserSelect/>} />
        <Route exact path='/teacher_signup' element={<TeacherSignup />} />
        <Route exact path='/teacher_login' element={<TeacherLogin />} />
        <Route exact path='/teacher_home' element={<TeacherHome />} />
        <Route exact path='/student_signup' element={<StudentSignup />} />
        <Route exact path='/student_login' element={<StudentLogin />} />
        <Route exact path='/student_home' element={<StudentHome />} />
        <Route exact path='/create_test' element={<CreateTest />} />
        <Route exact path='/scheduled_tests' element={<ScheduledTests />} />
        <Route exact path='/quiz' element={<Quiz />} />
        <Route exact path='/student_results' element={<StudentResults />} />
        <Route exact path='/detailed_result' element={<DetailedResult />} />
        <Route exact path='/teacher_results' element={<TeacherResults />} />
        <Route exact path='/add_questions' element={<AddQuestions />} />
      </Routes> 
    </Router>
  );
}

export default App;
