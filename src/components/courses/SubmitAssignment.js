import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentById } from '../../services/AssignmentService';
import { checkSubmission, submitAssignment } from '../../services/SubmissionService';
import './css/SubmitAssignment.css'; // Import CSS file for styling

const SubmitAssignment = () => {
  const { userId, courseCode, assignmentId } = useParams();
  const [assignment, setAssignment] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submissionExists, setSubmissionExists] = useState(false); // New state to track if submission exists
  const [submissionStatus, setSubmissionStatus] = useState({});
  const [file, setFile] = useState(null); // State to store the selected file

  useEffect(() => {
    const fetchSubmissionStatus = async () => {
      try {
        const response = await checkSubmission(userId, courseCode, assignmentId);
        if (response.data) {
          setSubmissionExists(true);
          setSubmissionStatus(response.data);
        }
      } catch (error) {
        console.error('Error checking submission:', error);
      }
    };

    fetchSubmissionStatus();
  }, [userId, courseCode, assignmentId]);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const assignmentDetails = await getAssignmentById(assignmentId);
        setAssignment(assignmentDetails.data);
      } catch (error) {
        console.error('Error fetching assignment details:', error);
      }
    };

    fetchAssignment();
  }, [assignmentId, userId, courseCode]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async () => {
    if (!file) {
      console.error('Please select a file');
      return;
    }

    const submissionData = new FormData();
    submissionData.append('file', file);

    try {
      await submitAssignment(userId, courseCode, assignmentId, submissionData);
      setSubmitted(true);
      setSubmissionExists(true); // Set submissionExists to true after submission
      console.log('Submission successful');
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  return (
    <div className="submit-assignment-container">
      <div className="assignment-details">
        <h2>{assignment.assignmentName}</h2>
        <p>{assignment.assignment_description}</p>
      </div>
      {submissionExists ? (
        <div className="submission-status">
          <p>You have already submitted this assignment:</p>
          <p>{submissionStatus.content}</p>
        </div>
      ) : (
        <div className="submit-form">
          <h2>Submit Assignment</h2>
          <input type="file" onChange={handleFileChange} />
          <button className="btn btn-primary submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default SubmitAssignment;
