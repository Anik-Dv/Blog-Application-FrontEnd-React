import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../services/UserService'
import toast from 'react-hot-toast'


const Authors = () => {

 const [authors, setAuthors] = useState([])

  useEffect(()=> {
   getAllUsers().then((data)=> {
      setAuthors(data);
      window.scroll(0,0);
    }).catch((err)=> {
      /* Show Error Message */
      toast.error("Something Went Wrong! Try Again!", {
        style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
        },
        iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
        },
    });
    return;
    })
  }, [])

  return (
    <section className='authors'>
      <h1 style={{textAlign: 'center', margin: '1.2rem'}}>See Here All Global Authors </h1>
      {
        authors.length > 0 ? <div className='container authors_container'>
        {
          authors.map(
            ({ userid, name, email, posts, createDate, image_Name }) => {
              return <Link key={userid} to={`/post/user/${userid}`} className='author'>
                <div className='author_avater'>
                  <img src={process.env.REACT_APP_API_SERVER_URL+`/api/user/file/${image_Name}`} alt={`Image of ${name}`} title={name} />
                </div>
                <div className='author_info' title={name}>
                  <h4>{name}</h4>
                  <p>{email}</p>
                  <p>{posts}</p>
                  <p>{createDate}</p>
                </div>
              </Link>
            }
          )
        }
      </div> : 
      
       /* Loading Div is 6 */
       <div className="container posts_container" >
       <div class="col-sm-6 col-md-3">
         <div class="movie--isloading">
           <div class="loading-image"></div>
           <div class="loading-content">
             <div class="loading-text-container">
               <div class="loading-main-text"></div>
               <div class="loading-sub-text"></div>
             </div>
             <div class="loading-btn"></div>
           </div>
         </div>
       </div>
       <div class="col-sm-6 col-md-3">
         <div class="movie--isloading">
           <div class="loading-image"></div>
           <div class="loading-content">
             <div class="loading-text-container">
               <div class="loading-main-text"></div>
               <div class="loading-sub-text"></div>
             </div>
             <div class="loading-btn"></div>
           </div>
         </div>
       </div>
       <div class="col-sm-6 col-md-3">
         <div class="movie--isloading">
           <div class="loading-image"></div>
           <div class="loading-content">
             <div class="loading-text-container">
               <div class="loading-main-text"></div>
               <div class="loading-sub-text"></div>
             </div>
             <div class="loading-btn"></div>
           </div>
         </div>
       </div>
       <div class="col-sm-6 col-md-3">
         <div class="movie--isloading">
           <div class="loading-image"></div>
           <div class="loading-content">
             <div class="loading-text-container">
               <div class="loading-main-text"></div>
               <div class="loading-sub-text"></div>
             </div>
             <div class="loading-btn"></div>
           </div>
         </div>
       </div>
       <div class="col-sm-6 col-md-3">
         <div class="movie--isloading">
           <div class="loading-image"></div>
           <div class="loading-content">
             <div class="loading-text-container">
               <div class="loading-main-text"></div>
               <div class="loading-sub-text"></div>
             </div>
             <div class="loading-btn"></div>
           </div>
         </div>
       </div>
       <div class="col-sm-6 col-md-3">
         <div class="movie--isloading">
           <div class="loading-image"></div>
           <div class="loading-content">
             <div class="loading-text-container">
               <div class="loading-main-text"></div>
               <div class="loading-sub-text"></div>
             </div>
             <div class="loading-btn"></div>
           </div>
         </div>
       </div>
     </div>
      /* Loading Div is 6 */

      }
    </section>
  )
}

export default Authors
