import { SERVER } from "./Constent" 

/* This is For Get All Categories Service */
export const getCategories = () => {
    return SERVER.get('/api/category/').then((response) =>  response.data);
}

/* This is For Get Post by Categories ID */
export const fetchPostByCategoryId = (categoryId) => {
    return SERVER.get(`/api/category/${categoryId}/posts`).then((response) =>  response.data);
}

