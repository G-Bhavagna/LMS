import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { saveCourse } from '../../services/CourseService';
import { getCourseByCourseCode, updateCourse } from '../../services/CourseService';
const SaveOrUpdateCourse = () => {
  const { id } = useParams();
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');
  const [courseUrl, setCourseUrl] = useState('');
  const [courseTeacher, setCourseTeacher] = useState('');

  useEffect(() => {
    if (id) {
      // Fetch course by id and set the state
      getCourseByCourseCode(id)
        .then(response => {
          const { name, courseCode, description, courseUrl, courseTeacher } = response.data;
          setCourseName(name);
          setCourseCode(courseCode);
          setDescription(description);
          setCourseUrl(courseUrl);
          setCourseTeacher(courseTeacher);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [id]);

  function saveOrUpdate(event) {
    event.preventDefault();
    const courseData = {
      name: courseName,
      courseCode: courseCode,
      description: description,
      courseUrl: courseUrl,
      courseTeacher: courseTeacher
    };

    if (id) {
      updateCourse(id, courseData);
    } else {
      saveCourse(courseData);
    }
    console.log('Course:', courseData);
  }

  return (
    <div>
      <h2>{id ? 'Update Course' : 'Add Course'}</h2>
      <form onSubmit={saveOrUpdate}>
        <div className='form-group'>
          <label>Course Name</label>
          <input type='text' className='form-control' value={courseName} onChange={e => setCourseName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Course Code</label>
          <input type='text' className='form-control' value={courseCode} onChange={e => setCourseCode(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea className='form-control' value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Course URL</label>
          <input type='text' className='form-control' value={courseUrl} onChange={e => setCourseUrl(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Course Teacher</label>
          <input type='text' className='form-control' value={courseTeacher} onChange={e => setCourseTeacher(e.target.value)} />
        </div>
        <button type='submit' className='btn btn-primary'>{id ? 'Update' : 'Save'}</button>
      </form>
    </div>
  );
}

export default SaveOrUpdateCourse;
