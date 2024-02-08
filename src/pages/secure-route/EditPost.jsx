import React, {useEffect, useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getCurrentUser } from '../../auth/auth';
import { getCategories } from '../../services/CategoryService';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSinglePost, updatePost } from '../../services/PostDataService';

const EditPost = () => {

  const {postId} = useParams();
  const {userId} = useParams();

  // navigator
  const navigate = useNavigate();

  const [newCategory, setNewCategory] = useState({
    category_id: "",
  })
  /* For categories State */
  const [category, setCategory] = useState([]);
  /* For Users State */
  const [user, setUser] = useState(undefined);

  const [post, setPost] = useState({
    title: "",
    content: "",
  })

  /* Here Are Text Area Editor Tools */
  const modules = {
    toolbar: [
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  /* Load Post */
  useEffect(()=> {
    fetchSinglePost(postId).then((data)=> {
      setPost({
        title:data.title,
        content:data.content
      })
      setNewCategory({
        category_id: data.category.categoryId
      })
    })
  }, [])

   /* Load All Categories From Server */
   useEffect(() => {
    return () => {
      setUser(getCurrentUser());
      getCategories().then((data) => {
          setCategory(data);
        })
        .catch((error) => {
          /* Show Error Message */
          toast.error("Something Wrong! Not Found Any Categories!", {
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


  // Function to handle onChange of input fields. It will update the user data state
  const changeInputFieldData = (e) => {
    setPost((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  // Function to handle onChange of Post Content text fields. It will update the user data state
  const changeContentField = (data) => {
    setPost({ ...post, content: data });
  };

  const changeCategoryField = (e) => {
    setNewCategory({...category, [e.target.name]: e.target.value})
  }

  /* request Server for update post */
  const onSubmitFormForUpdatePostData =(e)=> {
    e.preventDefault();

   /* Validation The User */
   if(post.title.trim() === '' || post.content.trim() === '' || newCategory.category_id === '') {
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

  updatePost(postId, userId, post).then((data)=> {
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
    navigate(`/posts/${data.postId}`);
  }).catch((error)=> {
    /* Show Error Message */
    toast.error("Something Wrong! Post Has Not Updated!", {
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


  let titleInputShowValue = post.title == null ? '' : post.title;
  let contentInputShowValue = post.content == null ? '' : post.content;
  let categoryInputShowValue = newCategory.category_id == null ? '' : newCategory.category_id;


  return (
    <section className='create-post'>
    <div className='container'>
      <h2>Edit Post</h2>
      {/* <p className='form-error_mgs'>This is an error message</p> */}
      <form className='form create_post_form' onSubmit={onSubmitFormForUpdatePostData}>
        <input
            type="text"
            placeholder="Enter Post Title *"
            name='title'
            value={titleInputShowValue}
            onChange={changeInputFieldData}
            autoFocus
            required/>
        <select
            id={category}           
            defaultValue={categoryInputShowValue}
            name='category_id'
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
          <ReactQuill className="q1-editor" modules={modules} formats={formats} value={contentInputShowValue} onChange={changeContentField} />
          {/* <input type='file' onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg' /> */}
          <button type='submit' className='btn primary'>Update Post</button>
      </form>
    </div>
  </section>
  )
}

export default EditPost
