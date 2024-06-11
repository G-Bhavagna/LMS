import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enrollCourse, getUnenrolledCourses } from '../../services/CourseService';
import './css/AllCourses.css'; // Import custom CSS for additional styling

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = () => {
    getUnenrolledCourses()
      .then((response) => {
        setCourses(response.data);
        console.log('Data:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleEnroll = (courseCode) => {
    // Navigate to the enroll page or handle the enroll logic here
    console.log(`Enroll in course: ${courseCode}`);
    enrollCourse(sessionStorage.getItem('userId'), courseCode).then((response) => {
      console.log('Enrolled:', response.data);
      navigate('/myCourses');
    }).catch((error) => {
      console.error('Error enrolling:', error);
    } );
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Available Courses</h1>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course.courseCode}>
            <div className="card fixed-size-card h-100">
              <div className="card-body">
                <h5 className="card-title">{course.courseName}</h5>
                <p className="card-text">{course.description}</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleEnroll(course.courseCode)}
                >
                  Enroll in this Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .fixed-size-card {
          min-width: 250px;
          max-width: 300px;
          min-height: 350px;
          max-height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-title {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .card-text {
          flex-grow: 1;
        }

        .btn {
          align-self: center;
        }
      `}</style>
    </div>
  );
};

export default AllCourses;
