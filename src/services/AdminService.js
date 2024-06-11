import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/lms/admin';


export const adduser=(user)=>{
  return axios.post(REST_API_BASE_URL+'/addUser',user);
}

export const updateUser=(userId,user)=>{
  return axios.put(REST_API_BASE_URL+'/updateUser/'+userId,user);
}

export const getUserById=(userId)=>{
  return axios.get(REST_API_BASE_URL+'/getUserById/'+userId);
}

export const assignCourse=(userId,courseCode)=>{
  return axios.post(REST_API_BASE_URL+'/assignCourse/'+userId+'/'+courseCode);
}

export const unAssignCourse=(userId,courseCode)=>{
  return axios.delete(REST_API_BASE_URL+'/unAssignCourse/'+userId+'/'+courseCode);
}

export const allCoursesAdmin=()=>{
  return axios.get(REST_API_BASE_URL+'/allCourses');
}