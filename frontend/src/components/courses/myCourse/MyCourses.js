import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyCourses } from '../../../services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './MyCourse.css'
import { unEnrollCourse } from '../../../services/CourseService';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchAllCourses = () => {
    getMyCourses()
      .then((response) => {
        setCourses(response.data);
        console.log('Data:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const handleUnenroll = (courseCode) => {
    // Add logic to handle unenroll here
    unEnrollCourse(sessionStorage.getItem('userId'),courseCode).then((response) => {
      console.log('Unenrolled:', response.data);
      fetchAllCourses();
    }).catch((error) => {
      console.error('Error unenrolling:', error);
    });
  };

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
            <th>Course Url</th>
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
              <td>
                <a href={course.courseUrl} target="_blank" rel="noopener noreferrer">
                  {course.courseUrl}
                </a>
              </td>
              <td>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => handleUnenroll(course.courseCode)}
                >
                  Unenroll
                </button>
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

export default MyCourses;
