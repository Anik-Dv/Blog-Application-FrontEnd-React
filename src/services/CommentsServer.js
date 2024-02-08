/* Comments Server Apis  */
import { SERVER, SECURE_SERVER } from "./Constent"

// Load All Comments Of Specific Post
export const getCommentsOfPost = (post_id) => {
    return SERVER.get(`/api/post/${post_id}/comments`).then((response)=> response.data);
}

// create Comments
export const createComment = (comment, post_Id, user_Id) => {
    return SECURE_SERVER.post(`/api/post/${post_Id}/user/${user_Id}/comment`, comment).then((response) => response.data);
}