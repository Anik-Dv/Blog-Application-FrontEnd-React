import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {deletePost, fetchSinglePost} from "../services/PostDataService"
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Comments from "../components/Comments";
import toast from "react-hot-toast";
import { getCurrentUser, isAuthenticate } from "../auth/auth";
import { PiInstagramLogoDuotone } from "react-icons/pi";
import { FaSquareXTwitter } from "react-icons/fa6";
import { PiShareFatDuotone } from "react-icons/pi";
import Swal from "sweetalert2";
TimeAgo.addLocale(en)


const PostDetails = () => {
  const {postId} = useParams()
  const [postData, setPostData] = useState([])
  const [user, setUser] = useState({
    userid:-1,
  })

  const navigate = useNavigate();

  useEffect(() => {
    return () => {     
      fetchSinglePost(postId).then((data) => {
        setPostData(data) 
        window.scroll(0,0) 
      }).catch((error) => {
        /* Show Error Message */
        toast.error("Sorry! Something Went Wrong!", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      return;     
      })
    };
  }, []);

  useEffect(()=> {
    setUser(getCurrentUser());
  }, [])

  const postDateYear = postData?.createDate?.[0];
  const postDateMonth = postData?.createDate?.[1];
  const postDateDay = postData?.createDate?.[2];


  /* Show Alert Box Message For Confirm Operation */
  const showConfirmBox = ()=> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // FIRE
        deletePost(postId).then((response)=>{
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          navigate(`/`)
          return;
        }).catch((error)=> {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Something Wrong! Your Posts is Not Deleted!)",
            icon: "error"
          });
          return;
        })  
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Posts is safe :)",
            icon: "error"
          });
        return;
      }
    });
  }

  /* perform Delete operation */
  const PerformOperation = ()=> {
    showConfirmBox();
  }


  return (
    <section className="post_details">
      <div className="container post_details_container">
        <div className="post_details_header">
          {/* Post Author Details Start Here */}
          <div className="container">
        <div className="card mt-5 border-5 pt-2 active pb-0 px-3">
            <div className="card-body ">
                <div className="row">
                  <div className="col-12 ">
                    <h4 className="card-title "><b>Author : <Link to={`/post/user/${postData?.user?.userid}`}>{postData?.user?.name}</Link></b></h4>
                  </div>
                <div className="col">
                  <h6 className="card-subtitle mb-2 text-muted">
                    <p className="card-text text-muted small" >      
                      Posted by :<span style={{color: "blue", fontWeight: "bold", fontSize: "12px"}}> {postData?.user?.name} </span> on {postDateDay} / {postDateMonth}, {postDateYear} <br/>
                      Post Category : <span style={{color: "blue", fontWeight: "bold", fontSize: "12px"}}>{postData?.category?.categoryTitle}</span></p>
                    </h6>
                  </div>
              </div>
            </div>                
          </div>
        </div>
        { isAuthenticate() && user && user?.userid===postData?.user?.userid ?
          <div className="post_details_buttons">
            <Link to={`/user/${postData?.user?.userid}/posts/${postId}/edit`} className="btn sm primary">
              Edit Post
            </Link>
            <Link className="btn sm danger" onClick={PerformOperation}>
              Delete Post
            </Link>
          </div> : 
          <div className="post_details_buttons_pub">
            Share <PiShareFatDuotone style={{cursor: 'none'}}/>
            <Link to={`https://www.instagram.com/ar_anik_05/`} title="Follow Us" className="pub_btn">
              <PiInstagramLogoDuotone />
            </Link>
            <Link title="Share Us" to={`http://twitter.com/share?text=Iam Shareing On 'blogbounty.com' Post This Platform Provide Very Helpfull Content and Tutorial&url=http://localhost:3000/posts/1&hashtags=blogbounty,blogblontytutorial,blogblontyblog`} className="pub_btn">
              <FaSquareXTwitter />
            </Link>
          </div>
        }
        </div>
        <h1>{postData.title}</h1>
        <div className="post_details_thumbnail">
          <img src={process.env.REACT_APP_API_SERVER_URL+`/api/post/file/${postData?.imageName}`} alt={postData?.title} />
        </div>

        {/* Some Option Here */}
        {/* <div className="post-details-intro" style={{backgroundColor: "GrayText"}}>
          <h3>Some Option Here</h3>
        </div> */}

        <div className="divider"></div>
        {/* Post Description */}
        <div className="description">
          <p dangerouslySetInnerHTML={{__html: postData.content}}></p>
        </div>
        <div className="divider"></div>
        {/* Comment Section */}
        <div className="post-details-intro">
          <Comments post_Id={postId} post={postData}/>
        </div>
      </div>
    </section>
  );
};

export default PostDetails;
