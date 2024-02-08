import React, { useState, useEffect } from "react";
import { FcLike } from "react-icons/fc";
import { BiCommentAdd } from "react-icons/bi";
import { createComment, getCommentsOfPost } from "../services/CommentsServer";
import toast from "react-hot-toast";
import { getCurrentUser, isAuthenticate } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import { CgOptions } from "react-icons/cg";


const Comments = ({post_Id, post})  => {

  // store server all comments
  const [comments, setComments] = useState([])
  // store new created all comments
  const [newcomments, setNewComments] = useState({
    content: "",
  })
  const [user, setUser] = useState(getCurrentUser());

 const navigate = useNavigate();

  useEffect(() => {
    return () => {
      getCommentsOfPost(post_Id).then((data) => {
        setComments(data)
        console.log(data)
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
  }, [newcomments]);
  

  // request server for create commnets
  const createCommentRequest = (comment)=> {
    createComment(comment, post_Id, user.userid).then((data) => {
      setNewComments(data);
      console.log(data)
      /* Show Success Message */
      toast.success("Great. Your Comment Has Been Published.", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        icon: "👏",
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
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
  }

  /* for Change input value */
  const changeInputHandler=(e)=> {
    setNewComments((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  // form submit | Create Comment form submit
  const formSubmit=(e)=> {
    e.preventDefault();

    /* Check if user is authenticate  */
    if(!isAuthenticate()) {
      /* Show Error Message */
      toast.error("Sorry! Please Loging First For Comments!", {
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
        navigate("/login");
      return;
    }
    
     // validate information
     if (newcomments.content.trim() === "") {
      /* Show Error Message */
      toast.error("Sorry! You Are Missing Something!", {
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
    }
    // request Server for create comment
    createCommentRequest(newcomments);
  }

  return (
    <>
      <div className="container-cmt justify-content-center mt-5 border-left border-right">
        <div className="d-flex justify-content-center pt-3 pb-2 comment-input-sec">
          <form className="comment-form" onSubmit={formSubmit}>
            <input
              type="text"
              name="content"
              placeholder="+ Add a Comment"
              className="form-control addtxt"
              value={newcomments.comment}
              onChange={changeInputHandler}
              autoFocus
              required
            />
            <button
              type="submit"
              className="btn md primary"
              style={{ marginLeft: "1rem" }}
            >
              <BiCommentAdd style={{ fontSize: "1.1rem" }} />
            </button>
          </form>
        </div>
        
        {(
          comments.map((c, i) => 
            
          <div className="show-comment-sec" key={i}>
            <div className="second">
              <span className="text1">
                {c.content} <span className="comment-options">
                  {/* TODO : This is Comment Other Operation btn */}
                  <CgOptions />
              </span>
              </span>              
            <div className="user-avater-sec">
              <div className="user-avater" style={{borderRadius: '50%'}}>
                {/* <img src="https://i.imgur.com/AgAC1Is.jpg" width="18" alt="User Name" /> */}
                <img src={process.env.REACT_APP_API_SERVER_URL+`/api/post/file/${c.user.image_Name}`} width="18" alt={post?.user?.name}/>
                <span className="text2">{c.user?.name}</span>
              </div>
              <div className="upvote-sec">
                <span className="text3">Upvote?</span>                  
                <span className="thumbup">
                  <FcLike />
                </span>
                <span className="text4">3</span>
              </div>
            </div>
          </div>
        </div>
      ))}
        
      </div>
    </>
  );
};

export default Comments;
