import React, { useEffect, useState } from "react";
import PostItem from './PostItem';
import {fetchPosts} from '../services/PostDataService';
// import { Pagination, PaginationItem } from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import toast from "react-hot-toast";
import { HiSortDescending } from "react-icons/hi";
import { sortIngredientsByOrder } from '../services/PostDataService';


const Posts = () => {
  
  const [postContent, setPostContent] = useState({
    content: [],
    lastPage: false,
    pageContentSize: "",
    pageNumber: "",
    totalContent: "",
    totalPages: "" 
  })
  // Sort posts by order of ingredient list.
  const [option, setOption] = useState({
    orderBy: ''
  })
  
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch posts when the component mounts.
  useEffect(() => {
    if(option.orderBy === 'asc' || option.orderBy === 'desc') {
      sortIngredientsByOrder(currentPage,5,option.orderBy).then((data)=> {
        setPostContent({
          content:[...data.content, ...postContent.content.sort(postContent.createDate)], 
          totalPages:data.totalPages,
          totalContent:data.totalContent,
          pageContentSize:data.pageContentSize,
          lastPage:data.lastPage,
          pageNumber:data.pageNumber
        })
        // console.log(data)
        return;
      }).catch((error)=> {
          /* Show Error Message */
          toast.error("Sorry! Something Went Wrong!", {
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
    } else { 
      changePostsWithPage(currentPage);
    }
  }, [currentPage, option]);



  // Function that handles pagination and calls API with new page number.
  const changePostsWithPage = async (pageNumber = 0, pageContentSize = 5) => {
    if(pageNumber > postContent.pageNumber && postContent.lastPage) {
      return
    }
    if(pageNumber < postContent.pageNumber && postContent.pageNumber===0) {
      return
    }
    await fetchPosts(pageNumber, pageContentSize)
      .then((data) => {
        setPostContent({
              content:[...postContent.content.sort(postContent.createDate), ...data.content], 
              totalPages:data.totalPages,
              totalContent:data.totalContent,
              pageContentSize:data.pageContentSize,
              lastPage:data.lastPage,
              pageNumber:data.pageNumber
          })
      })
      .catch((error) => {
         /* Show Error Message */
          toast.error("Sorry! Something Went Wrong!", {
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
  };

  console.log("Setting postContent to ", postContent)

  const changePageInfinite = ()=> {
    setCurrentPage(currentPage + 1);
  }


  const handleOrderBySelect=(e)=> {
      setOption({...option, [e.target.name]: e.target.value})
      console.log("Menu Changed.")
  }

  return (
    <>
    <section className="posts"> 
      {/* Sort Section START*/}
        <div className='container'>
        <div className="sort-section">
            <label htmlFor="orderby" className='sort-label' >Sort by :  </label><span style={{display: 'flex', fontSize: '1.5rem', padding: '0.5rem 0.3rem 0.5rem'}}><HiSortDescending /></span>
            <select name="orderBy" onChange={handleOrderBySelect} id='orderby' className='sort-select' defaultValue={'asc'}>
            <option disabled value={'asc'} className='sort-option'>--Select</option>
                <option value={'asc'} className='sort-option'>Asc a-z</option>
                <option value={'desc'} className='sort-option'>Desc z-a</option>
            </select>
        </div>
        </div>  
      {/* Sort Section END */}

      {/* Posts Container START */}
          <InfiniteScroll style={{overflow: 'none'}}
            dataLength={postContent.content.length}
            next={changePageInfinite}
            hasMore={!postContent.lastPage}
            loader={postContent.content.length > 0 && 
            <div className="square_circle_loader"></div>
          } 
            endMessage={
              <p style={{ textAlign: 'center', margin: '1rem' }}>
                <b>Yay! You have reached at the End of this Posts.</b> 
              </p>}
          >
            { postContent.content.length > 0 ? 
                <div className="container posts_container">
                {
                  postContent.content.map((post, index) => (
                    <PostItem post={post} key={index} />
                  ))
                }
                </div> 
              :
              /* Skeleton loading */
            <div className="container posts_container" >
            <div className="col-sm-6 col-md-3">
              <div className="movie--isloading">
                <div className="loading-image"></div>
                <div className="loading-content">
                  <div className="loading-text-container">
                    <div className="loading-main-text"></div>
                    <div className="loading-sub-text"></div>
                  </div>
                  <div className="loading-btn"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="movie--isloading">
                <div className="loading-image"></div>
                <div className="loading-content">
                  <div className="loading-text-container">
                    <div className="loading-main-text"></div>
                    <div className="loading-sub-text"></div>
                  </div>
                  <div className="loading-btn"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="movie--isloading">
                <div className="loading-image"></div>
                <div className="loading-content">
                  <div className="loading-text-container">
                    <div className="loading-main-text"></div>
                    <div className="loading-sub-text"></div>
                  </div>
                  <div className="loading-btn"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="movie--isloading">
                <div className="loading-image"></div>
                <div className="loading-content">
                  <div className="loading-text-container">
                    <div className="loading-main-text"></div>
                    <div className="loading-sub-text"></div>
                  </div>
                  <div className="loading-btn"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="movie--isloading">
                <div className="loading-image"></div>
                <div className="loading-content">
                  <div className="loading-text-container">
                    <div className="loading-main-text"></div>
                    <div className="loading-sub-text"></div>
                  </div>
                  <div className="loading-btn"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="movie--isloading">
                <div className="loading-image"></div>
                <div className="loading-content">
                  <div className="loading-text-container">
                    <div className="loading-main-text"></div>
                    <div className="loading-sub-text"></div>
                  </div>
                  <div className="loading-btn"></div>
                </div>
              </div>
            </div>
          </div>
           /* Skeleton loading */
          }
          </InfiniteScroll>  
    </section>



    {/* ---------------Implement Pagination---------- */}
    {/* { postContent.content.length > 0 ?  */}
      
       {/* <div className="container">
         <div className="pagination-sec">
          <nav className="pagination-outer" aria-label="Page navigation">
              <Pagination size="sm"  aria-label="Page navigation example"> */}
                {/* Previous Btn */}           
                  {/* <PaginationItem className="page-item" disabled={postContent.pageNumber === 0} onClick={()=> changePostsWithPage(postContent.pageNumber-1)}>
                    <a className="page-link">
                      <span aria-hidden="true">«</span>
                    </a>
                  </PaginationItem>  */}
                  {/* {
                    [...Array(postContent.totalPages)].map((item, index)=> (
                      
                      <li className="page-item active" key={index} onClick={()=> changePostsWithPage(index)}>
                        <a className="page-link active">
                          {index+1}
                        </a>
                      </li>
                    ))
                  } */}
                  {/* Next Btn */}
                  {/* <PaginationItem disabled={postContent.lastPage} onClick={()=> changePostsWithPage(postContent.pageNumber+1)}>
                    <a className="page-link active">
                      <span aria-hidden="true">»</span>
                    </a>
                  </PaginationItem>                  
              </Pagination>
          </nav>
        </div>
      </div>      */}
    {/* : ''} */}
    </>
  );
};

export default Posts;
