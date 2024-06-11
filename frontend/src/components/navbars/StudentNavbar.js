import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the custom CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}
            {user && (
              <>
                {user.role === 'student' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/mycourses">My Courses</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/allcourses">All Courses</Link>
                    </li>
                  </>
                )}
                {user.role === 'faculty' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/gradeAssignments">Grade Assignments</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/getGradedSubmissions">See Graded</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/facultyCourses">My Courses</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/studentsList">Students List</Link>
                    </li>
                  </>
                )}
                {user.role === 'admin' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/assignFaculty">Assign Faculty</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/addCourse">Add Course</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/addUser">Add User</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/allAdminCourses">All Courses</Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/studentAnalysis">Enrollement Analysis</Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <button className="nav-link rounded-pill" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
