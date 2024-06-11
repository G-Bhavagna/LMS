import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseByCourseCode } from '../../services/CourseService';
import { Container, Row, Col, Button, Modal, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/ViewCourse.css';
import { getAllAssignmentsByCourseId, deleteAssignment, getSubmiteedAssignmentsCount } from '../../services/AssignmentService';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const ViewCourse = () => {
  const [course, setCourse] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [completedAssignments, setCompletedAssignments] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [progress, setProgress] = useState(0);
  const { courseCode } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    console.log(`Fetching data for courseCode: ${courseCode}`);
    fetchCourse(courseCode);
  }, [courseCode]);

  useEffect(() => {
    if (assignments.length > 0) {
      fetchSubmittedAssignmentsCount(course.courseCode, user.id);
    }
  }, [assignments]);

  const fetchCourse = (courseCode) => {
    if (!courseCode) {
      console.error('courseCode is undefined');
      return;
    }

    getCourseByCourseCode(courseCode)
      .then((response) => {
        if (response.data) {
          setCourse(response.data);
          fetchAssignments(response.data.courseCode);
          console.log('Course data:', response.data);
        } else {
          console.error('No data returned for the given courseCode');
        }
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
      });
  };

  const fetchAssignments = (courseCode) => {
    getAllAssignmentsByCourseId(courseCode)
      .then((response) => {
        setAssignments(response.data);
        console.log('Assignments:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchSubmittedAssignmentsCount = (courseCode, userId) => {
    getSubmiteedAssignmentsCount(userId, courseCode)
      .then((response) => {
        setCompletedAssignments(response.data);
        console.log('Submitted assignments count:', response.data);
        calculateProgress(response.data, assignments.length);
      })
      .catch((error) => {
        console.error('Error fetching submitted assignments count:', error);
      });
  };

  const calculateProgress = (completed, total) => {
    if (total === 0) return 0;
    const progressPercentage = (completed / total) * 100;
    setProgress(progressPercentage);
    console.log('Progress:', progressPercentage);
  };

  const handleAssignmentClick = (assignmentId) => {
    const userId = sessionStorage.getItem('userId');
    const courseCodeParam = course.courseCode;
    navigate(`/assignment/submit/${userId}/${courseCodeParam}/${assignmentId}`);
  };

  const handleEditAssignment = (courseCode, assignmentId) => {
    navigate(`/editAssignment/${courseCode}/${assignmentId}`);
  };

  const handleDeleteAssignment = (assignmentId) => {
    setSelectedAssignment(assignmentId);
    setShowDeleteModal(true);
  };

  const confirmDeleteAssignment = () => {
    if (courseCode && selectedAssignment) {
      deleteAssignment(courseCode, selectedAssignment)
        .then(() => {
          fetchAssignments(course.courseCode);
          setShowDeleteModal(false);
          setSelectedAssignment(null);
        })
        .catch((error) => {
          console.error('Error deleting assignment:', error);
          setShowDeleteModal(false);
          setSelectedAssignment(null);
        });
    }
  };

  const handleWatchVideo = () => {
    navigate(`/youtubeVideo/${encodeURIComponent(course.courseUrl)}`);
  };

  const handleDownloadCertificate = () => {
    const userId = sessionStorage.getItem('userId');
    navigate(`/certificate/${userId}/${course.courseCode}`);
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col className="text-center">
          <h1>{course.name || 'Course Name'}</h1>
          <p>Course Code: {course.courseCode || 'N/A'}</p>
          {user.role === 'faculty' && (
            <Button variant="primary" onClick={() => navigate(`/addAssignment/${course.courseCode}`)}>
              Add Assignment
            </Button>
          )}
        </Col>
      </Row>
      {user.role !== 'faculty' && (
        <Row className="mb-4">
          <Col>
            <h4>Progress</h4>
            <ProgressBar 
              now={progress} 
              label={`${progress.toFixed(2)}%`} 
              style={{ backgroundColor: 'black', color: 'white' }} 
              variant="custom" // custom variant to override default
            />
          </Col>
        </Row>
      )}
      {progress === 100 && (
        <Row className="mb-4">
          <Col className="text-center">
            <Button variant="success" onClick={handleDownloadCertificate}>
              Download Certificate
            </Button>
          </Col>
        </Row>
      )}
      <Row className="justify-content-center">
        {course.courseUrl && (
          <Col className="text-center mb-4">
            <Button variant="primary" onClick={handleWatchVideo}>
              Watch Video
            </Button>
          </Col>
        )}
      </Row>
      <Row className="justify-content-center">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <Col key={assignment.id} md={4} className="mb-4">
              <Card>
                <Card.Header>{assignment.assignmentName}</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>{assignment.description}</ListGroup.Item>
                </ListGroup>
                <Card.Footer>
                  {user.role === 'faculty' && (
                    <div className="text-end">
                      <Button variant="outline-primary" onClick={() => handleEditAssignment(course.courseCode, assignment.id)}>
                        Edit
                      </Button>{' '}
                      <Button variant="outline-danger" onClick={() => handleDeleteAssignment(assignment.id)}>
                        Delete
                      </Button>
                    </div>
                  )}
                  {user.role !== 'faculty' && (
                    <Button variant="primary" onClick={() => handleAssignmentClick(assignment.id)}>
                      Submit
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>No assignments available</p>
          </Col>
        )}
      </Row>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteAssignment}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ViewCourse;
