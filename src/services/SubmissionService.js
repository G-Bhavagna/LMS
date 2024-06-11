import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/courses/assignments/submission";

export const submitAssignment = (userId,courseCode,assignmentId,submission) => {
  return axios.post(REST_API_BASE_URL+'/submitAssignment/'+userId+'/'+courseCode+'/'+assignmentId, submission);
}

export const checkSubmission = (userId,courseCode,assignmentId) => {
  return axios.get(REST_API_BASE_URL+'/checkSubmission/'+userId+'/'+courseCode+'/'+assignmentId);
}

export const getAllSubmissionsOfCourse = (courseCode) => {
  return axios.get(REST_API_BASE_URL+'/getAllSubmissions/'+courseCode);
}

export const getGradedSubmissions=(courseCode)=>{
  return axios.get(REST_API_BASE_URL+'/getGradedSubmissions/'+courseCode);
}

export const gradeAssignment=(submissionId)=>{
  return axios.put(REST_API_BASE_URL+'/gradeAssignment/'+submissionId);
}