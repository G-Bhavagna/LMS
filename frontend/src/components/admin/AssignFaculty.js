import React, { useState, useEffect } from 'react';
import { getAllCourses } from '../../services/CourseService';
import { getAllFaculties } from '../../services/UserService';
import { assignCourse } from '../../services/AdminService';

const AssignFaculty = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    fetchCourses();
    fetchFaculties();
  }, []);

  const fetchCourses = () => {
    getAllCourses()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  };

  const fetchFaculties = () => {
    getAllFaculties()
      .then((response) => {
        setFaculties(response.data);
      })
      .catch((error) => {
        console.error('Error fetching faculties:', error);
      });
  };

  const handleAssignFaculty = () => {
    // Implement the logic to assign selectedFaculty to selectedCourse

    // console.log('Assigning faculty:', selectedFaculty, 'to course:', selectedCourse);
    assignCourse(selectedFaculty, selectedCourse).then((response) => {
      console.log('Faculty assigned to course:', response.data);
    }).catch((error) => {
      console.error('Error assigning faculty to course:', error);
    });
    // Example: You can make a backend call to assign the faculty to the course
  };

  return (
    <div>
      <h2>Assign Faculty to Course</h2>
      <div>
        <label htmlFor="courseSelect">Select Course: </label>
        <select id="courseSelect" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.courseCode}>
              {course.courseCode}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="facultySelect">Select Faculty: </label>
        <select id="facultySelect" value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)}>
          <option value="">Select Faculty</option>
          {faculties.map((faculty) => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.username}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAssignFaculty} disabled={!selectedCourse || !selectedFaculty}>
        Assign Faculty
      </button>
    </div>
  );
};

export default AssignFaculty;
