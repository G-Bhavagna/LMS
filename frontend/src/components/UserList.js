import React, { useState, useEffect } from 'react';
import { getAllUsersOfCourse } from '../services/CourseService';
import { getCoursesForFaculty } from '../services/CourseService'; // Assuming you have a service method to fetch courses for faculty

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  // Assuming you have a user object in session storage
  const user = JSON.parse(sessionStorage.getItem('user'));

  const fetchAllUsersOfCourse = (courseId) => {
    getAllUsersOfCourse(courseId)
      .then((response) => {
        setUserData(response.data);
        console.log('Data:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchFacultyCourses = () => {
    // Assuming you have a method to fetch courses for faculty
    getCoursesForFaculty(user.id)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching faculty courses:', error);
      });
  };

  useEffect(() => {
    fetchFacultyCourses();
  }, []);

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);
    if (courseId) {
      fetchAllUsersOfCourse(courseId);
    } else {
      setUserData([]); // Clear user data if no course is selected
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <div>
        <label htmlFor="courseSelect">Select Course: </label>
        <select id="courseSelect" onChange={handleCourseChange} value={selectedCourse}>
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course.courseCode} value={course.courseCode}>
              {course.courseCode}
            </option>
          ))}
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(userData) &&
            userData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  {user.course && <div>Course: {user.course.name}</div>}
                  {/* Actions column, can be populated with buttons/links for actions like edit, delete */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
