/* This is User Service */
import { SECURE_SERVER, SERVER } from "./Constent"

// user create Request
export const USER_REGISTER = (userData) => {
    return SERVER.post("/api/auth/signin", userData).then((res) => res.data);
}

// user login
export const USER_LOGIN = (userData) => {
    return SERVER.post("/api/auth/login", userData).then((res) => res.data);
}

// get all user
export const getAllUsers = () => {
   return SERVER.get("/api/user/").then((response)=> response.data);
}

// get single user by userId
export const getUser = (userId) => {
   return SERVER.get(`/api/user/${userId}`).then((response)=> response.data);
}

// update user details 
export const updateUserDetails = (data, userId)=> {
    return SECURE_SERVER.put(`/api/user/update/${userId}`, data).then((response)=> response.data);
}
