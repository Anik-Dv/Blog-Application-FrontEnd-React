import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/CategoryService";
import { getCurrentUser, getToken } from "../../auth/auth";
import { SERVER } from "../../services/Constent";

const CreatePost = () => {
  // navigator
  const navigate = useNavigate();
  // send notify
  const notify = () => {};

  // This is Random Number Generetor.
  const randomNum = Math.floor(Math.random() * (40 - 1 + 10)) + 1;

  const [storeCategory, setStoreCategory] = useState({
    category_id: "",
  })
  /* For categories State */
  const [category, setCategory] = useState([]);
  /* For File State */
  const [file, setFile] = useState(null);
  /* For Users State */
  const [user, setUser] = useState(getCurrentUser());
  /* For Posts State */
  const [postData, setPost] = useState({
    postId: randomNum,
    title: "",
    content: "",
  });

  /* THIS IS TEXT EDITOR FORMATE */
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  /* Load All Categories From Server */
  useEffect(() => {
    return () => {
      setUser(getCurrentUser());
      getCategories().then((data) => {
          setCategory(data);
        })
        .catch((error) => {
          /* Show Error Message */
          toast.error("Sorry! Could Not Found Any Categories!", {
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
        });
    };
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to handle onChange of input fields. It will update the user data state
  const changeInputHandler = (e) => {
    setPost((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  // Function to handle onChange of Post Content text fields. It will update the user data state
  const changeContentField = (data) => {
    setPost({ ...postData, content: data });
  };

  const changeCategoryField = (e) => {
    setStoreCategory({...category, [e.target.name]: e.target.value})
  }

  /* request Server for create post */
  const savePost = () => {    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("postData", JSON.stringify(postData));        
    const token = getToken();   
    SERVER.post(`/api/user/${user.userid}/category/${storeCategory.category_id}/post/create`, formData, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
        /* Show Success Message */
        toast.success("Great. Your Post Has Been Published Successfully.", {
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
        console.log(response.data.postId)
        // and navigate the post
        navigate(`/posts/${response.data.postId}`);
      })
      .catch((error) => {
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
        console.log(error)
        return;
      });
  };

  // submit form
  const submitForm = (e) => {
    e.preventDefault();

    // validate information
    if (
      postData.title.trim() === "" ||
      postData.content.trim() === ""
    ) {
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

    // request send the server
    savePost();
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {/* <p className="form-error_mgs">This is an error message</p> */}
        <form className="form create_post_form" onSubmit={submitForm}>
        {postData.title.length > 80 ? 
          <>
          <small className='form-error_mgs'>Post Title Must be Minimum of 6 Chars and Maximum is 80 Chars!"</small>
          <input
          type="text"
          placeholder="Enter Post Title *"
          name="title"
          value={postData.title}
          onChange={changeInputHandler}
          autoFocus
          required/>
          </>
        : 
          <>
          <input
          type="text"
          placeholder="Enter Post Title *"
          name="title"
          value={postData.title}
          onChange={changeInputHandler}
          autoFocus
          required/>
          </>
        }

          <select
            id={category}
            defaultValue={0}
            name="category_id"
            onChange={changeCategoryField}>

            {/* default category */}
            <option disabled value={0}>
              --Select-Category
            </option>
            {category.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryTitle}
              </option>
            ))}
          </select>

          <ReactQuill
            className="q1-editor"
            modules={modules}
            formats={formats}
            value={postData.content}
            onChange={changeContentField}
          />
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept="png, jpg, jpeg"
          />

          <button type="submit" className="btn primary" onClick={notify}>
            Create Post
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
