import React, { useState, useEffect } from 'react';
import { getCoursesWithEnrollmentCount } from '../../services/CourseService';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentEnrollmentAnalysis = () => {
  const [courseEnrollmentData, setCourseEnrollmentData] = useState([]);

  useEffect(() => {
    fetchCourseEnrollmentData();
  }, []);

  const fetchCourseEnrollmentData = () => {
    getCoursesWithEnrollmentCount()
      .then((response) => {
        const data = Object.keys(response.data).map(courseCode => ({
          courseCode: courseCode,
          studentCount: response.data[courseCode]
        }));
        setCourseEnrollmentData(data);
        console.log('Course Enrollment Data:', data);
      })
      .catch((error) => {
        console.error('Error fetching course enrollment data:', error);
      });
  };

  // Prepare data for the bar chart
  const chartData = {
    labels: courseEnrollmentData.map(course => course.courseCode),
    datasets: [
      {
        label: 'Number of Students',
        data: courseEnrollmentData.map(course => course.studentCount),
        backgroundColor: courseEnrollmentData.map((_, index) => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
        borderColor: courseEnrollmentData.map((_, index) => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Enrollment by Course',
      },
    },
    scales: {
      x: {
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    },
  };

  return (
    <div>
      <h1>Student Enrollment Analysis</h1>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Number of Students</th>
          </tr>
        </thead>
        <tbody>
          {courseEnrollmentData.map((course) => (
            <tr key={course.courseCode}>
              <td>{course.courseCode}</td>
              <td>{course.studentCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentEnrollmentAnalysis;
