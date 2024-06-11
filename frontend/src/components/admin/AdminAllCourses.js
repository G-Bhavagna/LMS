import React, { useState, useEffect } from 'react';
import { allCoursesAdmin } from '../../services/AdminService';
import { useNavigate } from 'react-router-dom';

const AdminAllCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    allCoursesAdmin()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  };

  const handleEdit = (courseCode) => {
    navigate(`/updateCourse/${courseCode}`);
  };

  const handleDelete = (courseCode) => {
    // Implement delete functionality here
    console.log('Delete course:', courseCode);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course.courseCode}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{course.courseName}</h5>
                <p className="card-text">{course.description}</p>
                <div className="mt-auto">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleEdit(course.courseCode)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(course.courseCode)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllCourses;
