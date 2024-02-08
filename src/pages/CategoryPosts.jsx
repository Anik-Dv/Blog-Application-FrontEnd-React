import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import toast from 'react-hot-toast';
import { fetchPosts, sortIngredientsByOrder } from '../services/PostDataService';
import { HiSortDescending } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { fetchPostByCategoryId, getCategories } from '../services/CategoryService';

const CategoryPosts = () => { 

  const {categoryId} = useParams()
  console.log(categoryId)

  const [posts, setPosts] = useState({
    content: [],
    lastPage: false,
    pageContentSize: "",
    pageNumber: "",
    totalContent: "",
    totalPages: "" 
  });

  const [categories, setCategories] = useState([])

  const [selectedCategory, setSeletedCategories] = useState({
    selectedCategoryValue: "",
  })

  // Sort posts by order of ingredient list.
  const [option, setOption] = useState({
    orderBy: ''
  })

  const [currentPage, setCurrentPage] = useState(0);


   // Fetch posts when the component mounts.
   useEffect(() => {
    if(categoryId !== null || categoryId !== undefined) {
      console.log("category URL Have An CategoryId ", categoryId)
      fetchPostByCategoryId(categoryId).then((data)=> {
        setPosts({
          content:[...data].sort(data.createDate),
          totalPages:data.totalPages,
          totalContent:data.totalContent,
          pageContentSize:data.pageContentSize,
          lastPage:data.lastPage,
          pageNumber:data.pageNumber
        })
        console.log(data)
      }).catch((error)=> {
        console.log(error)
        return;
      })
    }

    if(option.orderBy === 'asc' || option.orderBy === 'desc') {
      sortIngredientsByOrder(currentPage,5,option.orderBy).then((data)=> {
        setPosts({
          content:[...data.content, ...posts.content.sort(posts.createDate)], 
          totalPages:data.totalPages,
          totalContent:data.totalContent,
          pageContentSize:data.pageContentSize,
          lastPage:data.lastPage,
          pageNumber:data.pageNumber
        })
        // console.log(data)
        window.scroll(0,0)
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
          window.scroll(0,0)
          return;
      })
    } else { 
      changePostsWithPage(currentPage);
    }
  }, [currentPage, option]);

  // Function that handles pagination and calls API with new page number.
  const changePostsWithPage = async (pageNumber = 0, pageContentSize = 5) => {
    if(pageNumber > posts.pageNumber && posts.lastPage) {
      return
    }
    if(pageNumber < posts.pageNumber && posts.pageNumber===0) {
      return
    }
    await fetchPosts(pageNumber, pageContentSize)
      .then((data) => {
        setPosts({
              content:[...posts.content.sort(posts.createDate), ...data.content], 
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

  const changePageInfinite = ()=> {
    setCurrentPage(currentPage + 1);
  }

  const handleOrderBySelect=(e)=> {
      setOption({...option, [e.target.name]: e.target.value})
      console.log("Menu Changed.")
  }

  useEffect(()=> {
    getCategories().then((data)=> {
      setCategories(data)
      console.log(data)
    }).catch((error)=> {
      console.log(error)
    })
  }, [])

  const changeCategoryInput = (e) => {
    setSeletedCategories((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  useEffect(() => {
      if(selectedCategory !== null || selectedCategory !== undefined) {
      fetchPostByCategoryId(selectedCategory.selectedCategoryValue).then((data)=> {
        setPosts({          
          content:[...data].sort(data.createDate), 
          totalPages:data.totalPages,
          totalContent:data.totalContent,
          pageContentSize:data.pageContentSize,
          lastPage:data.lastPage,
          pageNumber:data.pageNumber
      })
        window.scroll(0,0)
        console.log(data)
      }).catch((error)=> {
        console.log(error)
        window.scroll(0,0)
      })
    }
  }, [selectedCategory])


  return (
    <section className="posts">
        <div className="container category-posts_container">

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


        {/* Categories  Filter START*/}
        <div className="grid">
        <aside className="sidebar-categories">
          <div className="check-group">
          <h3 style={{textAlign: 'center'}}>Select Categories</h3>
            {categories &&  categories.map((item, index)=>(
              <div key={index}>
                <label className="checkbox">
                <input className="checkbox__input" type="checkbox" id="myCheckbox01" name="selectedCategoryValue" value={item.categoryId} onChange={changeCategoryInput} />
                <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                  <rect width="21" height="21" x=".5" y=".5" fill="#FFF" stroke="#006F94" rx="3" />
                  <path className="tick" stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
                </svg>
                <span htmlFor="myCheckbox01" className="checkbox__label">{item.categoryTitle}</span>
              </label>
              </div>
            )
            )}
            
            <div className="check-group__result">Categories chosen:</div>
          </div>
      </aside>

      {/* Posts Container START */}
      <main className="categories-items"> 
      <h3>All Posts Showed Now</h3>             
      <InfiniteScroll style={{overflow: 'none'}}
        dataLength={posts.content.length}
        next={changePageInfinite}
        hasMore={!posts.lastPage}
        loader={posts.content.length > 0 && 
          <div className="square_circle_loader"></div>} 
        endMessage={
        <p style={{ textAlign: 'center', margin: '1rem' }}>
          <b>Yay! You have reached at the End of this Posts.</b> 
        </p>}
      >        
        { posts.content.length > 0 ? 
              posts.content.map((post, index) => (
                <PostItem post={post} key={index} />
              ))
          : 
           /* Loading Div is 6 */
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
          /* Loading Div is 6 */

        }
      </InfiniteScroll>  
        </main>
      </div>
      
      {/* Categories  Filter END*/}

        </div>
    </section>
  )
}

export default CategoryPosts
