import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { saveAssignment, getAssignmentById, updateAssignment } from '../../../services/AssignmentService';
import { useNavigate } from 'react-router-dom';
const SaveOrUpdateAssignment = () => {

  const { courseCode } = useParams();
  const { assignmentId } = useParams();

  const [assignment, setAssignment] = useState({});
  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  
  const navigate = useNavigate(); 

  useEffect(() => {
    if (assignmentId) {
      getAssignmentById(assignmentId)
        .then((response) => {
          setAssignment(response.data);
          setAssignmentName(response.data.assignmentName);
          setAssignmentDescription(response.data.assignment_description);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [assignmentId]);

  function handleSaveOrUpdate(event) {
    event.preventDefault();
    const assignmentData = {
      assignmentName: assignmentName,
      assignment_description: assignmentDescription,
    };
    if (assignmentId) {
      updateAssignment(assignmentData,courseCode,assignmentId );
      navigate(`/viewCourse/${courseCode}`);
      
    } else {

      saveAssignment(assignmentData, courseCode);
      navigate(`/viewCourse/${courseCode}`);
    }
    console.log('Assignment:', assignmentData);
  }

  return (
    <div>
      <h2>{assignmentId ? 'Update Assignment' : 'Add Assignment'}</h2>
      <form onSubmit={handleSaveOrUpdate}>
        <div className='form-group'>
          <label>Assignment Name</label>
          <input type='text' className='form-control' value={assignmentName} onChange={e => setAssignmentName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Assignment Description</label>
          <textarea className='form-control' value={assignmentDescription} onChange={e => setAssignmentDescription(e.target.value)} />
        </div>
        <button type='submit' className='btn btn-primary'>{assignmentId ? 'Update' : 'Save'}</button>
      </form>
    </div>
  );
}

export default SaveOrUpdateAssignment;
