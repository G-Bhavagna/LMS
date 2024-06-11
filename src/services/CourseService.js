import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/courses";

export const getAllCourses = () => {
  return axios.get(REST_API_BASE_URL+'/allCourses');
}


export const saveCourse = (file,course) => {
  return axios.post(REST_API_BASE_URL+'/addCourse',file,  course);
}

export const getCourseByCourseCode = (courseId) => {
  return axios.get(REST_API_BASE_URL + '/getCourseByCourseCode/' + courseId);
}

export const updateCourse = (courseCode, course) => {
  return axios.put(REST_API_BASE_URL + '/updateCourse/' + courseCode, course);
}

export const getUnenrolledCourses=()=>{
  return axios.get(REST_API_BASE_URL+"/coursesNotenrolled/"+sessionStorage.getItem("userId"));
}

export const unEnrollCourse=(userId,courseCode)=>{
  return axios.delete(REST_API_BASE_URL+"/unEnrollCourse/"+sessionStorage.getItem("userId")+"/"+courseCode);
}

export const enrollCourse=(userId,courseCode)=>{
  return axios.post(REST_API_BASE_URL+"/enrollCourse/"+sessionStorage.getItem("userId")+"/"+courseCode);
}

export const getCoursesForFaculty=(userId)=>{
  return axios.get(REST_API_BASE_URL+"/coursesForFaculty/"+userId);
}

export const getAllUsersOfCourse=(courseCode)=>{
  return axios.get(REST_API_BASE_URL+"/allUsersOfCourse/"+courseCode);
}

export const getCoursesWithEnrollmentCount = () => {
  return axios.get(REST_API_BASE_URL+'/enrollmentCount');
};