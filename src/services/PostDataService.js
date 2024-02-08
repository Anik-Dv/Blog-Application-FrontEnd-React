import { getToken } from "../auth/auth";
import { SECURE_SERVER, SERVER } from "./Constent" 

/* This is Post Server Call service | NOTE: version : 1 API */

/* Get All Posts */
export const fetchPosts = (pageNumber, pageContentSize)=> {
    return SERVER.get(`/api/posts/feed?pageNumber=${pageNumber}&pageContentSize=${pageContentSize}&sortBy=createDate&sortDir=desc`).then((response) => response.data)}

/* Search post by any keyword */
export const searchPosts = (keyword)=> {
    return SERVER.get(`/api/search/post/${keyword}`).then((response) => response.data);
}

/* Get Signle Post */
export const fetchSinglePost = (postId)=> {
    return SERVER.get(`/api/post/${postId}`).then((response) => response.data);
}

/* Get Posts By User */
export const fetchUserPosts = (userId)=> {
    return SERVER.get(`/api/user/${userId}/posts`).then((response) => response.data);
}

/* create Posts */
export const createPosts = async (formData) => {
    try {
      const token = getToken(); // Replace with your actual access token
      const headers = {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Set the Authorization header with the access token
      }
        return await SERVER.post(`/api/user/${formData.get('userId')}/category/${formData.get('categoryId')}/post/create`, formData, { headers })
        .then((response) => {return response.data});
    } catch(error) {
        console.error('Error:', error);
    }
}

/* update Posts */
export const updatePost = (postId, userId, postData)=> {
    return SECURE_SERVER.put(`/api/post/${postId}/user/${userId}/update`, postData).then((response) => response.data);
}

/* delete Posts */
export const deletePost = (postId)=> {
    return SECURE_SERVER.delete(`/api/post/${postId}`).then((response) => response.data);
}

/* Get Post Thumbnail */
export const getThumbNail= (fileName)=>{
    return SECURE_SERVER.get(`/post/file/${fileName}`).then((response)=> response.data);
}

/*  Sort ing posts By Ascending Order or Descending Order */
export const sortIngredientsByOrder=(pageNumber, contentSize, sortDir)=> {
    return  SERVER.get(`/api/posts/feed?pageNumber=${pageNumber}&pageContentSize=${contentSize}&sortBy=postId&sortDir=${sortDir}`).then((response)=> response.data);
}
