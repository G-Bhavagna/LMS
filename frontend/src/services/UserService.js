import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/users";

export const adduser=(user)=>{
  return axios.post(REST_API_BASE_URL+'/register',user);
}

export const getUserById=(userId)=>{
  return axios.get(REST_API_BASE_URL+'/userById/'+userId);
}

export const updateUser=(userId,user)=>{
  return axios.put(REST_API_BASE_URL+'/updateUser/'+userId,user);
}

export const getAllUsers=()=>{
  return axios.get('http://localhost:8080/api/users/all');
}



export const getMyCourses=()=>{
  const user=JSON.parse(sessionStorage.getItem('user'));
  return axios.get(REST_API_BASE_URL+"/coursesEnrolled/"+user.id);
}



export const userLogin=(user)=>{
  return axios.post(REST_API_BASE_URL+'/login',user);
}


export const getAllFaculties=()=>{
  return axios.get(REST_API_BASE_URL+'/faculties');
}