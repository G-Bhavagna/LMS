// // import logo from './logo.svg';
// import './App.css';
// import RegistrationForm from './components/RegistrationForm';
// import UserList from './components/UserList';
// import { BrowserRouter , Route, Routes } from 'react-router-dom';
// import MyCourses from './components/courses/myCourse/MyCourses';
// import Login from './components/Login';
// import SaveOrUpdateCourse from './components/courses/SaveOrUpdateCourse';
// import ViewCourse from './components/courses/ViewCourse';
// import SubmitAssignment from './components/courses/SubmitAssignment';
// import AllCourses from './components/courses/AllCourses';

// function App() {
//   return (
//     <div className="App">

//       <Routes>
//         <Route path="/" element={<h1>Welcome to the User Management System</h1>} />
//         
//         <Route path="/myCourses" element={<MyCourses/>}/>
//         <Route path="/register" element={<RegistrationForm />} />
//         <Route path="/login" element={<Login/>}/>
//         <Route path='/addCourse' element={<SaveOrUpdateCourse/>}/>
//         
//         <Route path='/viewCourse/:courseCode' element={<ViewCourse/>}/>
//         <Route path='/assignment/submit/:userId/:courseCode/:assignmentId' element={<SubmitAssignment/>}/>
//         <Route path='/allCourses' element={<AllCourses/>}/>
//       </Routes>
   
//     {/* <UserList/> */}
//   </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ViewCourse from './components/courses/ViewCourse.js';
import SubmitAssignment from './components/courses/SubmitAssignment';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
import MyCourses from './components/courses/myCourse/MyCourses';
import AllCourses from './components/courses/AllCourses';
import Navbar from './components/navbars/StudentNavbar';
import SaveOrUpdateCourse from './components/courses/SaveOrUpdateCourse';
import UserList from './components/UserList';
import SaveOrUpdateAssignment from './components/courses/faculty/SaveOrUpdateAssignment.js';
import FacultyCourses from './components/courses/faculty/FacultyCourses';
import GradeAssignments from './components/courses/faculty/GradeAssignments';
import GradedSubmissions from './components/courses/faculty/GradedSubmissions.js';
import StudentEnrollmentAnalysis from './components/admin/StudentEnrollmentAnalysis.js';
import AddOrUpdateuser from './components/admin/AddOrUpdateuser.js';
import AssignFaculty from './components/admin/AssignFaculty.js';
import AdminAllCourses from './components/admin/AdminAllCourses.js';
import YouTubePlayer from './ExtraFeatures/YouTubePlayer.js';
import TextToSpeech from './components/TextToSpeech';
import SubmitFile from './components/SubmitFile';
import CertificateGenerator from './ExtraFeatures/CertificateGenerator.js';
function App() {
  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
   
      <Routes>
        <Route path="/" element={<h1>Welcome to the User Management System</h1>} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mycourses" element={user && user.role === 'student' ? <MyCourses /> : <Navigate to="/login" />} />
        <Route path="/allcourses" element={user && user.role === 'student' ? <AllCourses /> : <Navigate to="/login" />} />
        <Route path="/viewCourse/:courseCode" element={<ViewCourse />} />
        <Route path="/assignment/submit/:userId/:courseCode/:assignmentId" element={user && user.role === 'student' ? <SubmitAssignment /> : <Navigate to="/" />} />

        {/* Faculty Routes */}
        <Route path="/facultyCourses" element={user && user.role === 'faculty' ? <FacultyCourses /> : <Navigate to="/" />} />
        <Route path="/addAssignment/:courseCode" element={user && user.role === 'faculty' ? <SaveOrUpdateAssignment /> : <Navigate to="/" />} />
        <Route path="/updateAssignment/:courseCode/:assignmentId" element={user && user.role === 'faculty' ? <SaveOrUpdateAssignment /> : <Navigate to="/" />} />
        <Route path="/gradeAssignments" element={user && user.role === 'faculty' ? <GradeAssignments /> : <Navigate to="/" />} />
        <Route path="/studentsList" element={user && user.role === 'faculty' ? <UserList /> : <Navigate to="/" />} />
        <Route path="/editAssignment/:courseCode/:assignmentId" element={user && user.role === 'faculty' ? <SaveOrUpdateAssignment /> : <Navigate to="/" />} />
        <Route path="/getGradedSubmissions" element={user && user.role === 'faculty' ? <GradedSubmissions /> : <Navigate to="/" />} />

        {/* Admin Routes */}
        <Route path="/updateCourse/:id" element={user && user.role === 'admin' ? <SaveOrUpdateCourse /> : <Navigate to="/" />} />
        <Route path="/addCourse" element={user && user.role === 'admin' ? <SaveOrUpdateCourse /> : <Navigate to="/" />} />
        <Route path="/studentAnalysis" element={user && user.role === 'admin' ? <StudentEnrollmentAnalysis /> : <Navigate to="/" />} />
        <Route path="/addUser" element={user && user.role === 'admin' ? <AddOrUpdateuser /> : <Navigate to="/" />} />
        <Route path="/updateUser/:userId" element={user && user.role === 'admin' ? <AddOrUpdateuser /> : <Navigate to="/" />} />
        <Route path="/assignFaculty" element={user && user.role === 'admin' ? <AssignFaculty /> : <Navigate to="/" />} />
        <Route path="/allAdminCourses" element={user && user.role === 'admin' ? <AdminAllCourses /> : <Navigate to="/" />} />

        {/* Example route to show YouTube video */}
        <Route path="/youtubeVideo/:courseUrl" element={<YouTubePlayer/>} />
        <Route path='/texttospeech' element={ <TextToSpeech text="Hover over this text to hear it spoken aloud." /> } />
        <Route path='/uploadFile' element={<SubmitFile />} />
        <Route path='/certificate/:userId/:courseCode' element={<CertificateGenerator/>} />
      </Routes>
   
  );
}

export default App;
