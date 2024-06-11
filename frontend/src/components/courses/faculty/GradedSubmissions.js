import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { getCoursesForFaculty } from '../../../services/CourseService'; // Assuming you have this service
import { getGradedSubmissions } from '../../../services/SubmissionService'; // Assuming you have this service

const GradedSubmissions = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [assignments, setAssignments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');

  useEffect(() => {
    fetchFacultyCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchSubmissions(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchFacultyCourses = async () => {
    try {
      const response = await getCoursesForFaculty(user.id);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching faculty courses:', error);
    }
  };

  const handleCourseChange = (event) => {
    const courseCode = event.target.value;
    setSelectedCourse(courseCode);
    setSelectedPdfUrl(''); // Reset selected PDF URL when changing course
    if (courseCode) {
      fetchSubmissions(courseCode);
    } else {
      setAssignments([]); // Clear assignments if no course is selected
    }
  };

  const fetchSubmissions = async (courseCode) => {
    try {
      const response = await getGradedSubmissions(courseCode);
      const submissions = response.data;
      const submissionsWithPDF = await Promise.all(submissions.map(async (submission) => {
        const pdfBlob = await fetchPdf(submission.id);
        return { ...submission, pdfBlob };
      }));
      console.log('Submissions with PDF:', submissionsWithPDF);
      setAssignments(submissionsWithPDF);
    } catch (error) {
      console.error('Error fetching submission data:', error);
    }
  };

  const fetchPdf = async (submissionId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/courses/assignments/submission/getFile/${submissionId}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      return null;
    }
  };

  const openPdfPreview = (pdfUrl) => {
    setSelectedPdfUrl(pdfUrl);
  };

  return (
    <div>
      <h1>Graded Assignments</h1>
      <div>
        <label htmlFor="courseSelect">Select Course: </label>
        <select id="courseSelect" onChange={handleCourseChange} value={selectedCourse}>
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.courseCode}>
              {course.courseCode}
            </option>
          ))}
        </select>
      </div>
      <div>
        {assignments.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Assignment Name</th>
                <th>Student Name</th>
                <th>Course Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.assignment_name}</td>
                  <td>{submission.student_name}</td>
                  <td>{submission.course_name}</td>
                  <td>
                    {submission.pdfBlob && (
                      <button className="btn btn-info" onClick={() => openPdfPreview(URL.createObjectURL(submission.pdfBlob))}>
                        Preview PDF
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          selectedCourse && <p>No Graded submissions found for this course.</p>
        )}
      </div>
      {selectedPdfUrl && (
        <div className="modal" style={{ display: 'block', top:10 }}>
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedPdfUrl('')} style={{fontSize: '24px'}}>×</span>
            <embed src={selectedPdfUrl} type="application/pdf" width="100%" height="900px" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GradedSubmissions;
