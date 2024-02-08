import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchUserPosts } from '../services/PostDataService';
import DeletePost from './secure-route/DeletePost';

const Dashboard = () => {
  const {userId} = useParams(); 
  const [posts, setPosts] = useState([]);

  console.log(userId)
  useEffect(()=>{
    fetchUserPosts(userId).then((response)=> {
      setPosts(response)
      console.log(response)
    }).catch((error)=> {
      console.log(error)
    })
  },[])

  const PerformOperation = ()=> {
    <DeletePost />
  }
 
  return (
    <section className='dashboard'>
      {
        posts.length > 0 ? <div className='container dashboard_container'>
          {
            posts.map(
              post => {
                return <article key={post.postId} className='dashboard_post' title={post.title}>
                  <div className='dashboard_post-info'>
                    <div className='dashboard_post-thumbnail'>
                      {/* <img src={post.thumbnail} alt={post.title} /> */}
                      <img src={process.env.REACT_APP_API_SERVER_URL+`/api/post/file/${post?.imageName}`} alt={post?.title} title={post.title} />
                  </div>
                  <h5>{post.title}</h5>
                  </div>
                  <div className='dashboard_post-actions'>
                    <Link to={`/posts/${post.postId}`} className='btn sm'>View</Link>
                    <Link to={`/user/${userId}/posts/${post.postId}/edit`} className='btn sm primary'>Edit</Link>
                    <Link to={`/user/${userId}/posts/${post.postId}/delete`} className='btn sm danger' onClick={PerformOperation}>Delete</Link>
                  </div>
                </article>
              }
            )
          }
        </div> : <h2>You Have No Posts Yet!</h2>
      }
    </section>
  )
}

export default Dashboard
