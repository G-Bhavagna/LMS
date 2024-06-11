import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';
import { getUserById } from '../services/UserService';
import { getCourseByCourseCode } from '../services/CourseService';
import './Certificate.css';

const CertificateGenerator = ({ name, course, date }) => {
  const [userData, setUserData] = useState({});
  const [courseData, setCourseData] = useState({});

  const { userId, courseCode } = useParams();

  useEffect(() => {
    fetchUserData(userId);
    fetchCourseData(courseCode);
  }, [userId, courseCode]);

  const fetchUserData = async (userId) => {
    getUserById(userId)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchCourseData = async (courseCode) => {
    getCourseByCourseCode(courseCode)
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const downloadCertificate = () => {
    const certificate = document.getElementById('certificate');
    
    // Hide the button
    const button = certificate.querySelector('button');
    button.style.display = 'none';
  
    // Capture the certificate as an image
    html2canvas(certificate).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('certificate.pdf');
  
      // Show the button after capturing the image
      button.style.display = 'block';
    });
  };
  
  
  return (
    <div className="App" id="certificate">
      <svg width="99" height="139" viewBox="0 0 99 139" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H99V138.406L52.1955 118.324L0 138.406V0Z" fill="white" />
        <path d="M25.4912 83.2515C25.4912 79.4116 27.0222 75.7289 29.7474 73.0137C32.4727 70.2985 36.1689 68.7731 40.0229 68.7731C43.877 68.7731 47.5732 70.2985 50.2984 73.0137C53.0236 75.7289 54.5546 79.4116 54.5546 83.2515M40.0229 59.724C40.0229 55.8841 41.5539 52.2014 44.2791 49.4862C47.0044 46.7709 50.7006 45.2455 54.5546 45.2455C58.4087 45.2455 62.1049 46.7709 64.8301 49.4862C67.5553 52.2014 69.0863 55.8841 69.0863 59.724V83.2515" stroke="#0379FF" strokeWidth="10.6193" />
      </svg>
      <p className="byline">Certificate of completion</p>

      <div className="content">
        <p>Awarded to</p>
        <h1>{userData.username}</h1>
        <p>for completing Course:</p>
        <h2>{courseData.name}</h2>
      </div>

      {date && (
        <p className="date">
          Issued on{' '}
          <span className="bold">{date}</span>
        </p>
      )}

<button onClick={downloadCertificate} style={{ color: 'black', display: 'block', margin: 'auto', marginTop: '20px', fontFamily: 'Arial, sans-serif', fontSize: '16px', padding: '10px 20px', border: '2px solid black', borderRadius: '5px', cursor: 'pointer' }}>
  Download Certificate
</button>

    </div>
  );
};

CertificateGenerator.defaultProps = {
  name: 'James Lee',
  course: 'Creating PDFs with React & Make.cm',
  date: 'March 15 2021'
}

export default CertificateGenerator;
