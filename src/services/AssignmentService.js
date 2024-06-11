import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/courses/assignments";

export const getAllAssignmentsByCourseId = (courseCode) => {
  return axios.get(REST_API_BASE_URL+'/getAssignments/'+courseCode);
}

export const getAssignmentById = (assignmentId) => {
  return axios.get(REST_API_BASE_URL+'/getAssignmentById/'+assignmentId);
}

export const saveAssignment = (assignment,courseCode) => {
  return axios.post(REST_API_BASE_URL+'/addAssignment/'+courseCode, assignment);
}

export const updateAssignment = (assignment,courseCode,assignmentId) => {
  return axios.put(REST_API_BASE_URL+'/updateAssignment/'+courseCode+'/'+assignmentId, assignment);
}
export const deleteAssignment = (courseCode,assignmentId) => {
  return axios.delete(REST_API_BASE_URL+'/deleteAssignment/'+courseCode+'/'+assignmentId);
}

export const getSubmiteedAssignmentsCount=(userId,courseCode) => {
  return axios.get(REST_API_BASE_URL+'/getSubmittedAssignmentsCount/'+userId+'/'+courseCode);
}