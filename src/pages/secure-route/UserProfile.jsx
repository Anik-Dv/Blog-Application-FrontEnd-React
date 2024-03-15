import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaEdit } from "react-icons/fa"
import { FaCheck } from "react-icons/fa"
import { doLogin, getCurrentUser, getToken, isAuthenticate } from '../../auth/auth'
import { uploadFile } from '../../services/FileUploadService'
import { updateUserDetails } from '../../services/UserService'
import toast from 'react-hot-toast'

const UserProfile = () => {
  
  const {userId} = useParams();

  const [avater, setAvater] = useState('');
  const [file, setFile] = useState('');
  const [isAvaterTouched, setIsAvaterTouched] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name:'',
    email:'',
    about:'',
    password:'',
    comfirmPassword:'',
  })


  useEffect(() => {
    return () => {
      if(isAuthenticate()) {
        const {name, email, about, image_Name} = getCurrentUser();
        setUserDetails({
          name:name,
          email:email,
          about:about,
        })
        setAvater(image_Name);
      }
      window.scroll(0,0)
    };
  }, []);


  //console.log(avater)
  const Ttoken = getToken();

  // change avater handler
  const changeAvaterHandler = (e)=> {
    e.preventDefault();   

    setIsAvaterTouched(false);
    const formData = new FormData();
    formData.append('file', file);
    uploadFile(formData, userId).then((resp)=> {
      setAvater(resp.image_Name);
      const data={currentUser:resp, token:Ttoken}
      doLogin(data, ()=> {
        console.log("updated userdata in localstorage")
      });
      console.log(resp)
    }).catch((error)=> {
      console.log(error)
    })
  }


  const changeInputValue = (e)=> {
    setUserDetails((prevState) => {
      console.log(prevState)
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }


  const updateDetailsForm = (e)=> {
    e.preventDefault();

    /* Validation The User */
   if(userDetails?.name === '' || userDetails?.comfirmPassword === '' || userDetails?.email === '' || userDetails?.about === '') {
    /* Show Error Message */
    toast.error("You Can't Enter Information", {
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
    }

    // if(userDetails.password !== userDetails.comfirmPassword) {
    //   /* Show Error Message */
    //   toast.error('Your Password & Confirm Password Is Not Same!', {
    //     style: {
    //       border: '1px solid #713200',
    //       padding: '16px',
    //       color: '#713200',
    //     },
    //     iconTheme: {
    //       primary: '#713200',
    //       secondary: '#FFFAEE',
    //     },
    //   });
    //   return;
    // }

    updateUserDetails(userDetails, userId).then((data)=> {

      const newData={currentUser:data, token:Ttoken}
      doLogin(newData, ()=> {
        console.log("updated userdata in localstorage")
      });

       /* Show Success Message */
       toast.success('Your Details Has Been Updated Successfuly.', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        icon: '👏',
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        }
      });
      console.log(data);
    }).catch((error) => { 
    /* Show Error Message */
    toast.error(error ? error.response.data.message : "Something Went Wrong!", {
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
      console.log(error)
      return;
    })
  }
  let nameInputShowValue = userDetails.name == null ? '' : userDetails.name;
  let aboutInputShowValue = userDetails.about == null ? '' : userDetails.about;
  let emailInputShowValue = userDetails.email == null ? '' : userDetails.email;
  let passwordInputShowValue = userDetails.password == null ? '' : userDetails.password;
  let confirmPasswordInputShowValue = userDetails.comfirmPassword == null ? '' : userDetails.comfirmPassword;

  return (
    <section className='profile'>
      <div className='container profile_container'>
        <Link to={`/user/myposts/${userId}`} className='btn'>My Posts</Link>
        <div className='profile_details'>
          <div className='avater_wrapper'>
            <div className='profile_avater'>
              <img src={process.env.REACT_APP_API_SERVER_URL+`/api/user/file/${avater}`} alt={userDetails.name} />
            </div>

            {/* Form For Update User Avater */}
            <form className='avater_form'>
              <input type='file' name='file' id='file' accept='png, jpg, jpeg, svg' onChange={e => [setFile(e.target.files[0])]} />
              <label htmlFor='file' onClick={()=> setIsAvaterTouched(true)}><FaEdit /></label>
            </form>

            {isAvaterTouched && <button className='profile_avater-btn' onClick={changeAvaterHandler}><FaCheck /></button>}
          </div>

          {userDetails.name && <h1>{userDetails.name}</h1>}
          <p>{userDetails.name && userDetails.name.length === 0 ? <span>You Don't Mention Your Name!</span> : ''}</p>
          {userDetails.email && <blockquote>Mail To : {userDetails.email}</blockquote>}
          <p>{userDetails.email && userDetails.email.length === 0 ? <span>You Don't Mention Your Email!</span> : ''}</p>
          {userDetails && <code> {userDetails.about} </code>}
          <p>{userDetails.about && userDetails.about.length === 0 ? <span>You Don't Mention Your About!</span> : ''}</p>

          {/* form to update user details */}
          <form className='form profile_form' onSubmit={updateDetailsForm}>
            {/* <p className='form-error_mgs'>This is an Error Message</p> */}

            <input type='text' placeholder='Full Name' name='name' value={nameInputShowValue} onChange={changeInputValue} required autoFocus />
            <input type='email' placeholder='Email Address' name='email' value={emailInputShowValue} onChange={changeInputValue} required autoFocus  />
            <input type='text' placeholder='Write Something Yourself' name='about' value={aboutInputShowValue} onChange={changeInputValue} required autoFocus style={{height: '7rem'}} />
            {/* <input type='password' placeholder='Your Current Password' value={userDetails.currentPassword} onChange={changeInputValue} required autoFocus /> */}
            <input type='password' placeholder='Your Current Password' name='password' value={passwordInputShowValue} onChange={changeInputValue} required autoFocus />
            <input type='password' placeholder='Enter Your New Password' name='comfirmPassword' value={confirmPasswordInputShowValue} onChange={changeInputValue} required autoFocus />
            <div className='primary'>
              {userDetails.comfirmPassword || userDetails.password ? <button type='submit' className='btn primary' style={{alignItems: 'center'}}>Update Details</button> : <blockquote style={{cursor: 'not-allowed'}}>Update Details</blockquote> }
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile
