import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyCourses, getFacultyCourses } from '../../../services/UserService'; // Assuming you have a service function to fetch faculty courses
import 'bootstrap/dist/css/bootstrap.min.css';
import '../myCourse/MyCourse.css';
import { unEnrollCourse } from '../../../services/CourseService';

const FacultyCourses = () => {
  const [courses, setCourses] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const navigate = useNavigate();

  const fetchAllCourses = () => {
    if (user && user.role === 'faculty') {
      // Fetch faculty courses
      getMyCourses(user.id)
        .then((response) => {
          setCourses(response.data);
          console.log('Faculty Courses:', response.data);
        })
        .catch((error) => {
          console.error('Error fetching faculty courses:', error);
        });
    } else {
      // Fetch student courses
      getMyCourses()
        .then((response) => {
          setCourses(response.data);
          console.log('Student Courses:', response.data);
        })
        .catch((error) => {
          console.error('Error fetching student courses:', error);
        });
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  

  const handleViewCourse = (courseCode) => {
    navigate(`/viewCourse/${courseCode}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">My Courses</h1>
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            {/* <th>Course Id</th> */}
            <th>Course Name</th>
            <th>Course Description</th>
            <th>Course Code</th>
            {/* <th>Course Url</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              {/* <td>{course.id}</td> */}
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.courseCode}</td>
              {/* <td>
                <a href={course.courseUrl} target="_blank" rel="noopener noreferrer">
                  {course.courseUrl}
                </a>
              </td> */}
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewCourse(course.courseCode)}
                >
                  View Course
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyCourses;
