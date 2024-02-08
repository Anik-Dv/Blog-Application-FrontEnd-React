import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../services/UserService';
import toast from 'react-hot-toast';

const PublicUserProfile = () => {

    const {userId} = useParams();
    const [userDetails, setUserDetails] = useState('');

    useEffect(()=>{
        getUser(userId).then((data)=> {
            setUserDetails(data);
            window.scroll(0,0)
        }).catch((error)=> {
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
    },[])
    

    return (
    <section className='profile'>
    <div className='container profile_container'>
      <Link to={`/`} className='btn'>Back</Link>
      <div className='profile_details'>
        <div className='avater_wrapper'>
          <div className='profile_avater'>
            <img src={process.env.REACT_APP_API_SERVER_URL+`/api/user/file/${userDetails.image_Name}`} alt={userDetails.name} />
          </div>
        </div>
          {/* Show User Details */}
          <h2>Name : {userDetails && userDetails.name}</h2>
          <blockquote>Email : {userDetails && userDetails.email}</blockquote>
          <code>{userDetails && userDetails.about ? userDetails.about : ''}</code>
      </div>
    </div>
  </section>
  );
}

export default PublicUserProfile;
