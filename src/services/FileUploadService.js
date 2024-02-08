import { SECURE_SERVER } from "./Constent"

export const uploadFile = (formData, userId)=> {
    return SECURE_SERVER.post(`/api/user/upload/${userId}`, formData,{
        headers: {
            'Content-Type':'multipart/form-data'
        }
    }).then((response)=> response.data);
}
